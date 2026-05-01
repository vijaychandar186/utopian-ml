import { Card, CardContent } from '@/components/ui/card';
import { introductionContent } from '@/pages-content/linear-regression/content/linear-regression-content';

export function Introduction() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {introductionContent.title}
      </h2>
      <Card>
        <CardContent>
          <div className='space-y-4'>
            {introductionContent.paragraphs.map((p, i) => (
              <p key={i} className='text-muted-foreground leading-relaxed'>
                {p}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
