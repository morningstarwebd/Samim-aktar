import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const BentoGrid = () => {
  const aboutImage = PlaceHolderImages.find((p) => p.id === 'doctor-about');

  const items = [
    {
      title: "Meet Dr. Jane Doe",
      description: "Family Medicine Specialist",
      header: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      ),
      className: "md:col-span-2",
      icon: <Stethoscope className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Philosophy of Care",
      description: "Building long-lasting relationships with patients through holistic and personalized care, focusing on prevention and wellness.",
      header: <div className="flex h-full w-full items-center justify-center rounded-2xl bg-primary/10"><GraduationCap className="h-12 w-12 text-primary" /></div>,
      className: "md:col-span-1",
    },
    {
      title: "Top Doctor Award",
      description: "Recognized for excellence in patient care in 2021, 2022, and 2023.",
      header: <div className="flex h-full w-full items-center justify-center rounded-2xl bg-primary/10"><Award className="h-12 w-12 text-primary" /></div>,
      className: "md:col-span-1",
    },
    {
      title: "Education & Credentials",
      description: "Board-certified Family Medicine Physician, graduated from Harvard Medical School in 2008. Over 15 years of dedicated experience.",
      header: <div className="flex h-full w-full items-center justify-center rounded-2xl bg-primary/10"><Stethoscope className="h-12 w-12 text-primary" /></div>,
      className: "md:col-span-2",
    },
  ];

  return (
    <section id="about" className="container py-24">
       <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About the Practice</h2>
            <p className="mt-4 text-muted-foreground">
                Get to know the doctor and the philosophy behind our care.
            </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[22rem]">
        {items.map((item, i) => (
          <Card
            key={i}
            className={cn(
              "row-span-1 flex flex-col justify-between space-y-4 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
              item.className
            )}
          >
            <div className="h-1/2 w-full">{item.header}</div>
            <CardContent className="p-0">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
