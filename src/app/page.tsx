import { Header } from "@/components/core/Header";
import { Hero } from "@/components/modules/landing/Hero";
import { About } from "@/components/modules/landing/About";
import { Services } from "@/components/modules/landing/Services";
import { Programs } from "@/components/modules/landing/Programs";
import { Testimonials } from "@/components/modules/landing/Testimonials";
import { Contact } from "@/components/modules/landing/Contact";

export default function Home() {
  return (
    <main className="flex flex-col bg-background min-h-screen selection:bg-brand-blue selection:text-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Programs />
      <Testimonials />
      <Contact />
    </main>
  );
}