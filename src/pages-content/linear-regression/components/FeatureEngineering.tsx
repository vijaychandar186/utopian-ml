'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { featureEngineeringContent } from '@/pages-content/linear-regression/content/linear-regression-content';

const RAW = [0.5, 1.2, 2.1, 3.8, 7.5, 12, 25, 60, 150];

function standardize(arr: number[]) {
  const mu = arr.reduce((s, v) => s + v, 0) / arr.length;
  const sigma = Math.sqrt(
    arr.reduce((s, v) => s + (v - mu) ** 2, 0) / arr.length
  );
  return arr.map((v) => (v - mu) / sigma);
}
function minmax(arr: number[]) {
  const lo = Math.min(...arr),
    hi = Math.max(...arr);
  return arr.map((v) => (v - lo) / (hi - lo));
}

export function FeatureEngineering() {
  const [active, setActive] = useState(0);
  const tech = featureEngineeringContent.techniques[active];

  const rawScaled = minmax(RAW);
  const stdScaled = standardize(RAW);
  const mmScaled = minmax(RAW);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {featureEngineeringContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {featureEngineeringContent.description}
          </p>

          {/* Tab selector */}
          <div className='mb-4 flex flex-wrap gap-2'>
            {featureEngineeringContent.techniques.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${active === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Active technique */}
          <div
            className={`bg-muted mb-6 rounded-md border-l-[3px] p-4 border-chart-${tech.chartColor}`}
          >
            <h4 className={`text-chart-${tech.chartColor} mb-2 font-semibold`}>
              {tech.name}
            </h4>
            <p className='text-muted-foreground mb-4 text-sm'>{tech.why}</p>
            <div className='grid gap-3 sm:grid-cols-3'>
              {tech.methods.map((m, i) => (
                <div key={i} className='bg-background rounded-md p-3'>
                  <code className='text-foreground mb-1 block font-mono text-xs font-bold'>
                    {m.name}
                  </code>
                  <code className='text-primary mb-1 block font-mono text-xs'>
                    {m.formula}
                  </code>
                  <p className='text-muted-foreground text-xs'>{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scaling visualization */}
          {active === 0 && (
            <div className='border-border rounded-md border p-4'>
              <h4 className='mb-3 text-sm font-medium'>
                Effect of Scaling (right-skewed feature)
              </h4>
              <div className='space-y-3'>
                {[
                  {
                    label: 'Raw (e.g. income in $1000s)',
                    vals: rawScaled,
                    color: 'var(--chart-1)',
                    note: 'Huge range — gradient updates unbalanced'
                  },
                  {
                    label: 'Standardized (z-score)',
                    vals: stdScaled,
                    color: 'var(--chart-2)',
                    note: 'Mean 0, std 1 — balanced gradients'
                  },
                  {
                    label: 'Min-Max [0,1]',
                    vals: mmScaled,
                    color: 'var(--chart-3)',
                    note: 'Bounded range — good for bounded outputs'
                  }
                ].map((row, i) => (
                  <div key={i}>
                    <div className='text-muted-foreground mb-1 text-xs'>
                      {row.label}
                    </div>
                    <div className='bg-muted flex h-8 items-center gap-1 overflow-hidden rounded px-2'>
                      {row.vals.map((v, j) => (
                        <div
                          key={j}
                          className='w-4 shrink-0 rounded-sm'
                          style={{
                            height: `${Math.max(4, v * 28)}px`,
                            backgroundColor: row.color,
                            opacity: 0.8
                          }}
                        />
                      ))}
                    </div>
                    <p className='text-muted-foreground mt-0.5 text-xs'>
                      {row.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Polynomial feature viz */}
          {active === 1 &&
            (() => {
              const SVG_PW = 300,
                SVG_PH = 120,
                PPAD = 25;
              const xs = Array.from({ length: 60 }, (_, i) => i / 59);
              function toX(x: number) {
                return PPAD + x * (SVG_PW - PPAD * 2);
              }
              function toY(y: number, lo: number, hi: number) {
                return (
                  SVG_PH - PPAD - ((y - lo) / (hi - lo)) * (SVG_PH - PPAD * 2)
                );
              }
              const linPts = xs.map(
                (x) => [x, 0.3 + 0.7 * x] as [number, number]
              );
              const polyPts = xs.map(
                (x) =>
                  [x, 0.1 + 2.5 * x - 2.5 * x * x + 1.2 * x * x * x] as [
                    number,
                    number
                  ]
              );
              const linPath = linPts
                .map(
                  ([x, y], i) =>
                    `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y, 0, 1).toFixed(1)}`
                )
                .join(' ');
              const polyPath = polyPts
                .map(
                  ([x, y], i) =>
                    `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(Math.max(-0.1, Math.min(1.1, y)), 0, 1).toFixed(1)}`
                )
                .join(' ');
              return (
                <div className='border-border rounded-md border p-4'>
                  <h4 className='mb-2 text-sm font-medium'>
                    Linear vs Polynomial fit
                  </h4>
                  <svg
                    viewBox={`0 0 ${SVG_PW} ${SVG_PH}`}
                    className='w-full max-w-sm'
                  >
                    <line
                      x1={PPAD}
                      y1={SVG_PH - PPAD}
                      x2={SVG_PW - PPAD}
                      y2={SVG_PH - PPAD}
                      stroke='currentColor'
                      strokeOpacity={0.2}
                    />
                    <path
                      d={linPath}
                      fill='none'
                      style={{ stroke: 'var(--chart-3)' }}
                      strokeWidth={1.5}
                      strokeDasharray='4 2'
                    />
                    <path
                      d={polyPath}
                      fill='none'
                      style={{ stroke: 'var(--chart-1)' }}
                      strokeWidth={2}
                    />
                  </svg>
                  <div className='mt-1 flex gap-4 text-xs'>
                    <div className='flex items-center gap-1'>
                      <div
                        className='bg-chart-3 h-0.5 w-6'
                        style={{ borderStyle: 'dashed' }}
                      />
                      <span className='text-muted-foreground'>
                        Linear (underfit)
                      </span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className='bg-chart-1 h-0.5 w-6' />
                      <span className='text-muted-foreground'>
                        Cubic (captures curve)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

          <div className='border-chart-3 bg-chart-3/5 mt-4 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-3 mb-1 font-semibold'>Leakage Warning</h4>
            <p className='text-muted-foreground text-sm'>
              {featureEngineeringContent.scalingNote}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
