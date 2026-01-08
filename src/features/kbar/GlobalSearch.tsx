'use client';
import { useKBar } from 'kbar';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { NavIcons } from '@/components/Icons';

export default function GlobalSearch() {
  const { query } = useKBar();
  const SearchIcon = NavIcons.Search;

  return (
    <SidebarMenuButton
      tooltip='Search'
      className='h-9 w-full cursor-pointer justify-start rounded-[0.5rem] text-sm font-normal data-[state=collapsed]:justify-center data-[state=collapsed]:px-0'
      onClick={query.toggle}
    >
      <SearchIcon className='h-4 w-4' />
      <span className='data-[state=collapsed]:hidden'>Search</span>
    </SidebarMenuButton>
  );
}
