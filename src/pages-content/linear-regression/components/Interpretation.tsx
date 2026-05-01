import { Card, CardContent } from '@/components/ui/card';
import { interpretationContent } from '@/pages-content/linear-regression/content/linear-regression-content';

export function Interpretation() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {interpretationContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {interpretationContent.description}
          </p>

          {/* Partial effect */}
          <div className='bg-muted border-chart-1 mb-6 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-1 mb-1 block font-mono font-bold'>
              {interpretationContent.partialEffect.formula}
            </code>
            <p className='text-muted-foreground text-sm'>
              {interpretationContent.partialEffect.explanation}
            </p>
          </div>

          {/* Example */}
          {interpretationContent.examples.map((ex, i) => (
            <div key={i} className='mb-6 rounded-md border p-4'>
              <h4 className='mb-3 font-medium'>Example</h4>
              <div className='bg-muted mb-3 rounded p-3'>
                <code className='text-primary font-mono text-xs'>
                  {ex.model}
                </code>
              </div>
              <ul className='space-y-1.5'>
                {ex.interpretations.map((item, j) => (
                  <li key={j} className='flex items-start gap-2'>
                    <span className={`text-chart-${j + 1} mt-0.5 shrink-0`}>
                      →
                    </span>
                    <span className='text-muted-foreground text-sm'>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Standardized coefficients */}
          <div className='border-chart-2 bg-muted mb-6 rounded-md border-l-[3px] p-4'>
            <h4 className='text-chart-2 mb-1 font-semibold'>
              {interpretationContent.standardized.title}
            </h4>
            <code className='text-chart-2 mb-2 block font-mono text-xs'>
              {interpretationContent.standardized.formula}
            </code>
            <p className='text-muted-foreground text-sm'>
              {interpretationContent.standardized.description}
            </p>
          </div>

          {/* Multicollinearity warning */}
          <div className='border-destructive bg-destructive/5 rounded-md border-l-4 p-4'>
            <h4 className='text-destructive mb-1 font-semibold'>
              {interpretationContent.multicollinearity.title}
            </h4>
            <p className='text-muted-foreground text-sm'>
              {interpretationContent.multicollinearity.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
