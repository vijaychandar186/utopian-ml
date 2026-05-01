import { Card, CardContent } from '@/components/ui/card';
import { lossContent } from '@/pages-content/linear-regression/content/linear-regression-content';

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
            <code className='text-primary font-mono text-lg'>
              {lossContent.formula}
            </code>
          </div>

          <h4 className='mb-3 font-medium'>Why squared error?</h4>
          <div className='mb-6 grid gap-3 md:grid-cols-3'>
            {lossContent.whySquared.map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${i + 1}`}
              >
                <h5 className={`mb-2 font-semibold text-chart-${i + 1}`}>
                  {item.title}
                </h5>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h4 className='mb-3 font-medium'>Alternative Loss Functions</h4>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-border border-b'>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Name
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Formula
                  </th>
                  <th className='text-muted-foreground pb-2 text-left font-medium'>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {lossContent.alternativeLosses.map((l, i) => (
                  <tr key={i} className='border-border border-b'>
                    <td className='py-2 font-semibold'>{l.name}</td>
                    <td className='py-2 font-mono text-xs'>{l.formula}</td>
                    <td className='text-muted-foreground py-2 text-xs'>
                      {l.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
