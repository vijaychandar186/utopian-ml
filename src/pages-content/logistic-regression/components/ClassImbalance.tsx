'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const SVG_W = 300,
  SVG_H = 140,
  PAD = 28;

// Simulated ROC-like curve points (FPR, TPR) at various thresholds
// Higher threshold → lower FPR + lower TPR; lower threshold → higher both
const ROC_POINTS: [number, number][] = [
  [0.0, 0.0],
  [0.02, 0.4],
  [0.05, 0.62],
  [0.1, 0.76],
  [0.18, 0.86],
  [0.28, 0.91],
  [0.42, 0.95],
  [0.6, 0.97],
  [0.8, 0.99],
  [1.0, 1.0]
];

function toSVGx(v: number) {
  return PAD + v * (SVG_W - PAD * 2);
}
function toSVGy(v: number) {
  return SVG_H - PAD - v * (SVG_H - PAD * 2);
}

// Interpolate ROC to find (FPR, TPR) at a given threshold index [0,1]
// threshold=1 → operating at first point, threshold=0 → last
function rocAtThreshold(t: number): [number, number] {
  const idx = (1 - t) * (ROC_POINTS.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, ROC_POINTS.length - 1);
  const frac = idx - lo;
  const [fpr0, tpr0] = ROC_POINTS[lo];
  const [fpr1, tpr1] = ROC_POINTS[hi];
  return [fpr0 + frac * (fpr1 - fpr0), tpr0 + frac * (tpr1 - tpr0)];
}

