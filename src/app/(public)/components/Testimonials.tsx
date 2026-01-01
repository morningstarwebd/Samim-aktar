'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "John P.",
    image: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
    quote: "Dr. Doe is the most caring doctor I've ever had. She truly listens and takes the time to explain everything. I feel like I'm in great hands."
  },
  {
    name: "Sarah L.",
    image: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
    quote: "The office is clean, the staff is friendly, and appointments are always on time. Managing my health has never been easier. Highly recommend!"
  },
  {
    name: "Michael B.",
    image: PlaceHolderImages.find(p => p.id === 'testimonial-3'),
    quote: "I was nervous about switching doctors, but Dr. Doe and her team made me feel comfortable from the very first visit. A truly professional and warm practice."
  },
   {
    name: "Emily R.",
    image: PlaceHolderImages.find(p => p.id === 'testimonial-4'),
    quote: "An amazing physician who is both knowledgeable and compassionate. I couldn't ask for a better healthcare provider for my family."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="container py-12 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Our Patients Say</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Real stories from our valued patients.
        </p>
      </div>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="p-2 md:basis-1/2 lg:basis-1/3">
              <motion.div
                className="h-full"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                <Card className="flex h-full flex-col rounded-2xl shadow-lg">
                  <CardContent className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                      {testimonial.image && (
                        <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                      )}
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </section>
  );
}
