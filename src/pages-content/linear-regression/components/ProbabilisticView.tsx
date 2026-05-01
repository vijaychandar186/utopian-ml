'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { probabilisticContent } from '@/pages-content/linear-regression/content/linear-regression-content';

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

const W = 300,
  H = 200,
  PAD = 35;
const W_OLS = 1.37,
  B_OLS = 0.14;

function toSVGx(x: number) {
  return PAD + x * (W - PAD * 2);
}
function toSVGy(y: number) {
  return H - PAD - (y / 1.5) * (H - PAD * 2);
}
function gaussianPDF(x: number, sigma: number) {
  return Math.exp(-(x * x) / (2 * sigma * sigma));
}

export function ProbabilisticView() {
  const [sigma, setSigma] = useState(0.15);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {probabilisticContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {probabilisticContent.description}
          </p>

          {/* Noise model */}
          <div className='bg-muted border-chart-1 mb-4 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-1 mb-1 block font-mono font-bold'>
              {probabilisticContent.noiseModel.formula}
            </code>
            <p className='text-muted-foreground text-sm'>
              {probabilisticContent.noiseModel.description}
            </p>
          </div>

          {/* Likelihood formula */}
          <div className='bg-muted border-chart-2 mb-6 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-2 mb-1 block font-mono text-xs leading-relaxed font-bold break-all'>
              {probabilisticContent.likelihood.formula}
            </code>
            <p className='text-muted-foreground mt-1 text-sm'>
              {probabilisticContent.likelihood.description}
            </p>
          </div>

          {/* Interactive likelihood visualization */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Likelihood Visualization</h4>
            <div className='mb-3'>
              <Label className='mb-1 block text-sm'>
                Noise σ ={' '}
                <span className='text-chart-1 font-mono'>
                  {sigma.toFixed(2)}
                </span>
                <span className='text-muted-foreground ml-2 text-xs'>
                  (tighter σ → Gaussians sharper → outliers penalized harder)
                </span>
              </Label>
              <Slider
                value={[sigma]}
                onValueChange={(v) => setSigma(v[0])}
                min={0.05}
                max={0.45}
                step={0.01}
              />
            </div>
            <div className='flex justify-center'>
              <svg viewBox={`0 0 ${W} ${H}`} className='w-full max-w-sm'>
                {/* Axes */}
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

                {/* Per-point: Gaussian bell (horizontal) + residual + dot */}
                {POINTS.map(([x, y], i) => {
                  const yhat = W_OLS * x + B_OLS;
                  const residual = y - yhat;
                  const pointLikelihood = gaussianPDF(residual, sigma);
                  const cx = toSVGx(x);
                  const steps = 30;
                  return (
                    <g key={i}>
                      {Array.from({ length: steps }, (_, j) => {
                        const dy =
                          ((j - steps / 2) / (steps / 2)) * sigma * 3.5;
                        const g = gaussianPDF(dy, sigma);
                        const w = g * 18;
                        const svgY = toSVGy(yhat + dy);
                        return (
                          <rect
                            key={j}
                            x={cx - w / 2}
                            y={svgY - 1.1}
                            width={w}
                            height={2.2}
                            style={{ fill: 'var(--chart-2)' }}
                            opacity={0.22}
                          />
                        );
                      })}
                      <line
                        x1={cx}
                        y1={toSVGy(y)}
                        x2={cx}
                        y2={toSVGy(yhat)}
                        style={{ stroke: 'var(--destructive)' }}
                        strokeWidth={1}
                        strokeDasharray='2 2'
                        opacity={0.65}
                      />
                      <circle
                        cx={cx}
                        cy={toSVGy(y)}
                        r={4.5}
                        style={{ fill: 'var(--chart-1)' }}
                        opacity={0.3 + pointLikelihood * 0.7}
                      />
                    </g>
                  );
                })}

                {/* OLS regression line */}
                <line
                  x1={toSVGx(0)}
                  y1={toSVGy(B_OLS)}
                  x2={toSVGx(1)}
                  y2={toSVGy(W_OLS + B_OLS)}
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2.5}
                />

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
                <text
                  x={10}
                  y={H / 2}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.4}
                >
                  y
                </text>
              </svg>
            </div>
            <div className='mt-2 flex flex-wrap justify-center gap-4 text-xs'>
              <div className='flex items-center gap-1'>
                <div className='bg-chart-1 h-2.5 w-2.5 rounded-full' />
                <span className='text-muted-foreground'>
                  Data (brighter = higher likelihood)
                </span>
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
                <span className='text-muted-foreground'>
                  OLS fit / Gaussian center
                </span>
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
                <span className='text-muted-foreground'>Residuals</span>
              </div>
            </div>
          </div>

          {/* MLE → MSE derivation */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>
              {probabilisticContent.mle.title}
            </h4>
            <div className='space-y-2'>
              {probabilisticContent.mle.derivation.map((d, i) => (
                <div
                  key={i}
                  className={`bg-muted flex items-start gap-3 rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <span
                    className={`text-chart-${i + 1} w-28 shrink-0 text-xs font-semibold`}
                  >
                    {d.step}
                  </span>
                  <code className='text-foreground font-mono text-xs leading-relaxed'>
                    {d.formula}
                  </code>
                </div>
              ))}
            </div>
            <div className='border-chart-4 bg-chart-4/5 mt-3 rounded-md border-l-4 p-4'>
              <p className='text-muted-foreground text-sm'>
                {probabilisticContent.mle.conclusion}
              </p>
            </div>
          </div>

          {/* Why Gaussian */}
          <div>
            <h4 className='mb-3 font-medium'>Why Gaussian Noise?</h4>
            <div className='grid gap-3 md:grid-cols-3'>
              {probabilisticContent.gaussianReasons.map((r, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <h5
                    className={`text-chart-${i + 1} mb-1 text-sm font-semibold`}
                  >
                    {r.name}
                  </h5>
                  <p className='text-muted-foreground text-xs leading-relaxed'>
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
