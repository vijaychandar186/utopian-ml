'use client';

import { Brain, SendHorizontal, Trash, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input
    };

    const assistantMessageId = Date.now() + 1;

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch AI response');
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: 'assistant', content: '' }
      ]);

      const reader = response.body?.getReader();
      if (!reader) {
        setError('Failed to read response stream');
        return;
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const token = line.slice(6);
            if (token === '[DONE]') break;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + token }
                  : msg
              )
            );
          }
        }
      }
    } catch {
      setError('Failed to fetch AI response');
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError('');
  };

  return (
    <div
      className={cn(
        'bg-background/95 flex flex-col border-t shadow-xl backdrop-blur-sm',
        'h-[100dvh]',
        'sm:h-[600px] sm:max-h-[80vh] sm:rounded-2xl sm:border'
      )}
    >
      {/* HEADER */}
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center gap-2'>
          <Brain className='text-primary h-5 w-5' />
          <span className='text-sm font-medium'>AI Assistant</span>
        </div>
        <Button variant='ghost' size='icon' onClick={onClose}>
          <X className='h-5 w-5' />
        </Button>
      </div>

      {/* MESSAGES */}
      <div ref={scrollRef} className='flex-1 space-y-4 overflow-y-auto p-4'>
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex w-full',
              m.role === 'assistant' ? 'justify-start' : 'justify-end'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-lg p-3 text-sm break-words shadow',
                m.role === 'assistant'
                  ? 'bg-muted text-foreground'
                  : 'bg-primary text-primary-foreground whitespace-pre-wrap'
              )}
            >
              {m.role === 'assistant' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <div className='my-2 overflow-x-auto'>
                        <table className='min-w-full border-collapse text-sm'>
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className='bg-background/50'>{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className='border-border border px-3 py-2 text-left font-semibold'>
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className='border-border border px-3 py-2'>
                        {children}
                      </td>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className='bg-background/50 rounded px-1.5 py-0.5 text-xs'>
                          {children}
                        </code>
                      ) : (
                        <code className='block overflow-x-auto rounded bg-zinc-900 p-3 text-xs text-zinc-100'>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className='my-2 overflow-x-auto'>{children}</pre>
                    ),
                    p: ({ children }) => (
                      <p className='mb-2 last:mb-0'>{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className='mb-2 list-inside list-disc space-y-1'>
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className='mb-2 list-inside list-decimal space-y-1'>
                        {children}
                      </ol>
                    ),
                    strong: ({ children }) => (
                      <strong className='font-semibold'>{children}</strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary underline'
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className='flex justify-start'>
            <div className='rounded-lg bg-red-100 p-3 text-sm text-red-600 shadow'>
              {error}
            </div>
          </div>
        )}
      </div>

      {/* INPUT BAR */}
      <form onSubmit={handleSubmit} className='flex gap-2 border-t p-3'>
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={handleClear}
        >
          <Trash className='h-4 w-4' />
        </Button>

        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message…'
          className='flex-1 text-base'
        />

        <Button type='submit' size='icon' disabled={!input.trim()}>
          <SendHorizontal className='h-4 w-4' />
        </Button>
      </form>
    </div>
  );
}
