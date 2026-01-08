import { Card, CardContent } from '@/components/ui/card';
import { keyInnovationsContent } from '@/pages-content/transformer/content/transformer-content';

export function KeyInnovations() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {keyInnovationsContent.title}
      </h2>

      <Card>
        <CardContent className='p-8'>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {keyInnovationsContent.description}
          </p>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {keyInnovationsContent.innovations.map((innovation, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4 className={`mb-2 font-semibold text-chart-${(i % 5) + 1}`}>
                  {innovation.title}
                </h4>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {innovation.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
