'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Stethoscope, Briefcase, User, CalendarPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#services', label: 'Services', icon: Briefcase },
  { href: '#contact', label: 'Book', icon: CalendarPlus, isCentral: true },
  { href: '#about', label: 'Profile', icon: User },
  { href: '#testimonials', label: 'Patients', icon: Stethoscope },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-50 w-full md:hidden">
      <div className="relative mx-auto flex h-20 items-center justify-around border-t bg-white/50 p-2 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] backdrop-blur-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.isCentral) {
            return (
              <div key={item.href} className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <Button asChild size="lg" className="h-16 w-16 rounded-full shadow-lg">
                  <Link href={item.href}>
                    <item.icon className="h-7 w-7" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </Button>
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg p-2 text-foreground/60 transition-colors hover:text-foreground',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
