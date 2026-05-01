'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { mapContent } from '@/pages-content/linear-regression/content/linear-regression-content';

// Fixed MLE estimate (from OLS on the demo data)
const W_MLE = 1.37;
// Likelihood spread (fixed): controls how "peaked" the likelihood is
const SIG_LIK = 0.55;

const SVG_W = 340,
  SVG_H = 160,
  PAD_X = 30,
  PAD_Y = 20;
const W_MIN = -0.5,
  W_MAX = 3.0;

function toSVGx(w: number) {
  return PAD_X + ((w - W_MIN) / (W_MAX - W_MIN)) * (SVG_W - PAD_X * 2);
}
function toSVGy(val: number, maxVal: number) {
  return SVG_H - PAD_Y - (val / maxVal) * (SVG_H - PAD_Y * 2);
}

function gaussianCurve(
  mu: number,
  sigma: number,
  wMin: number,
  wMax: number,
  steps = 120
) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const w = wMin + (i / steps) * (wMax - wMin);
    const val = Math.exp(-((w - mu) ** 2) / (2 * sigma ** 2));
    pts.push([w, val]);
  }
  return pts;
}

function laplaceCurve(
  mu: number,
  b: number,
  wMin: number,
  wMax: number,
  steps = 120
) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const w = wMin + (i / steps) * (wMax - wMin);
    const val = Math.exp(-Math.abs(w - mu) / b);
    pts.push([w, val]);
  }
  return pts;
}

function ptsToPath(pts: [number, number][], maxVal: number) {
  return pts
    .map(
      ([w, v], i) =>
        `${i === 0 ? 'M' : 'L'} ${toSVGx(w).toFixed(1)} ${toSVGy(v, maxVal).toFixed(1)}`
    )
    .join(' ');
}

function mapEstimateGaussian(wMLE: number, sigLik: number, sigPrior: number) {
  const varLik = sigLik ** 2;
  const varPrior = sigPrior ** 2;
  return (wMLE * varPrior) / (varPrior + varLik);
}

