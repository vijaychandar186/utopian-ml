'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { limitationsContent } from '@/pages-content/perceptron/content/perceptron-content';

const XOR_POINTS = [
  { x: 0.2, y: 0.2, label: 0 },
  { x: 0.8, y: 0.8, label: 0 },
  { x: 0.2, y: 0.8, label: 1 },
  { x: 0.8, y: 0.2, label: 1 }
];

const AND_POINTS = [
  { x: 0.2, y: 0.2, label: 0 },
  { x: 0.8, y: 0.2, label: 0 },
  { x: 0.2, y: 0.8, label: 0 },
  { x: 0.8, y: 0.8, label: 1 }
];

const OR_POINTS = [
  { x: 0.2, y: 0.2, label: 0 },
  { x: 0.8, y: 0.2, label: 1 },
  { x: 0.2, y: 0.8, label: 1 },
  { x: 0.8, y: 0.8, label: 1 }
];

const SCALE = 200;
const OFF = 20;

function toSVG(v: number) {
  return OFF + v * SCALE;
}

type Dataset = 'xor' | 'and' | 'or';

const DATASETS: Record<
  Dataset,
  { points: typeof XOR_POINTS; label: string; separable: boolean }
> = {
  xor: { points: XOR_POINTS, label: 'XOR', separable: false },
  and: { points: AND_POINTS, label: 'AND', separable: true },
  or: { points: OR_POINTS, label: 'OR', separable: true }
};

const BOUNDARIES: Record<
  Dataset,
  { x1: number; y1: number; x2: number; y2: number } | null
> = {
  xor: null,
  and: { x1: 0, y1: 0.55, x2: 1, y2: 0.55 },
  or: { x1: 0, y1: 0.1, x2: 0.9, y2: 1 }
};

export function Limitations() {
  const [dataset, setDataset] = useState<Dataset>('xor');
  const data = DATASETS[dataset];
  const boundary = BOUNDARIES[dataset];

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{limitationsContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {limitationsContent.description}
          </p>

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Interactive plot */}
            <div className='border-border rounded-md border p-4'>
              <div className='mb-3 flex gap-2'>
                {(['xor', 'and', 'or'] as Dataset[]).map((d) => (
                  <Button
                    key={d}
                    size='sm'
                    variant={dataset === d ? 'default' : 'outline'}
                    onClick={() => setDataset(d)}
                  >
                    {DATASETS[d].label}
                  </Button>
                ))}
              </div>

              <svg
                viewBox={`0 0 ${SCALE + OFF * 2} ${SCALE + OFF * 2}`}
                className='h-auto w-full'
              >
                {/* Background regions for XOR */}
                {dataset === 'xor' && (
                  <>
                    <rect
                      x={OFF}
                      y={OFF}
                      width={SCALE / 2}
                      height={SCALE / 2}
                      fill='hsl(var(--chart-2))'
                      opacity={0.06}
                    />
                    <rect
                      x={OFF + SCALE / 2}
                      y={OFF + SCALE / 2}
                      width={SCALE / 2}
                      height={SCALE / 2}
                      fill='hsl(var(--chart-2))'
                      opacity={0.06}
                    />
                    <rect
                      x={OFF + SCALE / 2}
                      y={OFF}
                      width={SCALE / 2}
                      height={SCALE / 2}
                      fill='hsl(var(--chart-1))'
                      opacity={0.06}
                    />
                    <rect
                      x={OFF}
                      y={OFF + SCALE / 2}
                      width={SCALE / 2}
                      height={SCALE / 2}
                      fill='hsl(var(--chart-1))'
                      opacity={0.06}
                    />
                  </>
                )}

                {/* Grid */}
                {[0, 0.5, 1].map((v) => (
                  <g key={v}>
                    <line
                      x1={OFF}
                      y1={toSVG(v)}
                      x2={SCALE + OFF}
                      y2={toSVG(v)}
                      stroke='currentColor'
                      strokeOpacity={0.1}
                      className='text-foreground'
                    />
                    <line
                      x1={toSVG(v)}
                      y1={OFF}
                      x2={toSVG(v)}
                      y2={SCALE + OFF}
                      stroke='currentColor'
                      strokeOpacity={0.1}
                      className='text-foreground'
                    />
                  </g>
                ))}

                {/* Decision boundary if separable */}
                {boundary && (
                  <line
                    x1={toSVG(boundary.x1)}
                    y1={toSVG(1 - boundary.y1)}
                    x2={toSVG(boundary.x2)}
                    y2={toSVG(1 - boundary.y2)}
                    stroke='hsl(var(--primary))'
                    strokeWidth={2}
                    strokeDasharray='6 3'
                    opacity={0.8}
                  />
                )}

                {/* "No line works" for XOR */}
                {dataset === 'xor' && (
                  <text
                    x={SCALE / 2 + OFF}
                    y={SCALE / 2 + OFF}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fontSize={11}
                    fill='hsl(var(--destructive))'
                    opacity={0.7}
                  >
                    no line separates these
                  </text>
                )}

                {/* Points */}
                {data.points.map((p, i) => (
                  <circle
                    key={i}
                    cx={toSVG(p.x)}
                    cy={toSVG(1 - p.y)}
                    r={10}
                    fill={
                      p.label === 1
                        ? 'hsl(var(--chart-2))'
                        : 'hsl(var(--chart-1))'
                    }
                    opacity={0.85}
                  />
                ))}

                {/* Point labels */}
                {data.points.map((p, i) => (
                  <text
                    key={i}
                    x={toSVG(p.x)}
                    y={toSVG(1 - p.y) + 1}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fontSize={10}
                    fill='white'
                    fontWeight='bold'
                  >
                    {p.label}
                  </text>
                ))}
              </svg>

              <div
                className={`mt-3 rounded-md p-2 text-center text-sm font-medium ${
                  data.separable
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {data.label}:{' '}
                {data.separable
                  ? 'Linearly separable ✓ — perceptron can learn this'
                  : 'NOT linearly separable ✗ — perceptron cannot learn this'}
              </div>
            </div>

            {/* Explanation */}
            <div className='space-y-4'>
              {/* XOR truth table */}
              <div>
                <h4 className='mb-2 font-medium'>XOR Truth Table</h4>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-border border-b'>
                      <th className='text-muted-foreground pb-2 text-left font-medium'>
                        x₁
                      </th>
                      <th className='text-muted-foreground pb-2 text-left font-medium'>
                        x₂
                      </th>
                      <th className='text-muted-foreground pb-2 text-left font-medium'>
                        XOR
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {limitationsContent.xorTable.map((row, i) => (
                      <tr key={i} className='border-border border-b'>
                        <td className='py-2 font-mono'>{row.x1}</td>
                        <td className='py-2 font-mono'>{row.x2}</td>
                        <td
                          className={`py-2 font-mono font-bold ${
                            row.output === 1 ? 'text-chart-2' : 'text-chart-1'
                          }`}
                        >
                          {row.output}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className='text-muted-foreground mt-2 text-xs'>
                  {limitationsContent.xorExplanation}
                </p>
              </div>

              {/* Minsky-Papert */}
              <div className='bg-muted border-destructive rounded-md border-l-4 p-4'>
                <p className='text-muted-foreground text-sm'>
                  {limitationsContent.minskyPapert}
                </p>
              </div>

              {/* Fix */}
              <div className='border-primary/30 bg-primary/5 rounded-md border p-4'>
                <p className='text-muted-foreground text-sm'>
                  <span className='text-foreground font-semibold'>
                    The fix:{' '}
                  </span>
                  {limitationsContent.fix}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
