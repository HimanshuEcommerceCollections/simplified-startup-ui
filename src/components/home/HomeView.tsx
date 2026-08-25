"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Loader from "./Loader";
import ScrollProgress from "./ScrollProgress";
import Hero from "./Hero";
import Approach from "./Approach";
import IntegratedTeam from "./IntegratedTeam";
import ServicesGallery from "./ServicesGallery";
import WhyFounders from "./WhyFounders";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import CtaBand from "./CtaBand";

export default function HomeView() {
  const [animReady, setAnimReady] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  // Arm the hero entrance animations only once JS is running;
  // the loader overlay hides the initial state until then.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const pageClass = ["page-home", animReady ? "anim-ready" : "", heroIn ? "hero-in" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={pageClass}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Loader onDone={() => setHeroIn(true)} />
      <div className="noise" aria-hidden="true"></div>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Approach />
      <IntegratedTeam />
      <ServicesGallery />
      <WhyFounders />
      <Testimonials />
      <Faq />
      <CtaBand />
      <Footer />
      <FloatingActions />
    </div>
  );
}
