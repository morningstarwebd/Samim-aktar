import Image from "next/image";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, GraduationCap, Stethoscope } from 'lucide-react';

export default function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'doctor-about');

  return (
    <section id="about" className="container py-12 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto h-80 w-80 overflow-hidden rounded-full shadow-2xl md:h-96 md:w-96">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-2">
             <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Meet Dr. Jane Doe
            </h2>
            <p className="text-lg font-medium text-primary">Family Medicine Specialist</p>
          </div>
          <p className="text-muted-foreground">
            Dr. Jane Doe is a board-certified family medicine physician with over 15 years of experience. She is passionate about building long-lasting relationships with her patients and providing personalized care for individuals and families. She believes in a holistic approach to medicine, focusing on not just treating illness, but also promoting wellness and preventing disease.
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Harvard Medical School</h3>
                  <p className="text-sm text-muted-foreground">MD, 2008</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Top Doctor Award</h3>
                  <p className="text-sm text-muted-foreground">2021, 2022, 2023</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
