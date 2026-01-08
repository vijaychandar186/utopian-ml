'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { selfAttentionContent } from '@/pages-content/transformer/content/transformer-content';

export function SelfAttention() {
  const [dimension, setDimension] = useState(
    selfAttentionContent.defaultDimension
  );
  const scaleFactor = Math.sqrt(dimension).toFixed(2);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {selfAttentionContent.title}
      </h2>

      <Card>
        <CardContent className='p-8'>
          <p className='text-muted-foreground mb-4 leading-relaxed'>
            {selfAttentionContent.description}
          </p>

          <div className='border-primary/30 bg-primary/5 mb-6 rounded-md border p-4'>
            <p className='text-primary mb-2 font-medium'>Example:</p>
            <p className='mb-2 font-mono text-sm'>
              &quot;{selfAttentionContent.exampleSentence}&quot;
            </p>
            <p className='text-muted-foreground text-sm'>
              {selfAttentionContent.exampleQuestion}
            </p>
          </div>

          <div className='bg-muted mb-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              <span className='font-medium'>Intuition: </span>
              {selfAttentionContent.intuition}
            </p>
          </div>

          <div className='space-y-4'>
            {selfAttentionContent.steps.map((step, i) => (
              <div
                key={i}
                className='border-border bg-card rounded-md border p-4'
              >
                <div className='mb-2 flex items-center gap-3'>
                  <span className='bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold'>
                    {i + 1}
                  </span>
                  <h4 className='font-semibold'>{step.title}</h4>
                </div>
                <p className='text-muted-foreground mb-2 text-sm leading-relaxed'>
                  {step.description}
                </p>
                {step.badges && (
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {step.badges.map((badge, j) => (
                      <span
                        key={j}
                        className='bg-secondary rounded-full px-3 py-1 text-xs'
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                {step.detail && (
                  <p className='text-muted-foreground mt-2 text-xs italic'>
                    {step.detail}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className='border-primary bg-primary/5 mt-8 rounded-md border-2 p-6'>
            <h4 className='mb-2 text-center font-medium'>
              The Attention Formula
            </h4>
            <p className='text-center font-mono text-lg'>
              {selfAttentionContent.formula}
            </p>
            <p className='text-muted-foreground mt-3 text-center text-sm'>
              {selfAttentionContent.matrixForm}
            </p>
          </div>

          <div className='bg-muted mt-6 rounded-md p-4'>
            <Label className='mb-2 block text-sm font-medium'>
              Try different dimensions (d_k):
            </Label>
            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setDimension(Math.max(16, dimension - 16))}
              >
                −
              </Button>
              <span className='w-16 text-center font-mono'>{dimension}</span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setDimension(Math.min(256, dimension + 16))}
              >
                +
              </Button>
              <span className='text-muted-foreground text-sm'>
                √{dimension} = {scaleFactor} (scale factor)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
