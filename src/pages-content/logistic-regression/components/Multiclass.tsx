import { Card, CardContent } from '@/components/ui/card';
import { multiclassContent } from '@/pages-content/logistic-regression/content/logistic-regression-content';

export function Multiclass() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{multiclassContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {multiclassContent.description}
          </p>

          {/* Softmax formula */}
          <div className='bg-muted border-chart-1 mb-6 rounded-md border-l-[3px] p-4'>
            <code className='text-chart-1 mb-1 block font-mono font-bold'>
              {multiclassContent.softmax.formula}
            </code>
            <p className='text-muted-foreground text-sm'>
              {multiclassContent.softmax.description}
            </p>
          </div>

          {/* Softmax diagram */}
          <div className='border-border mb-6 overflow-x-auto rounded-md border p-6'>
            <h4 className='text-muted-foreground mb-4 text-center text-sm font-medium'>
              Softmax Layer (K=3 classes)
            </h4>
            <div className='flex min-w-max items-center justify-center gap-4'>
              <div className='flex flex-col gap-2'>
                {['x₁', 'x₂', 'x₃'].map((l, i) => (
                  <div
                    key={i}
                    className='bg-secondary border-border rounded border px-3 py-1 text-center font-mono text-sm'
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className='text-muted-foreground text-xs'>→ W,b →</div>
              <div className='flex flex-col gap-2'>
                {['z₁', 'z₂', 'z₃'].map((l, i) => (
                  <div
                    key={i}
                    className={`border-chart-${i + 1} bg-chart-${i + 1}/10 rounded border px-3 py-1 text-center`}
                  >
                    <span
                      className={`text-chart-${i + 1} font-mono text-sm font-bold`}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
              <div className='text-muted-foreground text-xs'>→ softmax →</div>
              <div className='flex flex-col gap-2'>
                {['p₁', 'p₂', 'p₃'].map((l, i) => (
                  <div
                    key={i}
                    className={`border-chart-${i + 1} bg-chart-${i + 1}/10 rounded border px-3 py-1 text-center`}
                  >
                    <span
                      className={`text-chart-${i + 1} font-mono text-sm font-bold`}
                    >
                      {l}
                    </span>
                  </div>
                ))}
              </div>
              <div className='text-muted-foreground text-center text-xs'>
                → argmax →<br />ŷ
              </div>
            </div>
            <p className='text-muted-foreground mt-3 text-center text-xs'>
              p₁ + p₂ + p₃ = 1.0 always
            </p>
          </div>

          {/* Properties */}
          <div className='mb-6 grid gap-3 sm:grid-cols-2'>
            {multiclassContent.properties.map((p, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
              >
                <h5
                  className={`text-chart-${i + 1} mb-0.5 text-sm font-semibold`}
                >
                  {p.name}
                </h5>
                <p className='text-muted-foreground text-xs'>{p.description}</p>
              </div>
            ))}
          </div>

          {/* Loss */}
          <div className='border-chart-4 bg-chart-4/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-4 mb-2 font-semibold'>
              Categorical Cross-Entropy Loss
            </h4>
            <code className='text-foreground mb-2 block font-mono text-xs'>
              {multiclassContent.loss.formula}
            </code>
            <p className='text-muted-foreground text-sm'>
              {multiclassContent.loss.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
