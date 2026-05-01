import { Card, CardContent } from '@/components/ui/card';
import { lossContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

export function LossFunction() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{lossContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {lossContent.description}
          </p>

          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-primary font-mono'>
              {lossContent.formula}
            </code>
          </div>

          {/* Intuition table */}
          <h4 className='mb-3 font-medium'>Loss Intuition (for y=1 case)</h4>
          <div className='mb-6 overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-border border-b'>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Scenario
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Loss
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Interpretation
                  </th>
                </tr>
              </thead>
              <tbody>
                {lossContent.intuition.map((row, i) => (
                  <tr key={i} className='border-border border-b'>
                    <td className='py-2 font-mono text-xs'>{row.case}</td>
                    <td
                      className={`py-2 font-mono font-bold ${i === 2 ? 'text-destructive' : i === 0 ? 'text-green-500' : 'text-chart-3'}`}
                    >
                      {row.loss}
                    </td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gradients */}
          <h4 className='mb-3 font-medium'>Gradients</h4>
          <div className='mb-6 grid gap-3 md:grid-cols-2'>
            {lossContent.gradients.map((g, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${i + 1}`}
              >
                <code
                  className={`text-chart-${i + 1} mb-1 block font-mono text-sm font-bold`}
                >
                  {g.label} = {g.formula}
                </code>
                <p className='text-muted-foreground text-xs'>{g.note}</p>
              </div>
            ))}
          </div>

          <div className='border-destructive/30 bg-destructive/5 rounded-md border p-4'>
            <h4 className='text-destructive mb-1 font-semibold'>
              Why not MSE?
            </h4>
            <p className='text-muted-foreground text-sm'>{lossContent.vsMSE}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
