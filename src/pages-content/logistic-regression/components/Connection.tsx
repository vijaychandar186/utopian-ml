import { Card, CardContent } from '@/components/ui/card';
import { connectionContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

export function Connection() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{connectionContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {connectionContent.description}
          </p>

          {/* Single neuron diagram */}
          <div className='border-border mb-6 overflow-x-auto rounded-md border p-6'>
            <h4 className='text-muted-foreground mb-4 text-center text-sm font-medium'>
              Logistic Regression = One Sigmoid Neuron
            </h4>
            <div className='flex min-w-max items-center justify-center gap-3'>
              <div className='flex flex-col gap-2'>
                {['x₁', 'x₂', 'x₃'].map((l, i) => (
                  <div
                    key={i}
                    className='bg-secondary border-border rounded border px-3 py-1 font-mono text-sm'
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className='text-muted-foreground'>→ w₁,w₂,w₃ →</div>
              <div className='border-primary bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full border-2'>
                <span className='text-primary text-xs font-bold'>Σ+b</span>
              </div>
              <div className='text-muted-foreground'>→</div>
              <div className='border-chart-2 bg-chart-2/10 flex h-14 w-14 items-center justify-center rounded-full border-2'>
                <span className='text-chart-2 text-xs font-bold'>σ(z)</span>
              </div>
              <div className='text-muted-foreground'>→</div>
              <div className='border-chart-3 bg-chart-3/10 rounded border px-3 py-2 text-center'>
                <div className='text-chart-3 font-mono font-bold'>p</div>
                <div className='text-muted-foreground text-xs'>[0,1]</div>
              </div>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {connectionContent.connections.map((item, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4 className={`mb-2 font-semibold text-chart-${(i % 5) + 1}`}>
                  {item.title}
                </h4>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
