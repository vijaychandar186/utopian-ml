'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { trainingContent } from '@/pages-content/transformer/content/transformer-content';

// Simple vocabulary for next-word prediction
const VOCAB = [
  'the',
  'cat',
  'sat',
  'on',
  'mat',
  'dog',
  'ran',
  'to',
  'a',
  'big'
];
const VOCAB_SIZE = VOCAB.length;
const EMBEDDING_DIM = 16;

// Training examples: [input words] -> target word
const TRAINING_DATA: [number[], number][] = [
  [[0, 1], 2], // "the cat" -> "sat"
  [[0, 1, 2], 3], // "the cat sat" -> "on"
  [[2, 3, 0], 4], // "sat on the" -> "mat"
  [[0, 5], 6], // "the dog" -> "ran"
  [[5, 6], 7], // "dog ran" -> "to"
  [[8, 9, 1], 2], // "a big cat" -> "sat"
  [[8, 9, 5], 6] // "a big dog" -> "ran"
];

// Seeded random for reproducibility
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Xavier initialization
function initializeWeights(
  rows: number,
  cols: number,
  seed: number
): number[][] {
  const rng = seededRandom(seed);
  const scale = Math.sqrt(2.0 / (rows + cols));
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (rng() * 2 - 1) * scale)
  );
}

// Numerically stable softmax
function softmax(logits: number[]): number[] {
  const maxLogit = Math.max(...logits);
  const expLogits = logits.map((l) => Math.exp(l - maxLogit));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  return expLogits.map((e) => e / sumExp);
}

// Cross-entropy loss
function crossEntropyLoss(probs: number[], target: number): number {
  return -Math.log(Math.max(probs[target], 1e-10));
}

// Matrix-vector multiplication
function matVecMul(matrix: number[][], vec: number[]): number[] {
  return matrix.map((row) =>
    row.reduce((sum, val, i) => sum + val * vec[i], 0)
  );
}

// Mean pooling
function meanPool(embeddings: number[][]): number[] {
  const dim = embeddings[0].length;
  const result = new Array(dim).fill(0);
  for (const emb of embeddings) {
    for (let i = 0; i < dim; i++) {
      result[i] += emb[i];
    }
  }
  return result.map((v) => v / embeddings.length);
}

interface ModelState {
  embeddings: number[][];
  outputWeights: number[][];
}

