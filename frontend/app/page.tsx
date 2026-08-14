import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustPillars from "@/components/TrustPillars";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustPillars />
      <HowItWorks />
      <Services />
      <Packages />
      <Testimonials />
      <Footer />
    </main>
  );
}