import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import AboutHero from "@/components/about/AboutHero";
import CapabilityTicker from "@/components/about/CapabilityTicker";
import WhyCards from "@/components/about/WhyCards";
import WhatWeDo from "@/components/about/WhatWeDo";
import HowWeHelp from "@/components/about/HowWeHelp";
import WhoWeAreFor from "@/components/about/WhoWeAreFor";
import OurApproach from "@/components/about/OurApproach";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "About — Simplified Startup",
  description:
    "Simplified Startup helps founders navigate the complexity of building, running, and growing a business — with one trusted strategic partner across the disciplines that matter.",
};

export default function AboutPage() {
  return (
    <div className="page-about">
      <a href="#about-main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="about-main">
        <AboutHero />
        <CapabilityTicker />
        <WhyCards />
        <WhatWeDo />
        <HowWeHelp />
        <WhoWeAreFor />
        <OurApproach />
        <CtaBand
          heading="Ready to build your business?"
          copy="Book a free strategy call and we'll map the fastest path across the pieces that matter first. No pressure — the plan is yours to keep either way."
          primaryLabel="Book a free strategy call"
          secondary={{ label: "See our services", href: "/#services" }}
          fine="Free · 30 minutes · No obligation"
        />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
