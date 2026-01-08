import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GuideIcons } from '@/components/Icons';
import { upcomingGuidesContent } from '@/constants/landing/upcomingGuidesContent';

type IconName = keyof typeof GuideIcons;

export default function UpcomingGuidesSection() {
  return (
    <section id='upcoming' className='mb-12 scroll-mt-20 sm:mb-16'>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-2xl font-bold sm:text-3xl'>
          {upcomingGuidesContent.sectionTitle}
        </h2>
        <Separator className='ml-4 hidden flex-1 sm:block' />
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {upcomingGuidesContent.guides.map((guide, index) => {
          const IconComponent = GuideIcons[guide.icon as IconName];
          return (
            <Card
              key={index}
              className='hover:border-primary/50 flex flex-col opacity-75 transition-all duration-300 hover:opacity-100 hover:shadow-lg'
            >
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
                    <IconComponent className='text-primary h-5 w-5' />
                    {guide.title}
                  </CardTitle>
                  <Badge variant='outline' className='text-xs'>
                    {guide.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='flex-grow'>
                <p className='text-muted-foreground text-sm'>
                  {guide.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
