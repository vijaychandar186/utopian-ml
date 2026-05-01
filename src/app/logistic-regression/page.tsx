import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/pages-content/logistic-regression/components/Header';
import { Introduction } from '@/pages-content/logistic-regression/components/Introduction';
import { Sigmoid } from '@/pages-content/logistic-regression/components/Sigmoid';
import { TheModel } from '@/pages-content/logistic-regression/components/TheModel';
import { ProbabilisticDerivation } from '@/pages-content/logistic-regression/components/ProbabilisticDerivation';
import { LogOdds } from '@/pages-content/logistic-regression/components/LogOdds';
import { LossFunction } from '@/pages-content/logistic-regression/components/LossFunction';
import { TrainingDemo } from '@/pages-content/logistic-regression/components/TrainingDemo';
import { Geometry } from '@/pages-content/logistic-regression/components/Geometry';
import { Convexity } from '@/pages-content/logistic-regression/components/Convexity';
import { LogisticRegularization } from '@/pages-content/logistic-regression/components/LogisticRegularization';
import { ClassImbalance } from '@/pages-content/logistic-regression/components/ClassImbalance';
import { Multiclass } from '@/pages-content/logistic-regression/components/Multiclass';
import { Connection } from '@/pages-content/logistic-regression/components/Connection';
import { Summary } from '@/pages-content/logistic-regression/components/Summary';
import { Footer } from '@/pages-content/logistic-regression/components/Footer';

export const metadata: Metadata = {
  title: 'Logistic Regression | A Visual Guide',
  description:
    'A visual guide to logistic regression — probabilistic binary classification. Sigmoid, BCE loss, MLE derivation, log-odds, regularization, softmax, and more through interactive demos.'
};

function Divider() {
  return <Separator className='mx-auto my-12 w-full' />;
}

export default function LogisticRegressionPage() {
  return (
    <div className='bg-background text-foreground min-h-screen'>
      <Header />
      <main className='mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div id='introduction'>
          <Introduction />
        </div>
        <Divider />
        <div id='sigmoid'>
          <Sigmoid />
        </div>
        <Divider />
        <div id='model'>
          <TheModel />
        </div>
        <Divider />
        <div id='geometry'>
          <Geometry />
        </div>
        <Divider />
        <div id='probabilistic'>
          <ProbabilisticDerivation />
        </div>
        <Divider />
        <div id='log-odds'>
          <LogOdds />
        </div>
        <Divider />
        <div id='loss'>
          <LossFunction />
        </div>
        <Divider />
        <div id='convexity'>
          <Convexity />
        </div>
        <Divider />
        <div id='training-demo'>
          <TrainingDemo />
        </div>
        <Divider />
        <div id='regularization'>
          <LogisticRegularization />
        </div>
        <Divider />
        <div id='class-imbalance'>
          <ClassImbalance />
        </div>
        <Divider />
        <div id='multiclass'>
          <Multiclass />
        </div>
        <Divider />
        <div id='connection'>
          <Connection />
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
