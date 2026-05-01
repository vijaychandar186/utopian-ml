'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { forwardPassContent } from '@/pages-content/perceptron/content/perceptron-content';

export function ForwardPass() {
  const [inputs, setInputs] = useState(forwardPassContent.defaultInputs);
  const [weights, setWeights] = useState(forwardPassContent.defaultWeights);
  const [bias, setBias] = useState(forwardPassContent.defaultBias);

  const products = useMemo(
    () => inputs.map((x, i) => x * weights[i]),
    [inputs, weights]
  );

  const weightedSum = useMemo(
    () => products.reduce((s, p) => s + p, 0) + bias,
    [products, bias]
  );

  const output = weightedSum >= 0 ? 1 : 0;

  const updateInput = (i: number, val: number) => {
    const next = [...inputs];
    next[i] = val;
    setInputs(next);
  };

  const updateWeight = (i: number, val: number) => {
    const next = [...weights];
    next[i] = val;
    setWeights(next);
  };

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{forwardPassContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {forwardPassContent.description}
          </p>

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Controls */}
            <div className='space-y-5'>
              <div>
                <h4 className='text-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase'>
                  Inputs
                </h4>
                {inputs.map((val, i) => (
                  <div key={i} className='mb-3'>
                    <Label className='mb-1 block text-sm'>
                      {forwardPassContent.inputLabels[i]} ={' '}
                      <span className='text-primary font-mono'>
                        {val.toFixed(2)}
                      </span>
                    </Label>
                    <Slider
                      value={[val]}
                      onValueChange={(v) => updateInput(i, v[0])}
                      min={-1}
                      max={1}
                      step={0.01}
                      className='w-full'
                    />
                  </div>
                ))}
              </div>

              <div>
                <h4 className='text-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase'>
                  Weights
                </h4>
                {weights.map((val, i) => (
                  <div key={i} className='mb-3'>
                    <Label className='mb-1 block text-sm'>
                      {forwardPassContent.weightLabels[i]} ={' '}
                      <span className='text-chart-2 font-mono'>
                        {val.toFixed(2)}
                      </span>
                    </Label>
                    <Slider
                      value={[val]}
                      onValueChange={(v) => updateWeight(i, v[0])}
                      min={-2}
                      max={2}
                      step={0.01}
                      className='w-full'
                    />
                  </div>
                ))}
              </div>

              <div>
                <h4 className='text-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase'>
                  Bias
                </h4>
                <Label className='mb-1 block text-sm'>
                  b ={' '}
                  <span className='text-chart-3 font-mono'>
                    {bias.toFixed(2)}
                  </span>
                </Label>
                <Slider
                  value={[bias]}
                  onValueChange={(v) => setBias(v[0])}
                  min={-2}
                  max={2}
                  step={0.01}
                  className='w-full'
                />
              </div>
            </div>

            {/* Computation trace */}
            <div className='space-y-3'>
              <h4 className='font-medium'>Computation</h4>

              {/* Step 1: products */}
              <div className='bg-muted rounded-md p-4'>
                <div className='text-muted-foreground mb-2 text-xs font-medium uppercase'>
                  Step 1 — Multiply inputs × weights
                </div>
                <div className='space-y-1'>
                  {inputs.map((x, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-2 font-mono text-sm'
                    >
                      <span className='text-primary w-16'>{x.toFixed(2)}</span>
                      <span className='text-muted-foreground'>×</span>
                      <span className='text-chart-2 w-16'>
                        {weights[i].toFixed(2)}
                      </span>
                      <span className='text-muted-foreground'>=</span>
                      <span
                        className={
                          products[i] >= 0 ? 'text-green-500' : 'text-red-400'
                        }
                      >
                        {products[i].toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: weighted sum */}
              <div className='bg-muted rounded-md p-4'>
                <div className='text-muted-foreground mb-2 text-xs font-medium uppercase'>
                  Step 2 — Sum + bias
                </div>
                <div className='font-mono text-sm'>
                  <span>({products.map((p) => p.toFixed(3)).join(' + ')})</span>
                  <span className='text-chart-3'> + {bias.toFixed(2)}</span>
                  <span className='text-muted-foreground'> = </span>
                  <span
                    className={`text-lg font-bold ${weightedSum >= 0 ? 'text-green-500' : 'text-red-400'}`}
                  >
                    z = {weightedSum.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Step 3: activation */}
              <div className='bg-muted rounded-md p-4'>
                <div className='text-muted-foreground mb-2 text-xs font-medium uppercase'>
                  Step 3 — Step activation
                </div>
                <div className='font-mono text-sm'>
                  <span>step({weightedSum.toFixed(4)}) = </span>
                  <span
                    className={`text-2xl font-bold ${output === 1 ? 'text-green-500' : 'text-red-400'}`}
                  >
                    {output}
                  </span>
                  <span className='text-muted-foreground ml-2 text-xs'>
                    ({weightedSum >= 0 ? 'z ≥ 0, fires' : 'z < 0, silent'})
                  </span>
                </div>
              </div>

              {/* Output badge */}
              <div
                className={`rounded-md p-4 text-center ${
                  output === 1
                    ? 'border border-green-500/30 bg-green-500/10'
                    : 'border border-red-500/30 bg-red-500/10'
                }`}
              >
                <div className='text-muted-foreground mb-1 text-xs'>Output</div>
                <div
                  className={`text-4xl font-bold ${output === 1 ? 'text-green-500' : 'text-red-400'}`}
                >
                  ŷ = {output}
                </div>
                <div className='text-muted-foreground mt-1 text-xs'>
                  {output === 1
                    ? 'Class 1 — neuron fires'
                    : 'Class 0 — neuron silent'}
                </div>
              </div>
            </div>
          </div>

          {/* Step-function visualization */}
          <div className='mt-6'>
            <h4 className='mb-3 font-medium'>Step Function</h4>
            <div className='border-border relative h-16 overflow-hidden rounded-md border'>
              <div className='absolute inset-0 flex items-center'>
                <div className='h-full w-1/2 bg-red-400/20' />
                <div className='h-full w-1/2 bg-green-500/20' />
              </div>
              <div className='text-muted-foreground absolute top-1 left-1/2 h-full border-l border-dashed' />
              <div className='text-muted-foreground absolute top-1 left-[calc(50%-12px)] text-xs'>
                z=0
              </div>
              {/* Current z marker */}
              <div
                className='bg-primary absolute top-0 h-full w-0.5 transition-all duration-200'
                style={{
                  left: `${Math.min(95, Math.max(5, 50 + weightedSum * 15))}%`
                }}
              />
              <div className='absolute bottom-1 left-4 font-mono text-xs text-red-400'>
                ŷ = 0
              </div>
              <div className='absolute right-4 bottom-1 font-mono text-xs text-green-500'>
                ŷ = 1
              </div>
            </div>
            <p className='text-muted-foreground mt-1 text-xs'>
              Vertical line = current z = {weightedSum.toFixed(3)}. Left of
              center → output 0. Right → output 1.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