export function Training() {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [step, setStep] = useState(0);
  const [loss, setLoss] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [learningRate, setLearningRate] = useState(
    trainingContent.defaultLearningRate
  );
  const [maxEpochs, setMaxEpochs] = useState(trainingContent.defaultEpochs);
  const [batchSize, setBatchSize] = useState(trainingContent.defaultBatchSize);
  const [currentExample, setCurrentExample] = useState<{
    input: string;
    target: string;
    prediction: string;
  } | null>(null);

  const modelRef = useRef<ModelState | null>(null);

  const initializeModel = useCallback(() => {
    modelRef.current = {
      embeddings: initializeWeights(VOCAB_SIZE, EMBEDDING_DIM, 42),
      outputWeights: initializeWeights(VOCAB_SIZE, EMBEDDING_DIM, 123)
    };
  }, []);

  const forward = useCallback(
    (inputIndices: number[]): { probs: number[]; hidden: number[] } => {
      if (!modelRef.current) initializeModel();
      const model = modelRef.current!;

      const inputEmbeddings = inputIndices.map((idx) => model.embeddings[idx]);
      const hidden = meanPool(inputEmbeddings);
      const logits = matVecMul(model.outputWeights, hidden);
      const probs = softmax(logits);

      return { probs, hidden };
    },
    [initializeModel]
  );

  const backward = useCallback(
    (
      inputIndices: number[],
      target: number,
      probs: number[],
      hidden: number[],
      lr: number
    ) => {
      if (!modelRef.current) return;
      const model = modelRef.current;

      const dLogits = probs.map((p, i) => p - (i === target ? 1 : 0));

      for (let i = 0; i < VOCAB_SIZE; i++) {
        for (let j = 0; j < EMBEDDING_DIM; j++) {
          model.outputWeights[i][j] -= lr * dLogits[i] * hidden[j];
        }
      }

      const dHidden = new Array(EMBEDDING_DIM).fill(0);
      for (let j = 0; j < EMBEDDING_DIM; j++) {
        for (let i = 0; i < VOCAB_SIZE; i++) {
          dHidden[j] += model.outputWeights[i][j] * dLogits[i];
        }
      }

      const scale = 1 / inputIndices.length;
      for (const idx of inputIndices) {
        for (let j = 0; j < EMBEDDING_DIM; j++) {
          model.embeddings[idx][j] -= lr * dHidden[j] * scale;
        }
      }
    },
    []
  );

  const trainStep = useCallback(() => {
    const exampleIdx = step % TRAINING_DATA.length;
    const [inputIndices, target] = TRAINING_DATA[exampleIdx];

    const { probs, hidden } = forward(inputIndices);
    const currentLoss = crossEntropyLoss(probs, target);

    backward(inputIndices, target, probs, hidden, learningRate);

    const prediction = probs.indexOf(Math.max(...probs));
    setCurrentExample({
      input: inputIndices.map((i) => VOCAB[i]).join(' '),
      target: VOCAB[target],
      prediction: VOCAB[prediction]
    });

    setLoss(currentLoss);
    setLossHistory((h) => [...h, currentLoss].slice(-100));

    let correct = 0;
    for (const [inputs, tgt] of TRAINING_DATA) {
      const { probs: p } = forward(inputs);
      if (p.indexOf(Math.max(...p)) === tgt) correct++;
    }
    setAccuracy(correct / TRAINING_DATA.length);

    const newStep = step + 1;
    setStep(newStep);
    if (newStep % TRAINING_DATA.length === 0) {
      setEpoch((e) => e + 1);
    }
  }, [step, forward, backward, learningRate]);

  useEffect(() => {
    initializeModel();
    const [inputIndices, target] = TRAINING_DATA[0];
    const { probs } = forward(inputIndices);
    setLoss(crossEntropyLoss(probs, target));
    setLossHistory([crossEntropyLoss(probs, target)]);
  }, [initializeModel, forward]);

  useEffect(() => {
    if (isTraining && epoch < maxEpochs) {
      const timer = setTimeout(trainStep, 100);
      return () => clearTimeout(timer);
    } else if (epoch >= maxEpochs) {
      setIsTraining(false);
    }
  }, [isTraining, epoch, maxEpochs, trainStep]);

  const resetTraining = useCallback(() => {
    setIsTraining(false);
    setEpoch(0);
    setStep(0);
    setAccuracy(0);
    setCurrentExample(null);
    initializeModel();
    const [inputIndices, target] = TRAINING_DATA[0];
    const { probs } = forward(inputIndices);
    setLoss(crossEntropyLoss(probs, target));
    setLossHistory([crossEntropyLoss(probs, target)]);
  }, [initializeModel, forward]);

  const maxLoss = useMemo(() => Math.max(3, ...lossHistory), [lossHistory]);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{trainingContent.title}</h2>

      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {trainingContent.description}
          </p>

          <div className='mb-6 space-y-4'>
            {trainingContent.concepts.map((concept, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${(i % 5) + 1}`}
              >
                <h4 className={`mb-2 font-semibold text-chart-${(i % 5) + 1}`}>
                  {concept.title}
                </h4>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {concept.description}
                </p>
              </div>
            ))}
          </div>

          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Training Loop</h4>
            <div className='flex flex-wrap items-center gap-2'>
              {trainingContent.trainingLoop.map((loopStep, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <span className='bg-secondary rounded px-3 py-1 text-xs'>
                    {i + 1}. {loopStep}
                  </span>
                  {i < trainingContent.trainingLoop.length - 1 && (
                    <span className='text-muted-foreground'>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='border-border bg-card rounded-md border p-4'>
            <h4 className='mb-4 font-medium'>Training Demo</h4>
            <div className='border-primary/50 bg-primary/5 mb-6 rounded-md border p-3'>
              <p className='text-sm'>
                <span className='font-semibold'>Real Training:</span> This demo
                runs actual gradient descent on a tiny language model learning
                to predict the next word.
              </p>
            </div>
            <div className='mb-4 grid gap-4 md:grid-cols-3'>
              <div>
                <Label className='mb-2 block text-sm'>
                  Learning Rate: {learningRate.toFixed(2)}
                </Label>
                <Slider
                  value={[learningRate]}
                  onValueChange={(v) => setLearningRate(v[0])}
                  min={0.01}
                  max={1.0}
                  step={0.01}
                  className='w-full'
                  disabled={isTraining}
                />
              </div>
              <div>
                <Label className='mb-2 block text-sm'>
                  Max Epochs: {maxEpochs}
                </Label>
                <Slider
                  value={[maxEpochs]}
                  onValueChange={(v) => setMaxEpochs(v[0])}
                  min={5}
                  max={50}
                  step={1}
                  className='w-full'
                  disabled={isTraining}
                />
              </div>
              <div>
                <Label className='mb-2 block text-sm'>
                  Batch Size: {batchSize}
                </Label>
                <Slider
                  value={[batchSize]}
                  onValueChange={(v) => setBatchSize(v[0])}
                  min={1}
                  max={64}
                  step={1}
                  className='w-full'
                  disabled={isTraining}
                />
              </div>
            </div>

            <div className='mb-4 flex items-center gap-4'>
              <Button
                onClick={() => setIsTraining(!isTraining)}
                disabled={epoch >= maxEpochs}
              >
                {isTraining ? 'Pause' : 'Train'}
              </Button>
              <Button variant='outline' onClick={resetTraining}>
                Reset
              </Button>
              <span className='text-muted-foreground text-sm'>
                Epoch: {epoch}/{maxEpochs} | Step: {step}
              </span>
            </div>

            <div className='mb-4'>
              <Label className='mb-2 block text-sm'>Training Progress</Label>
              <Progress value={(epoch / maxEpochs) * 100} className='h-2' />
            </div>

            {currentExample && (
              <div className='bg-muted mb-4 rounded-md p-4'>
                <Label className='mb-2 block text-sm font-medium'>
                  Current Example
                </Label>
                <div className='grid gap-2 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Input:</span>{' '}
                    <span className='font-mono'>
                      &quot;{currentExample.input}&quot;
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span>
                      <span className='text-muted-foreground'>Target:</span>{' '}
                      <span className='bg-chart-2 text-primary-foreground rounded px-2 py-0.5 font-mono'>
                        {currentExample.target}
                      </span>
                    </span>
                    <span>
                      <span className='text-muted-foreground'>Prediction:</span>{' '}
                      <span
                        className={`rounded px-2 py-0.5 font-mono ${
                          currentExample.prediction === currentExample.target
                            ? 'bg-green-500 text-white'
                            : 'bg-destructive text-destructive-foreground'
                        }`}
                      >
                        {currentExample.prediction}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className='grid gap-4 md:grid-cols-3'>
              <div className='bg-muted rounded-md p-4'>
                <Label className='mb-2 block text-sm'>Cross-Entropy Loss</Label>
                <span className='text-primary text-2xl font-bold'>
                  {loss.toFixed(4)}
                </span>
              </div>
              <div className='bg-muted rounded-md p-4'>
                <Label className='mb-2 block text-sm'>Training Accuracy</Label>
                <span className='text-chart-2 text-2xl font-bold'>
                  {(accuracy * 100).toFixed(0)}%
                </span>
                <p className='text-muted-foreground mt-1 text-xs'>
                  {Math.round(accuracy * TRAINING_DATA.length)}/
                  {TRAINING_DATA.length} correct
                </p>
              </div>
              <div className='bg-muted rounded-md p-4'>
                <Label className='mb-2 block text-sm'>Loss Curve</Label>
                <div className='flex h-12 items-end gap-0.5'>
                  {lossHistory.slice(-50).map((l, i) => (
                    <div
                      key={i}
                      className='bg-primary flex-1 transition-all'
                      style={{
                        height: `${Math.min(100, (l / maxLoss) * 100)}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className='text-muted-foreground mt-4 border-t pt-4 text-xs'>
              <p>
                <strong>Backprop:</strong> dL/dz = softmax(z) - one_hot(target)
              </p>
              <p className='mt-1'>
                <strong>Update:</strong> W ← W - η × ∇W
              </p>
            </div>
          </div>

          <div className='bg-muted mt-6 rounded-md p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='font-medium'>Scaling Laws: </span>
              {trainingContent.scalingLaws}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
