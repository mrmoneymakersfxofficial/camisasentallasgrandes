import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CatalogPreview from "@/components/sections/CatalogPreview";
import QualitySection from "@/components/sections/QualitySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CatalogPreview />
      <QualitySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
