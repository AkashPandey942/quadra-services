import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Testimonials = dynamic(() => import("@/components/Testimonials"));
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import WhyChooseUs from "@/components/WhyChooseUs";
import Industries from "@/components/Industries";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Technologies />
      <WhyChooseUs />
      <Industries />
      <FAQ />
      <CTA />
      <Testimonials />
    </>
  );
}
