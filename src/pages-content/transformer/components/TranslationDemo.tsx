'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

const MODEL_ID = 'Xenova/opus-mt-es-en';

const EXAMPLE_TEXTS = [
  'El Transformer es una arquitectura revolucionaria para el aprendizaje automático.',
  'La atención es todo lo que necesitas.'
];

export function TranslationDemo() {
  const [inputText, setInputText] = useState(EXAMPLE_TEXTS[0]);
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pipelineRef = useRef<unknown>(null);

  const loadModel = useCallback(async () => {
    if (pipelineRef.current) return;

    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingStatus('Initializing...');
    setError(null);

    try {
      const { pipeline } = await import('@huggingface/transformers');

      const translator = await pipeline('translation', MODEL_ID, {
        dtype: 'int8',
        progress_callback: (progress: {
          progress?: number;
          status?: string;
          file?: string;
        }) => {
          if (progress.progress !== undefined) {
            setLoadingProgress(Math.round(progress.progress));
          }
          if (progress.status) {
            const fileName = progress.file?.split('/').pop() || '';
            setLoadingStatus(
              `${progress.status}${fileName ? `: ${fileName}` : ''}`
            );
          }
        }
      });

      pipelineRef.current = translator;
      setIsModelLoaded(true);
      setLoadingStatus('Model ready!');
    } catch (err) {
      console.error('Error loading model:', err);
      setError(err instanceof Error ? err.message : 'Failed to load model');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return;

    setError(null);
    setOutputText('');

    try {
      if (!pipelineRef.current) {
        await loadModel();
      }

      if (pipelineRef.current) {
        setIsLoading(true);
        setLoadingStatus('Translating...');

        const translator = pipelineRef.current as (
          text: string
        ) => Promise<Array<{ translation_text: string }>>;

        const result = await translator(inputText);

        if (result && result[0] && result[0].translation_text) {
          setOutputText(result[0].translation_text);
        }
        setLoadingStatus('Done!');
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'Translation failed');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, loadModel]);

  const handleExampleClick = (text: string) => {
    setInputText(text);
    setOutputText('');
  };

  useEffect(() => {
    return () => {
      pipelineRef.current = null;
    };
  }, []);

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-2xl font-semibold'>Translation</h2>

      <Card className='border-primary border-2'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <span className='inline-block h-3 w-3 animate-pulse rounded-full bg-green-500' />
            Translate: Spanish → English
          </CardTitle>
          <CardDescription>
            Experience a transformer model running directly in your browser!
            Uses Helsinki-NLP&apos;s OPUS-MT model (~113MB, int8 quantized) via
            Hugging Face. Downloads once, then cached for future use.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label className='text-lg font-medium'>Spanish (Input)</Label>
                <span className='bg-secondary rounded px-2 py-1 text-xs'>
                  ES
                </span>
              </div>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Enter Spanish text...'
                className='min-h-36 resize-none text-base'
              />
              <div>
                <Label className='text-muted-foreground mb-2 block text-xs'>
                  Try an example:
                </Label>
                <div className='flex flex-wrap gap-2'>
                  {EXAMPLE_TEXTS.map((text, i) => (
                    <Button
                      key={i}
                      variant='outline'
                      size='sm'
                      className='h-auto py-1 text-left text-xs whitespace-normal'
                      onClick={() => handleExampleClick(text)}
                    >
                      {text.slice(0, 25)}...
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label className='text-lg font-medium'>English (Output)</Label>
                <span className='bg-primary text-primary-foreground rounded px-2 py-1 text-xs'>
                  EN
                </span>
              </div>
              <Textarea
                value={outputText}
                readOnly
                placeholder='Translation will appear here...'
                className='bg-muted min-h-36 resize-none text-base'
              />
              {outputText && (
                <p className='text-muted-foreground text-xs'>
                  ✓ Translated using transformer attention mechanism
                </p>
              )}
            </div>
          </div>

          {isLoading && (
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>{loadingStatus}</span>
                {loadingProgress > 0 && loadingProgress < 100 && (
                  <span className='font-mono'>{loadingProgress}%</span>
                )}
              </div>
              {loadingProgress > 0 && loadingProgress < 100 && (
                <Progress value={loadingProgress} className='h-2' />
              )}
            </div>
          )}

          {error && (
            <div className='border-destructive bg-destructive/10 text-destructive rounded-md border p-3 text-sm'>
              {error}
            </div>
          )}

          <div className='flex items-center gap-4'>
            <Button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              size='lg'
              className='w-full sm:w-auto sm:min-w-48'
            >
              {isLoading
                ? isModelLoaded
                  ? 'Translating...'
                  : 'Loading Model...'
                : isModelLoaded
                  ? 'Translate'
                  : 'Load Model & Translate'}
            </Button>

            {isModelLoaded && (
              <span className='text-muted-foreground flex items-center gap-2 text-sm'>
                <span className='inline-block h-2 w-2 rounded-full bg-green-500' />
                Model loaded (cached in browser)
              </span>
            )}
          </div>

          <div className='bg-muted rounded-md p-4'>
            <h4 className='mb-2 font-medium'>How it works:</h4>
            <ul className='text-muted-foreground space-y-1 text-sm'>
              <li>
                • Model downloads from Hugging Face (~113MB, smallest int8
                version)
              </li>
              <li>
                • Runs <strong>entirely in your browser</strong> using
                WebAssembly
              </li>
              <li>
                • Architecture: OPUS-MT (Marian NMT - Transformer
                encoder-decoder)
              </li>
              <li>
                • <strong>Cached in browser</strong> - instant on repeat visits!
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
