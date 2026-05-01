import { Card, CardContent } from '@/components/ui/card';
import { anatomyContent } from '@/pages-content/perceptron/content/perceptron-content';

export function Anatomy() {
  const inputs = ['x₁', 'x₂', 'x₃'];

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{anatomyContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {anatomyContent.description}
          </p>

          {/* Neuron diagram */}
          <div className='border-border mb-8 overflow-x-auto rounded-md border p-6'>
            <div className='flex min-w-max items-center justify-center gap-4'>
              {/* Inputs */}
              <div className='flex flex-col gap-4'>
                {inputs.map((label, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <div className='bg-secondary border-border rounded border px-3 py-1.5 font-mono text-sm'>
                      {label}
                    </div>
                    <div className='text-muted-foreground text-xs'>
                      × w{i + 1}
                    </div>
                  </div>
                ))}
                <div className='flex items-center gap-2'>
                  <div className='bg-secondary border-border rounded border px-3 py-1.5 font-mono text-sm'>
                    1
                  </div>
                  <div className='text-muted-foreground text-xs'>× b</div>
                </div>
              </div>

              {/* Arrow */}
              <div className='flex flex-col items-center gap-1'>
                <div className='text-muted-foreground text-2xl'>→</div>
                <div className='text-muted-foreground text-xs'>Σ</div>
              </div>

              {/* Summation node */}
              <div className='border-primary bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full border-2'>
                <span className='text-primary text-xl font-bold'>Σ</span>
              </div>

              {/* Arrow + z */}
              <div className='flex flex-col items-center'>
                <div className='text-muted-foreground text-2xl'>→</div>
                <div className='text-muted-foreground font-mono text-xs'>z</div>
              </div>

              {/* Activation */}
              <div className='border-chart-2 bg-chart-2/10 flex h-16 w-16 items-center justify-center rounded-full border-2'>
                <span className='text-chart-2 text-xs font-bold'>step(z)</span>
              </div>

              {/* Arrow + output */}
              <div className='flex flex-col items-center'>
                <div className='text-muted-foreground text-2xl'>→</div>
              </div>

              {/* Output */}
              <div className='border-chart-3 bg-chart-3/10 rounded border-2 px-4 py-3 text-center'>
                <div className='text-chart-3 font-mono font-bold'>ŷ</div>
                <div className='text-muted-foreground text-xs'>0 or 1</div>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-foreground font-mono text-sm'>
              {anatomyContent.formula}
            </code>
          </div>

          {/* Component explanations */}
          <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {anatomyContent.components.map((comp, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4
                  className={`mb-2 font-mono font-semibold text-chart-${(i % 5) + 1}`}
                >
                  {comp.name}
                </h4>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {comp.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
