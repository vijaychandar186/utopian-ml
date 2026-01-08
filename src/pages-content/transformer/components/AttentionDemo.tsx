'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { attentionDemoContent } from '@/pages-content/transformer/content/transformer-content';

const EMBEDDING_DIM = 64; // d_k dimension for attention

// Numerically stable softmax
function softmax(values: number[]): number[] {
  const maxVal = Math.max(...values);
  const expValues = values.map((v) => Math.exp(v - maxVal));
  const sumExp = expValues.reduce((a, b) => a + b, 0);
  return expValues.map((e) => e / sumExp);
}

// Seeded random number generator for reproducible embeddings
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed / 0x7fffffff) * 2 - 1; // Returns value between -1 and 1
  };
}

// Generate a deterministic embedding for a word based on its characters
function generateWordEmbedding(word: string, dim: number): number[] {
  const seed = word.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
  const rng = seededRandom(seed);
  const embedding: number[] = [];
  for (let i = 0; i < dim; i++) {
    embedding.push(rng() * 0.5); // Scale to reasonable range
  }
  // Normalize the embedding
  const norm = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0));
  return embedding.map((v) => v / norm);
}

// Generate weight matrix (deterministic based on seed)
function generateWeightMatrix(rows: number, cols: number, seed: number): number[][] {
  const rng = seededRandom(seed);
  const matrix: number[][] = [];
  const scale = Math.sqrt(2.0 / (rows + cols)); // Xavier initialization
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(rng() * scale);
    }
    matrix.push(row);
  }
  return matrix;
}

// Matrix-vector multiplication
function matVecMul(matrix: number[][], vec: number[]): number[] {
  return matrix.map((row) => row.reduce((sum, val, i) => sum + val * vec[i], 0));
}

// Dot product of two vectors
function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

