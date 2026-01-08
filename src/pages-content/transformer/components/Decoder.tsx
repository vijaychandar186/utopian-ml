'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { decoderContent } from '@/pages-content/transformer/content/transformer-content';

export function Decoder() {
  const [step, setStep] = useState(0);
  const generationSteps = decoderContent.generationExample.defaultSteps;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{decoderContent.title}</h2>

      <Card>
        <CardContent className='p-8'>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {decoderContent.description}
          </p>

          <div className='mb-6 space-y-4'>
            {decoderContent.differences.map((diff, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4 className={`mb-2 font-semibold text-chart-${(i % 5) + 1}`}>
                  {diff.title}
                </h4>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {diff.description}
                </p>
              </div>
            ))}
          </div>

          <div className='border-border bg-card rounded-md border p-4'>
            <h4 className='mb-4 font-medium'>
              {decoderContent.generationExample.title}
            </h4>

            <div className='bg-secondary mb-4 rounded-md p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium'>
                  Step {step + 1} of {generationSteps.length}
                </span>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                  >
                    ← Previous
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setStep(Math.min(generationSteps.length - 1, step + 1))
                    }
                    disabled={step === generationSteps.length - 1}
                  >
                    Next →
                  </Button>
                </div>
              </div>

              <div className='space-y-3'>
                <div>
                  <span className='text-muted-foreground text-xs'>
                    Input to decoder:
                  </span>
                  <div className='font-mono text-sm'>
                    {generationSteps[step].input}
                  </div>
                </div>

                <div>
                  <span className='text-muted-foreground mb-2 block text-xs'>
                    Predicted next token:
                  </span>
                  <div className='bg-primary text-primary-foreground inline-block rounded px-3 py-1 font-mono text-sm'>
                    {generationSteps[step].output}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap gap-2'>
              {generationSteps.slice(0, step + 1).map((s, i) => (
                <span
                  key={i}
                  className={`rounded px-2 py-1 text-xs ${
                    i === step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s.output}
                </span>
              ))}
            </div>

            <p className='text-muted-foreground mt-4 text-xs italic'>
              {decoderContent.generationExample.note}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
