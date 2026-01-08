'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TokenInfo {
  token: string;
  id: number;
}

export function TokenizationDemo() {
  const [inputText, setInputText] = useState(
    'The transformer is revolutionary.'
  );
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenizerLoaded, setIsTokenizerLoaded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenizerRef = useRef<any>(null);

  const loadTokenizer = useCallback(async () => {
    if (tokenizerRef.current) return tokenizerRef.current;

    setIsLoading(true);

    const { AutoTokenizer } = await import('@huggingface/transformers');
    const tokenizer = await AutoTokenizer.from_pretrained(
      'Xenova/opus-mt-es-en'
    );

    tokenizerRef.current = tokenizer;
    setIsTokenizerLoaded(true);
    setIsLoading(false);

    return tokenizer;
  }, []);

  const handleTokenize = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);

    let tokenizer = tokenizerRef.current;
    if (!tokenizer) {
      tokenizer = await loadTokenizer();
    }

    const encoded = await tokenizer(inputText);

    let ids: number[] = [];

    if (encoded.input_ids?.data) {
      ids = Array.from(encoded.input_ids.data).map(Number);
    } else if (Array.isArray(encoded.input_ids)) {
      ids = encoded.input_ids.map(Number);
    } else if (encoded.input_ids?.tolist) {
      ids = encoded.input_ids.tolist().flat().map(Number);
    }

    const tokenInfos: TokenInfo[] = ids.map((id) => ({
      id,
      token: tokenizer.decode([id], { skip_special_tokens: false }) || `[${id}]`
    }));

    setTokens(tokenInfos);
    setIsLoading(false);
  }, [inputText, loadTokenizer]);

  useEffect(() => {
    return () => {
      tokenizerRef.current = null;
    };
  }, []);

  const tokenColors = [
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
    'bg-primary'
  ];

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>Tokenization</h2>

      <Card>
        <CardContent className='p-8'>
          <CardDescription className='mb-4'>
            See how the transformer breaks text into tokens — the fundamental
            units it processes. This uses the actual OPUS-MT tokenizer.
          </CardDescription>

          <div className='mb-4 space-y-2'>
            <Label>Enter text to tokenize:</Label>
            <div className='flex gap-2'>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Enter any text...'
                className='flex-1'
              />
              <Button
                onClick={handleTokenize}
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading
                  ? 'Loading...'
                  : isTokenizerLoaded
                    ? 'Tokenize'
                    : 'Load & Tokenize'}
              </Button>
            </div>
          </div>

          {tokens.length > 0 && (
            <div className='space-y-4'>
              <div>
                <Label className='text-muted-foreground mb-2 block text-sm'>
                  Tokens ({tokens.length} total):
                </Label>

                <div className='flex flex-wrap gap-2'>
                  {tokens.map((t, i) => (
                    <div
                      key={i}
                      className={`group text-primary-foreground relative rounded px-2 py-1 text-sm ${
                        tokenColors[i % tokenColors.length]
                      }`}
                    >
                      <span className='font-mono'>
                        {t.token === ' ' ? '␣' : t.token.replace(/▁/g, '_')}
                      </span>
                      <span className='bg-foreground text-background absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded px-1 text-xs group-hover:block'>
                        ID: {t.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-muted rounded-md p-4'>
                <h4 className='mb-2 font-medium'>Token Details</h4>
                <div className='grid gap-1 text-sm'>
                  {tokens.map((t, i) => (
                    <div key={i} className='flex items-center gap-2 font-mono'>
                      <span
                        className={`text-primary-foreground w-6 rounded px-1 text-center text-xs ${
                          tokenColors[i % tokenColors.length]
                        }`}
                      >
                        {i}
                      </span>
                      <span className='w-24 truncate'>
                        &quot;{t.token.replace(/▁/g, '_')}&quot;
                      </span>
                      <span className='text-muted-foreground'>
                        → ID: {t.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='text-muted-foreground text-xs'>
                <p>• Each token maps to an embedding vector</p>
                <p>
                  • &quot;_&quot; represents word boundaries (SentencePiece)
                </p>
                <p>• These token IDs are what the transformer processes</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
