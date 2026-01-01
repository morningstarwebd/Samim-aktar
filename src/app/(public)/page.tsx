'use client';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import React from 'react';

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <Separator className="my-12 md:my-24" />
      <AnimatedSection>
        <Services />
      </AnimatedSection>
      <Separator className="my-12 md:my-24" />
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <Separator className="my-12 md:my-24" />
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </>
  );
}
