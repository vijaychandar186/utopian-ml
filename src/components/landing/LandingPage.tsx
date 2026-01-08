import HeroSection from '@/features/landing/HeroSection';
import GuideListSection from '@/features/landing/GuideListSection';
import UpcomingGuidesSection from '@/features/landing/UpcomingGuidesSection';
import FooterSection from '@/features/landing/FooterSection';

export default function LandingPage() {
    return (
        <div className='bg-background text-foreground min-h-screen'>
            <HeroSection />
            <main className='mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
                <GuideListSection />
                <UpcomingGuidesSection />
            </main>
            <FooterSection />
        </div>
    );
}