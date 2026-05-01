import { Card, CardContent } from '@/components/ui/card';
import { legacyContent } from '@/pages-content/perceptron/content/perceptron-content';

export function Legacy() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{legacyContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {legacyContent.description}
          </p>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {legacyContent.contributions.map((item, i) => (
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

          {/* Timeline */}
          <div className='mt-6'>
            <h4 className='mb-4 font-medium'>Timeline</h4>
            <div className='space-y-3'>
              {[
                {
                  year: '1943',
                  event: 'McCulloch & Pitts: first mathematical neuron model'
                },
                {
                  year: '1958',
                  event: 'Rosenblatt: Perceptron algorithm, Mark I hardware'
                },
                {
                  year: '1962',
                  event: 'Novikoff: Perceptron Convergence Theorem proved'
                },
                {
                  year: '1969',
                  event:
                    'Minsky & Papert: formal proof of XOR limitation → AI winter'
                },
                {
                  year: '1986',
                  event:
                    'Rumelhart, Hinton & Williams: backpropagation for multi-layer nets'
                },
                {
                  year: 'Now',
                  event:
                    'Every linear layer in every neural network uses the perceptron formula'
                }
              ].map((item, i) => (
                <div key={i} className='flex items-start gap-4'>
                  <span className='text-primary bg-primary/10 w-14 flex-shrink-0 rounded px-2 py-0.5 text-center font-mono text-xs'>
                    {item.year}
                  </span>
                  <p className='text-muted-foreground pt-0.5 text-sm'>
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
