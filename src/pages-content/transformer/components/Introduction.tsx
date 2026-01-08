import { Card, CardContent } from '@/components/ui/card';
import { introductionContent } from '@/pages-content/transformer/content/transformer-content';

export function Introduction() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {introductionContent.title}
      </h2>

      <Card>
        <CardContent className='p-8'>
          <div className='space-y-4'>
            {introductionContent.paragraphs.map((paragraph, i) => (
              <p key={i} className='text-muted-foreground leading-relaxed'>
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
