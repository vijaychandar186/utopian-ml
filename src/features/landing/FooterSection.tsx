import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SocialIcons } from '@/components/Icons';
import { footerContent } from '@/constants/landing/footerContent';

export default function FooterSection() {
  return (
    <footer className='bg-muted/40 border-border border-t py-8'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <p className='text-muted-foreground text-center text-sm sm:text-left sm:text-base'>
            {footerContent.text}
          </p>
          <div className='flex gap-4'>
            <Button variant='ghost' size='icon' asChild>
              <Link href={footerContent.github} aria-label='GitHub'>
                <SocialIcons.Github className='h-5 w-5' />
              </Link>
            </Button>
            <Button variant='ghost' size='icon' asChild>
              <Link href={footerContent.email} aria-label='Email'>
                <SocialIcons.Mail className='h-5 w-5' />
              </Link>
            </Button>
          </div>
        </div>

        <div className='text-muted-foreground mt-6 text-center text-xs'>
          © {new Date().getFullYear()} Utopian ML. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
