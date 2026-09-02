import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustPillars from "@/components/TrustPillars";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import ReviewAndLocationQR from "@/components/ReviewAndLocationQR";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustPillars />
      <WhyChooseUs />
      <HowItWorks />
      <Services />
      <Packages />
      <Testimonials />
      <section className="bg-gradient-to-b from-white via-brand-sky/20 to-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-5xl">
          <ReviewAndLocationQR />
        </div>
      </section>
      <Footer />
    </main>
  );
}