'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { modelContent } from '@/pages-content/linear-regression/content/linear-regression-content';

const POINTS: [number, number][] = [
  [0.1, 0.25],
  [0.2, 0.45],
  [0.3, 0.55],
  [0.4, 0.7],
  [0.5, 0.82],
  [0.6, 0.95],
  [0.7, 1.05],
  [0.8, 1.28]
];

const W = 300;
const H = 220;
const PAD = 30;

function toSVGx(x: number) {
  return PAD + x * (W - PAD * 2);
}
function toSVGy(y: number) {
  return H - PAD - (y / 1.5) * (H - PAD * 2);
}

export function TheModel() {
  const [w, setW] = useState(modelContent.defaultWeight);
  const [b, setB] = useState(modelContent.defaultBias);

  const x0 = 0;
  const x1 = 1;
  const y0 = w * x0 + b;
  const y1 = w * x1 + b;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{modelContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {modelContent.description}
          </p>

          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-primary font-mono text-lg'>
              {modelContent.singleFeature.formula}
            </code>
          </div>

          {/* Term definitions */}
          <div className='mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            {modelContent.singleFeature.terms.map((t, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
              >
                <code
                  className={`text-chart-${i + 1} mb-1 block font-mono font-bold`}
                >
                  {t.name}
                </code>
                <p className='text-muted-foreground text-xs'>{t.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive line */}
          <div className='grid gap-6 lg:grid-cols-2'>
            <div className='border-border rounded-md border p-4'>
              <svg viewBox={`0 0 ${W} ${H}`} className='h-auto w-full'>
                {/* Axes */}
                <line
                  x1={PAD}
                  y1={H - PAD}
                  x2={W - PAD}
                  y2={H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.3}
                  className='text-foreground'
                />
                <line
                  x1={PAD}
                  y1={PAD}
                  x2={PAD}
                  y2={H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.3}
                  className='text-foreground'
                />

                {/* Grid */}
                {[0.25, 0.5, 0.75].map((v) => (
                  <g key={v}>
                    <line
                      x1={toSVGx(v)}
                      y1={PAD}
                      x2={toSVGx(v)}
                      y2={H - PAD}
                      stroke='currentColor'
                      strokeOpacity={0.08}
                      className='text-foreground'
                    />
                    <line
                      x1={PAD}
                      y1={toSVGy(v * 1.5)}
                      x2={W - PAD}
                      y2={toSVGy(v * 1.5)}
                      stroke='currentColor'
                      strokeOpacity={0.08}
                      className='text-foreground'
                    />
                  </g>
                ))}

                {/* Regression line */}
                <line
                  x1={toSVGx(x0)}
                  y1={toSVGy(y0)}
                  x2={toSVGx(x1)}
                  y2={toSVGy(y1)}
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2.5}
                />

                {/* Residual lines */}
                {POINTS.map(([x, y], i) => {
                  const yhat = w * x + b;
                  return (
                    <line
                      key={i}
                      x1={toSVGx(x)}
                      y1={toSVGy(y)}
                      x2={toSVGx(x)}
                      y2={toSVGy(yhat)}
                      style={{ stroke: 'var(--destructive)' }}
                      strokeWidth={1}
                      strokeDasharray='2 2'
                      opacity={0.65}
                    />
                  );
                })}

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

                {/* Labels */}
                <text
                  x={W / 2}
                  y={H - 4}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  x
                </text>
                <text
                  x={8}
                  y={H / 2}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  ŷ
                </text>
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
                  <span className='text-muted-foreground'>ŷ = wx + b</span>
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
                  <span className='text-muted-foreground'>
                    Residuals (yᵢ − ŷᵢ)
                  </span>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <Label className='mb-1 block text-sm'>
                  Slope w ={' '}
                  <span className='text-primary font-mono'>{w.toFixed(2)}</span>
                </Label>
                <Slider
                  value={[w]}
                  onValueChange={(v) => setW(v[0])}
                  min={-1}
                  max={3}
                  step={0.01}
                />
              </div>
              <div>
                <Label className='mb-1 block text-sm'>
                  Intercept b ={' '}
                  <span className='text-chart-2 font-mono'>{b.toFixed(2)}</span>
                </Label>
                <Slider
                  value={[b]}
                  onValueChange={(v) => setB(v[0])}
                  min={-1}
                  max={1}
                  step={0.01}
                />
              </div>

              <div className='bg-muted rounded-md p-4'>
                <div className='text-muted-foreground mb-2 text-xs font-medium uppercase'>
                  Current equation
                </div>
                <code className='text-foreground font-mono'>
                  ŷ = {w.toFixed(2)}x + ({b.toFixed(2)})
                </code>
              </div>

              <div className='bg-muted rounded-md p-4'>
                <div className='text-muted-foreground mb-2 text-xs font-medium uppercase'>
                  MSE
                </div>
                <code className='text-primary font-mono text-xl font-bold'>
                  {(
                    POINTS.reduce(
                      (s, [x, y]) => s + (y - (w * x + b)) ** 2,
                      0
                    ) / POINTS.length
                  ).toFixed(4)}
                </code>
              </div>
            </div>
          </div>

          {/* Multiple features */}
          <div className='border-chart-3 bg-chart-3/5 mt-6 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-3 mb-1 font-semibold'>
              Multiple Features
            </h4>
            <code className='text-foreground font-mono text-sm'>
              {modelContent.multipleFeatures.formula}
            </code>
            <p className='text-muted-foreground mt-2 text-sm'>
              {modelContent.multipleFeatures.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
