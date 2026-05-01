'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { betaPriorContent } from '@/pages-content/linear-regression/content/linear-regression-content';

const SVG_W = 320,
  SVG_H = 160,
  PAD_X = 30,
  PAD_Y = 18;
const STEPS = 200;

// Log-gamma via Lanczos approximation (accurate for α > 0)
function lgamma(x: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = c[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return (
    0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
  );
}

function logBetaFn(a: number, b: number) {
  return lgamma(a) + lgamma(b) - lgamma(a + b);
}

function betaPDF(w: number, alpha: number, beta: number): number {
  if (w <= 0 || w >= 1) return 0;
  const logVal =
    (alpha - 1) * Math.log(w) +
    (beta - 1) * Math.log(1 - w) -
    logBetaFn(alpha, beta);
  return Math.exp(logVal);
}

function buildCurve(alpha: number, beta: number) {
  const pts: [number, number][] = [];
  for (let i = 1; i < STEPS; i++) {
    const w = i / STEPS;
    pts.push([w, betaPDF(w, alpha, beta)]);
  }
  return pts;
}

function toSVGx(w: number) {
  return PAD_X + w * (SVG_W - PAD_X * 2);
}
function toSVGy(v: number, maxV: number) {
  return (
    SVG_H -
    PAD_Y -
    Math.min((v / maxV) * (SVG_H - PAD_Y * 2), SVG_H - PAD_Y * 2)
  );
}

function ptsToPath(pts: [number, number][], maxV: number) {
  return pts
    .map(
      ([w, v], i) =>
        `${i === 0 ? 'M' : 'L'} ${toSVGx(w).toFixed(1)} ${toSVGy(v, maxV).toFixed(1)}`
    )
    .join(' ');
}

function betaMode(alpha: number, beta: number) {
  if (alpha > 1 && beta > 1) return (alpha - 1) / (alpha + beta - 2);
  if (alpha <= 1 && beta > 1) return 0;
  if (alpha > 1 && beta <= 1) return 1;
  return 0.5;
}

function betaMean(alpha: number, beta: number) {
  return alpha / (alpha + beta);
}

export function BetaPrior() {
  const [alpha, setAlpha] = useState(2);
  const [beta, setBeta] = useState(5);
  const [k, setK] = useState(6);
  const [n, setN] = useState(10);

  const postAlpha = alpha + k;
  const postBeta = beta + (n - k);

  const priorPts = buildCurve(alpha, beta);
  const postPts = buildCurve(postAlpha, postBeta);

  const priorMax = Math.max(...priorPts.map(([, v]) => v), 0.01);
  const postMax = Math.max(...postPts.map(([, v]) => v), 0.01);
  const globalMax = Math.max(priorMax, postMax) * 1.05;

  const priorPath = ptsToPath(priorPts, globalMax);
  const postPath = ptsToPath(postPts, globalMax);

  const mle = n > 0 ? k / n : 0;
  const mapEst =
    postAlpha > 1 && postBeta > 1 ? betaMode(postAlpha, postBeta) : mle;
  const postMean = betaMean(postAlpha, postBeta);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{betaPriorContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {betaPriorContent.description}
          </p>

          {/* Definition */}
          <div className='bg-muted border-chart-1 mb-4 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-1 mb-1 block font-mono text-xs leading-relaxed font-bold break-all'>
              {betaPriorContent.betaDef.formula}
            </code>
            <p className='text-muted-foreground mt-1 text-sm'>
              {betaPriorContent.betaDef.description}
            </p>
          </div>

          {/* Stats */}
          <div className='mb-6 grid gap-3 md:grid-cols-3'>
            {betaPriorContent.stats.map((s, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
              >
                <h5
                  className={`text-chart-${i + 1} mb-0.5 text-sm font-semibold`}
                >
                  {s.name}
                </h5>
                <code className='text-foreground mb-1 block font-mono text-xs'>
                  {s.formula}
                </code>
                <p className='text-muted-foreground text-xs'>{s.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive prior → posterior */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>
              Conjugate Update: Prior → Posterior
            </h4>

            <div className='mb-4 grid gap-3 sm:grid-cols-2'>
              <div>
                <Label className='mb-1 block text-sm'>
                  Prior α ={' '}
                  <span className='text-chart-3 font-mono'>{alpha}</span>
                  <span className='text-muted-foreground ml-1 text-xs'>
                    (pseudo-successes)
                  </span>
                </Label>
                <Slider
                  value={[alpha]}
                  onValueChange={(v) => setAlpha(v[0])}
                  min={0.5}
                  max={10}
                  step={0.5}
                />
              </div>
              <div>
                <Label className='mb-1 block text-sm'>
                  Prior β ={' '}
                  <span className='text-chart-3 font-mono'>{beta}</span>
                  <span className='text-muted-foreground ml-1 text-xs'>
                    (pseudo-failures)
                  </span>
                </Label>
                <Slider
                  value={[beta]}
                  onValueChange={(v) => setBeta(v[0])}
                  min={0.5}
                  max={10}
                  step={0.5}
                />
              </div>
              <div>
                <Label className='mb-1 block text-sm'>
                  Observed successes k ={' '}
                  <span className='text-chart-2 font-mono'>{k}</span>
                </Label>
                <Slider
                  value={[k]}
                  onValueChange={(v) => setK(Math.min(v[0], n))}
                  min={0}
                  max={n}
                  step={1}
                />
              </div>
              <div>
                <Label className='mb-1 block text-sm'>
                  Total trials n ={' '}
                  <span className='text-chart-2 font-mono'>{n}</span>
                </Label>
                <Slider
                  value={[n]}
                  onValueChange={(v) => {
                    setN(v[0]);
                    setK((kk) => Math.min(kk, v[0]));
                  }}
                  min={1}
                  max={50}
                  step={1}
                />
              </div>
            </div>

            <div className='flex justify-center'>
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className='w-full max-w-md'
              >
                <line
                  x1={PAD_X}
                  y1={SVG_H - PAD_Y}
                  x2={SVG_W - PAD_X}
                  y2={SVG_H - PAD_Y}
                  stroke='currentColor'
                  strokeOpacity={0.2}
                />

                {/* Tick marks at 0, 0.25, 0.5, 0.75, 1 */}
                {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                  <g key={v}>
                    <line
                      x1={toSVGx(v === 1 ? 0.999 : v === 0 ? 0.001 : v)}
                      y1={SVG_H - PAD_Y}
                      x2={toSVGx(v === 1 ? 0.999 : v === 0 ? 0.001 : v)}
                      y2={SVG_H - PAD_Y + 4}
                      stroke='currentColor'
                      strokeOpacity={0.3}
                    />
                    <text
                      x={toSVGx(v === 1 ? 0.999 : v === 0 ? 0.001 : v)}
                      y={SVG_H - PAD_Y + 13}
                      textAnchor='middle'
                      fontSize={8}
                      fill='currentColor'
                      opacity={0.4}
                    >
                      {v}
                    </text>
                  </g>
                ))}

                {/* Prior curve */}
                <path
                  d={priorPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-3)' }}
                  strokeWidth={1.5}
                  strokeDasharray='4 2'
                />
                {/* Posterior curve */}
                <path
                  d={postPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-1)' }}
                  strokeWidth={2.5}
                />

                {/* MLE marker */}
                {mle > 0 && mle < 1 && (
                  <>
                    <line
                      x1={toSVGx(mle)}
                      y1={PAD_Y}
                      x2={toSVGx(mle)}
                      y2={SVG_H - PAD_Y}
                      style={{ stroke: 'var(--chart-2)' }}
                      strokeWidth={1}
                      strokeDasharray='2 2'
                      opacity={0.7}
                    />
                    <text
                      x={toSVGx(mle)}
                      y={PAD_Y - 4}
                      textAnchor='middle'
                      fontSize={7}
                      style={{ fill: 'var(--chart-2)' }}
                    >
                      MLE={mle.toFixed(2)}
                    </text>
                  </>
                )}
                {/* MAP marker */}
                {mapEst > 0.01 && mapEst < 0.99 && (
                  <>
                    <line
                      x1={toSVGx(mapEst)}
                      y1={PAD_Y}
                      x2={toSVGx(mapEst)}
                      y2={SVG_H - PAD_Y}
                      style={{ stroke: 'var(--chart-1)' }}
                      strokeWidth={1.5}
                      strokeDasharray='3 2'
                    />
                    <text
                      x={toSVGx(mapEst)}
                      y={PAD_Y - 4}
                      textAnchor='middle'
                      fontSize={7}
                      style={{ fill: 'var(--chart-1)' }}
                      fontWeight='bold'
                    >
                      MAP={mapEst.toFixed(2)}
                    </text>
                  </>
                )}

                <text
                  x={SVG_W - PAD_X + 6}
                  y={SVG_H - PAD_Y + 4}
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  p
                </text>
              </svg>
            </div>

            <div className='mt-2 flex flex-wrap justify-center gap-4 text-xs'>
              {[
                {
                  color: 'var(--chart-3)',
                  label: `Prior Beta(${alpha}, ${beta})`,
                  dash: true
                },
                {
                  color: 'var(--chart-1)',
                  label: `Posterior Beta(${postAlpha}, ${postBeta})`,
                  dash: false
                },
                {
                  color: 'var(--chart-2)',
                  label: `MLE = k/n = ${mle.toFixed(2)}`,
                  dash: true
                }
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-1.5'>
                  <div
                    className='h-0.5 w-6 rounded'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='text-muted-foreground'>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Conjugate update formula */}
            <div className='bg-muted mt-4 rounded-md p-3 text-center'>
              <code className='font-mono text-xs'>
                Beta(
                <span className='text-chart-3'>
                  {alpha}, {beta}
                </span>
                ) + data({k} / {n}) → Beta(
                <span className='text-chart-1'>
                  {postAlpha}, {postBeta}
                </span>
                )
              </code>
            </div>

            {/* 3 estimates */}
            <div className='mt-3 grid grid-cols-3 gap-2'>
              {[
                {
                  label: 'MLE  k/n',
                  value: mle.toFixed(3),
                  color: 'chart-2',
                  note: 'data only'
                },
                {
                  label: 'MAP  mode',
                  value: mapEst.toFixed(3),
                  color: 'chart-1',
                  note: 'prior + data'
                },
                {
                  label: 'Mean  E[p]',
                  value: postMean.toFixed(3),
                  color: 'chart-3',
                  note: 'full Bayes'
                }
              ].map((item, i) => (
                <div key={i} className='bg-muted rounded-md p-3 text-center'>
                  <div
                    className={`text-${item.color} font-mono text-base font-bold`}
                  >
                    {item.value}
                  </div>
                  <div className='text-muted-foreground text-xs font-medium'>
                    {item.label}
                  </div>
                  <div className='text-muted-foreground text-xs opacity-70'>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAP formula */}
          <div className='bg-muted border-chart-2 mb-6 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-2 mb-1 block font-mono font-bold'>
              {betaPriorContent.mapEstimate.formula}
            </code>
            <div className='mt-3 overflow-x-auto'>
              <table className='w-full text-xs'>
                <thead>
                  <tr className='border-border border-b'>
                    <th className='text-muted-foreground pb-1.5 text-left font-medium'>
                      Estimator
                    </th>
                    <th className='text-muted-foreground pb-1.5 text-left font-medium'>
                      Formula
                    </th>
                    <th className='text-muted-foreground pb-1.5 text-left font-medium'>
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {betaPriorContent.mapEstimate.comparison.map((r, i) => (
                    <tr key={i} className='border-border border-b'>
                      <td
                        className={`py-1.5 font-semibold text-chart-${i + 1}`}
                      >
                        {r.name}
                      </td>
                      <td className='py-1.5 font-mono'>{r.formula}</td>
                      <td className='text-muted-foreground py-1.5'>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ML connections */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>
              Connections in Machine Learning
            </h4>
            <div className='grid gap-3 md:grid-cols-3'>
              {betaPriorContent.mlConnections.map((c, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <h5
                    className={`text-chart-${i + 1} mb-1 text-sm font-semibold`}
                  >
                    {c.name}
                  </h5>
                  <p className='text-muted-foreground text-xs leading-relaxed'>
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Label Smoothing = Beta Prior
            </h4>
            <p className='text-muted-foreground text-sm'>
              {betaPriorContent.insight}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
