import { headerContent } from '@/pages-content/transformer/content/transformer-content';

export function Header() {
  return (
    <header className='border-border from-primary/5 via-background to-chart-2/5 relative border-b bg-gradient-to-br py-16'>
      <div className='mx-auto max-w-6xl px-8 text-center'>
        <h1 className='text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
          {headerContent.title}
        </h1>

        <p className='text-muted-foreground text-xl md:text-2xl'>
          &quot;{headerContent.subtitle}&quot;
        </p>

        <p className='text-muted-foreground mt-3 text-sm'>
          Vaswani et al., 2017
        </p>
      </div>
    </header>
  );
}
