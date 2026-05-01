'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { trainingDemoContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

const C0 = trainingDemoContent.class0Points;
const C1 = trainingDemoContent.class1Points;
const ALL = [
  ...C0.map(([x, y]) => ({ x, y, label: 0 })),
  ...C1.map(([x, y]) => ({ x, y, label: 1 }))
];
const SCALE = 280;
const OFF = 15;
const LR = 0.5;

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}
function toSVGx(v: number) {
  return OFF + v * SCALE;
}
function toSVGy(v: number) {
  return OFF + SCALE - v * SCALE;
}

function bce(w1: number, w2: number, b: number) {
  return (
    ALL.reduce((s, p) => {
      const prob = sigmoid(w1 * p.x + w2 * p.y + b);
      return (
        s -
        (p.label * Math.log(Math.max(prob, 1e-9)) +
          (1 - p.label) * Math.log(Math.max(1 - prob, 1e-9)))
      );
    }, 0) / ALL.length
  );
}

function grads(w1: number, w2: number, b: number) {
  let dw1 = 0,
    dw2 = 0,
    db = 0;
  for (const p of ALL) {
    const err = sigmoid(w1 * p.x + w2 * p.y + b) - p.label;
    dw1 += err * p.x;
    dw2 += err * p.y;
    db += err;
  }
  const n = ALL.length;
  return { dw1: dw1 / n, dw2: dw2 / n, db: db / n };
}

function boundaryY(w1: number, w2: number, b: number, x: number) {
  if (Math.abs(w2) < 1e-8) return null;
  return -(w1 * x + b) / w2;
}

