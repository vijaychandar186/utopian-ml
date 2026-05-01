import { Card, CardContent } from '@/components/ui/card';
import { robustnessContent } from '@/pages-content/linear-regression/content/linear-regression-content';

export function Robustness() {
  // Simple SVG showing how an outlier pulls the OLS line vs Huber
  const SVG_W = 300,
    SVG_H = 160,
    PAD = 30;
  const GOOD: [number, number][] = [
    [0.1, 0.15],
    [0.2, 0.32],
    [0.35, 0.48],
    [0.5, 0.65],
    [0.65, 0.78],
    [0.8, 0.92]
  ];

  function toSVGx(x: number) {
    return PAD + x * (SVG_W - PAD * 2);
  }
  function toSVGy(y: number) {
    return SVG_H - PAD - y * (SVG_H - PAD * 2);
  }

  // OLS on clean data: w≈1.12, b≈0.03
  // OLS on outlier data: w≈0.72, b≈0.25 (pulled up)
  const cleanLine = [
    [0, 0.03],
    [1, 1.15]
  ] as [number, number][];
  const outlierLine = [
    [0, 0.25],
    [1, 0.97]
  ] as [number, number][];

  function linePath(pts: [number, number][]) {
    return pts
      .map(
        ([x, y], i) =>
          `${i === 0 ? 'M' : 'L'} ${toSVGx(x).toFixed(1)} ${toSVGy(y).toFixed(1)}`
      )
      .join(' ');
  }

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{robustnessContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {robustnessContent.description}
          </p>

          {/* Outlier visualization */}
          <div className='border-border mb-6 rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>How one outlier shifts OLS</h4>
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
                {/* clean OLS line */}
                <path
                  d={linePath(cleanLine)}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={2}
                />
                {/* outlier-pulled OLS line */}
                <path
                  d={linePath(outlierLine)}
                  fill='none'
                  style={{ stroke: 'var(--chart-1)' }}
                  strokeWidth={2}
                  strokeDasharray='5 3'
                />
                {/* clean data points */}
                {GOOD.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={toSVGx(x)}
                    cy={toSVGy(y)}
                    r={4}
                    style={{ fill: 'var(--chart-2)' }}
                    opacity={0.8}
                  />
                ))}
                {/* outlier point */}
                <circle
                  cx={toSVGx(0.3)}
                  cy={toSVGy(1.35)}
                  r={6}
                  style={{ fill: 'var(--destructive)' }}
                  opacity={0.9}
                />
                <text
                  x={toSVGx(0.3) + 9}
                  y={toSVGy(1.35) + 4}
                  fontSize={8}
                  style={{ fill: 'var(--destructive)' }}
                >
                  outlier
                </text>
              </svg>
            </div>
            <div className='mt-2 flex justify-center gap-6 text-xs'>
              <div className='flex items-center gap-1.5'>
                <div className='bg-chart-2 h-0.5 w-6' />
                <span className='text-muted-foreground'>OLS (clean)</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <div className='bg-chart-1 h-0.5 w-6' />
                <span className='text-muted-foreground'>
                  OLS (with outlier)
                </span>
              </div>
            </div>
          </div>

          {/* Influence metrics */}
          <div className='mb-6 grid gap-3 md:grid-cols-3'>
            {robustnessContent.influence.map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${i + 1}`}
              >
                <h4 className={`text-chart-${i + 1} mb-1 font-semibold`}>
                  {item.name}
                </h4>
                <code
                  className={`text-chart-${i + 1} mb-2 block font-mono text-xs`}
                >
                  {item.formula}
                </code>
                <p className='text-muted-foreground text-xs'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Robust alternatives */}
          <h4 className='mb-3 font-medium'>Robust Loss Functions</h4>
          <div className='space-y-3'>
            {robustnessContent.alternatives.map((alt, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${i + 1}`}
              >
                <div className='mb-1 flex items-center gap-3'>
                  <h5 className={`text-chart-${i + 1} font-semibold`}>
                    {alt.name}
                  </h5>
                </div>
                <code
                  className={`text-chart-${i + 1} mb-1 block font-mono text-xs`}
                >
                  {alt.formula}
                </code>
                <p className='text-muted-foreground mb-1 text-xs'>
                  {alt.property}
                </p>
                <p className='text-muted-foreground text-xs'>
                  <span className='font-medium'>Use when: </span>
                  {alt.when}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
