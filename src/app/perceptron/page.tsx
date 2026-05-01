import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/pages-content/perceptron/components/Header';
import { Introduction } from '@/pages-content/perceptron/components/Introduction';
import { MarkI } from '@/pages-content/perceptron/components/MarkI';
import { Anatomy } from '@/pages-content/perceptron/components/Anatomy';
import { ForwardPass } from '@/pages-content/perceptron/components/ForwardPass';
import { LearningRule } from '@/pages-content/perceptron/components/LearningRule';
import { TrainingDemo } from '@/pages-content/perceptron/components/TrainingDemo';
import { Limitations } from '@/pages-content/perceptron/components/Limitations';
import { Legacy } from '@/pages-content/perceptron/components/Legacy';
import { Summary } from '@/pages-content/perceptron/components/Summary';
import { Footer } from '@/pages-content/perceptron/components/Footer';

export const metadata: Metadata = {
  title: 'The Perceptron | A Visual Guide',
  description:
    'A visual guide to the Perceptron—the first neural model (Rosenblatt, 1958). Learn weights, bias, the step activation, the perceptron learning rule, and why XOR is impossible through interactive demos.'
};

function Divider() {
  return <Separator className='mx-auto my-12 w-full' />;
}

export default function PerceptronPage() {
  return (
    <div className='bg-background text-foreground min-h-screen'>
      <Header />
      <main className='mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div id='introduction'>
          <Introduction />
        </div>
        <Divider />
        <div id='mark-i'>
          <MarkI />
        </div>
        <Divider />
        <div id='anatomy'>
          <Anatomy />
        </div>
        <Divider />
        <div id='forward-pass'>
          <ForwardPass />
        </div>
        <Divider />
        <div id='learning-rule'>
          <LearningRule />
        </div>
        <Divider />
        <div id='training-demo'>
          <TrainingDemo />
        </div>
        <Divider />
        <div id='limitations'>
          <Limitations />
        </div>
        <Divider />
        <div id='legacy'>
          <Legacy />
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
