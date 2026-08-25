"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import "./faq.css";

const FAQS = [
  {
    question: "What do I actually get with one partner?",
    answer:
      "Strategy, brand and product design, web and app development, and growth marketing — under a single roster. You brief one team instead of stitching together five freelancers and an agency.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Most founders see a live, revenue-ready first version in 4–6 weeks. We work in tight weekly cycles, so you're shipping and learning continuously instead of waiting on one big reveal.",
  },
  {
    question: "How does pricing work?",
    answer:
      "A flat monthly rate for a dedicated team — no hourly billing and no surprise change-orders. You can pause or scale the engagement as your roadmap shifts.",
  },
  {
    question: "Do you work with pre-revenue, early-stage founders?",
    answer:
      "Yes — a large share of our work is zero-to-one: validating the idea, shaping the MVP, and getting the first users and first revenue in the door.",
  },
  {
    question: "Who owns the work and the code?",
    answer:
      "You do — fully. Every design file, repository, and asset is handed over to you with clean documentation, so your future team can pick it up without friction.",
  },
  {
    question: "What's the AI Advisor?",
    answer:
      "It's the assistant in the corner of this page. Tell it where your startup is today and it suggests which services move the needle first — a fast, no-pressure way to scope a project before you book a call.",
  },
];

function FaqItem({
  question,
  answer,
  open,
  onToggle,
  panelId,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    setMaxHeight(open ? panel.scrollHeight : 0);
    if (!open) return;
    function onResize() {
      if (panelRef.current) setMaxHeight(panelRef.current.scrollHeight);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <Reveal className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        {question}
        <span className="faq-ico" aria-hidden="true"></span>
      </button>
      <div className="faq-a" id={panelId} role="region" ref={panelRef} style={{ maxHeight }}>
        <p>{answer}</p>
      </div>
    </Reveal>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="band light" id="faq">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>Frequently Asked Questions</h2>
        </Reveal>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              panelId={`faq-a-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
