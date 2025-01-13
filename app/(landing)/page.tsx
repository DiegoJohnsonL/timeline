import Hero from "@/app/(landing)/hero";
import Features from "@/app/(landing)/features";
import HowItWorks from "@/app/(landing)/how-it-works";
import Pricing from "@/app/(landing)/pricing";
import CTA from "@/app/(landing)/cta";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
