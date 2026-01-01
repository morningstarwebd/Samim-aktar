'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative h-dvh w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkb2N0b3J8ZW58MHx8fHwxNzE4NzMxMDM4fDA&ixlib=rb-4.0.3&q=80&w=1080"
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/firebase-studio-demos.appspot.com/o/public%2Fdoc-bg.mp4?alt=media&token=d4b295f1-3a78-4a4a-b529-61f228498f3b" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute left-0 top-0 h-full w-full bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <motion.div
            className="flex flex-col items-center gap-6 md:items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
            className="max-w-prose text-lg text-gray-200"
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
            <Button asChild variant="outline" size="lg" className="rounded-xl border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                <Link href="#services">Our Services</Link>
            </Button>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
