"use client";

import { Fragment, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import "./services-gallery.css";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "marketing", label: "Marketing" },
  { key: "web", label: "Web" },
  { key: "brand", label: "Brand" },
  { key: "advisory", label: "Advisory" },
  { key: "ai", label: "AI Automation" },
  { key: "accounting", label: "Accounting" },
];

const SERVICES = [
  {
    category: "web",
    title: "Website Development",
    description: "Fast, modern, conversion-focused sites and landing pages.",
    video: "/assets/videos/service-website-development.mp4",
  },
  {
    category: "advisory",
    title: "Business Consulting",
    description: "Go-to-market, positioning, pricing, and business model.",
    video: "/assets/videos/service-business-consulting.mp4",
  },
  {
    category: "marketing",
    title: "Digital Marketing",
    description: "Paid, SEO, content, and email that generate real pipeline.",
    video: "/assets/videos/service-digital-marketing.mp4",
  },
  {
    category: "brand",
    title: "Branding & Growth",
    description: "Identity systems and the strategy behind them.",
    video: "/assets/videos/service-branding-growth.mp4",
  },
  {
    category: "marketing",
    title: "Sales & Lead Generation",
    description: "A measurable pipeline, plugged into your business.",
    video: "/assets/videos/service-sales-leadgen.mp4",
  },
  {
    category: "advisory",
    title: "Talent & Staffing",
    description: "Senior capability, without a full-time hire.",
    video: "/assets/videos/service-talent-staffing.mp4",
  },
  {
    category: "ai",
    title: "AI Automation",
    description: "Custom AI workflows and agents that automate the busywork across your stack.",
    video: "/assets/videos/service-ai-automation.mp4",
  },
  {
    category: "accounting",
    title: "Bookkeeping & Accounting",
    description: "Clean books, reporting, and month-end close — finance handled end to end.",
    video: "/assets/videos/service-accounting.mp4",
  },
];

export default function ServicesGallery() {
  const [activeCat, setActiveCat] = useState("all");

  return (
    <section className="band works" id="services">
      <div className="works-band">
        <div className="wrap">
          <Reveal className="works-head">
            <h2>
              <span className="grad">Everything you need</span>
              <span className="rule"></span>
            </h2>
            <p>
              One integrated engagement across marketing, web, brand, sales, and talent — not six
              vendors stitched together.
            </p>
          </Reveal>
          <Reveal className="works-tabs">
            {CATEGORIES.map((cat, i) => (
              <Fragment key={cat.key}>
                {i > 0 && <span className="dot">•</span>}
                <button
                  className={activeCat === cat.key ? "active" : undefined}
                  onClick={() => setActiveCat(cat.key)}
                >
                  {cat.label}
                </button>
              </Fragment>
            ))}
          </Reveal>
        </div>
      </div>
      <div className="wrap">
        <Reveal className="works-grid">
          {SERVICES.map((service) => (
            <a
              key={service.title}
              className="work"
              href="#book"
              style={{
                display: activeCat === "all" || service.category === activeCat ? undefined : "none",
              }}
            >
              <video src={service.video} autoPlay muted loop playsInline preload="metadata" aria-label={service.title}></video>
              <div className="cap">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
