import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartPulse, Stethoscope, Syringe, Pill } from "lucide-react";

const services = [
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: "Preventative Care",
    description: "Regular check-ups, health screenings, and immunizations to keep you healthy."
  },
  {
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    title: "Chronic Disease Management",
    description: "Ongoing care for conditions like diabetes, hypertension, and asthma."
  },
  {
    icon: <Syringe className="h-10 w-10 text-primary" />,
    title: "Minor Procedures",
    description: "In-office procedures for minor injuries and skin conditions."
  },
  {
    icon: <Pill className="h-10 w-10 text-primary" />,
    title: "Medication Management",
    description: "Comprehensive review and management of your prescriptions."
  }
]

export default function Services() {
  return (
    <section id="services" className="container py-12 md:py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Our Services</h2>
        <p className="max-w-2xl text-muted-foreground">
          We offer a wide range of services to meet your family's health needs.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Card key={index} className="flex transform flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
            <CardHeader className="items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardDescription className="px-6 pb-6">
              {service.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