export function MAPEstimation() {
  const [priorSigma, setPriorSigma] = useState(1.0);
  const [priorType, setPriorType] = useState<'gaussian' | 'laplace'>(
    'gaussian'
  );

  const wMAP =
    priorType === 'gaussian'
      ? mapEstimateGaussian(W_MLE, SIG_LIK, priorSigma)
      : W_MLE / (1 + SIG_LIK ** 2 / priorSigma ** 2); // Laplace MAP (approx)

  const likCurve = gaussianCurve(W_MLE, SIG_LIK, W_MIN, W_MAX);
  const priorCurve =
    priorType === 'gaussian'
      ? gaussianCurve(0, priorSigma, W_MIN, W_MAX)
      : laplaceCurve(0, priorSigma, W_MIN, W_MAX);
  const posteriorCurve = likCurve.map(
    ([w, lik], i) => [w, lik * priorCurve[i][1]] as [number, number]
  );
  const maxPost = Math.max(...posteriorCurve.map(([, v]) => v));

  const likPath = ptsToPath(likCurve, 1);
  const priorPath = ptsToPath(priorCurve, 1);
  const postPath = ptsToPath(posteriorCurve, maxPost);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{mapContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {mapContent.description}
          </p>

          {/* Bayes theorem */}
          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-primary mb-2 block font-mono text-lg font-bold'>
              {mapContent.bayes.formula}
            </code>
            <div className='mt-3 grid gap-2 sm:grid-cols-3'>
              {mapContent.bayes.parts.map((p, i) => (
                <div
                  key={i}
                  className={`bg-background rounded-md border-l-[3px] p-2 border-chart-${i + 1}`}
                >
                  <code
                    className={`text-chart-${i + 1} block font-mono text-xs font-bold`}
                  >
                    {p.name}
                  </code>
                  <span
                    className={`text-chart-${i + 1} block text-xs font-semibold`}
                  >
                    {p.label}
                  </span>
                  <p className='text-muted-foreground mt-0.5 text-xs'>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Derivation */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>
              Derivation — Gaussian Prior → Ridge
            </h4>
            <div className='space-y-2'>
              {mapContent.derivation.map((d, i) => (
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
          </div>

          {/* Interactive posterior visualization */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Posterior = Likelihood × Prior</h4>

            <div className='mb-3 flex gap-2'>
              {(['gaussian', 'laplace'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setPriorType(t)}
                  className={
                    `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ` +
                    (priorType === t
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground')
                  }
                >
                  {t === 'gaussian'
                    ? 'Gaussian prior → Ridge'
                    : 'Laplace prior → Lasso'}
                </button>
              ))}
            </div>

            <div className='mb-3'>
              <Label className='mb-1 block text-sm'>
                Prior strength σ ={' '}
                <span className='text-chart-3 font-mono'>
                  {priorSigma.toFixed(2)}
                </span>
                {priorSigma > 1.8 && (
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ← weak prior, MAP ≈ MLE
                  </span>
                )}
                {priorSigma < 0.4 && (
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ← strong prior, MAP → 0
                  </span>
                )}
              </Label>
              <Slider
                value={[priorSigma]}
                onValueChange={(v) => setPriorSigma(v[0])}
                min={0.1}
                max={2.5}
                step={0.05}
              />
            </div>

            <div className='flex justify-center'>
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className='w-full max-w-lg'
              >
                {/* Axis */}
                <line
                  x1={PAD_X}
                  y1={SVG_H - PAD_Y}
                  x2={SVG_W - PAD_X}
                  y2={SVG_H - PAD_Y}
                  stroke='currentColor'
                  strokeOpacity={0.2}
                />

                {/* Likelihood */}
                <path
                  d={likPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-1)' }}
                  strokeWidth={1.5}
                  opacity={0.8}
                />
                {/* Prior */}
                <path
                  d={priorPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-3)' }}
                  strokeWidth={1.5}
                  opacity={0.8}
                />
                {/* Posterior */}
                <path
                  d={postPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2.5}
                />

                {/* MLE marker */}
                <line
                  x1={toSVGx(W_MLE)}
                  y1={PAD_Y}
                  x2={toSVGx(W_MLE)}
                  y2={SVG_H - PAD_Y}
                  style={{ stroke: 'var(--chart-1)' }}
                  strokeWidth={1}
                  strokeDasharray='3 3'
                  opacity={0.7}
                />
                <text
                  x={toSVGx(W_MLE)}
                  y={PAD_Y - 4}
                  textAnchor='middle'
                  fontSize={8}
                  style={{ fill: 'var(--chart-1)' }}
                  opacity={0.9}
                >
                  MLE
                </text>

                {/* MAP marker */}
                <line
                  x1={toSVGx(wMAP)}
                  y1={PAD_Y}
                  x2={toSVGx(wMAP)}
                  y2={SVG_H - PAD_Y}
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={1.5}
                  strokeDasharray='3 3'
                />
                <text
                  x={toSVGx(wMAP)}
                  y={PAD_Y - 4}
                  textAnchor='middle'
                  fontSize={8}
                  style={{ fill: 'var(--chart-2)' }}
                  fontWeight='bold'
                >
                  MAP
                </text>

                {/* Prior peak at 0 */}
                <text
                  x={toSVGx(0)}
                  y={SVG_H - PAD_Y + 11}
                  textAnchor='middle'
                  fontSize={8}
                  fill='currentColor'
                  opacity={0.4}
                >
                  0
                </text>

                {/* w axis label */}
                <text
                  x={SVG_W - PAD_X + 8}
                  y={SVG_H - PAD_Y + 4}
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  w
                </text>
              </svg>
            </div>

            <div className='mt-2 flex flex-wrap justify-center gap-4 text-xs'>
              {[
                { cls: 'bg-chart-1', label: 'Likelihood P(y | w)' },
                { cls: 'bg-chart-3', label: 'Prior P(w)' },
                { cls: 'bg-chart-2', label: 'Posterior ∝ Lik × Prior' }
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-1.5'>
                  <div className={`${item.cls} h-2 w-5 rounded-full`} />
                  <span className='text-muted-foreground'>{item.label}</span>
                </div>
              ))}
            </div>

            <div className='mt-3 grid grid-cols-2 gap-2'>
              <div className='bg-muted rounded-md p-3 text-center'>
                <div className='text-chart-1 font-mono text-lg font-bold'>
                  {W_MLE.toFixed(3)}
                </div>
                <div className='text-muted-foreground text-xs'>
                  w_MLE (peak of likelihood)
                </div>
              </div>
              <div className='bg-muted rounded-md p-3 text-center'>
                <div className='text-chart-2 font-mono text-lg font-bold'>
                  {wMAP.toFixed(3)}
                </div>
                <div className='text-muted-foreground text-xs'>
                  w_MAP (peak of posterior)
                </div>
              </div>
            </div>
            <p className='text-muted-foreground mt-2 text-center text-xs'>
              Shrink σ to strengthen the prior — MAP estimate moves from MLE
              toward 0.
            </p>
          </div>

          {/* MLE vs MAP comparison table */}
          <div className='mb-6 overflow-x-auto'>
            <h4 className='mb-3 font-medium'>MLE vs MAP</h4>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-border border-b'>
                  <th className='text-muted-foreground pb-2 text-left text-xs font-medium'>
                    Aspect
                  </th>
                  <th className='text-chart-2 pb-2 text-left text-xs font-medium'>
                    MLE
                  </th>
                  <th className='text-chart-1 pb-2 text-left text-xs font-medium'>
                    MAP
                  </th>
                </tr>
              </thead>
              <tbody>
                {mapContent.comparison.map((row, i) => (
                  <tr key={i} className='border-border border-b'>
                    <td className='py-2 text-xs font-medium'>{row.aspect}</td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {row.mle}
                    </td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {row.map}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key insight */}
          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              The Unified View
            </h4>
            <p className='text-muted-foreground text-sm'>
              {mapContent.insight}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
