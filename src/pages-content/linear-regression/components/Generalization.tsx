import { Card, CardContent } from '@/components/ui/card';
import { generalizationContent } from '@/pages-content/linear-regression/content/linear-regression-content';

export function Generalization() {
  // Fake learning curves for illustration
  const ns = [5, 10, 20, 40, 80, 160, 320];
  const trainErr = [0.02, 0.04, 0.06, 0.07, 0.075, 0.08, 0.082];
  const valErr = [0.35, 0.22, 0.15, 0.12, 0.105, 0.095, 0.09];

  const SVG_W = 300,
    SVG_H = 140,
    PAD = 30;
  const xMax = Math.log(ns[ns.length - 1]);
  const xMin = Math.log(ns[0]);
  function toSVGx(n: number) {
    return PAD + ((Math.log(n) - xMin) / (xMax - xMin)) * (SVG_W - PAD * 2);
  }
  function toSVGy(e: number) {
    return SVG_H - PAD - (e / 0.4) * (SVG_H - PAD * 2);
  }

  const trainPath = ns
    .map(
      (n, i) =>
        `${i === 0 ? 'M' : 'L'} ${toSVGx(n).toFixed(1)} ${toSVGy(trainErr[i]).toFixed(1)}`
    )
    .join(' ');
  const valPath = ns
    .map(
      (n, i) =>
        `${i === 0 ? 'M' : 'L'} ${toSVGx(n).toFixed(1)} ${toSVGy(valErr[i]).toFixed(1)}`
    )
    .join(' ');

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {generalizationContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {generalizationContent.description}
          </p>

          {/* Bias-variance decomposition */}
          <div className='mb-6'>
            <h4 className='mb-2 font-medium'>Bias–Variance Decomposition</h4>
            <div className='bg-muted mb-3 rounded-md p-3 text-center'>
              <code className='text-primary font-mono text-sm'>
                {generalizationContent.biasVarianceDecomp.formula}
              </code>
            </div>
            <div className='grid gap-3 md:grid-cols-3'>
              {generalizationContent.biasVarianceDecomp.terms.map((t, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <h5
                    className={`text-chart-${i + 1} mb-1 text-sm font-semibold`}
                  >
                    {t.name}
                  </h5>
                  <p className='text-muted-foreground text-xs'>
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning curve */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Learning Curve</h4>
            <div className='flex justify-center'>
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className='w-full max-w-sm'
              >
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
                <path
                  d={trainPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2}
                />
                <path
                  d={valPath}
                  fill='none'
                  style={{ stroke: 'var(--chart-1)' }}
                  strokeWidth={2}
                  strokeDasharray='5 3'
                />
                <text
                  x={SVG_W / 2}
                  y={SVG_H - 4}
                  textAnchor='middle'
                  fontSize={8}
                  fill='currentColor'
                  opacity={0.4}
                >
                  Training set size (log)
                </text>
                <text
                  x={10}
                  y={SVG_H / 2}
                  textAnchor='middle'
                  fontSize={8}
                  fill='currentColor'
                  opacity={0.4}
                >
                  RMSE
                </text>
              </svg>
            </div>
            <div className='mt-2 flex justify-center gap-6 text-xs'>
              <div className='flex items-center gap-1.5'>
                <div className='bg-chart-2 h-0.5 w-6 rounded' />
                <span className='text-muted-foreground'>Train error</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <div
                  className='bg-chart-1 h-0.5 w-6 rounded'
                  style={{ borderStyle: 'dashed' }}
                />
                <span className='text-muted-foreground'>Validation error</span>
              </div>
            </div>
            <p className='text-muted-foreground mt-2 text-center text-xs'>
              {generalizationContent.learningCurve.description}
            </p>
          </div>

          {/* Diagnosis table */}
          <div className='mb-6 overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-border border-b'>
                  <th className='text-muted-foreground pb-2 text-left text-xs font-medium'>
                    Learning curve pattern
                  </th>
                  <th className='text-muted-foreground pb-2 text-left text-xs font-medium'>
                    Diagnosis
                  </th>
                  <th className='text-muted-foreground pb-2 text-left text-xs font-medium'>
                    Fix
                  </th>
                </tr>
              </thead>
              <tbody>
                {generalizationContent.learningCurve.signs.map((s, i) => (
                  <tr key={i} className='border-border border-b'>
                    <td className='py-2 text-xs'>{s.condition}</td>
                    <td
                      className={`py-2 text-xs font-semibold text-chart-${i + 1}`}
                    >
                      {s.diagnosis}
                    </td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {s.fix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* k-fold CV */}
          <div className='border-chart-3 bg-chart-3/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-3 mb-2 font-semibold'>
              k-Fold Cross-Validation
            </h4>
            <p className='text-muted-foreground mb-3 text-sm'>
              {generalizationContent.crossValidation.description}
            </p>
            <ol className='space-y-1'>
              {generalizationContent.crossValidation.procedure.map(
                (step, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm'>
                    <span className='bg-chart-3/20 text-chart-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold'>
                      {i + 1}
                    </span>
                    <span className='text-muted-foreground'>{step}</span>
                  </li>
                )
              )}
            </ol>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
