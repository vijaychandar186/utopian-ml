import { Card, CardContent } from '@/components/ui/card';

const SVG_W = 320,
  SVG_H = 140,
  PAD_X = 30,
  PAD_Y = 20;

function convexBCE(w: number) {
  const z = w * 2;
  return Math.log(1 + Math.exp(-z)) + (1 - 0.85) * Math.log(1 + Math.exp(z));
}

function nonConvexNN(w: number) {
  return (
    0.4 +
    0.35 * Math.sin(w * 1.8) +
    0.15 * Math.sin(w * 4.2) +
    0.08 * w * w * 0.04
  );
}

function toSVGx(w: number, wMin: number, wMax: number) {
  return PAD_X + ((w - wMin) / (wMax - wMin)) * (SVG_W - PAD_X * 2);
}
function toSVGy(v: number, vMin: number, vMax: number) {
  return SVG_H - PAD_Y - ((v - vMin) / (vMax - vMin)) * (SVG_H - PAD_Y * 2);
}

function makePath(
  fn: (w: number) => number,
  wMin: number,
  wMax: number,
  steps = 80
) {
  const pts: [number, number][] = [];
  let vMin = Infinity,
    vMax = -Infinity;
  for (let i = 0; i <= steps; i++) {
    const w = wMin + (i / steps) * (wMax - wMin);
    const v = fn(w);
    pts.push([w, v]);
    if (v < vMin) vMin = v;
    if (v > vMax) vMax = v;
  }
  const range = vMax - vMin || 1;
  const path = pts
    .map(
      ([w, v], i) =>
        `${i === 0 ? 'M' : 'L'} ${toSVGx(w, wMin, wMax).toFixed(1)} ${toSVGy(v, vMin - range * 0.05, vMax + range * 0.05).toFixed(1)}`
    )
    .join(' ');
  return { path, vMin, vMax };
}

export function Convexity() {
  const W_MIN = -2.5,
    W_MAX = 2.5;
  const { path: bcePath } = makePath(convexBCE, W_MIN, W_MAX);
  const { path: nnPath } = makePath(nonConvexNN, W_MIN, W_MAX);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>Convexity & Separability</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            Binary cross-entropy is a convex function of the weights — it has
            exactly one minimum and no local traps. Gradient descent is
            guaranteed to converge to the global optimum. This is a major
            advantage over neural networks, where loss surfaces are riddled with
            local minima and saddle points.
          </p>

          {/* Loss surface comparison */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>
              BCE Loss vs Neural Network Loss
            </h4>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <p className='text-muted-foreground mb-2 text-center text-xs font-medium'>
                  BCE (logistic regression) — convex
                </p>
                <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className='w-full'>
                  <line
                    x1={PAD_X}
                    y1={SVG_H - PAD_Y}
                    x2={SVG_W - PAD_X}
                    y2={SVG_H - PAD_Y}
                    stroke='currentColor'
                    strokeOpacity={0.15}
                  />
                  <path
                    d={bcePath}
                    fill='none'
                    style={{ stroke: 'var(--chart-2)' }}
                    strokeWidth={2.5}
                  />
                  <text
                    x={SVG_W / 2}
                    y={SVG_H - 4}
                    textAnchor='middle'
                    fontSize={8}
                    fill='currentColor'
                    opacity={0.4}
                  >
                    w
                  </text>
                  <text
                    x={PAD_X + 4}
                    y={PAD_Y + 8}
                    fontSize={8}
                    fill='currentColor'
                    opacity={0.4}
                  >
                    L
                  </text>
                </svg>
                <p className='text-muted-foreground text-center text-xs'>
                  One global minimum — gradient descent always wins
                </p>
              </div>
              <div>
                <p className='text-muted-foreground mb-2 text-center text-xs font-medium'>
                  Neural network — non-convex
                </p>
                <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className='w-full'>
                  <line
                    x1={PAD_X}
                    y1={SVG_H - PAD_Y}
                    x2={SVG_W - PAD_X}
                    y2={SVG_H - PAD_Y}
                    stroke='currentColor'
                    strokeOpacity={0.15}
                  />
                  <path
                    d={nnPath}
                    fill='none'
                    style={{ stroke: 'var(--chart-1)' }}
                    strokeWidth={2.5}
                  />
                  <text
                    x={SVG_W / 2}
                    y={SVG_H - 4}
                    textAnchor='middle'
                    fontSize={8}
                    fill='currentColor'
                    opacity={0.4}
                  >
                    w
                  </text>
                  <text
                    x={PAD_X + 4}
                    y={PAD_Y + 8}
                    fontSize={8}
                    fill='currentColor'
                    opacity={0.4}
                  >
                    L
                  </text>
                </svg>
                <p className='text-muted-foreground text-center text-xs'>
                  Local minima + saddle points — no convergence guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Why convex */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Why BCE is Convex</h4>
            <div className='space-y-2'>
              {[
                {
                  step: 'Log-sum-exp',
                  formula: 'log(1 + e^z) is convex in z',
                  color: 1
                },
                {
                  step: 'Linear z',
                  formula:
                    'z = wᵀx + b is linear in w → composition stays convex',
                  color: 2
                },
                {
                  step: 'Sum of convex',
                  formula: 'Sum over n points preserves convexity',
                  color: 3
                },
                {
                  step: 'Result',
                  formula: 'BCE(w) is strictly convex → unique global minimum',
                  color: 4
                }
              ].map((row, i) => (
                <div
                  key={i}
                  className={`bg-muted flex items-center gap-3 rounded-md border-l-[3px] p-3 border-chart-${row.color}`}
                >
                  <span
                    className={`text-chart-${row.color} w-24 shrink-0 text-xs font-semibold`}
                  >
                    {row.step}
                  </span>
                  <code className='text-foreground font-mono text-xs'>
                    {row.formula}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Separability problem */}
          <div className='border-chart-1 bg-chart-1/5 mb-6 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-1 mb-2 font-semibold'>
              The Separability Problem
            </h4>
            <p className='text-muted-foreground mb-3 text-sm'>
              When training data is linearly separable, BCE can be driven to
              zero only by sending weights to ±∞. The model becomes infinitely
              confident — perfect training loss, broken calibration, and weights
              that never converge.
            </p>
            <div className='grid gap-2 sm:grid-cols-3'>
              {[
                {
                  title: 'Symptom',
                  body: 'Gradient descent runs forever, weights keep growing, loss decreases but never reaches zero.',
                  color: 1
                },
                {
                  title: 'Consequence',
                  body: 'Model outputs probabilities of 0.9999+ for every point. Tiny perturbation → wrong class.',
                  color: 3
                },
                {
                  title: 'Fix',
                  body: 'L2 regularization adds λ‖w‖² which forces weights to stay finite. Always regularize.',
                  color: 2
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-background rounded-md border-l-[3px] p-3 border-chart-${item.color}`}
                >
                  <h5
                    className={`text-chart-${item.color} mb-1 text-xs font-semibold`}
                  >
                    {item.title}
                  </h5>
                  <p className='text-muted-foreground text-xs leading-relaxed'>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='border-chart-3 bg-chart-3/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-3 mb-1 font-semibold'>
              Practical Implication
            </h4>
            <p className='text-muted-foreground text-sm'>
              In scikit-learn,{' '}
              <code className='font-mono text-xs'>LogisticRegression</code>{' '}
              applies L2 regularization by default (C=1.0). If you see a{' '}
              <code className='font-mono text-xs'>ConvergenceWarning</code>,
              your data may be separable or poorly scaled — increase max_iter,
              add regularization, or scale your features.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
