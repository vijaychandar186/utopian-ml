'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { outputLayerContent } from '@/pages-content/transformer/content/transformer-content';

export function OutputLayer() {
  const [temperature, setTemperature] = useState(1.0);
  const logits = outputLayerContent.examplePredictions.map((p) => p.logit);

  const probabilities = useMemo(() => {
    const scaledLogits = logits.map((l) => l / temperature);
    const maxLogit = Math.max(...scaledLogits);
    const expLogits = scaledLogits.map((l) => Math.exp(l - maxLogit));
    const sumExp = expLogits.reduce((a, b) => a + b, 0);
    return expLogits.map((e) => e / sumExp);
  }, [logits, temperature]);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{outputLayerContent.title}</h2>

      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {outputLayerContent.description}
          </p>

          <div className='mb-6 grid gap-6 md:grid-cols-2'>
            <div className='border-chart-1 bg-muted rounded-md border-l-[3px] p-4'>
              <h4 className='text-chart-1 mb-2 font-semibold'>
                {outputLayerContent.linear.title}
              </h4>
              <p className='text-muted-foreground text-sm'>
                {outputLayerContent.linear.description}
              </p>
            </div>
            <div className='border-chart-2 bg-muted rounded-md border-l-[3px] p-4'>
              <h4 className='text-chart-2 mb-2 font-semibold'>
                {outputLayerContent.softmax.title}
              </h4>
              <p className='text-muted-foreground text-sm'>
                {outputLayerContent.softmax.description}
              </p>
            </div>
          </div>

          <div className='border-chart-3 bg-muted mb-6 rounded-md border-l-[3px] p-4'>
            <h4 className='text-chart-3 mb-2 font-semibold'>
              {outputLayerContent.temperature.title}
            </h4>
            <p className='text-muted-foreground text-sm'>
              {outputLayerContent.temperature.description}
            </p>
          </div>

          <div className='border-border bg-card mb-6 rounded-md border p-4'>
            <h4 className='mb-4 font-medium'>Softmax with Temperature</h4>

            <div className='mb-4'>
              <Label className='mb-2 block text-sm'>
                Temperature: {temperature.toFixed(2)}
              </Label>
              <Slider
                value={[temperature]}
                onValueChange={(v) => setTemperature(v[0])}
                min={0.1}
                max={2.0}
                step={0.1}
                className='w-full'
              />
              <div className='text-muted-foreground mt-1 flex justify-between text-xs'>
                <span>0.1 (confident)</span>
                <span>1.0 (default)</span>
                <span>2.0 (creative)</span>
              </div>
            </div>

            <div className='space-y-2'>
              {outputLayerContent.examplePredictions.map((pred, i) => (
                <div
                  key={i}
                  className='bg-secondary flex items-center gap-3 rounded p-2'
                >
                  <span className='w-12 truncate font-mono text-sm sm:w-16'>
                    {pred.word}
                  </span>
                  <span className='text-muted-foreground hidden text-xs sm:block sm:w-20'>
                    logit: {pred.logit}
                  </span>
                  <div className='bg-muted relative h-4 flex-1 rounded-full'>
                    <div
                      className='bg-primary absolute top-0 left-0 h-full rounded-full transition-all duration-300'
                      style={{ width: `${probabilities[i] * 100}%` }}
                    />
                  </div>
                  <span className='w-12 text-right font-mono text-sm sm:w-16'>
                    {(probabilities[i] * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className='mb-3 font-medium'>Sampling Strategies</h4>
            <div className='grid gap-3 md:grid-cols-2'>
              {outputLayerContent.samplingStrategies.map((strategy, i) => (
                <div key={i} className='bg-muted rounded-md p-3'>
                  <span className='font-medium'>{strategy.name}: </span>
                  <span className='text-muted-foreground text-sm'>
                    {strategy.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
