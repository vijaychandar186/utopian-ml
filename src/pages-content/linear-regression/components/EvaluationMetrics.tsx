'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { evaluationContent } from '@/pages-content/linear-regression/content/linear-regression-content';

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
const W_OLS = 1.37,
  B_OLS = 0.14;

const SVG_W = 260,
  SVG_H = 180,
  PAD = 30;
function toSVGx(x: number) {
  return PAD + x * (SVG_W - PAD * 2);
}
function toSVGy(y: number) {
  return SVG_H - PAD - (y / 1.5) * (SVG_H - PAD * 2);
}

function computeMetrics(pts: [number, number][]) {
  const n = pts.length;
  const yMean = pts.reduce((s, [, y]) => s + y, 0) / n;
  let ssTot = 0,
    ssRes = 0,
    mse = 0,
    mae = 0;
  for (const [x, y] of pts) {
    const yhat = W_OLS * x + B_OLS;
    ssRes += (y - yhat) ** 2;
    ssTot += (y - yMean) ** 2;
    mse += (y - yhat) ** 2;
    mae += Math.abs(y - yhat);
  }
  mse /= n;
  mae /= n;
  const r2 = 1 - ssRes / ssTot;
  const p = 1; // number of features
  const adjR2 = 1 - ((1 - r2) * (n - 1)) / (n - p - 1);
  return { mse, rmse: Math.sqrt(mse), mae, r2, adjR2 };
}

const trainMetrics = computeMetrics(POINTS);
const testPoints: [number, number][] = [
  [0.15, 0.35],
  [0.45, 0.75],
  [0.65, 1.0],
  [0.85, 1.18]
];
const testMetrics = computeMetrics(testPoints);

export function EvaluationMetrics() {
  const [tab, setTab] = useState<'train' | 'test'>('train');
  const m = tab === 'train' ? trainMetrics : testMetrics;
  const pts = tab === 'train' ? POINTS : testPoints;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{evaluationContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {evaluationContent.description}
          </p>

          {/* Metrics table */}
          <div className='mb-6 overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-border border-b'>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Metric
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Formula
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Units
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {evaluationContent.metrics.map((row, i) => (
                  <tr key={i} className='border-border border-b'>
                    <td
                      className={`py-2 font-mono font-bold text-chart-${i + 1}`}
                    >
                      {row.name}
                    </td>
                    <td className='text-foreground py-2 font-mono text-xs'>
                      {row.formula}
                    </td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {row.unit}
                    </td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Live metrics on OLS fit */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <div className='mb-3 flex items-center gap-2'>
              <h4 className='font-medium'>Live Metrics (OLS fit)</h4>
              <div className='flex gap-1'>
                {(['train', 'test'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${tab === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                  >
                    {t === 'train'
                      ? `Train (n=${POINTS.length})`
                      : `Test (n=${testPoints.length})`}
                  </button>
                ))}
              </div>
            </div>

            <div className='grid gap-4 lg:grid-cols-2'>
              <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className='w-full'>
                <line
                  x1={PAD}
                  y1={SVG_H - PAD}
                  x2={SVG_W - PAD}
                  y2={SVG_H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.2}
                />
                <line
                  x1={PAD}
                  y1={PAD}
                  x2={PAD}
                  y2={SVG_H - PAD}
                  stroke='currentColor'
                  strokeOpacity={0.2}
                />
                {/* regression line */}
                <line
                  x1={toSVGx(0)}
                  y1={toSVGy(B_OLS)}
                  x2={toSVGx(1)}
                  y2={toSVGy(W_OLS + B_OLS)}
                  style={{ stroke: 'var(--primary)' }}
                  strokeWidth={2}
                />
                {/* residuals */}
                {pts.map(([x, y], i) => (
                  <line
                    key={i}
                    x1={toSVGx(x)}
                    y1={toSVGy(y)}
                    x2={toSVGx(x)}
                    y2={toSVGy(W_OLS * x + B_OLS)}
                    style={{ stroke: 'var(--destructive)' }}
                    strokeWidth={1}
                    strokeDasharray='2 2'
                    opacity={0.5}
                  />
                ))}
                {/* points */}
                {pts.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={toSVGx(x)}
                    cy={toSVGy(y)}
                    r={4.5}
                    style={{
                      fill:
                        tab === 'train' ? 'var(--chart-2)' : 'var(--chart-3)'
                    }}
                    opacity={0.85}
                  />
                ))}
                <text
                  x={SVG_W / 2}
                  y={SVG_H - 4}
                  textAnchor='middle'
                  fontSize={8}
                  fill='currentColor'
                  opacity={0.4}
                >
                  x
                </text>
              </svg>

              <div className='grid grid-cols-2 content-start gap-2'>
                {[
                  { label: 'MSE', value: m.mse.toFixed(4), color: 'chart-1' },
                  { label: 'RMSE', value: m.rmse.toFixed(4), color: 'chart-2' },
                  { label: 'MAE', value: m.mae.toFixed(4), color: 'chart-3' },
                  { label: 'R²', value: m.r2.toFixed(4), color: 'chart-4' },
                  {
                    label: 'Adj R²',
                    value: m.adjR2.toFixed(4),
                    color: 'chart-5'
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
          </div>

          {/* Train/val/test split */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>
              Train / Validation / Test Split
            </h4>
            <p className='text-muted-foreground mb-3 text-sm'>
              {evaluationContent.trainTest.description}
            </p>
            <div className='grid gap-3 md:grid-cols-3'>
              {evaluationContent.trainTest.splits.map((s, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <div className='mb-1 flex items-center justify-between'>
                    <h5 className={`text-chart-${i + 1} text-sm font-semibold`}>
                      {s.name}
                    </h5>
                    <code className={`text-chart-${i + 1} font-mono text-xs`}>
                      {s.pct}
                    </code>
                  </div>
                  <p className='text-muted-foreground text-xs'>{s.use}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overfit signs */}
          <div className='border-destructive bg-destructive/5 rounded-md border-l-4 p-4'>
            <h4 className='text-destructive mb-2 font-semibold'>
              Signs of Overfitting
            </h4>
            <ul className='space-y-1'>
              {evaluationContent.overfitSigns.map((s, i) => (
                <li
                  key={i}
                  className='text-muted-foreground flex items-start gap-2 text-sm'
                >
                  <span className='text-destructive mt-0.5 shrink-0'>•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
