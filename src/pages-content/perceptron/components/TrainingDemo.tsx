'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trainingDemoContent } from '@/pages-content/perceptron/content/perceptron-content';

const LEARNING_RATE = 0.5;
const SCALE = 280;
const OFFSET = 10;
const GRID_N = 18;
const STEP_MS = 500;

// Start with anti-diagonal boundary (x+y=1) — ALL points wrong, clearly bad, boundary visible
const INIT_W1 = -2.0;
const INIT_W2 = -2.0;
const INIT_B = 2.0;

type Point = { x: number; y: number; label: number };

function toSVG(val: number) {
  return OFFSET + val * SCALE;
}

function predict(w1: number, w2: number, b: number, x: number, y: number) {
  return w1 * x + w2 * y + b >= 0 ? 1 : 0;
}

// Returns two SVG-space endpoints far outside the viewport; SVG clips to its own bounds.
function boundaryEndpoints(
  w1: number,
  w2: number,
  b: number
): [[number, number], [number, number]] | null {
  if (Math.abs(w1) < 1e-8 && Math.abs(w2) < 1e-8) return null;
  const FAR = 8;
  // Parameterise whichever axis avoids division by a near-zero denominator
  if (Math.abs(w2) >= Math.abs(w1)) {
    const yAt = (x: number) => -(w1 * x + b) / w2;
    return [
      [toSVG(-FAR), toSVG(1 - yAt(-FAR))],
      [toSVG(1 + FAR), toSVG(1 - yAt(1 + FAR))]
    ];
  } else {
    const xAt = (y: number) => -(w2 * y + b) / w1;
    return [
      [toSVG(xAt(-FAR)), toSVG(1 - -FAR)],
      [toSVG(xAt(1 + FAR)), toSVG(1 - (1 + FAR))]
    ];
  }
}

