import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Services = dynamic(() => import("@/components/Services"));
const Technologies = dynamic(() => import("@/components/Technologies"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const Industries = dynamic(() => import("@/components/Industries"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));

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
