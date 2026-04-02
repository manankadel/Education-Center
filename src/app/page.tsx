import { Header } from "@/components/core/Header";
import { Hero } from "@/components/modules/landing/Hero";
import { AboutEditorial } from "@/components/modules/landing/AboutEditorial";
import { ServiceGallery } from "@/components/modules/landing/ServiceGallery";
import { ProgramsList } from "@/components/modules/landing/ProgramsList";
import { ManifestoQuote } from "@/components/modules/landing/ManifestoQuote";
import { ContactBrutal } from "@/components/modules/landing/ContactBrutal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen selection:bg-foreground selection:text-background">
      <Header />
      <Hero />
      <AboutEditorial />
      <ServiceGallery />
      <ProgramsList />
      <ManifestoQuote />
      <ContactBrutal />
    </main>
  );
}