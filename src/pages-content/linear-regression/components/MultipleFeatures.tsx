import { Card, CardContent } from '@/components/ui/card';
import { featuresContent } from '@/pages-content/linear-regression/content/linear-regression-content';

export function MultipleFeatures() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{featuresContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {featuresContent.description}
          </p>

          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-primary font-mono'>
              {featuresContent.matrixForm}
            </code>
          </div>

          <div className='mb-6 grid gap-4 md:grid-cols-2'>
            {featuresContent.examples.map((ex, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${i + 1}`}
              >
                <h4 className={`text-chart-${i + 1} mb-2 font-semibold`}>
                  {ex.task}
                </h4>
                <div className='mb-2 flex flex-wrap gap-1'>
                  {ex.features.map((f, j) => (
                    <span
                      key={j}
                      className='bg-secondary rounded px-2 py-0.5 font-mono text-xs'
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <code className='text-foreground text-xs'>{ex.formula}</code>
              </div>
            ))}
          </div>

          <div className='border-primary/30 bg-primary/5 rounded-md border p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-semibold'>
                Connection to deep learning:{' '}
              </span>
              {featuresContent.connectionToNN}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
