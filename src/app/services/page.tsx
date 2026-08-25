import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";
import ServicesHero from "@/components/services/ServicesHero";
import WhyOneTeam from "@/components/services/WhyOneTeam";
import ServiceExplorer from "@/components/services/ServiceExplorer";
import BundleCards from "@/components/services/BundleCards";
import ConnectionMap from "@/components/services/ConnectionMap";
import ProcessFlow from "@/components/services/ProcessFlow";
import FitCheck from "@/components/services/FitCheck";

export const metadata: Metadata = {
  title: "Startup Services — Marketing, Web, Brand, AI & More | Simplified Startup",
  description:
    "Every service your startup needs from one partner — marketing, web, brand, sales, AI automation, bookkeeping, and advisory. Senior operators, bundled pricing, one team.",
};

const SERVICES_FAQS = [
  {
    question: "Do I have to take all the services?",
    answer:
      "No. Start with one, add more when it makes sense. The bundle discount grows as you add services, but there's no minimum stack — a single-service engagement is fully supported.",
  },
  {
    question: "How is this priced?",
    answer:
      "In transparent bundles, published up front and fixed in a written plan before work starts. Bundling more of the stack lowers the per-service rate; you always see the exact number before you commit.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "Senior operators, named in your plan before you sign — not a rotating pool of juniors. One team runs every service in your engagement.",
  },
  {
    question: "What if I already have a vendor for one service?",
    answer:
      "Fine. We'll slot around them and own the rest, or take it over cleanly if you'd rather consolidate. Either way, you keep every account and asset.",
  },
  {
    question: "How fast can we start?",
    answer:
      "A written plan within about a week of your strategy call, kickoff the week after, first deliverables in weeks two to four depending on scope.",
  },
  {
    question: "Do you work with our stage / industry?",
    answer:
      "We focus on startups and small businesses across services, SaaS, e-commerce, and local. If we're not the right fit for your situation, we'll say so on the strategy call.",
  },
];

export default function ServicesPage() {
  return (
    <div className="page-services">
      <a href="#services-main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="services-main">
        <ServicesHero />
        <WhyOneTeam />
        <ServiceExplorer />
        <BundleCards />
        <ConnectionMap />
        <ProcessFlow />
        <FitCheck />
        <Faq title="Questions founders ask." eyebrow="— FAQ" items={SERVICES_FAQS} />
        <CtaBand
          copy="Book a free strategy call and we'll map the fastest path across the services that matter first. No decks, no pressure — the plan is yours to keep either way."
          primaryLabel="Book a free strategy call"
          secondary={{ label: "See pricing", href: "/pricing" }}
          fine="Flat, published pricing. You own everything. No lock-in."
        />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
