'use client';

import { Bot, SendHorizontal, Trash, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendMessage } from '@/actions/ai-chat';
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
  const [isLoading, setIsLoading] = useState(false);
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

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage(
      [...messages, userMessage].map(({ role, content }) => ({ role, content }))
    );

    setIsLoading(false);

    if (response.error) {
      setError(response.error);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'assistant',
        content: response.content || ''
      }
    ]);
  };

  const handleClear = () => {
    setMessages([]);
    setError('');
  };

  return (
    <div
      className={cn(
        'bg-background/95 fixed inset-x-0 bottom-0 flex flex-col border-t shadow-xl backdrop-blur-sm',
        'h-[100dvh]',
        'sm:static sm:h-[600px] sm:max-h-[80vh] sm:rounded-2xl sm:border'
      )}
    >
      {/* HEADER */}
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center gap-2'>
          <Bot className='text-primary h-5 w-5' />
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
                'max-w-[80%] rounded-lg p-3 text-sm break-words whitespace-pre-wrap shadow',
                m.role === 'assistant'
                  ? 'bg-muted text-foreground'
                  : 'bg-primary text-primary-foreground'
              )}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className='flex justify-start'>
            <div className='bg-muted rounded-lg p-3 text-sm shadow'>
              Thinking…
            </div>
          </div>
        )}

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
