import { footerContent } from '@/pages-content/transformer/content/transformer-content';

export function Footer() {
  return (
    <footer className='border-border bg-muted border-t py-8'>
      <div className='mx-auto max-w-4xl px-6 text-center'>
        <p className='text-muted-foreground text-sm'>
          {footerContent.mainText}
        </p>
        <p className='text-muted-foreground mt-1 text-xs'>
          {footerContent.citation}
        </p>
        <a
          href={footerContent.paperLink}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary mt-2 inline-block text-xs hover:underline'
        >
          Read the original paper →
        </a>
      </div>
    </footer>
  );
}
