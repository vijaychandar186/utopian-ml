import { Card, CardContent } from '@/components/ui/card';
import { encoderLayerContent } from '@/pages-content/transformer/content/transformer-content';

export function EncoderLayer() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {encoderLayerContent.title}
      </h2>

      <Card>
        <CardContent className='p-8'>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {encoderLayerContent.description}
          </p>

          <div className='space-y-6'>
            <div className='border-primary bg-muted rounded-md border-l-[3px] p-4'>
              <h4 className='text-primary mb-2 font-semibold'>
                {encoderLayerContent.selfAttention.title}
              </h4>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {encoderLayerContent.selfAttention.description}
              </p>
            </div>

            <div className='border-chart-2 bg-muted rounded-md border-l-[3px] p-4'>
              <h4 className='text-chart-2 mb-2 font-semibold'>
                {encoderLayerContent.feedForward.title}
              </h4>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {encoderLayerContent.feedForward.description}
              </p>
            </div>

            <div className='border-chart-3 bg-muted rounded-md border-l-[3px] p-4'>
              <h4 className='text-chart-3 mb-2 font-semibold'>
                {encoderLayerContent.residuals.title}
              </h4>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {encoderLayerContent.residuals.description}
              </p>
            </div>
          </div>

          <div className='mt-8'>
            <h4 className='mb-4 font-medium'>
              Data Flow Through Encoder Layer:
            </h4>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {encoderLayerContent.dataFlow.map((step, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <span className='bg-secondary rounded px-3 py-2 text-xs font-medium'>
                    {step}
                  </span>
                  {i < encoderLayerContent.dataFlow.length - 1 && (
                    <span className='text-muted-foreground'>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
