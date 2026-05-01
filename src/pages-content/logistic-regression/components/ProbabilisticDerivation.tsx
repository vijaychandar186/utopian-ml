import { Card, CardContent } from '@/components/ui/card';
import { probabilisticDerivationContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

export function ProbabilisticDerivation() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {probabilisticDerivationContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {probabilisticDerivationContent.description}
          </p>

          {/* Bernoulli model */}
          <div className='bg-muted border-chart-1 mb-4 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-1 mb-1 block font-mono font-bold'>
              {probabilisticDerivationContent.bernoulliModel.formula}
            </code>
            <p className='text-muted-foreground text-sm'>
              {probabilisticDerivationContent.bernoulliModel.description}
            </p>
          </div>

          {/* Derivation steps */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>MLE Derivation</h4>
            <div className='space-y-2'>
              {probabilisticDerivationContent.derivation.map((d, i) => (
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

          {/* vs Linear regression */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Linear vs Logistic Regression</h4>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-border border-b'>
                    <th className='text-muted-foreground pb-2 text-left text-xs font-medium'>
                      Aspect
                    </th>
                    <th className='text-chart-2 pb-2 text-left text-xs font-medium'>
                      Linear
                    </th>
                    <th className='text-chart-1 pb-2 text-left text-xs font-medium'>
                      Logistic
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {probabilisticDerivationContent.vsLinear.map((row, i) => (
                    <tr key={i} className='border-border border-b'>
                      <td className='py-2 text-xs font-medium'>{row.aspect}</td>
                      <td className='text-muted-foreground py-2 font-mono text-xs'>
                        {row.linear}
                      </td>
                      <td className='text-muted-foreground py-2 font-mono text-xs'>
                        {row.logistic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-1 font-semibold'>
              Gradient Elegance
            </h4>
            <p className='text-muted-foreground text-sm'>
              {probabilisticDerivationContent.insight}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