export function ClassImbalance() {
  const [posRate, setPosRate] = useState(0.1);
  const [threshold, setThreshold] = useState(0.5);

  const n = 1000;
  const nPos = Math.round(n * posRate);
  const nNeg = n - nPos;

  const wPos = (n / (2 * nPos)).toFixed(2);
  const wNeg = (n / (2 * nNeg)).toFixed(2);

  const [fpr, tpr] = rocAtThreshold(threshold);
  const precision = (tpr * nPos) / Math.max(tpr * nPos + fpr * nNeg, 1);
  const recall = tpr;
  const f1 =
    precision + recall > 0
      ? (2 * precision * recall) / (precision + recall)
      : 0;

  const rocPath = ROC_POINTS.map(
    ([x, y], i) =>
      `${i === 0 ? 'M' : 'L'} ${toSVGx(x).toFixed(1)} ${toSVGy(y).toFixed(1)}`
  ).join(' ');
  const diagPath = `M ${toSVGx(0)} ${toSVGy(0)} L ${toSVGx(1)} ${toSVGy(1)}`;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        Class Imbalance & Decision Threshold
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            Real classification problems are rarely balanced. Fraud detection
            might be 0.1% positive; cancer screening 5%. A naive model that
            always predicts the majority class scores 99.9% accuracy but is
            completely useless. Two tools fix this: adjusting class weights
            during training, and moving the decision threshold after training.
          </p>

          {/* Imbalance demo */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Class Weight Calculator</h4>
            <div className='mb-3'>
              <Label className='mb-1 block text-sm'>
                Positive class rate ={' '}
                <span className='text-chart-2 font-mono'>
                  {(posRate * 100).toFixed(0)}%
                </span>
                <span className='text-muted-foreground ml-2 text-xs'>
                  ({nPos} positive, {nNeg} negative out of {n})
                </span>
              </Label>
              <Slider
                value={[posRate]}
                onValueChange={(v) => setPosRate(v[0])}
                min={0.02}
                max={0.5}
                step={0.01}
              />
            </div>
            <div className='mt-3 grid grid-cols-2 gap-3'>
              <div className='bg-muted rounded-md p-3 text-center'>
                <div className='text-chart-2 font-mono text-xl font-bold'>
                  {wPos}
                </div>
                <div className='text-muted-foreground text-xs'>
                  weight for positive class
                </div>
                <div className='text-muted-foreground mt-1 font-mono text-xs'>
                  n / (2 × n_pos)
                </div>
              </div>
              <div className='bg-muted rounded-md p-3 text-center'>
                <div className='text-chart-1 font-mono text-xl font-bold'>
                  {wNeg}
                </div>
                <div className='text-muted-foreground text-xs'>
                  weight for negative class
                </div>
                <div className='text-muted-foreground mt-1 font-mono text-xs'>
                  n / (2 × n_neg)
                </div>
              </div>
            </div>
            <p className='text-muted-foreground mt-2 text-center text-xs'>
              In scikit-learn:{' '}
              <code className='font-mono'>
                class_weight=&apos;balanced&apos;
              </code>{' '}
              computes these automatically.
            </p>
          </div>

          {/* Threshold + ROC */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Decision Threshold & ROC Curve</h4>
            <div className='mb-3'>
              <Label className='mb-1 block text-sm'>
                Threshold ={' '}
                <span className='text-chart-3 font-mono'>
                  {threshold.toFixed(2)}
                </span>
                {threshold < 0.3 && (
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ← low threshold: catch more positives (high recall, lower
                    precision)
                  </span>
                )}
                {threshold > 0.7 && (
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ← high threshold: only confident positives (high precision,
                    lower recall)
                  </span>
                )}
              </Label>
              <Slider
                value={[threshold]}
                onValueChange={(v) => setThreshold(v[0])}
                min={0.05}
                max={0.95}
                step={0.01}
              />
            </div>
            <div className='flex justify-center'>
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className='w-full max-w-sm'
              >
                {/* Diagonal (random classifier) */}
                <path
                  d={diagPath}
                  fill='none'
                  stroke='currentColor'
                  strokeOpacity={0.2}
                  strokeWidth={1}
                  strokeDasharray='3 3'
                />
                {/* ROC curve */}
                <path
                  d={rocPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2.5}
                />
                {/* Operating point */}
                <circle
                  cx={toSVGx(fpr)}
                  cy={toSVGy(tpr)}
                  r={5}
                  style={{ fill: 'var(--chart-3)' }}
                />
                {/* Axes */}
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
                <text
                  x={SVG_W / 2}
                  y={SVG_H - 6}
                  textAnchor='middle'
                  fontSize={8}
                  fill='currentColor'
                  opacity={0.5}
                >
                  FPR (False Positive Rate)
                </text>
                <text
                  x={10}
                  y={SVG_H / 2}
                  textAnchor='middle'
                  fontSize={8}
                  fill='currentColor'
                  opacity={0.5}
                  transform={`rotate(-90, 10, ${SVG_H / 2})`}
                >
                  TPR (Recall)
                </text>
              </svg>
            </div>
            <div className='mt-3 grid grid-cols-3 gap-2 text-center'>
              <div className='bg-muted rounded-md p-2'>
                <div className='text-chart-2 font-mono font-bold'>
                  {(precision * 100).toFixed(0)}%
                </div>
                <div className='text-muted-foreground text-xs'>Precision</div>
              </div>
              <div className='bg-muted rounded-md p-2'>
                <div className='text-chart-3 font-mono font-bold'>
                  {(recall * 100).toFixed(0)}%
                </div>
                <div className='text-muted-foreground text-xs'>
                  Recall (TPR)
                </div>
              </div>
              <div className='bg-muted rounded-md p-2'>
                <div className='text-chart-4 font-mono font-bold'>
                  {(f1 * 100).toFixed(0)}%
                </div>
                <div className='text-muted-foreground text-xs'>F1 Score</div>
              </div>
            </div>
          </div>

          {/* When to use each threshold */}
          <div className='mb-6 grid gap-3 md:grid-cols-2'>
            {[
              {
                title: 'Lower threshold (< 0.5)',
                subtitle: 'Maximize recall',
                body: 'Use when missing a positive is costly: cancer detection, fraud alerts, safety systems. You accept more false alarms to catch more true cases.',
                color: 2
              },
              {
                title: 'Higher threshold (> 0.5)',
                subtitle: 'Maximize precision',
                body: 'Use when false alarms are costly: spam filters, loan approvals, content moderation. Only flag when highly confident.',
                color: 1
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${item.color}`}
              >
                <h5 className={`text-chart-${item.color} mb-0.5 font-semibold`}>
                  {item.title}
                </h5>
                <p
                  className={`text-chart-${item.color} mb-2 text-xs opacity-70`}
                >
                  {item.subtitle}
                </p>
                <p className='text-muted-foreground text-xs leading-relaxed'>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Threshold is Separate from Training
            </h4>
            <p className='text-muted-foreground text-sm'>
              You train once, then sweep the threshold to find the best
              operating point for your cost function. The ROC curve shows every
              possible tradeoff. AUC (area under ROC) measures overall ranking
              quality independent of threshold — useful when you haven&apos;t
              decided on the tradeoff yet.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
