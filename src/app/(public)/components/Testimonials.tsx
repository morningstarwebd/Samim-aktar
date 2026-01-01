import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
    image: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
    quote: "An amazing physician who is both knowledgeable and compassionate. I couldn't ask for a better healthcare provider for my family."
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="container py-12 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">What Our Patients Say</h2>
        <p className="max-w-2xl text-muted-foreground">
          Real stories from our valued patients.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="mx-auto mt-12 w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center gap-6 p-6 text-center">
                    <Avatar className="h-20 w-20">
                      {testimonial.image && (
                        <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                      )}
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
