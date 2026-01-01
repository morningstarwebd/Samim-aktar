import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'doctor-hero');

  return (
    <section className="container grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:py-24">
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Compassionate Care,
          <br />
          <span className="text-primary">Expert Medicine.</span>
        </h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          Welcome to the practice of Dr. Jane Doe. We are dedicated to providing you with the highest quality of healthcare in a warm and friendly environment.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="#contact">Book an Appointment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#services">Our Services</Link>
          </Button>
        </div>
      </div>
      <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg md:h-[450px]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
      </div>
    </section>
  );
}
