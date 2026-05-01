import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/pages-content/linear-regression/components/Header';
import { Introduction } from '@/pages-content/linear-regression/components/Introduction';
import { Assumptions } from '@/pages-content/linear-regression/components/Assumptions';
import { TheModel } from '@/pages-content/linear-regression/components/TheModel';
import { LossFunction } from '@/pages-content/linear-regression/components/LossFunction';
import { ProbabilisticView } from '@/pages-content/linear-regression/components/ProbabilisticView';
import { MAPEstimation } from '@/pages-content/linear-regression/components/MAPEstimation';
import { BetaPrior } from '@/pages-content/linear-regression/components/BetaPrior';
import { GradientDescent } from '@/pages-content/linear-regression/components/GradientDescent';
import { TrainingDemo } from '@/pages-content/linear-regression/components/TrainingDemo';
import { EvaluationMetrics } from '@/pages-content/linear-regression/components/EvaluationMetrics';
import { MultipleFeatures } from '@/pages-content/linear-regression/components/MultipleFeatures';
import { FeatureEngineering } from '@/pages-content/linear-regression/components/FeatureEngineering';
import { Interpretation } from '@/pages-content/linear-regression/components/Interpretation';
import { Generalization } from '@/pages-content/linear-regression/components/Generalization';
import { Robustness } from '@/pages-content/linear-regression/components/Robustness';
import { Regularization } from '@/pages-content/linear-regression/components/Regularization';
import { Summary } from '@/pages-content/linear-regression/components/Summary';
import { Footer } from '@/pages-content/linear-regression/components/Footer';

export const metadata: Metadata = {
  title: 'Linear Regression | A Visual Guide',
  description:
    'A complete visual guide to linear regression — model, loss, probabilistic interpretation, MAP estimation, gradient descent, evaluation, feature engineering, generalization, and regularization.'
};

function Divider() {
  return <Separator className='mx-auto my-12 w-full' />;
}

export default function LinearRegressionPage() {
  return (
    <div className='bg-background text-foreground min-h-screen'>
      <Header />
      <main className='mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div id='introduction'>
          <Introduction />
        </div>
        <Divider />
        <div id='assumptions'>
          <Assumptions />
        </div>
        <Divider />
        <div id='model'>
          <TheModel />
        </div>
        <Divider />
        <div id='loss'>
          <LossFunction />
        </div>
        <Divider />
        <div id='probabilistic'>
          <ProbabilisticView />
        </div>
        <Divider />
        <div id='map'>
          <MAPEstimation />
        </div>
        <Divider />
        <div id='beta'>
          <BetaPrior />
        </div>
        <Divider />
        <div id='gradient-descent'>
          <GradientDescent />
        </div>
        <Divider />
        <div id='training-demo'>
          <TrainingDemo />
        </div>
        <Divider />
        <div id='evaluation'>
          <EvaluationMetrics />
        </div>
        <Divider />
        <div id='multiple-features'>
          <MultipleFeatures />
        </div>
        <Divider />
        <div id='feature-engineering'>
          <FeatureEngineering />
        </div>
        <Divider />
        <div id='interpretation'>
          <Interpretation />
        </div>
        <Divider />
        <div id='generalization'>
          <Generalization />
        </div>
        <Divider />
        <div id='robustness'>
          <Robustness />
        </div>
        <Divider />
        <div id='regularization'>
          <Regularization />
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