export function TrainingDemo() {
  const points: Point[] = [
    ...trainingDemoContent.class0Points.map(([x, y]) => ({ x, y, label: 0 })),
    ...trainingDemoContent.class1Points.map(([x, y]) => ({ x, y, label: 1 }))
  ];

  const [w1, setW1] = useState(INIT_W1);
  const [w2, setW2] = useState(INIT_W2);
  const [b, setB] = useState(INIT_B);
  const [stepCount, setStepCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const misclassified = points.filter(
    (p) => predict(w1, w2, b, p.x, p.y) !== p.label
  );

  const trainStep = useCallback(() => {
    const misses = points.filter(
      (p) => predict(w1, w2, b, p.x, p.y) !== p.label
    );
    if (misses.length === 0) {
      setIsRunning(false);
      return;
    }
    const p = misses[0];
    const err = p.label - predict(w1, w2, b, p.x, p.y);
    setW1((prev) => prev + LEARNING_RATE * err * p.x);
    setW2((prev) => prev + LEARNING_RATE * err * p.y);
    setB((prev) => prev + LEARNING_RATE * err);
    setStepCount((s) => s + 1);
    setLastUpdated(points.indexOf(p));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w1, w2, b]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setTimeout(trainStep, STEP_MS);
    return () => clearTimeout(timer);
  }, [isRunning, trainStep]);

  function reset() {
    setIsRunning(false);
    setW1(INIT_W1);
    setW2(INIT_W2);
    setB(INIT_B);
    setStepCount(0);
    setLastUpdated(null);
  }

  const boundary = boundaryEndpoints(w1, w2, b);

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
              <svg
                viewBox={`0 0 ${SCALE + OFFSET * 2} ${SCALE + OFFSET * 2}`}
                className='h-auto w-full'
                style={{ overflow: 'hidden' }}
              >
                {/* Background prediction grid */}
                {Array.from({ length: GRID_N }, (_, i) =>
                  Array.from({ length: GRID_N }, (_, j) => {
                    const fx = (i + 0.5) / GRID_N;
                    const fy = (j + 0.5) / GRID_N;
                    const pred = predict(w1, w2, b, fx, fy);
                    const sx = OFFSET + (i / GRID_N) * SCALE;
                    const sy = OFFSET + (1 - (j + 1) / GRID_N) * SCALE;
                    const cw = SCALE / GRID_N;
                    const ch = SCALE / GRID_N;
                    return (
                      <rect
                        key={`${i}-${j}`}
                        x={sx}
                        y={sy}
                        width={cw}
                        height={ch}
                        style={{
                          fill: pred === 1 ? 'var(--chart-2)' : 'var(--chart-1)'
                        }}
                        opacity={0.13}
                      />
                    );
                  })
                )}

                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                  <g key={v}>
                    <line
                      x1={OFFSET}
                      y1={toSVG(v)}
                      x2={SCALE + OFFSET}
                      y2={toSVG(v)}
                      stroke='currentColor'
                      strokeOpacity={0.08}
                      strokeWidth={1}
                    />
                    <line
                      x1={toSVG(v)}
                      y1={OFFSET}
                      x2={toSVG(v)}
                      y2={SCALE + OFFSET}
                      stroke='currentColor'
                      strokeOpacity={0.08}
                      strokeWidth={1}
                    />
                  </g>
                ))}

                {/* Decision boundary — endpoints already in SVG space, clipped by viewport */}
                {boundary && (
                  <line
                    x1={boundary[0][0]}
                    y1={boundary[0][1]}
                    x2={boundary[1][0]}
                    y2={boundary[1][1]}
                    style={{ stroke: 'var(--foreground)' }}
                    strokeWidth={2}
                    strokeDasharray='6 3'
                    opacity={0.7}
                  />
                )}

                {/* Data points */}
                {points.map((p, i) => {
                  const wrong = predict(w1, w2, b, p.x, p.y) !== p.label;
                  const isLast = lastUpdated === i;
                  return (
                    <circle
                      key={i}
                      cx={toSVG(p.x)}
                      cy={toSVG(1 - p.y)}
                      r={isLast ? 9 : wrong ? 7 : 6}
                      style={{
                        fill:
                          p.label === 1 ? 'var(--chart-2)' : 'var(--chart-1)',
                        stroke: wrong ? 'var(--destructive)' : 'transparent'
                      }}
                      strokeWidth={2.5}
                      opacity={wrong ? 1 : 0.75}
                    />
                  );
                })}
              </svg>

              <div className='mt-2 flex flex-wrap gap-4 text-xs'>
                <div className='flex items-center gap-1'>
                  <div className='bg-chart-1 h-3 w-3 rounded-full' />
                  <span className='text-muted-foreground'>Class 0</span>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='bg-chart-2 h-3 w-3 rounded-full' />
                  <span className='text-muted-foreground'>Class 1</span>
                </div>
                <div className='flex items-center gap-1'>
                  <div className='border-destructive h-3 w-3 rounded-full border-2' />
                  <span className='text-muted-foreground'>Misclassified</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg width='20' height='12'>
                    <line
                      x1='0'
                      y1='6'
                      x2='20'
                      y2='6'
                      style={{ stroke: 'var(--foreground)' }}
                      strokeWidth='2'
                      strokeDasharray='4 2'
                      opacity={0.7}
                    />
                  </svg>
                  <span className='text-muted-foreground'>
                    Decision boundary
                  </span>
                </div>
              </div>
            </div>

            {/* Controls + stats */}
            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-3'>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div className='text-primary text-2xl font-bold'>
                    {stepCount}
                  </div>
                  <div className='text-muted-foreground text-xs'>Steps</div>
                </div>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div
                    className={`text-2xl font-bold ${misclassified.length === 0 ? 'text-green-500' : 'text-destructive'}`}
                  >
                    {misclassified.length}
                  </div>
                  <div className='text-muted-foreground text-xs'>Errors</div>
                </div>
                <div className='bg-muted rounded-md p-3 text-center'>
                  <div className='text-chart-2 text-2xl font-bold'>
                    {Math.round(
                      ((points.length - misclassified.length) / points.length) *
                        100
                    )}
                    %
                  </div>
                  <div className='text-muted-foreground text-xs'>Accuracy</div>
                </div>
              </div>

              <div className='bg-muted rounded-md p-4'>
                <h4 className='mb-2 text-sm font-medium'>Current Weights</h4>
                <div className='space-y-1 font-mono text-sm'>
                  <div>
                    w₁ = <span className='text-primary'>{w1.toFixed(4)}</span>
                  </div>
                  <div>
                    w₂ = <span className='text-chart-2'>{w2.toFixed(4)}</span>
                  </div>
                  <div>
                    b = <span className='text-chart-3'>{b.toFixed(4)}</span>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  onClick={trainStep}
                  disabled={isRunning || misclassified.length === 0}
                >
                  Train Step
                </Button>
                <Button
                  size='sm'
                  variant={isRunning ? 'destructive' : 'default'}
                  onClick={() => setIsRunning((r) => !r)}
                  disabled={misclassified.length === 0}
                >
                  {isRunning ? 'Pause' : 'Auto Train'}
                </Button>
                <Button size='sm' variant='outline' onClick={reset}>
                  Reset
                </Button>
              </div>

              {misclassified.length === 0 && stepCount > 0 && (
                <div className='rounded-md border border-green-500/30 bg-green-500/10 p-3'>
                  <p className='text-sm font-medium text-green-600 dark:text-green-400'>
                    Converged in {stepCount} steps — all points correctly
                    classified!
                  </p>
                </div>
              )}

              <div className='bg-muted rounded-md p-3'>
                <div className='text-muted-foreground text-xs'>
                  <div className='mb-1 font-medium'>
                    Update rule (on each misclassified point):
                  </div>
                  <div className='font-mono'>wᵢ ← wᵢ + η(y−ŷ)xᵢ</div>
                  <div className='font-mono'>b ← b + η(y−ŷ)</div>
                  <div className='mt-1'>
                    η = {LEARNING_RATE} &nbsp;|&nbsp; step interval = {STEP_MS}
                    ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
