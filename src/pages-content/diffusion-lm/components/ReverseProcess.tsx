import { Card, CardContent } from '@/components/ui/card';
import { reverseProcessContent } from '@/pages-content/diffusion-lm/content/diffusion-lm-content';

export function ReverseProcess() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {reverseProcessContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {reverseProcessContent.description}
          </p>

          {/* Formula */}
          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-foreground font-mono text-sm'>
              {reverseProcessContent.formula}
            </code>
          </div>

          {/* Architecture diagram */}
          <div className='border-border mb-6 overflow-x-auto rounded-md border p-6'>
            <h4 className='text-muted-foreground mb-4 text-center text-sm font-medium'>
              One Denoising Step
            </h4>
            <div className='flex min-w-max items-center justify-center gap-3'>
              <div className='text-center'>
                <div className='border-border bg-secondary mb-1 rounded px-3 py-2 font-mono text-xs'>
                  xₜ (masked)
                </div>
                <div className='text-muted-foreground text-xs'>
                  e.g. &ldquo;The [M] sat [M]&rdquo;
                </div>
              </div>
              <span className='text-muted-foreground text-xl'>→</span>
              <div className='text-center'>
                <div className='border-primary bg-primary/10 mb-1 rounded border px-4 py-3 text-sm font-semibold'>
                  Bidirectional
                  <br />
                  Transformer
                </div>
                <div className='text-muted-foreground text-xs'>
                  full left + right context
                </div>
              </div>
              <span className='text-muted-foreground text-xl'>→</span>
              <div className='text-center'>
                <div className='border-border bg-chart-2/10 text-chart-2 mb-1 rounded border px-3 py-2 font-mono text-xs'>
                  p(x₀ | xₜ)
                </div>
                <div className='text-muted-foreground text-xs'>
                  vocab distribution
                  <br />
                  at each [M]
                </div>
              </div>
              <span className='text-muted-foreground text-xl'>→</span>
              <div className='text-center'>
                <div className='border-border bg-background mb-1 rounded border px-3 py-2 font-mono text-xs'>
                  xₜ₋₁ (less masked)
                </div>
                <div className='text-muted-foreground text-xs'>
                  unmask high-confidence
                  <br />
                  keep low-confidence masked
                </div>
              </div>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {reverseProcessContent.keyPoints.map((point, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4 className={`mb-2 font-semibold text-chart-${(i % 5) + 1}`}>
                  {point.title}
                </h4>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className='border-primary/30 bg-primary/5 mt-6 rounded-md border p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-semibold'>
                Bidirectionality matters:{' '}
              </span>
              In &ldquo;The [M] sat on the mat&rdquo;, an AR model predicts the
              masked word using only &ldquo;The&rdquo;. A bidirectional denoiser
              sees &ldquo;The&rdquo; and &ldquo;sat on the mat&rdquo;—making
              &ldquo;cat&rdquo; a near-certain prediction where AR would
              struggle.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
