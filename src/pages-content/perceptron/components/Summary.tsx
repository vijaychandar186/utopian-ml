import { Card, CardContent } from '@/components/ui/card';
import { summaryContent } from '@/pages-content/perceptron/content/perceptron-content';

export function Summary() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{summaryContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {summaryContent.intro}
          </p>
          <div className='mb-6 space-y-3'>
            {summaryContent.steps.map((step, i) => (
              <div key={i} className='flex items-start gap-3'>
                <span className='bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs'>
                  {i + 1}
                </span>
                <p className='text-muted-foreground text-sm'>
                  <span className='text-foreground font-semibold'>
                    {step.bold}:{' '}
                  </span>
                  {step.text
                    .replace(step.bold + ':', '')
                    .trim()
                    .replace(/^: /, '')}
                </p>
              </div>
            ))}
          </div>
          <div className='border-primary bg-primary/5 rounded-md border-2 p-6'>
            <p className='text-muted-foreground text-center text-sm italic'>
              &quot;{summaryContent.quote}&quot;
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
