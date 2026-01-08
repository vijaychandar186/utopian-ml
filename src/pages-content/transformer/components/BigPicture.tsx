'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bigPictureContent } from '@/pages-content/transformer/content/transformer-content';

export function BigPicture() {
  const [numLayers, setNumLayers] = useState(
    bigPictureContent.defaultNumLayers
  );

  const layerColors = [
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
    'bg-primary'
  ];

  const layers = Array.from(
    { length: numLayers },
    (_, i) => `Layer ${numLayers - i}`
  );

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{bigPictureContent.title}</h2>

      <Card>
        <CardContent className='p-8'>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {bigPictureContent.description}
          </p>

          <div className='my-8 flex flex-wrap items-center justify-center gap-4'>
            <div className='bg-secondary text-secondary-foreground rounded-md px-4 py-2 text-sm font-medium'>
              Input: &quot;{bigPictureContent.defaultInput}&quot;
            </div>
            <span className='text-muted-foreground'>→</span>
            <div className='bg-primary text-primary-foreground rounded-md px-6 py-4 text-sm font-bold'>
              TRANSFORMER
            </div>
            <span className='text-muted-foreground'>→</span>
            <div className='bg-secondary text-secondary-foreground rounded-md px-4 py-2 text-sm font-medium'>
              Output: &quot;{bigPictureContent.defaultOutput}&quot;
            </div>
          </div>

          <div className='mt-8 grid gap-6 md:grid-cols-2'>
            <div className='border-border bg-accent rounded-md border p-6'>
              <h3 className='text-primary mb-2 font-semibold'>
                {bigPictureContent.encoder.title}
              </h3>
              <p className='text-muted-foreground text-sm'>
                {bigPictureContent.encoder.description}
              </p>
            </div>
            <div className='border-border bg-accent rounded-md border p-6'>
              <h3 className='text-primary mb-2 font-semibold'>
                {bigPictureContent.decoder.title}
              </h3>
              <p className='text-muted-foreground text-sm'>
                {bigPictureContent.decoder.description}
              </p>
            </div>
          </div>

          <div className='mt-8'>
            <div className='mb-4 flex items-center gap-4'>
              <h3 className='font-medium'>Stacked Layers (N={numLayers})</h3>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setNumLayers(Math.max(1, numLayers - 1))}
                >
                  −
                </Button>
                <span className='w-8 text-center text-sm'>{numLayers}</span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setNumLayers(Math.min(12, numLayers + 1))}
                >
                  +
                </Button>
              </div>
            </div>
            <div className='flex justify-center gap-8'>
              <div className='space-y-2'>
                <div className='text-muted-foreground mb-2 text-center text-xs font-medium'>
                  Encoder Stack
                </div>
                {layers.map((layer, i) => (
                  <div
                    key={`encoder-${i}`}
                    className={`text-primary-foreground w-24 rounded py-2 text-center text-xs ${layerColors[i % layerColors.length]}`}
                  >
                    {layer}
                  </div>
                ))}
              </div>
              <div className='space-y-2'>
                <div className='text-muted-foreground mb-2 text-center text-xs font-medium'>
                  Decoder Stack
                </div>
                {layers.map((layer, i) => (
                  <div
                    key={`decoder-${i}`}
                    className={`text-primary-foreground w-24 rounded py-2 text-center text-xs ${layerColors[i % layerColors.length]}`}
                  >
                    {layer}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