export function AttentionDemo() {
  const [words, setWords] = useState(attentionDemoContent.defaultSentence);
  const [selectedWordIndex, setSelectedWordIndex] = useState(1);
  const [newWord, setNewWord] = useState('');
  const [temperature, setTemperature] = useState(1.0);

  // Generate weight matrices for Q, K projections (fixed seeds for consistency)
  const W_Q = useMemo(() => generateWeightMatrix(EMBEDDING_DIM, EMBEDDING_DIM, 42), []);
  const W_K = useMemo(() => generateWeightMatrix(EMBEDDING_DIM, EMBEDDING_DIM, 123), []);

  // Compute all embeddings
  const embeddings = useMemo(() => {
    return words.map((word) => generateWordEmbedding(word, EMBEDDING_DIM));
  }, [words]);

  // Compute Q and K vectors for all words
  const queries = useMemo(() => embeddings.map((emb) => matVecMul(W_Q, emb)), [embeddings, W_Q]);
  const keys = useMemo(() => embeddings.map((emb) => matVecMul(W_K, emb)), [embeddings, W_K]);

  // Compute attention scores using the real scaled dot-product formula: Q·K^T / √d_k
  const computeAttentionScores = useCallback(
    (queryIdx: number): number[] => {
      const query = queries[queryIdx];
      const scaleFactor = Math.sqrt(EMBEDDING_DIM);

      return keys.map((key) => {
        const score = dotProduct(query, key) / scaleFactor;
        return score / temperature; // Apply temperature scaling
      });
    },
    [queries, keys, temperature]
  );

  // Raw attention scores (logits) for the selected word
  const rawScores = useMemo(
    () => computeAttentionScores(selectedWordIndex),
    [computeAttentionScores, selectedWordIndex]
  );

  // Attention probabilities after softmax
  const probabilities = useMemo(() => softmax(rawScores), [rawScores]);

  const handleWordSelect = (index: number) => {
    setSelectedWordIndex(index);
  };

  const handleAddWord = () => {
    if (newWord.trim() && words.length < 8) {
      setWords([...words, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (index: number) => {
    if (words.length > 2) {
      const newWords = words.filter((_, i) => i !== index);
      setWords(newWords);
      if (selectedWordIndex === index) {
        setSelectedWordIndex(0);
      } else if (selectedWordIndex > index) {
        setSelectedWordIndex(selectedWordIndex - 1);
      }
    }
  };

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {attentionDemoContent.title}
      </h2>

      <Card>
        <CardContent className='p-8'>
          <p className='text-muted-foreground mb-4 leading-relaxed'>
            {attentionDemoContent.description}
          </p>

          <div className='border-primary/50 bg-primary/5 mb-6 rounded-md border p-3'>
            <p className='text-sm'>
              <span className='font-semibold'>Real Computation:</span> This demo uses actual scaled dot-product attention.
              Each word has a {EMBEDDING_DIM}-dimensional embedding, projected through learned Q and K matrices.
              Attention scores are computed as <code className='bg-muted rounded px-1'>Q·K<sup>T</sup>/√d<sub>k</sub></code> then passed through softmax.
            </p>
          </div>

          <div className='border-border bg-muted/50 mb-6 rounded-md border border-dashed p-4'>
            <div className='mb-4 flex flex-wrap gap-2'>
              {words.map((word, i) => (
                <div
                  key={i}
                  className='group relative inline-flex items-center'
                >
                  <span className='bg-secondary text-secondary-foreground rounded px-3 py-1.5 text-sm font-medium'>
                    {word}
                  </span>
                  {words.length > 2 && (
                    <button
                      onClick={() => handleRemoveWord(i)}
                      className='bg-destructive text-destructive-foreground absolute -top-1.5 -right-1.5 hidden h-4 w-4 items-center justify-center rounded-full text-[10px] shadow-sm group-hover:flex'
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              <Input
                type='text'
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
                placeholder='Add a word...'
                className='bg-background h-9 max-w-[200px]'
                disabled={words.length >= 8}
              />
              <Button
                size='sm'
                onClick={handleAddWord}
                disabled={words.length >= 8}
              >
                Add Word
              </Button>
            </div>
          </div>

          {/* Temperature Control */}
          <div className='bg-muted mb-6 rounded-md p-4'>
            <Label className='mb-2 block text-sm font-medium'>
              Attention Temperature: {temperature.toFixed(2)}
            </Label>
            <Slider
              value={[temperature]}
              onValueChange={(v) => setTemperature(v[0])}
              min={0.1}
              max={3.0}
              step={0.1}
              className='w-full max-w-xs'
            />
            <p className='text-muted-foreground mt-2 text-xs'>
              Lower temperature → sharper attention (focuses on highest scoring key).
              Higher temperature → softer attention (more evenly distributed).
            </p>
          </div>

          <div className='grid gap-8 lg:grid-cols-2'>
            {/* Left: Interactive Graph */}
            <div className='border-border rounded-md border p-6'>
              <Label className='mb-4 block text-center font-medium'>
                Select &quot;Query&quot; Word
              </Label>
              <div className='mb-8 flex flex-wrap justify-center gap-2'>
                {words.map((word, i) => (
                  <Button
                    key={i}
                    variant={selectedWordIndex === i ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleWordSelect(i)}
                    className='relative transition-all'
                  >
                    {word}
                    {selectedWordIndex === i && (
                      <span className='bg-primary absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full' />
                    )}
                  </Button>
                ))}
              </div>

              <div className='space-y-4'>
                <div className='text-muted-foreground flex items-center justify-between text-xs font-medium'>
                  <span className='w-20'>Target (Key)</span>
                  <span className='w-32 text-center'>Score (Q·K/√d<sub>k</sub>)</span>
                  <span className='flex-1 text-right'>Attention %</span>
                </div>
                {words.map((word, i) => {
                  const pct = probabilities[i] * 100;
                  return (
                    <div key={i} className='group flex items-center gap-3'>
                      <span className='w-20 truncate text-sm font-medium'>
                        {word}
                      </span>

                      {/* Score Display (read-only, computed from real attention) */}
                      <div className='bg-secondary/50 flex w-32 items-center justify-center rounded px-2 py-1'>
                        <span className='font-mono text-xs'>
                          {rawScores[i]?.toFixed(3) ?? '0.000'}
                        </span>
                      </div>

                      {/* Bar Visualization */}
                      <div className='bg-muted relative h-8 flex-1 overflow-hidden rounded'>
                        <div
                          className='bg-primary absolute top-0 left-0 h-full transition-all duration-500 ease-out'
                          style={{ width: `${pct}%`, opacity: 0.2 + pct / 120 }}
                        />
                        <div className='absolute inset-0 flex items-center justify-end px-2'>
                          <span className='font-mono text-xs font-medium'>
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='text-muted-foreground mt-4 border-t pt-4 text-xs'>
                <p><strong>Formula:</strong> score<sub>ij</sub> = (Q<sub>i</sub> · K<sub>j</sub>) / √{EMBEDDING_DIM} = (Q<sub>i</sub> · K<sub>j</sub>) / {Math.sqrt(EMBEDDING_DIM).toFixed(2)}</p>
                <p className='mt-1'><strong>Softmax:</strong> attention<sub>ij</sub> = exp(score<sub>ij</sub>) / Σ<sub>k</sub>exp(score<sub>ik</sub>)</p>
              </div>
            </div>

            {/* Right: Architecture View */}
            <div className='bg-muted/30 flex flex-col items-center justify-center rounded-md p-6'>
              <h4 className='text-muted-foreground mb-6 font-medium'>
                Attention Flow
              </h4>

              <div className='relative flex w-full max-w-sm flex-col gap-6'>
                {/* Inputs */}
                <div className='flex justify-center gap-2'>
                  {words.map((word, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        i === selectedWordIndex
                          ? 'bg-primary scale-150'
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Connections */}
                <div className='relative h-32 w-full'>
                  <svg className='absolute inset-0 h-full w-full'>
                    {words.map((_, i) => {
                      const outputX = (i + 0.5) * (100 / words.length);
                      const inputX =
                        (selectedWordIndex + 0.5) * (100 / words.length);
                      const opacity = probabilities[i];

                      return (
                        <path
                          key={i}
                          d={`M ${inputX}% 100 C ${inputX}% 50, ${outputX}% 50, ${outputX}% 0`}
                          fill='none'
                          stroke='currentColor'
                          className='text-primary'
                          strokeWidth={opacity * 4 + 0.5}
                          style={{ opacity: opacity }}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Outputs (Selected Word Context) */}
                <div className='flex justify-center'>
                  <div className='border-primary bg-background flex flex-col items-center rounded-lg border-2 p-4 shadow-lg'>
                    <span className='text-muted-foreground mb-1 text-xs'>
                      New Representation
                    </span>
                    <span className='text-primary text-lg font-bold'>
                      {words[selectedWordIndex]}
                    </span>
                    <div className='mt-2 flex h-1.5 w-16 gap-0.5 overflow-hidden rounded-full'>
                      {probabilities.map((p, i) => (
                        <div
                          key={i}
                          className='bg-primary h-full'
                          style={{
                            width: `${p * 100}%`,
                            opacity: 0.5 + p * 0.5
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className='text-muted-foreground mt-8 text-center text-sm'>
                The word{' '}
                <span className='text-foreground font-bold'>
                  &quot;{words[selectedWordIndex]}&quot;
                </span>{' '}
                is updating its meaning by attending to relevant context words,
                weighted by the computed attention scores.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
