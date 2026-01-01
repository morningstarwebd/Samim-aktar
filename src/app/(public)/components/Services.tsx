import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Services</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          We offer a wide range of services to meet your family's health needs.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Card key={index} className="flex transform flex-col items-center rounded-2xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <CardHeader className="items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <CardDescription>
                {service.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
