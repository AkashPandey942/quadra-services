import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Testimonials = dynamic(() => import("@/components/Testimonials"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
}
