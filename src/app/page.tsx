import { Header } from "@/components/core/Header";
import { Hero } from "@/components/modules/landing/Hero";
import { UniversitiesMarquee } from "@/components/modules/landing/UniversitiesMarquee";
import { ServiceGallery } from "@/components/modules/landing/ServiceGallery";
import { CourseDirectory } from "@/components/modules/landing/CourseDirectory";
import { InsightsGallery } from "@/components/modules/landing/InsightsGallery";
import { ManifestoQuote } from "@/components/modules/landing/ManifestoQuote";
import { ContactBrutal } from "@/components/modules/landing/ContactBrutal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen selection:bg-foreground selection:text-background">
      <Header />
      <Hero />
      <UniversitiesMarquee />
      <ServiceGallery />
      <CourseDirectory />
      <InsightsGallery />
      <ManifestoQuote />
      <ContactBrutal />
    </main>
  );
}