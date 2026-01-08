import type { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Utopian ML | Visualizing AI',
  description: 'Visualizing Machine Learning Architectures'
};

export default function HomePage() {
  return <LandingPage />;
}