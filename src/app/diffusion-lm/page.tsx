import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/pages-content/diffusion-lm/components/Header';
import { Introduction } from '@/pages-content/diffusion-lm/components/Introduction';
import { ARvsDiffusion } from '@/pages-content/diffusion-lm/components/ARvsDiffusion';
import { ForwardProcess } from '@/pages-content/diffusion-lm/components/ForwardProcess';
import { ReverseProcess } from '@/pages-content/diffusion-lm/components/ReverseProcess';
import { Training } from '@/pages-content/diffusion-lm/components/Training';
import { SamplingDemo } from '@/pages-content/diffusion-lm/components/SamplingDemo';
import { KeyInnovations } from '@/pages-content/diffusion-lm/components/KeyInnovations';
import { Applications } from '@/pages-content/diffusion-lm/components/Applications';
import { Summary } from '@/pages-content/diffusion-lm/components/Summary';
import { Footer } from '@/pages-content/diffusion-lm/components/Footer';

export const metadata: Metadata = {
  title: 'Diffusion Language Models | A Visual Guide',
  description:
    'A comprehensive visual guide to Diffusion Language Models (DLMs) and LLaDA. Learn how masked diffusion generates text holistically through iterative denoising—a non-autoregressive alternative to GPT-style models.'
};

function Divider() {
  return <Separator className='mx-auto my-12 w-full' />;
}

export default function DiffusionLMPage() {
  return (
    <div className='bg-background text-foreground min-h-screen'>
      <Header />
      <main className='mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div id='introduction'>
          <Introduction />
        </div>
        <Divider />
        <div id='ar-vs-diffusion'>
          <ARvsDiffusion />
        </div>
        <Divider />
        <div id='forward-process'>
          <ForwardProcess />
        </div>
        <Divider />
        <div id='reverse-process'>
          <ReverseProcess />
        </div>
        <Divider />
        <div id='training'>
          <Training />
        </div>
        <Divider />
        <div id='sampling'>
          <SamplingDemo />
        </div>
        <Divider />
        <div id='key-innovations'>
          <KeyInnovations />
        </div>
        <Divider />
        <div id='applications'>
          <Applications />
        </div>
        <Divider />
        <div id='summary'>
          <Summary />
        </div>
      </main>
      <Footer />
    </div>
  );
}
