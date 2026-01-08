import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SocialIcons } from '@/components/Icons';
import { heroContent } from '@/constants/landing/heroContent';

export default function HeroSection() {
  return (
    <section
      id='hero'
      className='border-border from-background via-muted to-secondary dark:from-background dark:via-muted dark:to-secondary border-b bg-gradient-to-br'
    >
      <div className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8'>
        <div className='max-w-3xl'>
          <Badge variant='outline' className='mb-4'>
            Interactive ML Visualizations
          </Badge>
          <h1 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            {heroContent.header.title}
          </h1>
          <p className='text-muted-foreground mb-6 text-base sm:text-lg'>
            {heroContent.header.subtitle}
          </p>
          <p className='text-foreground/90 mb-8 text-base leading-relaxed sm:text-lg'>
            {heroContent.about.description}
          </p>
          <div className='flex flex-wrap gap-4'>
            <Button asChild>
              <Link href={heroContent.cta.primary.href}>
                {heroContent.cta.primary.text}
              </Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href={heroContent.cta.secondary.href}>
                <SocialIcons.Github className='mr-2 h-4 w-4' />
                {heroContent.cta.secondary.text}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
