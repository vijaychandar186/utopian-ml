'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export default function NavbarSection() {
  return (
    <header className='bg-background/80 border-border/40 sticky top-0 z-40 flex h-16 w-full shrink-0 items-center gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
      </div>
    </header>
  );
}
