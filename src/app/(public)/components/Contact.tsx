import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-secondary/50 py-24 pb-32 md:pb-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Book an Appointment
            </h2>
            <p className="mt-4 text-muted-foreground">
                Have a question or need to schedule a visit? Fill out the form below and our team will get back to you shortly.
            </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
            <ContactForm />
        </div>
      </div>
    </section>
  );
}
