'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { regularizationContent } from '@/pages-content/linear-regression/content/linear-regression-content';

const POINTS: [number, number][] = [
  [0.1, 0.22],
  [0.15, 0.48],
  [0.25, 0.52],
  [0.35, 0.68],
  [0.4, 0.75],
  [0.5, 0.85],
  [0.55, 0.78],
  [0.65, 1.02],
  [0.7, 1.08],
  [0.75, 0.95],
  [0.8, 1.22],
  [0.9, 1.15]
];

const W = 300,
  H = 200,
  PAD = 35;

function toSVGx(x: number) {
  return PAD + x * (W - PAD * 2);
}
function toSVGy(y: number) {
  return H - PAD - (y / 1.5) * (H - PAD * 2);
}

function ridgeSolution(pts: [number, number][], lambda: number) {
  const n = pts.length;
  let sx = 0,
    sy = 0,
    sxx = 0,
    sxy = 0;
  for (const [x, y] of pts) {
    sx += x;
    sy += y;
    sxx += x * x;
    sxy += x * y;
  }
  const A00 = sxx + lambda,
    A01 = sx,
    A10 = sx,
    A11 = n + lambda;
  const det = A00 * A11 - A01 * A10;
  const w = (A11 * sxy - A01 * sy) / det;
  const b = (A00 * sy - A10 * sxy) / det;
  return { w, b };
}

