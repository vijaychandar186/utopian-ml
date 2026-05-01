import { Card, CardContent } from '@/components/ui/card';
import { gradientDescentContent } from '@/pages-content/linear-regression/content/linear-regression-content';

export function GradientDescent() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {gradientDescentContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {gradientDescentContent.description}
          </p>

          {/* Gradients */}
          <div className='mb-6 grid gap-3 md:grid-cols-2'>
            {gradientDescentContent.gradients.map((g, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${i + 1}`}
              >
                <code
                  className={`text-chart-${i + 1} mb-1 block font-mono font-bold`}
                >
                  {g.label} = {g.formula}
                </code>
                <p className='text-muted-foreground text-xs'>{g.meaning}</p>
              </div>
            ))}
          </div>

          {/* Update rules */}
          <div className='bg-muted mb-6 rounded-md p-4'>
            <h4 className='mb-3 font-medium'>Update Rules</h4>
            <div className='space-y-2'>
              {gradientDescentContent.updates.map((u, i) => (
                <code key={i} className='text-primary block font-mono'>
                  {u}
                </code>
              ))}
            </div>
          </div>

          {/* Intuition */}
          <div className='border-chart-2 bg-chart-2/5 mb-6 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-2 mb-1 font-semibold'>Intuition</h4>
            <p className='text-muted-foreground text-sm'>
              {gradientDescentContent.intuition}
            </p>
          </div>

          {/* Learning rate */}
          <div className='border-chart-3 bg-chart-3/5 mb-6 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-3 mb-1 font-semibold'>Learning Rate η</h4>
            <p className='text-muted-foreground text-sm'>
              {gradientDescentContent.learningRate}
            </p>
          </div>

          {/* Loss surface concept */}
          <div className='border-border rounded-md border p-4'>
            <h4 className='mb-3 font-medium'>Loss Surface</h4>
            <div className='flex items-center justify-center'>
              <svg viewBox='0 0 280 140' className='w-full max-w-sm'>
                {/* U-shaped bowl: endpoints high (low y), center dips down (high y) */}
                <path
                  d='M 20 20 C 20 150 260 150 260 20'
                  fill='none'
                  style={{ stroke: 'var(--chart-1)' }}
                  strokeWidth={2}
                />
                {/* Axes */}
                <line
                  x1={20}
                  y1={128}
                  x2={265}
                  y2={128}
                  stroke='currentColor'
                  strokeOpacity={0.3}
                  strokeWidth={1}
                />
                <line
                  x1={20}
                  y1={10}
                  x2={20}
                  y2={130}
                  stroke='currentColor'
                  strokeOpacity={0.3}
                  strokeWidth={1}
                />
                {/* Gradient descent steps — hardcoded positions on cubic bezier C 20 150 260 150 */}
                {(
                  [
                    [245, 70],
                    [222, 93],
                    [208, 102],
                    [176, 114],
                    [140, 118]
                  ] as [number, number][]
                ).map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={4}
                    style={{ fill: 'var(--chart-2)' }}
                    opacity={1 - i * 0.15}
                  />
                ))}
                {/* Minimum ring + tick */}
                <circle
                  cx={140}
                  cy={118}
                  r={6}
                  fill='none'
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeWidth={1.5}
                  opacity={0.6}
                />
                <line
                  x1={140}
                  y1={124}
                  x2={140}
                  y2={129}
                  style={{ stroke: 'var(--chart-2)' }}
                  strokeOpacity={0.7}
                  strokeWidth={1}
                />
                {/* Labels */}
                <text
                  x={270}
                  y={131}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  w
                </text>
                <text
                  x={12}
                  y={14}
                  textAnchor='middle'
                  fontSize={9}
                  fill='currentColor'
                  opacity={0.5}
                >
                  L
                </text>
                <text
                  x={140}
                  y={139}
                  textAnchor='middle'
                  fontSize={8}
                  style={{ fill: 'var(--chart-2)' }}
                  opacity={0.8}
                >
                  minimum
                </text>
              </svg>
            </div>
            <p className='text-muted-foreground mt-2 text-center text-xs'>
              MSE is a convex bowl — gradient descent always finds the global
              minimum.
            </p>
          </div>

          <div className='border-chart-4 bg-chart-4/5 mt-4 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Normal Equation (Exact Solution)
            </h4>
            <p className='text-muted-foreground text-sm'>
              {gradientDescentContent.normalEquation}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
