'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { trainingDemoContent } from '@/pages-content/linear-regression/content/linear-regression-content';

const POINTS = trainingDemoContent.points;
const W = 300;
const H = 220;
const PAD = 30;
const LR_DEFAULT = 0.3;

function toSVGx(x: number) {
  return PAD + x * (W - PAD * 2);
}
function toSVGy(y: number) {
  return H - PAD - (y / 1.5) * (H - PAD * 2);
}

function mse(w: number, b: number) {
  return (
    POINTS.reduce((s, [x, y]) => s + (y - (w * x + b)) ** 2, 0) / POINTS.length
  );
}

function gradients(w: number, b: number) {
  let dw = 0,
    db = 0;
  for (const [x, y] of POINTS) {
    const err = w * x + b - y;
    dw += err * x;
    db += err;
  }
  return { dw: (2 / POINTS.length) * dw, db: (2 / POINTS.length) * db };
}

export function TrainingDemo() {
  const [w, setW] = useState(0.2);
  const [b, setB] = useState(1.0);
  const [lr, setLr] = useState(LR_DEFAULT);
  const [step, setStep] = useState(0);
  const [lossHistory, setLossHistory] = useState<number[]>([mse(0.2, 1.0)]);
  const [isRunning, setIsRunning] = useState(false);

  const wRef = useRef(w);
  const bRef = useRef(b);
  wRef.current = w;
  bRef.current = b;

  const trainStep = useCallback(() => {
    const { dw, db } = gradients(wRef.current, bRef.current);
    const nw = wRef.current - lr * dw;
    const nb = bRef.current - lr * db;
    setW(nw);
    setB(nb);
    setStep((s) => s + 1);
    setLossHistory((h) => [...h, mse(nw, nb)].slice(-80));
  }, [lr]);

  useEffect(() => {
    if (!isRunning) return;
    const t = setTimeout(trainStep, 80);
    return () => clearTimeout(t);
  }, [isRunning, trainStep, w, b]);

  function reset() {
    setIsRunning(false);
    setW(0.2);
    setB(1.0);
    setStep(0);
    setLossHistory([mse(0.2, 1.0)]);
  }

  const currentMSE = mse(w, b);
  const maxLoss = Math.max(...lossHistory, 0.01);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {trainingDemoContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {trainingDemoContent.description}
          </p>

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* SVG plot */}
            <div className='border-border rounded-md border p-4'>
              <svg viewBox={`0 0 ${W} ${H}`} className='h-auto w-full'>
                <line
                  x1={PAD}
                  y1={H - PAD}
                  x2={W - PAD}
                  y2={H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.2}
                  className='text-foreground'
                />
                <line
                  x1={PAD}
                  y1={PAD}
                  x2={PAD}
                  y2={H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.2}
                  className='text-foreground'
                />

                {/* Regression line */}
                <line
                  x1={toSVGx(0)}
                  y1={toSVGy(b)}
                  x2={toSVGx(1)}
                  y2={toSVGy(w + b)}
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2.5}
                />

                {/* Residuals */}
                {POINTS.map(([x, y], i) => (
                  <line
                    key={i}
                    x1={toSVGx(x)}
                    y1={toSVGy(y)}
                    x2={toSVGx(x)}
                    y2={toSVGy(w * x + b)}
                    style={{ stroke: 'var(--destructive)' }}
                    strokeWidth={1}
                    strokeDasharray='2 2'
                    opacity={0.6}
                  />
                ))}

                {/* Data points */}
                {POINTS.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={toSVGx(x)}
                    cy={toSVGy(y)}
                    r={4}
                    style={{ fill: 'var(--chart-1)' }}
                    opacity={0.85}
                  />
                ))}
              </svg>
              <div className='mt-2 flex gap-4 text-xs'>
                <div className='flex items-center gap-1'>
                  <div className='bg-chart-1 h-2.5 w-2.5 rounded-full' />
                  <span className='text-muted-foreground'>Data</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg width='18' height='10'>
                    <line
                      x1='0'
                      y1='5'
                      x2='18'
                      y2='5'
                      className='text-chart-2'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                  <span className='text-muted-foreground'>Fit line</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg width='18' height='10'>
                    <line
                      x1='0'
                      y1='5'
                      x2='18'
                      y2='5'
                      className='text-destructive'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeDasharray='3 2'
                    />
                  </svg>
                  <span className='text-muted-foreground'>Residuals</span>
                </div>
              </div>
            </div>

            {/* Controls + stats */}
            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div className='text-primary font-mono text-xl font-bold'>
                    {w.toFixed(3)}
                  </div>
                  <div className='text-muted-foreground text-xs'>w (slope)</div>
                </div>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div className='text-chart-2 font-mono text-xl font-bold'>
                    {b.toFixed(3)}
                  </div>
                  <div className='text-muted-foreground text-xs'>
                    b (intercept)
                  </div>
                </div>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div
                    className={`font-mono text-xl font-bold ${currentMSE < 0.005 ? 'text-green-500' : 'text-chart-3'}`}
                  >
                    {currentMSE.toFixed(4)}
                  </div>
                  <div className='text-muted-foreground text-xs'>MSE</div>
                </div>
              </div>

              {/* Loss curve */}
              <div className='bg-muted rounded-md p-3'>
                <Label className='mb-2 block text-xs'>
                  Loss Curve (step {step})
                </Label>
                <div className='flex h-14 items-end gap-px'>
                  {lossHistory.map((l, i) => (
                    <div
                      key={i}
                      className='bg-primary flex-1 transition-all'
                      style={{
                        height: `${Math.min(100, (l / maxLoss) * 100)}%`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label className='mb-1 block text-sm'>
                  Learning Rate η ={' '}
                  <span className='text-chart-3 font-mono'>
                    {lr.toFixed(2)}
                  </span>
                </Label>
                <Slider
                  value={[lr]}
                  onValueChange={(v) => setLr(v[0])}
                  min={0.01}
                  max={0.9}
                  step={0.01}
                  disabled={isRunning}
                />
              </div>

              <div className='flex gap-2'>
                <Button size='sm' onClick={trainStep} disabled={isRunning}>
                  Step
                </Button>
                <Button
                  size='sm'
                  variant={isRunning ? 'destructive' : 'default'}
                  onClick={() => setIsRunning(!isRunning)}
                >
                  {isRunning ? 'Pause' : 'Train'}
                </Button>
                <Button size='sm' variant='outline' onClick={reset}>
                  Reset
                </Button>
              </div>

              {currentMSE < 0.005 && step > 0 && (
                <div className='rounded-md border border-green-500/30 bg-green-500/10 p-3'>
                  <p className='text-sm font-medium text-green-600 dark:text-green-400'>
                    Converged in {step} steps — MSE ≈ {currentMSE.toFixed(5)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
