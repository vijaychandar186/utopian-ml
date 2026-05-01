import { Card, CardContent } from '@/components/ui/card';
import { logisticRegularizationContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

export function LogisticRegularization() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {logisticRegularizationContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {logisticRegularizationContent.description}
          </p>

          <div className='mb-6 grid gap-4 md:grid-cols-3'>
            {logisticRegularizationContent.variants.map((v, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${v.chartColor}`}
              >
                <div className='mb-2 flex items-center gap-2'>
                  <h4 className={`text-chart-${v.chartColor} font-semibold`}>
                    {v.name}
                  </h4>
                  <span
                    className={`rounded bg-chart-${v.chartColor}/10 px-1.5 py-0.5 font-mono text-xs text-chart-${v.chartColor}`}
                  >
                    {v.badge}
                  </span>
                </div>
                <code className='text-foreground mb-2 block font-mono text-xs'>
                  {v.formula}
                </code>
                <p className='text-muted-foreground mb-1 text-xs'>
                  <span className='font-medium'>Effect: </span>
                  {v.effect}
                </p>
                <p className='text-muted-foreground text-xs'>
                  <span className='font-medium'>Bayesian: </span>
                  {v.prior}
                </p>
              </div>
            ))}
          </div>

          <div className='bg-muted border-chart-2 mb-4 rounded-md border-l-[3px] p-4'>
            <h4 className='text-chart-2 mb-1 font-semibold'>
              scikit-learn Note
            </h4>
            <p className='text-muted-foreground text-sm'>
              {logisticRegularizationContent.sklearn}
            </p>
          </div>

          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Why Always Regularize?
            </h4>
            <p className='text-muted-foreground text-sm'>
              {logisticRegularizationContent.biasVariance}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
