'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'doctor-hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="container grid grid-cols-1 items-center gap-8 overflow-hidden py-12 md:grid-cols-2 md:py-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex flex-col items-start gap-6" variants={containerVariants}>
        <motion.h1 
          className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          Compassionate Care,
          <br />
          <span className="text-primary">Expert Medicine.</span>
        </motion.h1>
        <motion.p 
          className="max-w-prose text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Welcome to the practice of Dr. Jane Doe. We are dedicated to providing you with the highest quality of healthcare in a warm and friendly environment.
        </motion.p>
        <motion.div 
          className="flex flex-col gap-3 sm:flex-row"
          variants={itemVariants}
        >
          <Button asChild size="lg">
            <Link href="#contact">Book an Appointment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#services">Our Services</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div 
        className="relative h-80 w-full overflow-hidden rounded-lg shadow-2xl md:h-[450px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
      >
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
      </motion.div>
    </motion.section>
  );
}
