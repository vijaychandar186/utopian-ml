import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SocialIcons } from '@/components/Icons';
import { guideListContent } from '@/constants/landing/guideListContent';

export default function GuideListSection() {
  return (
    <section id='guides' className='mb-12 scroll-mt-20 sm:mb-16'>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-2xl font-bold sm:text-3xl'>
          {guideListContent.sectionTitle}
        </h2>
        <Separator className='ml-4 hidden flex-1 sm:block' />
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {guideListContent.guides.map((guide, idx) => (
          <Card
            key={idx}
            className='hover:border-primary/50 flex flex-col transition-all duration-300 hover:shadow-lg'
          >
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-base sm:text-lg'>
                  {guide.title}
                </CardTitle>
                <Badge variant='secondary'>{guide.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className='flex-grow'>
              <p className='text-muted-foreground mb-4 text-sm'>
                {guide.description}
              </p>
              {guide.features && (
                <ul className='text-muted-foreground space-y-1 text-xs'>
                  {guide.features.map((feature, fIdx) => (
                    <li key={fIdx} className='flex items-center gap-2'>
                      <span className='bg-primary h-1 w-1 rounded-full' />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>

            <CardFooter className='flex justify-between'>
              <Badge variant='outline'>{guide.category}</Badge>
              <Button variant='ghost' size='sm' asChild className='gap-2'>
                <Link href={guide.href}>
                  <SocialIcons.ExternalLink className='h-4 w-4' />
                  Start Learning
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
