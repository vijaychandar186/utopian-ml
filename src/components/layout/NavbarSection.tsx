'use client';

import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { navItems } from '@/constants/navItems';

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavbarSection() {
  const NavLink = ({ href, text }: NavLinkProps) => (
    <Link
      href={href}
      className='text-foreground/70 hover:text-primary group after:bg-primary relative text-base transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full'
    >
      {text}
      <span className='ml-1 inline-block opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        →
      </span>
    </Link>
  );

  const linkItems =
    navItems.find((group) => group.title === 'Navigation')?.items || [];

  return (
    <header className='bg-background/80 border-border/40 sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
      </div>

      <nav className='mt-4 hidden flex-1 justify-center gap-4 md:flex'>
        {linkItems.map((link) => (
          <NavLink key={link.url} href={link.url!} text={link.title} />
        ))}
      </nav>
    </header>
  );
}
