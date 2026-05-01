'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { forwardProcessContent } from '@/pages-content/diffusion-lm/content/diffusion-lm-content';

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function ForwardProcess() {
  const [noiseLevel, setNoiseLevel] = useState(0.5);

  const sentence = forwardProcessContent.exampleSentence;

  const maskedTokens = useMemo(() => {
    const rng = seededRandom(Math.round(noiseLevel * 100));
    return sentence.map((token) => (rng() < noiseLevel ? '[M]' : token));
  }, [noiseLevel, sentence]);

  const maskedCount = maskedTokens.filter((t) => t === '[M]').length;

  const noiseLevelSteps = [0, 0.25, 0.5, 0.75, 1.0];

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {forwardProcessContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {forwardProcessContent.description}
          </p>

          {/* Formula */}
          <div className='bg-muted mb-6 rounded-md p-4 text-center'>
            <code className='text-foreground font-mono text-sm'>
              {forwardProcessContent.formula}
            </code>
          </div>

          {/* Interactive masking demo */}
          <div className='border-border rounded-md border p-6'>
            <Label className='mb-4 block font-medium'>
              Noise Level t = {noiseLevel.toFixed(2)}{' '}
              <span className='text-muted-foreground font-normal'>
                ({maskedCount}/{sentence.length} tokens masked)
              </span>
            </Label>

            <Slider
              value={[noiseLevel]}
              onValueChange={(v) => setNoiseLevel(v[0])}
              min={0}
              max={1}
              step={0.01}
              className='mb-6 w-full'
            />

            <div className='flex flex-wrap gap-2'>
              {maskedTokens.map((token, i) => (
                <span
                  key={i}
                  className={`rounded px-3 py-1.5 font-mono text-sm transition-all duration-200 ${
                    token === '[M]'
                      ? 'bg-secondary text-muted-foreground'
                      : 'bg-primary/10 text-primary border-primary/20 border'
                  }`}
                >
                  {token}
                </span>
              ))}
            </div>

            <div className='text-muted-foreground mt-3 text-xs'>
              Each token independently masked with probability t ={' '}
              {noiseLevel.toFixed(2)}
            </div>
          </div>

          {/* Noise level snapshots */}
          <div className='mt-6'>
            <h4 className='mb-3 font-medium'>
              Forward Process at Fixed Timesteps
            </h4>
            <div className='space-y-3'>
              {noiseLevelSteps.map((t) => {
                const rng = seededRandom(Math.round(t * 100));
                const tokens = sentence.map((tok) => (rng() < t ? '[M]' : tok));
                return (
                  <div key={t} className='flex items-center gap-4'>
                    <span className='text-muted-foreground w-12 flex-shrink-0 font-mono text-xs'>
                      t={t.toFixed(2)}
                    </span>
                    <div className='flex flex-wrap gap-1.5'>
                      {tokens.map((token, i) => (
                        <span
                          key={i}
                          className={`rounded px-2 py-0.5 font-mono text-xs ${
                            token === '[M]'
                              ? 'bg-secondary text-muted-foreground'
                              : 'bg-background border-border border'
                          }`}
                        >
                          {token}
                        </span>
                      ))}
                    </div>
                    {t === 0 && (
                      <span className='text-muted-foreground text-xs'>
                        ← clean text
                      </span>
                    )}
                    {t === 1 && (
                      <span className='text-muted-foreground text-xs'>
                        ← pure noise
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className='bg-muted mt-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>
                Why absorbing states?{' '}
              </span>
              {forwardProcessContent.whyAbsorbing}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