export function TrainingDemo() {
  const [w1, setW1] = useState(-0.5);
  const [w2, setW2] = useState(0.5);
  const [b, setB] = useState(0.0);
  const [lr, setLr] = useState(LR);
  const [step, setStep] = useState(0);
  const [lossHistory, setLossHistory] = useState<number[]>([bce(-0.5, 0.5, 0)]);
  const [isRunning, setIsRunning] = useState(false);

  const ref = useRef({ w1, w2, b });
  ref.current = { w1, w2, b };

  const trainStep = useCallback(() => {
    const { w1: cw1, w2: cw2, b: cb } = ref.current;
    const { dw1, dw2, db } = grads(cw1, cw2, cb);
    const nw1 = cw1 - lr * dw1;
    const nw2 = cw2 - lr * dw2;
    const nb = cb - lr * db;
    setW1(nw1);
    setW2(nw2);
    setB(nb);
    setStep((s) => s + 1);
    setLossHistory((h) => [...h, bce(nw1, nw2, nb)].slice(-80));
  }, [lr]);

  useEffect(() => {
    if (!isRunning) return;
    const t = setTimeout(trainStep, 80);
    return () => clearTimeout(t);
  }, [isRunning, trainStep, w1, w2, b]);

  function reset() {
    setIsRunning(false);
    setW1(-0.5);
    setW2(0.5);
    setB(0);
    setStep(0);
    setLossHistory([bce(-0.5, 0.5, 0)]);
  }

  const currentLoss = bce(w1, w2, b);
  const maxLoss = Math.max(...lossHistory, 0.01);
  const accuracy =
    ALL.filter((p) => {
      const pred = sigmoid(w1 * p.x + w2 * p.y + b) >= 0.5 ? 1 : 0;
      return pred === p.label;
    }).length / ALL.length;

  const by0 = boundaryY(w1, w2, b, 0);
  const by1 = boundaryY(w1, w2, b, 1);

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
            <div className='border-border rounded-md border p-4'>
              <svg
                viewBox={`0 0 ${SCALE + OFF * 2} ${SCALE + OFF * 2}`}
                className='h-auto w-full'
              >
                {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                  <g key={v}>
                    <line
                      x1={OFF}
                      y1={toSVGy(v)}
                      x2={SCALE + OFF}
                      y2={toSVGy(v)}
                      stroke='currentColor'
                      strokeOpacity={0.07}
                      className='text-foreground'
                    />
                    <line
                      x1={toSVGx(v)}
                      y1={OFF}
                      x2={toSVGx(v)}
                      y2={SCALE + OFF}
                      stroke='currentColor'
                      strokeOpacity={0.07}
                      className='text-foreground'
                    />
                  </g>
                ))}

                {/* Decision boundary */}
                {by0 !== null && by1 !== null && (
                  <line
                    x1={toSVGx(0)}
                    y1={toSVGy(by0)}
                    x2={toSVGx(1)}
                    y2={toSVGy(by1)}
                    style={{ stroke: 'var(--primary)' }}
                    strokeWidth={2}
                    strokeDasharray='6 3'
                    opacity={0.8}
                  />
                )}

                {ALL.map((p, i) => {
                  const pred = sigmoid(w1 * p.x + w2 * p.y + b) >= 0.5 ? 1 : 0;
                  const wrong = pred !== p.label;
                  return (
                    <circle
                      key={i}
                      cx={toSVGx(p.x)}
                      cy={toSVGy(p.y)}
                      r={wrong ? 7 : 6}
                      style={{
                        fill:
                          p.label === 1 ? 'var(--chart-2)' : 'var(--chart-1)',
                        stroke: wrong ? 'var(--destructive)' : 'transparent'
                      }}
                      strokeWidth={2}
                      opacity={0.85}
                    />
                  );
                })}
              </svg>
              <div className='mt-2 flex gap-4 text-xs'>
                <div className='flex items-center gap-1'>
                  <div className='bg-chart-1 h-3 w-3 rounded-full' />
                  <span className='text-muted-foreground'>Class 0</span>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='bg-chart-2 h-3 w-3 rounded-full' />
                  <span className='text-muted-foreground'>Class 1</span>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div className='text-primary font-mono text-xl font-bold'>
                    {step}
                  </div>
                  <div className='text-muted-foreground text-xs'>Steps</div>
                </div>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div
                    className={`font-mono text-xl font-bold ${currentLoss < 0.1 ? 'text-green-500' : 'text-chart-3'}`}
                  >
                    {currentLoss.toFixed(3)}
                  </div>
                  <div className='text-muted-foreground text-xs'>BCE Loss</div>
                </div>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div
                    className={`font-mono text-xl font-bold ${accuracy === 1 ? 'text-green-500' : 'text-chart-2'}`}
                  >
                    {Math.round(accuracy * 100)}%
                  </div>
                  <div className='text-muted-foreground text-xs'>Accuracy</div>
                </div>
              </div>

              <div className='bg-muted rounded-md p-3'>
                <Label className='mb-1 block text-xs'>Loss Curve</Label>
                <div className='flex h-12 items-end gap-px'>
                  {lossHistory.map((l, i) => (
                    <div
                      key={i}
                      className='bg-primary flex-1'
                      style={{
                        height: `${Math.min(100, (l / maxLoss) * 100)}%`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className='bg-muted rounded-md p-3 font-mono text-sm'>
                <div>
                  w₁ = <span className='text-primary'>{w1.toFixed(3)}</span>
                </div>
                <div>
                  w₂ = <span className='text-chart-2'>{w2.toFixed(3)}</span>
                </div>
                <div>
                  b = <span className='text-chart-3'>{b.toFixed(3)}</span>
                </div>
              </div>

              <div>
                <Label className='mb-1 block text-sm'>
                  η ={' '}
                  <span className='text-chart-3 font-mono'>
                    {lr.toFixed(2)}
                  </span>
                </Label>
                <Slider
                  value={[lr]}
                  onValueChange={(v) => setLr(v[0])}
                  min={0.05}
                  max={2}
                  step={0.05}
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

              {accuracy === 1 && step > 0 && (
                <div className='rounded-md border border-green-500/30 bg-green-500/10 p-3'>
                  <p className='text-sm font-medium text-green-600 dark:text-green-400'>
                    100% accuracy in {step} steps!
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
