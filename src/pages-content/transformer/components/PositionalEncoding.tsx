'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { positionalEncodingContent } from '@/pages-content/transformer/content/transformer-content';

export function PositionalEncoding() {
  const [position, setPosition] = useState(0);
  const [dimension, setDimension] = useState(
    positionalEncodingContent.defaultDimension
  );

  const encodingValues = useMemo(() => {
    const values: number[] = [];
    for (let i = 0; i < 8; i++) {
      const divTerm = Math.pow(10000, (2 * i) / dimension);
      if (i % 2 === 0) {
        values.push(Math.sin(position / divTerm));
      } else {
        values.push(Math.cos(position / divTerm));
      }
    }
    return values;
  }, [position, dimension]);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {positionalEncodingContent.title}
      </h2>

      <Card>
        <CardContent className='p-8'>
          <div className='border-destructive bg-destructive/5 mb-6 rounded-md border-l-[3px] p-4'>
            <h4 className='text-destructive mb-2 font-semibold'>
              {positionalEncodingContent.problem.title}
            </h4>
            <p className='text-muted-foreground text-sm'>
              {positionalEncodingContent.problem.description}
            </p>
          </div>

          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {positionalEncodingContent.solution}
          </p>

          <div className='border-primary bg-primary/5 mb-6 rounded-md border-2 p-4'>
            <h4 className='mb-2 text-center font-medium'>
              Positional Encoding Formulas:
            </h4>
            {positionalEncodingContent.formulas.map((formula, i) => (
              <p key={i} className='text-center font-mono text-sm'>
                {formula}
              </p>
            ))}
          </div>

          <div className='bg-muted mb-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              <span className='font-medium'>Intuition: </span>
              {positionalEncodingContent.intuition}
            </p>
          </div>

          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Why Sinusoidal?</h4>
            <div className='space-y-2'>
              {positionalEncodingContent.whySinusoidal.map((reason, i) => (
                <div key={i} className='flex items-start gap-2'>
                  <span className='text-primary'>•</span>
                  <p className='text-muted-foreground text-sm'>{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-muted mb-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='font-medium'>Visualization: </span>
              {positionalEncodingContent.visualization}
            </p>
          </div>

          <div className='border-border bg-card rounded-md border p-4'>
            <h4 className='mb-4 font-medium'>
              Positional Encoding Calculator
            </h4>
            <div className='mb-4 grid gap-4 md:grid-cols-2'>
              <div>
                <Label className='mb-2 block text-sm'>Position:</Label>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setPosition(Math.max(0, position - 1))}
                  >
                    −
                  </Button>
                  <span className='w-12 text-center font-mono'>{position}</span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setPosition(Math.min(99, position + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <Label className='mb-2 block text-sm'>d_model:</Label>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setDimension(Math.max(32, dimension - 32))}
                  >
                    −
                  </Button>
                  <span className='w-12 text-center font-mono'>
                    {dimension}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setDimension(Math.min(1024, dimension + 32))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <Label className='mb-2 block text-sm'>
              First 8 encoding values for position {position}:
            </Label>
            <div className='grid grid-cols-4 gap-2'>
              {encodingValues.map((value, i) => (
                <div
                  key={i}
                  className='bg-secondary rounded p-2 text-center text-xs'
                >
                  <span className='text-muted-foreground block'>
                    dim {i} ({i % 2 === 0 ? 'sin' : 'cos'})
                  </span>
                  <span className='font-mono font-medium'>
                    {value.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-muted mt-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='font-medium'>Modern Alternatives: </span>
              {positionalEncodingContent.modernAlternatives}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
