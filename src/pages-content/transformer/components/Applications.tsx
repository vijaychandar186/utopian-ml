import { Card, CardContent } from '@/components/ui/card';
import { applicationsContent } from '@/pages-content/transformer/content/transformer-content';

export function Applications() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {applicationsContent.title}
      </h2>

      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {applicationsContent.description}
          </p>

          <div className='grid gap-6 md:grid-cols-3'>
            {applicationsContent.categories.map((category, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4 className={`mb-3 font-semibold text-chart-${(i % 5) + 1}`}>
                  {category.title}
                </h4>
                <ul className='space-y-2'>
                  {category.items.map((item, j) => (
                    <li key={j} className='flex items-start gap-2 text-sm'>
                      <span className={`mt-1 text-chart-${(i % 5) + 1}`}>
                        •
                      </span>
                      <span className='text-muted-foreground'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
