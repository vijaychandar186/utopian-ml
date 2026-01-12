import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/pages-content/transformer/components/Header';
import { Introduction } from '@/pages-content/transformer/components/Introduction';
import { BigPicture } from '@/pages-content/transformer/components/BigPicture';
import { EncoderLayer } from '@/pages-content/transformer/components/EncoderLayer';
import { SelfAttention } from '@/pages-content/transformer/components/SelfAttention';
import { MultiHeadAttention } from '@/pages-content/transformer/components/MultiHeadAttention';
import { PositionalEncoding } from '@/pages-content/transformer/components/PositionalEncoding';
import { Decoder } from '@/pages-content/transformer/components/Decoder';
import { OutputLayer } from '@/pages-content/transformer/components/OutputLayer';
import { Training } from '@/pages-content/transformer/components/Training';
import { KeyInnovations } from '@/pages-content/transformer/components/KeyInnovations';
import { Summary } from '@/pages-content/transformer/components/Summary';
import { Applications } from '@/pages-content/transformer/components/Applications';
import { AttentionDemo } from '@/pages-content/transformer/components/AttentionDemo';
import { TranslationDemo } from '@/pages-content/transformer/components/TranslationDemo';
import { TokenizationDemo } from '@/pages-content/transformer/components/TokenizationDemo';
import { Footer } from '@/pages-content/transformer/components/Footer';

export const metadata: Metadata = {
  title: 'Transformer Architecture | A Visual Guide',
  description:
    'A comprehensive visual guide to understanding the Transformer architecture from "Attention is All You Need" (2017). Learn about self-attention, multi-head attention, encoders, decoders, and more.'
};

function Divider() {
  return <Separator className='mx-auto my-12 w-full' />;
}

export default function TransformerPage() {
  return (
    <div className='bg-background text-foreground min-h-screen'>
      <Header />
      <main className='mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div id='translation-demo'>
          <TranslationDemo />
        </div>
        <Divider />
        <div id='introduction'>
          <Introduction />
        </div>
        <Divider />
        <div id='big-picture'>
          <BigPicture />
        </div>
        <Divider />
        <div id='encoder-layer'>
          <EncoderLayer />
        </div>
        <Divider />
        <div id='self-attention'>
          <SelfAttention />
        </div>
        <Divider />
        <div id='multi-head-attention'>
          <MultiHeadAttention />
        </div>
        <Divider />
        <div id='attention-demo'>
          <AttentionDemo />
        </div>
        <Divider />
        <div id='positional-encoding'>
          <PositionalEncoding />
        </div>
        <Divider />
        <div id='tokenization-demo'>
          <TokenizationDemo />
        </div>
        <Divider />
        <div id='decoder'>
          <Decoder />
        </div>
        <Divider />
        <div id='output-layer'>
          <OutputLayer />
        </div>
        <Divider />
        <div id='training'>
          <Training />
        </div>
        <Divider />
        <div id='key-innovations'>
          <KeyInnovations />
        </div>
        <Divider />
        <div id='summary'>
          <Summary />
        </div>
        <Divider />
        <div id='applications'>
          <Applications />
        </div>
      </main>
      <Footer />
    </div>
  );
}
