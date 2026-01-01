'use client';

import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
];

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto hidden w-[95%] max-w-screen-xl md:block">
      <div className="rounded-2xl border border-white/10 bg-white/30 p-2 shadow-lg backdrop-blur-lg">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">DocConnect</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Button key={link.href} asChild variant="ghost">
                <Link
                  href={link.href}
                  className="font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          <Button asChild className="rounded-xl">
            <Link href="#contact">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
