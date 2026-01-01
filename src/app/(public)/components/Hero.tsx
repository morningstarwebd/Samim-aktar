'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'doctor-hero');

  return (
    <section id="home" className="container grid grid-cols-1 items-center gap-8 overflow-hidden pt-20 text-center md:grid-cols-2 md:py-32 md:text-left">
      <motion.div
        className="flex flex-col items-center gap-6 md:items-start"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          Compassionate Care,
          <br />
          <span className="text-primary">Expert Medicine.</span>
        </motion.h1>
        <motion.p
          className="max-w-prose text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to the practice of Dr. Jane Doe. We provide the highest quality of healthcare in a warm and friendly environment.
        </motion.p>
        <motion.div
          className="flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button asChild size="lg" className="rounded-xl">
            <Link href="#contact">Book an Appointment</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl">
            <Link href="#services">Our Services</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="relative mx-auto h-[400px] w-[300px] md:h-[500px] md:w-[380px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="animate-float rounded-3xl object-cover object-top shadow-2xl"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
      </motion.div>
    </section>
  );
}
