'use client';
import { Card } from "@/components/ui/card";
import { Lightbulb, Droplets, Utensils, HeartPulse } from 'lucide-react';
import { cn } from "@/lib/utils";

const healthTips = [
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water a day to keep your body functioning optimally and maintain energy levels."
  },
  {
    icon: <Utensils className="h-10 w-10 text-primary" />,
    title: "Balanced Diet",
    description: "Incorporate a variety of fruits, vegetables, lean proteins, and whole grains into your daily meals for essential nutrients."
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: "Regular Exercise",
    description: "Aim for 30 minutes of moderate activity, like brisk walking or cycling, on most days of the week to boost your health."
  }
];

const FlipCard = ({ tip, className }: { tip: typeof healthTips[0], className?: string }) => {
    return (
      <div className={cn("group h-64 w-full [perspective:1000px]", className)}>
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front of Card */}
          <div className="absolute inset-0">
            <Card className="flex h-full flex-col items-center justify-center text-center p-6">
                {tip.icon}
                <h3 className="mt-4 text-xl font-bold">{tip.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Hover to learn more</p>
            </Card>
          </div>
          {/* Back of Card */}
          <div className="absolute inset-0 h-full w-full rounded-xl bg-secondary/80 px-12 py-6 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
             <Card className="flex h-full flex-col items-center justify-center p-6">
                <h3 className="text-xl font-bold text-primary">{tip.title}</h3>
                <p className="mt-2 text-base text-foreground">{tip.description}</p>
            </Card>
          </div>
        </div>
      </div>
    );
};


export default function Flipbook() {
  return (
    <section id="health-tips" className="container py-12 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            <Lightbulb className="inline-block h-4 w-4 mr-1"/>
            Health Tips
        </div>
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Your Guide to a Healthier Life</h2>
        <p className="max-w-2xl text-muted-foreground">
          Simple, actionable tips for improving your everyday well-being.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {healthTips.map((tip, index) => (
          <FlipCard key={index} tip={tip} />
        ))}
      </div>
    </section>
  );
}
