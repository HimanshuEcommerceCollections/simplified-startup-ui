import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";
import PricingHero from "@/components/pricing/PricingHero";
import PricingTiers from "@/components/pricing/PricingTiers";
import RateCard from "@/components/pricing/RateCard";
import ScopedPractices from "@/components/pricing/ScopedPractices";
import BundleDiscounts from "@/components/pricing/BundleDiscounts";
import TermsGrid from "@/components/pricing/TermsGrid";
import ResourcesDesk from "@/components/pricing/ResourcesDesk";

export const metadata: Metadata = {
  title: "Pricing — Every Price, Published | Simplified Startup",
  description:
    "Digital marketing packages and service pricing for business — published in full. Fixed before work starts, tools included, no markups, and you own everything.",
};

const PRICING_FAQS = [
  {
    question: "Why ranges and not single prices?",
    answer:
      "Because scope varies, and pretending it doesn't is how agencies pad quotes. The range is the honest boundary. The exact number you land on within it is set by your scope, in your plan, before you start work — and then it's locked in.",
  },
  {
    question: "Can the pricing change mid-engagement?",
    answer:
      "No. The number is the number on your plan. If you ask for something new mid-stream, it's scoped and priced in writing as a choice of its own — and you either approve it or you don't.",
  },
  {
    question: "Do you do custom quotes?",
    answer:
      "The free growth plan gives you the right services, the correct prices, and a sequence built for your situation — plus the written quote. It costs nothing, and it's yours to keep either way.",
  },
  {
    question: "What do digital marketing packages cost for a business?",
    answer:
      "Our digital marketing packages are $1,000–1,500/mo (Starter), $2,000–4,000/mo (Growth), and $4,000–8,000/mo (Full-Service). Standalone SEO, brand, and web have their own declared rates above. Whatever the combination, your precise price is set in your free growth plan, on paper, before work begins — so a small-business budget gets a real number, not a mystery quote.",
  },
];

export default function PricingPage() {
  return (
    <div className="page-pricing">
      <a href="#pricing-main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="pricing-main">
        <PricingHero />
        <PricingTiers />
        <RateCard />
        <ScopedPractices />
        <BundleDiscounts />
        <TermsGrid />
        <Faq title="About the numbers" eyebrow="— Fair questions" items={PRICING_FAQS} />
        <ResourcesDesk />
        <CtaBand />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
