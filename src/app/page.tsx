import NavigationHeader from "@/components/sections/navigation-header";
import HeroSection from "@/components/sections/hero-section";
import TestimonialCTA from "@/components/sections/testimonial-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <NavigationHeader />
      <main>
        <HeroSection />
        <TestimonialCTA />
      </main>
      <Footer />
    </div>
  );
}
