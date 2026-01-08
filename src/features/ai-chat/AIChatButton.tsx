'use client';
import { useState } from 'react';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { NavIcons } from '@/components/Icons';
import AIChatBox from '@/components/ai-chat/AiChatContent';

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const AIChatIcon = NavIcons.AIChat;

  return (
    <>
      <SidebarMenuButton
        tooltip='AI Chat'
        className='h-9 w-full cursor-pointer justify-start rounded-[0.5rem] text-sm font-normal'
        onClick={() => setChatBoxOpen(true)}
        aria-label='Open Chat'
      >
        <AIChatIcon className='h-4 w-4' />
        <span>Guide</span>
      </SidebarMenuButton>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
