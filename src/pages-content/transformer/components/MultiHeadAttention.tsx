'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { multiHeadAttentionContent } from '@/pages-content/transformer/content/transformer-content';

export function MultiHeadAttention() {
  const [numHeads, setNumHeads] = useState(
    multiHeadAttentionContent.defaultNumHeads
  );
  const headDimension = Math.floor(512 / numHeads);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {multiHeadAttentionContent.title}
      </h2>

      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {multiHeadAttentionContent.description}
          </p>

          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Why Multiple Heads?</h4>
            <div className='grid gap-3 md:grid-cols-2'>
              {multiHeadAttentionContent.whyMultipleHeads.map((reason, i) => (
                <div
                  key={i}
                  className='bg-muted flex items-start gap-2 rounded-md p-3'
                >
                  <span className='bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs'>
                    {i + 1}
                  </span>
                  <p className='text-muted-foreground text-sm'>{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='border-chart-2 bg-muted mb-6 rounded-md border-l-[3px] p-4'>
            <h4 className='mb-2 font-medium'>Example:</h4>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {multiHeadAttentionContent.example}
            </p>
          </div>

          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Process:</h4>
            <div className='space-y-2'>
              {multiHeadAttentionContent.process.map((step, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <span className='bg-chart-3 text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs'>
                    {i + 1}
                  </span>
                  <p className='text-muted-foreground text-sm'>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='border-primary bg-primary/5 mb-6 rounded-md border-2 p-4'>
            <p className='mb-2 text-center font-mono'>
              {multiHeadAttentionContent.formula}
            </p>
            <p className='text-muted-foreground text-center font-mono text-sm'>
              {multiHeadAttentionContent.headFormula}
            </p>
          </div>

          <div className='bg-muted rounded-md p-4'>
            <Label className='mb-2 block text-sm font-medium'>
              Number of Attention Heads:
            </Label>
            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setNumHeads(Math.max(1, numHeads - 1))}
              >
                −
              </Button>
              <span className='w-12 text-center font-mono'>{numHeads}</span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setNumHeads(Math.min(16, numHeads + 1))}
              >
                +
              </Button>
            </div>
            <p className='text-muted-foreground mt-3 text-sm'>
              With {numHeads} heads and d_model=512: each head processes vectors
              of dimension <span className='font-mono'>{headDimension}</span>
            </p>
            <div className='mt-4 flex flex-wrap gap-2'>
              {Array.from({ length: numHeads }, (_, i) => (
                <div
                  key={i}
                  className={`text-primary-foreground rounded px-3 py-2 text-xs bg-chart-${(i % 5) + 1}`}
                >
                  Head {i + 1}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
