import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <BentoGrid />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}
