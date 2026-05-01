'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { logOddsContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

export function LogOdds() {
  const [z, setZ] = useState(0);
  const p = sigmoid(z);
  const odds = p / (1 - p);
  const logOdds = Math.log(odds);

  const W = 320,
    H = 160,
    PAD = 30;
  // Show log-odds as a linear function of z, and odds as exponential
  const zMin = -4,
    zMax = 4;

  function toSVGx(zv: number) {
    return PAD + ((zv - zMin) / (zMax - zMin)) * (W - PAD * 2);
  }
  function toSVGy(v: number, min: number, max: number) {
    const clamped = Math.max(min, Math.min(max, v));
    return H - PAD - ((clamped - min) / (max - min)) * (H - PAD * 2);
  }

  // sigmoid curve (p vs z)
  const sigPath = Array.from({ length: 100 }, (_, i) => {
    const zv = zMin + (i / 99) * (zMax - zMin);
    return `${i === 0 ? 'M' : 'L'} ${toSVGx(zv).toFixed(1)} ${toSVGy(sigmoid(zv), 0, 1).toFixed(1)}`;
  }).join(' ');

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{logOddsContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {logOddsContent.description}
          </p>

          <div className='mb-4 grid gap-3 md:grid-cols-2'>
            <div className='bg-muted border-chart-1 rounded-md border-l-[3px] p-4'>
              <code className='text-chart-1 mb-1 block font-mono font-bold'>
                {logOddsContent.odds.formula}
              </code>
              <p className='text-muted-foreground text-sm'>
                {logOddsContent.odds.description}
              </p>
            </div>
            <div className='bg-muted border-chart-2 rounded-md border-l-[3px] p-4'>
              <code className='text-chart-2 mb-1 block font-mono text-xs leading-relaxed font-bold break-all'>
                {logOddsContent.logOdds.formula}
              </code>
              <p className='text-muted-foreground text-sm'>
                {logOddsContent.logOdds.description}
              </p>
            </div>
          </div>

          {/* Interactive log-odds calculator */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Interactive: z ↔ p ↔ odds</h4>
            <div className='mb-3'>
              <Label className='mb-1 block text-sm'>
                z (log-odds) ={' '}
                <span className='text-chart-1 font-mono'>{z.toFixed(2)}</span>
              </Label>
              <Slider
                value={[z]}
                onValueChange={(v) => setZ(v[0])}
                min={-5}
                max={5}
                step={0.1}
              />
            </div>

            <div className='mb-4 flex justify-center'>
              <svg viewBox={`0 0 ${W} ${H}`} className='w-full max-w-sm'>
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
                {/* z=0 line */}
                <line
                  x1={toSVGx(0)}
                  y1={PAD}
                  x2={toSVGx(0)}
                  y2={H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.1}
                  strokeDasharray='3 3'
                />
                {/* p=0.5 line */}
                <line
                  x1={PAD}
                  y1={toSVGy(0.5, 0, 1)}
                  x2={W - PAD}
                  y2={toSVGy(0.5, 0, 1)}
                  stroke='currentColor'
                  strokeOpacity={0.1}
                  strokeDasharray='3 3'
                />
                {/* Sigmoid curve */}
                <path
                  d={sigPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2}
                />
                {/* Current point */}
                <circle
                  cx={toSVGx(z)}
                  cy={toSVGy(p, 0, 1)}
                  r={5}
                  style={{ fill: 'var(--primary)' }}
                />
                <line
                  x1={toSVGx(z)}
                  y1={toSVGy(p, 0, 1)}
                  x2={toSVGx(z)}
                  y2={H - PAD}
                  style={{ stroke: 'var(--primary)' }}
                  strokeWidth={1}
                  strokeDasharray='2 2'
                  opacity={0.6}
                />
                <line
                  x1={toSVGx(z)}
                  y1={toSVGy(p, 0, 1)}
                  x2={PAD}
                  y2={toSVGy(p, 0, 1)}
                  style={{ stroke: 'var(--primary)' }}
                  strokeWidth={1}
                  strokeDasharray='2 2'
                  opacity={0.6}
                />
                <text
                  x={W / 2}
                  y={H - 4}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.4}
                >
                  z (log-odds)
                </text>
                <text
                  x={10}
                  y={H / 2}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.4}
                >
                  p
                </text>
              </svg>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              {[
                {
                  label: 'z (log-odds)',
                  value: z.toFixed(3),
                  color: 'chart-1'
                },
                { label: 'p = σ(z)', value: p.toFixed(4), color: 'chart-2' },
                {
                  label: 'odds = p/(1−p)',
                  value:
                    odds > 1000
                      ? '>1000'
                      : odds < 0.001
                        ? '<0.001'
                        : odds.toFixed(3),
                  color: 'chart-3'
                }
              ].map((item, i) => (
                <div key={i} className='bg-muted rounded-md p-3 text-center'>
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
          </div>

          {/* Odds table */}
          <div className='mb-6 overflow-x-auto'>
            <h4 className='mb-2 font-medium'>p → odds → log-odds</h4>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-border border-b'>
                  <th className='text-chart-2 pb-2 text-left font-medium'>p</th>
                  <th className='text-chart-3 pb-2 text-left font-medium'>
                    odds
                  </th>
                  <th className='text-chart-1 pb-2 text-left font-medium'>
                    log-odds (z)
                  </th>
                </tr>
              </thead>
              <tbody>
                {logOddsContent.oddsTable.map((row, i) => (
                  <tr key={i} className='border-border border-b'>
                    <td className='text-chart-2 py-1.5 font-mono'>{row.p}</td>
                    <td className='text-chart-3 py-1.5 font-mono'>
                      {row.odds}
                    </td>
                    <td className='text-chart-1 py-1.5 font-mono'>
                      {row.logOdds}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Weight interpretation */}
          <div className='mb-6 grid gap-3 sm:grid-cols-2'>
            {logOddsContent.interpretation.map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
              >
                <code
                  className={`text-chart-${i + 1} mb-0.5 block font-mono text-xs font-bold`}
                >
                  {item.name}
                </code>
                <p className='text-muted-foreground text-xs'>{item.meaning}</p>
              </div>
            ))}
          </div>

          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Why "Regression"?
            </h4>
            <p className='text-muted-foreground text-sm'>
              {logOddsContent.whyLinear}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
