'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { sigmoidContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

const W = 320;
const H = 180;
const PAD = 30;

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}
function toSVGx(z: number) {
  return PAD + ((z + 6) / 12) * (W - PAD * 2);
}
function toSVGy(p: number) {
  return H - PAD - p * (H - PAD * 2);
}

export function Sigmoid() {
  const [z, setZ] = useState(0);
  const p = sigmoid(z);

  const points = Array.from({ length: 120 }, (_, i) => {
    const zv = -6 + (i / 119) * 12;
    return `${toSVGx(zv)},${toSVGy(sigmoid(zv))}`;
  }).join(' ');

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{sigmoidContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {sigmoidContent.description}
          </p>

          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-primary font-mono text-lg'>
              {sigmoidContent.formula}
            </code>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Interactive sigmoid plot */}
            <div className='border-border rounded-md border p-4'>
              <svg viewBox={`0 0 ${W} ${H}`} className='h-auto w-full'>
                {/* Grid */}
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
                {/* 0.5 reference */}
                <line
                  x1={PAD}
                  y1={toSVGy(0.5)}
                  x2={W - PAD}
                  y2={toSVGy(0.5)}
                  style={{ stroke: 'var(--chart-3)' }}
                  strokeWidth={1}
                  strokeDasharray='4 2'
                  opacity={0.5}
                />
                {/* z=0 reference */}
                <line
                  x1={toSVGx(0)}
                  y1={PAD}
                  x2={toSVGx(0)}
                  y2={H - PAD}
                  style={{ stroke: 'var(--chart-3)' }}
                  strokeWidth={1}
                  strokeDasharray='4 2'
                  opacity={0.5}
                />

                {/* Sigmoid curve */}
                <polyline
                  points={points}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2.5}
                />

                {/* Current z point */}
                <circle
                  cx={toSVGx(z)}
                  cy={toSVGy(p)}
                  r={6}
                  style={{ fill: 'var(--primary)' }}
                />
                {/* Dashed lines to axes */}
                <line
                  x1={toSVGx(z)}
                  y1={toSVGy(p)}
                  x2={toSVGx(z)}
                  y2={H - PAD}
                  style={{ stroke: 'var(--primary)' }}
                  strokeWidth={1}
                  strokeDasharray='3 2'
                  opacity={0.6}
                />
                <line
                  x1={toSVGx(z)}
                  y1={toSVGy(p)}
                  x2={PAD}
                  y2={toSVGy(p)}
                  style={{ stroke: 'var(--primary)' }}
                  strokeWidth={1}
                  strokeDasharray='3 2'
                  opacity={0.6}
                />

                {/* Labels */}
                <text
                  x={W / 2}
                  y={H - 4}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  z
                </text>
                <text
                  x={10}
                  y={H / 2}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  σ(z)
                </text>
                <text
                  x={toSVGx(0) + 3}
                  y={PAD + 8}
                  fontSize={8}
                  style={{ fill: 'var(--chart-3)' }}
                  opacity={0.7}
                >
                  z=0
                </text>
                <text
                  x={PAD + 3}
                  y={toSVGy(0.5) - 3}
                  fontSize={8}
                  style={{ fill: 'var(--chart-3)' }}
                  opacity={0.7}
                >
                  0.5
                </text>
              </svg>

              <div className='mt-3'>
                <Label className='mb-1 block text-sm'>
                  z ={' '}
                  <span className='text-primary font-mono'>{z.toFixed(1)}</span>
                </Label>
                <Slider
                  value={[z]}
                  onValueChange={(v) => setZ(v[0])}
                  min={-6}
                  max={6}
                  step={0.1}
                />
              </div>
            </div>

            <div className='space-y-4'>
              {/* Output display */}
              <div
                className={`rounded-md border p-4 text-center ${p > 0.5 ? 'bg-chart-2/10 border-chart-2/30' : 'bg-chart-1/10 border-chart-1/30'}`}
              >
                <div className='text-muted-foreground mb-1 text-xs'>
                  σ({z.toFixed(1)}) =
                </div>
                <div
                  className={`font-mono text-4xl font-bold ${p > 0.5 ? 'text-chart-2' : 'text-chart-1'}`}
                >
                  {p.toFixed(4)}
                </div>
                <div
                  className={`mt-1 text-sm font-medium ${p > 0.5 ? 'text-chart-2' : 'text-chart-1'}`}
                >
                  {p >= 0.5 ? 'Predict class 1' : 'Predict class 0'}
                </div>
              </div>

              {/* Key values table */}
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-border border-b'>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      z
                    </th>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      σ(z)
                    </th>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sigmoidContent.properties.map((row, i) => (
                    <tr key={i} className='border-border border-b'>
                      <td className='py-2 font-mono'>{row.z}</td>
                      <td className='py-2 font-mono font-bold'>{row.output}</td>
                      <td className='text-muted-foreground py-2 text-xs'>
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='bg-muted rounded-md p-3'>
                <div className='text-muted-foreground mb-1 text-xs font-medium uppercase'>
                  Derivative
                </div>
                <code className='text-chart-2 font-mono text-sm'>
                  {sigmoidContent.derivative}
                </code>
              </div>
            </div>
          </div>

          <div className='mt-6 grid gap-2 sm:grid-cols-2'>
            {sigmoidContent.whySigmoid.map((reason, i) => (
              <div key={i} className='flex items-start gap-2 text-sm'>
                <span className='text-primary mt-0.5'>✓</span>
                <span className='text-muted-foreground'>{reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
