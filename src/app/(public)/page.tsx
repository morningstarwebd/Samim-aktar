import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Separator className="my-12 md:my-24" />
      <Services />
      <Separator className="my-12 md:my-24" />
      <Testimonials />
      <Separator className="my-12 md:my-24" />
      <Contact />
    </>
  );
}
