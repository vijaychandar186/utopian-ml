'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const W = 280,
  H = 220,
  PAD = 24;
const GRID_N = 20;

const DATA_POINTS: { x: number; y: number; cls: 0 | 1 }[] = [
  { x: 0.2, y: 0.7, cls: 0 },
  { x: 0.15, y: 0.55, cls: 0 },
  { x: 0.3, y: 0.8, cls: 0 },
  { x: 0.1, y: 0.65, cls: 0 },
  { x: 0.25, y: 0.6, cls: 0 },
  { x: 0.75, y: 0.3, cls: 1 },
  { x: 0.8, y: 0.2, cls: 1 },
  { x: 0.65, y: 0.4, cls: 1 },
  { x: 0.85, y: 0.35, cls: 1 },
  { x: 0.7, y: 0.15, cls: 1 }
];

function toSVGx(x: number) {
  return PAD + x * (W - 2 * PAD);
}
function toSVGy(y: number) {
  return H - PAD - y * (H - 2 * PAD);
}
function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

export function Geometry() {
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(-1.5);
  const [b, setB] = useState(0.0);

  const wNorm = Math.sqrt(w1 * w1 + w2 * w2);

  let boundaryLine: { x1: number; y1: number; x2: number; y2: number } | null =
    null;
  if (Math.abs(w2) > 0.01) {
    const sy1 = Math.max(PAD, Math.min(H - PAD, toSVGy(-(w1 * 0 + b) / w2)));
    const sy2 = Math.max(PAD, Math.min(H - PAD, toSVGy(-(w1 * 1 + b) / w2)));
    boundaryLine = { x1: toSVGx(0), y1: sy1, x2: toSVGx(1), y2: sy2 };
  }

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        Decision Boundary &amp; Geometry
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            The decision boundary is the set of points where z = wᵀx + b = 0 —
            exactly where the model is 50% confident. Since z is linear, the
            boundary is always a hyperplane: a line in 2D, a plane in 3D.
            Logistic regression is fundamentally a linear classifier.
          </p>

          {/* Key formulas */}
          <div className='mb-6 grid gap-3 md:grid-cols-3'>
            {[
              {
                label: 'Linear score',
                formula: 'z = wᵀx + b',
                note: 'Maps features to unbounded ℝ',
                color: 1
              },
              {
                label: 'Decision boundary',
                formula: 'wᵀx + b = 0',
                note: 'Hyperplane where p = 0.5',
                color: 2
              },
              {
                label: 'Signed distance',
                formula: 'd = z / ‖w‖',
                note: 'Distance to boundary',
                color: 3
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${item.color}`}
              >
                <p className='text-muted-foreground mb-1 text-xs'>
                  {item.label}
                </p>
                <code
                  className={`text-chart-${item.color} block font-mono text-sm font-bold`}
                >
                  {item.formula}
                </code>
                <p className='text-muted-foreground mt-1 text-xs'>
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive visualization */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Interactive Decision Boundary</h4>
            <div className='mb-3 grid gap-2 sm:grid-cols-3'>
              {[
                { label: 'w₁', val: w1, set: setW1, color: 1 },
                { label: 'w₂', val: w2, set: setW2, color: 2 },
                { label: 'b', val: b, set: setB, color: 3 }
              ].map((s) => (
                <div key={s.label}>
                  <Label className='mb-1 block text-sm'>
                    {s.label} ={' '}
                    <span className={`text-chart-${s.color} font-mono`}>
                      {s.val.toFixed(1)}
                    </span>
                  </Label>
                  <Slider
                    value={[s.val]}
                    onValueChange={(v) => s.set(v[0])}
                    min={-3}
                    max={3}
                    step={0.1}
                  />
                </div>
              ))}
            </div>

            <div className='flex justify-center'>
              <svg viewBox={`0 0 ${W} ${H}`} className='w-full max-w-sm'>
                {/* Background probability grid */}
                {Array.from({ length: GRID_N }, (_, i) =>
                  Array.from({ length: GRID_N }, (_, j) => {
                    const fx = (i + 0.5) / GRID_N;
                    const fy = (j + 0.5) / GRID_N;
                    const p = sigmoid(w1 * fx + w2 * fy + b);
                    const sx = PAD + (i / GRID_N) * (W - 2 * PAD);
                    const sy = H - PAD - ((j + 1) / GRID_N) * (H - 2 * PAD);
                    const cw = (W - 2 * PAD) / GRID_N;
                    const ch = (H - 2 * PAD) / GRID_N;
                    return (
                      <rect
                        key={`${i}-${j}`}
                        x={sx}
                        y={sy}
                        width={cw}
                        height={ch}
                        style={{
                          fill: p < 0.5 ? 'var(--chart-1)' : 'var(--chart-2)'
                        }}
                        opacity={0.05 + Math.abs(p - 0.5) * 0.2}
                      />
                    );
                  })
                )}

                {/* Decision boundary */}
                {boundaryLine && (
                  <line
                    x1={boundaryLine.x1}
                    y1={boundaryLine.y1}
                    x2={boundaryLine.x2}
                    y2={boundaryLine.y2}
                    style={{ stroke: 'var(--foreground)' }}
                    strokeWidth={2}
                    strokeDasharray='5 3'
                    opacity={0.7}
                  />
                )}

                {/* Data points */}
                {DATA_POINTS.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={toSVGx(pt.x)}
                    cy={toSVGy(pt.y)}
                    r={5}
                    style={{
                      fill: pt.cls === 0 ? 'var(--chart-1)' : 'var(--chart-2)',
                      stroke: 'var(--background)',
                      strokeWidth: 1
                    }}
                    opacity={0.85}
                  />
                ))}

                {/* Class labels */}
                <text
                  x={PAD + 8}
                  y={PAD + 14}
                  fontSize={9}
                  style={{ fill: 'var(--chart-1)' }}
                  opacity={0.8}
                >
                  class 0
                </text>
                <text
                  x={W - PAD - 8}
                  y={H - PAD - 10}
                  textAnchor='end'
                  fontSize={9}
                  style={{ fill: 'var(--chart-2)' }}
                  opacity={0.8}
                >
                  class 1
                </text>
              </svg>
            </div>
            <p className='text-muted-foreground mt-2 text-center text-xs'>
              ‖w‖ = {wNorm.toFixed(2)} — boundary normal direction is (w₁, w₂)
            </p>
          </div>

          {/* Score → confidence */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Score → Confidence</h4>
            <div className='space-y-2'>
              {[
                {
                  z: 'z ≫ 0',
                  note: 'Far from boundary on + side → p → 1 — confident class 1',
                  color: 2
                },
                {
                  z: 'z = 0',
                  note: 'On the boundary → p = 0.5 — maximum uncertainty',
                  color: 4
                },
                {
                  z: 'z ≪ 0',
                  note: 'Far from boundary on − side → p → 0 — confident class 0',
                  color: 1
                }
              ].map((row, i) => (
                <div
                  key={i}
                  className={`bg-muted flex items-center gap-3 rounded-md border-l-[3px] p-3 border-chart-${row.color}`}
                >
                  <code
                    className={`text-chart-${row.color} w-12 shrink-0 font-mono text-sm font-bold`}
                  >
                    {row.z}
                  </code>
                  <span className='text-muted-foreground text-xs'>
                    {row.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Linear Classifier Limit
            </h4>
            <p className='text-muted-foreground text-sm'>
              Logistic regression can only learn linearly separable patterns.
              For non-linear boundaries — XOR, concentric circles, complex
              shapes — you need polynomial feature engineering or a neural
              network with hidden layers that learns its own features.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
