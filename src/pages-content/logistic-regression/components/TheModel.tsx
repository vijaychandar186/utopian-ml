'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { modelContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

// Same points as training demo for consistency
const C0: [number, number][] = [
  [0.15, 0.7],
  [0.2, 0.85],
  [0.1, 0.6],
  [0.25, 0.75],
  [0.3, 0.9],
  [0.05, 0.8]
];
const C1: [number, number][] = [
  [0.75, 0.2],
  [0.8, 0.35],
  [0.7, 0.15],
  [0.85, 0.3],
  [0.9, 0.1],
  [0.65, 0.25]
];
const ALL = [
  ...C0.map(([x, y]) => ({ x, y, label: 0 })),
  ...C1.map(([x, y]) => ({ x, y, label: 1 }))
];

const SZ = 260,
  OFF = 20;
function toSVGx(v: number) {
  return OFF + v * SZ;
}
function toSVGy(v: number) {
  return OFF + SZ - v * SZ;
}
function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

function boundaryPts(
  w1: number,
  w2: number,
  b: number
): [[number, number], [number, number]] | null {
  if (Math.abs(w2) < 1e-6) {
    if (Math.abs(w1) < 1e-6) return null;
    const x = -b / w1;
    return [
      [x, 0],
      [x, 1]
    ];
  }
  const y0 = -(w1 * 0 + b) / w2;
  const y1 = -(w1 * 1 + b) / w2;
  return [
    [0, y0],
    [1, y1]
  ];
}

