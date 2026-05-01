'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bigPictureContent } from '@/pages-content/diffusion-lm/content/diffusion-lm-content';

const AR_STEPS = [
  ['<start>'],
  ['<start>', 'The'],
  ['<start>', 'The', 'cat'],
  ['<start>', 'The', 'cat', 'sat'],
  ['<start>', 'The', 'cat', 'sat', 'on'],
  ['<start>', 'The', 'cat', 'sat', 'on', 'the'],
  ['<start>', 'The', 'cat', 'sat', 'on', 'the', 'mat']
];

const DIFFUSION_STEPS = [
  ['[M]', '[M]', '[M]', '[M]', '[M]', '[M]', '[M]'],
  ['[M]', 'cat', '[M]', '[M]', '[M]', '[M]', '[M]'],
  ['The', 'cat', '[M]', '[M]', 'the', '[M]', '[M]'],
  ['The', 'cat', '[M]', 'on', 'the', '[M]', 'mat'],
  ['The', 'cat', 'sat', 'on', 'the', '[M]', 'mat'],
  ['The', 'cat', 'sat', 'on', 'the', 'old', 'mat'],
  ['The', 'cat', 'sat', 'on', 'the', 'old', 'mat']
];

export function ARvsDiffusion() {
  const [arStep, setArStep] = useState(0);
  const [diffStep, setDiffStep] = useState(0);

  const arTokens = AR_STEPS[arStep];
  const diffTokens = DIFFUSION_STEPS[diffStep];
  const maxStep = AR_STEPS.length - 1;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{bigPictureContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-8 leading-relaxed'>
            {bigPictureContent.description}
          </p>

          {/* Side-by-side interactive comparison */}
          <div className='grid gap-6 md:grid-cols-2'>
            {/* AR Panel */}
            <div className='border-border rounded-md border p-5'>
              <h3 className='text-chart-1 mb-1 font-semibold'>
                {bigPictureContent.ar.title}
              </h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                {bigPictureContent.ar.description}
              </p>

              <div className='bg-muted mb-4 flex min-h-12 flex-wrap items-center gap-2 rounded p-3'>
                {arTokens.map((token, i) => (
                  <span
                    key={i}
                    className={`rounded px-2 py-1 font-mono text-sm transition-all duration-300 ${
                      i === arTokens.length - 1 && arStep > 0
                        ? 'bg-chart-1 text-primary-foreground scale-105'
                        : token === '<start>'
                          ? 'bg-secondary text-muted-foreground text-xs'
                          : 'bg-background border-border border'
                    }`}
                  >
                    {token}
                  </span>
                ))}
                {arStep < maxStep && (
                  <span className='text-muted-foreground animate-pulse font-mono text-lg'>
                    |
                  </span>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setArStep(Math.max(0, arStep - 1))}
                  disabled={arStep === 0}
                >
                  ←
                </Button>
                <span className='text-muted-foreground text-xs'>
                  Step {arStep}/{maxStep}
                </span>
                <Button
                  size='sm'
                  onClick={() => setArStep(Math.min(maxStep, arStep + 1))}
                  disabled={arStep === maxStep}
                >
                  Next token →
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => setArStep(0)}
                  className='ml-auto'
                >
                  Reset
                </Button>
              </div>

              <div className='mt-4 space-y-1'>
                {bigPictureContent.ar.pros.map((p, i) => (
                  <div key={i} className='flex items-start gap-2 text-xs'>
                    <span className='text-green-500'>+</span>
                    <span className='text-muted-foreground'>{p}</span>
                  </div>
                ))}
                {bigPictureContent.ar.cons.map((c, i) => (
                  <div key={i} className='flex items-start gap-2 text-xs'>
                    <span className='text-destructive'>−</span>
                    <span className='text-muted-foreground'>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diffusion Panel */}
            <div className='border-border rounded-md border p-5'>
              <h3 className='text-chart-2 mb-1 font-semibold'>
                {bigPictureContent.diffusion.title}
              </h3>
              <p className='text-muted-foreground mb-4 text-sm'>
                {bigPictureContent.diffusion.description}
              </p>

              <div className='bg-muted mb-4 flex min-h-12 flex-wrap items-center gap-2 rounded p-3'>
                {diffTokens.map((token, i) => {
                  const prevToken =
                    DIFFUSION_STEPS[Math.max(0, diffStep - 1)][i];
                  const justUnmasked =
                    token !== '[M]' && prevToken === '[M]' && diffStep > 0;
                  return (
                    <span
                      key={i}
                      className={`rounded px-2 py-1 font-mono text-sm transition-all duration-300 ${
                        token === '[M]'
                          ? 'bg-secondary text-muted-foreground border-dashed'
                          : justUnmasked
                            ? 'bg-chart-2 text-primary-foreground scale-105'
                            : 'bg-background border-border border'
                      }`}
                    >
                      {token}
                    </span>
                  );
                })}
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setDiffStep(Math.max(0, diffStep - 1))}
                  disabled={diffStep === 0}
                >
                  ←
                </Button>
                <span className='text-muted-foreground text-xs'>
                  Step {diffStep}/{maxStep}
                </span>
                <Button
                  size='sm'
                  onClick={() => setDiffStep(Math.min(maxStep, diffStep + 1))}
                  disabled={diffStep === maxStep}
                >
                  Denoise step →
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => setDiffStep(0)}
                  className='ml-auto'
                >
                  Reset
                </Button>
              </div>

              <div className='mt-4 space-y-1'>
                {bigPictureContent.diffusion.pros.map((p, i) => (
                  <div key={i} className='flex items-start gap-2 text-xs'>
                    <span className='text-green-500'>+</span>
                    <span className='text-muted-foreground'>{p}</span>
                  </div>
                ))}
                {bigPictureContent.diffusion.cons.map((c, i) => (
                  <div key={i} className='flex items-start gap-2 text-xs'>
                    <span className='text-destructive'>−</span>
                    <span className='text-muted-foreground'>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='border-primary/30 bg-primary/5 mt-6 rounded-md border p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-semibold'>
                Key insight:{' '}
              </span>
              AR models predict P(xₙ | x₁…xₙ₋₁)—one token, one direction.
              Diffusion models predict P(x₀ | xₜ)—all tokens, all directions,
              across all noise levels. The same generation capacity,
              fundamentally different inductive bias.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
