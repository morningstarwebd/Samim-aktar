'use client';
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import { Separator } from "@/components/ui/separator";
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from "react";

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 75, rotateX: -15 },
        visible: { opacity: 1, y: 0, rotateX: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