export function TheModel() {
  const [w1, setW1] = useState(modelContent.defaultWeights[0]);
  const [w2, setW2] = useState(modelContent.defaultWeights[1]);
  const [b, setB] = useState(modelContent.defaultBias);

  const bce =
    ALL.reduce((s, p) => {
      const prob = sigmoid(w1 * p.x + w2 * p.y + b);
      return (
        s -
        (p.label * Math.log(Math.max(prob, 1e-9)) +
          (1 - p.label) * Math.log(Math.max(1 - prob, 1e-9)))
      );
    }, 0) / ALL.length;

  const accuracy =
    ALL.filter((p) => {
      const pred = sigmoid(w1 * p.x + w2 * p.y + b) >= 0.5 ? 1 : 0;
      return pred === p.label;
    }).length / ALL.length;

  const bp = boundaryPts(w1, w2, b);

  // 20x20 background grid showing predicted class
  const GRID = 20;
  const bgCells = Array.from({ length: GRID }, (_, row) =>
    Array.from({ length: GRID }, (_, col) => {
      const gx = (col + 0.5) / GRID;
      const gy = (row + 0.5) / GRID;
      const p = sigmoid(w1 * gx + w2 * gy + b);
      return { gx, gy, p };
    })
  ).flat();

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{modelContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {modelContent.description}
          </p>

          {/* Pipeline */}
          <div className='border-border mb-6 overflow-x-auto rounded-md border p-6'>
            <div className='flex min-w-max items-center justify-center gap-3'>
              <div className='bg-secondary border-border rounded border px-4 py-2 text-center'>
                <div className='font-mono text-sm font-bold'>x</div>
                <div className='text-muted-foreground text-xs'>input</div>
              </div>
              <span className='text-muted-foreground'>→</span>
              <div className='border-chart-1 bg-chart-1/10 rounded border px-4 py-3 text-center'>
                <div className='text-chart-1 font-mono text-sm font-bold'>
                  z = wᵀx + b
                </div>
                <div className='text-muted-foreground text-xs'>
                  linear score
                </div>
              </div>
              <span className='text-muted-foreground'>→</span>
              <div className='border-chart-2 bg-chart-2/10 rounded border px-4 py-3 text-center'>
                <div className='text-chart-2 font-mono text-sm font-bold'>
                  p = σ(z)
                </div>
                <div className='text-muted-foreground text-xs'>probability</div>
              </div>
              <span className='text-muted-foreground'>→</span>
              <div className='border-primary bg-primary/10 rounded border px-4 py-3 text-center'>
                <div className='text-primary font-mono text-sm font-bold'>
                  ŷ = 1 if p ≥ 0.5
                </div>
                <div className='text-muted-foreground text-xs'>prediction</div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className='mb-6 space-y-2'>
            {modelContent.steps.map((s, i) => (
              <div key={i} className='flex items-center gap-4'>
                <span
                  className={`text-chart-${i + 1} w-28 shrink-0 text-xs font-medium`}
                >
                  {s.label}
                </span>
                <code
                  className={`bg-muted text-chart-${i + 1} rounded px-3 py-1.5 font-mono text-sm`}
                >
                  {s.formula}
                </code>
              </div>
            ))}
          </div>

          {/* Interactive 2D scatter */}
          <div className='border-border rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Interactive Decision Boundary</h4>
            <div className='grid gap-6 lg:grid-cols-2'>
              <div>
                <svg
                  viewBox={`0 0 ${SZ + OFF * 2} ${SZ + OFF * 2}`}
                  className='h-auto w-full'
                >
                  {/* Background: predicted class regions */}
                  {bgCells.map(({ gx, gy, p }, i) => (
                    <rect
                      key={i}
                      x={toSVGx(gx - 0.5 / GRID)}
                      y={toSVGy(gy + 0.5 / GRID)}
                      width={SZ / GRID}
                      height={SZ / GRID}
                      style={{
                        fill: p >= 0.5 ? 'var(--chart-2)' : 'var(--chart-1)'
                      }}
                      opacity={0.06 + Math.abs(p - 0.5) * 0.1}
                    />
                  ))}

                  {/* Decision boundary */}
                  {bp && (
                    <line
                      x1={toSVGx(bp[0][0])}
                      y1={toSVGy(bp[0][1])}
                      x2={toSVGx(bp[1][0])}
                      y2={toSVGy(bp[1][1])}
                      style={{ stroke: 'var(--foreground)' }}
                      strokeWidth={2}
                      strokeDasharray='6 3'
                      opacity={0.6}
                    />
                  )}

                  {/* Data points */}
                  {ALL.map((p, i) => {
                    const pred =
                      sigmoid(w1 * p.x + w2 * p.y + b) >= 0.5 ? 1 : 0;
                    const wrong = pred !== p.label;
                    return (
                      <circle
                        key={i}
                        cx={toSVGx(p.x)}
                        cy={toSVGy(p.y)}
                        r={wrong ? 7 : 5.5}
                        style={{
                          fill:
                            p.label === 1 ? 'var(--chart-2)' : 'var(--chart-1)'
                        }}
                        stroke={wrong ? 'var(--destructive)' : 'transparent'}
                        strokeWidth={2}
                        opacity={0.85}
                      />
                    );
                  })}
                </svg>
                <div className='mt-1 flex gap-4 text-xs'>
                  <div className='flex items-center gap-1.5'>
                    <div className='bg-chart-1 h-3 w-3 rounded-full' />
                    <span className='text-muted-foreground'>Class 0</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <div className='bg-chart-2 h-3 w-3 rounded-full' />
                    <span className='text-muted-foreground'>Class 1</span>
                  </div>
                  <div className='text-muted-foreground'>
                    Red ring = misclassified
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {[
                  { label: 'w₁', value: w1, set: setW1, color: 'chart-1' },
                  { label: 'w₂', value: w2, set: setW2, color: 'chart-2' },
                  { label: 'b', value: b, set: setB, color: 'chart-3' }
                ].map((item) => (
                  <div key={item.label}>
                    <Label className='mb-1 block text-sm'>
                      {item.label} ={' '}
                      <span className={`text-${item.color} font-mono`}>
                        {item.value.toFixed(2)}
                      </span>
                    </Label>
                    <Slider
                      value={[item.value]}
                      onValueChange={(v) => item.set(v[0])}
                      min={-3}
                      max={3}
                      step={0.05}
                    />
                  </div>
                ))}

                <div className='grid grid-cols-2 gap-2'>
                  <div className='bg-muted rounded-md p-3 text-center'>
                    <div
                      className={`font-mono text-xl font-bold ${bce < 0.15 ? 'text-green-500' : 'text-chart-3'}`}
                    >
                      {bce.toFixed(3)}
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      BCE Loss
                    </div>
                  </div>
                  <div className='bg-muted rounded-md p-3 text-center'>
                    <div
                      className={`font-mono text-xl font-bold ${accuracy === 1 ? 'text-green-500' : 'text-chart-2'}`}
                    >
                      {Math.round(accuracy * 100)}%
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      Accuracy
                    </div>
                  </div>
                </div>

                <div className='bg-muted rounded-md p-3'>
                  <p className='text-muted-foreground text-xs'>
                    {modelContent.decisionBoundary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
