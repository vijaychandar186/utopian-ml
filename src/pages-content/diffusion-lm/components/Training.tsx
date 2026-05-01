import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trainingContent } from '@/pages-content/diffusion-lm/content/diffusion-lm-content';

export function Training() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{trainingContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {trainingContent.description}
          </p>

          {/* Training phases */}
          <div className='mb-6 grid gap-4 md:grid-cols-2'>
            {trainingContent.phases.map((phase, i) => (
              <div
                key={i}
                className={`border-border rounded-md border border-l-[3px] p-5 border-chart-${i + 1}`}
              >
                <div className='mb-2 flex items-center gap-2'>
                  <Badge
                    variant='outline'
                    className={`text-chart-${i + 1} border-chart-${i + 1}`}
                  >
                    {phase.badge}
                  </Badge>
                  <h4 className={`font-semibold text-chart-${i + 1}`}>
                    {phase.title}
                  </h4>
                </div>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          {/* Loss formula */}
          <div className='bg-muted mb-6 rounded-md p-4'>
            <h4 className='mb-2 font-medium'>Training Objective</h4>
            <div className='mb-3 overflow-x-auto rounded bg-black/5 p-3 text-center dark:bg-white/5'>
              <code className='text-foreground font-mono text-sm'>
                {trainingContent.lossFormula}
              </code>
            </div>
            <p className='text-muted-foreground text-sm'>
              {trainingContent.lossNote}
            </p>
          </div>

          {/* Training loop */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Training Loop</h4>
            <div className='flex flex-wrap items-center gap-2'>
              {trainingContent.trainingLoop.map((step, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <span className='bg-secondary rounded px-3 py-1 text-xs'>
                    {i + 1}. {step}
                  </span>
                  {i < trainingContent.trainingLoop.length - 1 && (
                    <span className='text-muted-foreground'>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SFT diagram */}
          <div className='border-border rounded-md border p-5'>
            <h4 className='mb-4 font-medium'>
              SFT: Prompt is Fixed, Response is Masked
            </h4>
            <div className='flex flex-wrap gap-2'>
              {['What', 'is', 'the', 'capital', 'of', 'France?'].map(
                (tok, i) => (
                  <span
                    key={i}
                    className='bg-chart-1/10 text-chart-1 border-chart-1/30 rounded border px-2 py-1 font-mono text-xs'
                  >
                    {tok}
                  </span>
                )
              )}
              <span className='text-muted-foreground flex items-center px-1 text-xs'>
                →
              </span>
              {['[M]', '[M]', '[M]'].map((tok, i) => (
                <span
                  key={i}
                  className='bg-secondary text-muted-foreground rounded px-2 py-1 font-mono text-xs'
                >
                  {tok}
                </span>
              ))}
            </div>
            <p className='text-muted-foreground mt-3 text-xs'>
              Prompt tokens (blue) are always visible. Response tokens are
              masked at rate t. Loss is only computed on masked response
              tokens—not the prompt.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
