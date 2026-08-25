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
import AboutCta from "@/components/about/AboutCta";

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
        <AboutCta />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