export function Regularization() {
  const [lambda, setLambda] = useState(0);

  const { w, b } = ridgeSolution(POINTS, lambda);
  const ols = ridgeSolution(POINTS, 0);
  const mse =
    POINTS.reduce((s, [x, y]) => s + (y - (w * x + b)) ** 2, 0) / POINTS.length;
  const ridgePenalty = lambda * w * w;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {regularizationContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {regularizationContent.description}
          </p>

          {/* Variant cards */}
          <div className='mb-6 grid gap-4 md:grid-cols-3'>
            {regularizationContent.variants.map((v, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${v.chartColor}`}
              >
                <div className='mb-2 flex items-center gap-2'>
                  <h4 className={`text-chart-${v.chartColor} font-semibold`}>
                    {v.name}
                  </h4>
                  <span
                    className={`rounded bg-chart-${v.chartColor}/10 px-1.5 py-0.5 font-mono text-xs text-chart-${v.chartColor}`}
                  >
                    {v.badge}
                  </span>
                </div>
                <code className='text-foreground mb-2 block font-mono text-xs'>
                  {v.formula}
                </code>
                <p className='text-muted-foreground mb-1 text-xs'>
                  <span className='font-medium'>Effect: </span>
                  {v.effect}
                </p>
                <p className='text-muted-foreground text-xs'>
                  <span className='font-medium'>Bayesian: </span>
                  {v.prior}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Ridge demo */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>
              Ridge Regularization — Interactive
            </h4>
            <div className='mb-3'>
              <Label className='mb-1 block text-sm'>
                λ ={' '}
                <span className='text-chart-1 font-mono'>
                  {lambda.toFixed(2)}
                </span>
                {lambda === 0 && (
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ← OLS (no penalty)
                  </span>
                )}
                {lambda > 2.5 && (
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ← heavy shrinkage
                  </span>
                )}
              </Label>
              <Slider
                value={[lambda]}
                onValueChange={(v) => setLambda(v[0])}
                min={0}
                max={5}
                step={0.05}
              />
            </div>

            <div className='grid gap-4 lg:grid-cols-2'>
              <div>
                <svg viewBox={`0 0 ${W} ${H}`} className='w-full'>
                  <line
                    x1={PAD}
                    y1={H - PAD}
                    x2={W - PAD}
                    y2={H - PAD}
                    stroke='currentColor'
                    strokeOpacity={0.2}
                  />
                  <line
                    x1={PAD}
                    y1={PAD}
                    x2={PAD}
                    y2={H - PAD}
                    stroke='currentColor'
                    strokeOpacity={0.2}
                  />

                  {lambda > 0 && (
                    <line
                      x1={toSVGx(0)}
                      y1={toSVGy(ols.b)}
                      x2={toSVGx(1)}
                      y2={toSVGy(ols.w + ols.b)}
                      style={{ stroke: 'var(--muted-foreground)' }}
                      strokeWidth={1.5}
                      strokeDasharray='4 3'
                    />
                  )}

                  <line
                    x1={toSVGx(0)}
                    y1={toSVGy(b)}
                    x2={toSVGx(1)}
                    y2={toSVGy(w + b)}
                    style={{ stroke: 'var(--chart-2)' }}
                    strokeWidth={2.5}
                  />

                  {POINTS.map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={toSVGx(x)}
                      cy={toSVGy(y)}
                      r={3.5}
                      style={{ fill: 'var(--chart-1)' }}
                      opacity={0.8}
                    />
                  ))}

                  <text
                    x={W / 2}
                    y={H - 6}
                    textAnchor='middle'
                    fontSize={9}
                    fill='currentColor'
                    opacity={0.4}
                  >
                    x
                  </text>
                </svg>
                <p className='text-muted-foreground mt-1 text-center text-xs'>
                  {lambda > 0
                    ? 'Dashed = OLS. Orange = Ridge (shrunk).'
                    : 'OLS fit. Increase λ to see shrinkage.'}
                </p>
              </div>

              <div className='space-y-3'>
                <div className='grid grid-cols-2 gap-2'>
                  {[
                    {
                      label: 'w (slope)',
                      value: w.toFixed(3),
                      color: 'chart-1'
                    },
                    {
                      label: 'b (intercept)',
                      value: b.toFixed(3),
                      color: 'chart-2'
                    },
                    { label: 'MSE', value: mse.toFixed(4), color: 'chart-3' },
                    {
                      label: 'λ·w² penalty',
                      value: ridgePenalty.toFixed(4),
                      color: 'chart-4'
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='bg-muted rounded-md p-3 text-center'
                    >
                      <div
                        className={`text-${item.color} font-mono text-lg font-bold`}
                      >
                        {item.value}
                      </div>
                      <div className='text-muted-foreground text-xs'>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='bg-muted rounded-md p-3'>
                  <div className='text-muted-foreground mb-2 text-xs'>
                    Weight magnitude vs OLS
                  </div>
                  {[
                    {
                      label: 'OLS w',
                      value: ols.w,
                      color: 'var(--muted-foreground)',
                      opacity: '0.8'
                    },
                    {
                      label: 'Ridge w',
                      value: w,
                      color: 'var(--chart-2)',
                      opacity: '0.85'
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className='mb-1 flex items-center gap-2 text-xs'
                    >
                      <span
                        className='w-14 shrink-0'
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </span>
                      <div className='bg-muted-foreground/20 h-3 flex-1 overflow-hidden rounded-full'>
                        <div
                          className='h-full rounded-full transition-all duration-200'
                          style={{
                            width: `${Math.min(100, (Math.abs(item.value) / 2) * 100)}%`,
                            backgroundColor: item.color,
                            opacity: item.opacity
                          }}
                        />
                      </div>
                      <span
                        className='w-12 text-right font-mono'
                        style={{ color: item.color }}
                      >
                        {item.value.toFixed(3)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lambda guidance */}
          <div className='mb-6 grid gap-3 md:grid-cols-3'>
            {[
              {
                label: 'λ = 0',
                text: regularizationContent.lambda.zero,
                color: 1
              },
              {
                label: 'λ → ∞',
                text: regularizationContent.lambda.large,
                color: 2
              },
              {
                label: 'Tuning',
                text: regularizationContent.lambda.tuning,
                color: 3
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${item.color}`}
              >
                <code
                  className={`text-chart-${item.color} mb-1 block font-mono text-sm font-bold`}
                >
                  {item.label}
                </code>
                <p className='text-muted-foreground text-xs'>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Bias-variance */}
          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Bias–Variance Tradeoff
            </h4>
            <p className='text-muted-foreground text-sm'>
              {regularizationContent.biasVariance}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
