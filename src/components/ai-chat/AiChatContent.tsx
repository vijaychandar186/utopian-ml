'use client';

import { cn } from '@/lib/utils';
import AIChatBox from '@/features/ai-chat/AIChatBox';

interface AIChatContentProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatContent({ open, onClose }: AIChatContentProps) {
  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 z-50 w-full transition-all duration-300 ease-in-out sm:m-4 sm:max-w-lg',
        open
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      )}
    >
      <AIChatBox open={open} onClose={onClose} />
    </div>
  );
}
