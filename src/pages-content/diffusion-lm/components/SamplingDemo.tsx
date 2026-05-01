'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { samplingContent } from '@/pages-content/diffusion-lm/content/diffusion-lm-content';

export function SamplingDemo() {
  const steps = samplingContent.defaultSteps;
  const [currentStep, setCurrentStep] = useState(0);

  const current = steps[currentStep];
  const prev = steps[Math.max(0, currentStep - 1)];
  const maxStep = steps.length - 1;
  const progress = (currentStep / maxStep) * 100;

  function getTokenState(token: string, prevToken: string, stepIdx: number) {
    if (token === '[M]') return 'masked';
    if (prevToken === '[M]' && stepIdx > 0) return 'justUnmasked';
    return 'clean';
  }

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{samplingContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {samplingContent.description}
          </p>

          {/* Interactive denoising stepper */}
          <div className='border-border rounded-md border p-6'>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <span className='font-medium'>{current.label}</span>
                <span className='text-muted-foreground ml-2 font-mono text-sm'>
                  t = {current.t.toFixed(1)}
                </span>
              </div>
              <span className='text-muted-foreground text-sm'>
                {currentStep}/{maxStep} steps
              </span>
            </div>

            <Progress value={progress} className='mb-6 h-2' />

            {/* Token display */}
            <div className='mb-6 flex min-h-14 flex-wrap items-center gap-2'>
              {current.tokens.map((token, i) => {
                const prevToken = prev.tokens[i];
                const state = getTokenState(token, prevToken, currentStep);
                return (
                  <span
                    key={i}
                    className={`rounded px-3 py-1.5 font-mono text-sm transition-all duration-400 ${
                      state === 'masked'
                        ? 'bg-secondary text-muted-foreground'
                        : state === 'justUnmasked'
                          ? 'bg-chart-2 text-primary-foreground scale-110'
                          : 'bg-background border-border border'
                    }`}
                  >
                    {token}
                  </span>
                );
              })}
            </div>

            {/* Masked count indicator */}
            <div className='mb-4 flex gap-2'>
              {current.tokens.map((tok, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    tok === '[M]' ? 'bg-secondary' : 'bg-chart-2'
                  }`}
                />
              ))}
            </div>
            <p className='text-muted-foreground mb-4 text-xs'>
              {current.tokens.filter((t) => t !== '[M]').length}/
              {current.tokens.length} tokens revealed
            </p>

            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                ← Back
              </Button>
              <Button
                size='sm'
                onClick={() =>
                  setCurrentStep(Math.min(maxStep, currentStep + 1))
                }
                disabled={currentStep === maxStep}
              >
                Denoise step →
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setCurrentStep(0)}
                className='ml-auto'
              >
                Reset
              </Button>
            </div>
          </div>

          {/* All steps overview */}
          <div className='mt-6'>
            <h4 className='mb-3 font-medium'>All Steps at a Glance</h4>
            <div className='space-y-2'>
              {steps.map((step, si) => (
                <button
                  key={si}
                  onClick={() => setCurrentStep(si)}
                  className={`flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors ${
                    si === currentStep
                      ? 'bg-primary/10 border-primary/30 border'
                      : 'hover:bg-muted'
                  }`}
                >
                  <span className='text-muted-foreground w-20 flex-shrink-0 font-mono text-xs'>
                    t={step.t.toFixed(1)}
                  </span>
                  <div className='flex flex-wrap gap-1'>
                    {step.tokens.map((tok, ti) => (
                      <span
                        key={ti}
                        className={`rounded px-1.5 py-0.5 font-mono text-xs ${
                          tok === '[M]'
                            ? 'bg-secondary text-muted-foreground'
                            : 'bg-background border-border border'
                        }`}
                      >
                        {tok}
                      </span>
                    ))}
                  </div>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sampling strategies */}
          <div className='mt-6'>
            <h4 className='mb-3 font-medium'>Sampling Strategies</h4>
            <div className='grid gap-3 md:grid-cols-3'>
              {samplingContent.strategies.map((s, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <h5
                    className={`mb-1 text-sm font-semibold text-chart-${i + 1}`}
                  >
                    {s.name}
                  </h5>
                  <p className='text-muted-foreground text-xs leading-relaxed'>
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-muted mt-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>
                Speed tradeoff:{' '}
              </span>
              {samplingContent.tradeoffNote}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
