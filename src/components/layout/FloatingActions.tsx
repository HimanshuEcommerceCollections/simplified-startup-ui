"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./floating.css";

export const OPEN_AI_ADVISOR_EVENT = "open-ai-advisor";

/** Programmatically open the AI Advisor chat from anywhere on the page. */
export function openAiAdvisor() {
  window.dispatchEvent(new Event(OPEN_AI_ADVISOR_EVENT));
}

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    function onOpen() {
      setChatOpen(true);
    }
    window.addEventListener(OPEN_AI_ADVISOR_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AI_ADVISOR_EVENT, onOpen);
  }, []);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        setShowSticky(p > 0.25);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <Link href="/#book" className={`sticky-cta${showSticky ? " show" : ""}`}>
        Book a consult <span className="arw">↗</span>
      </Link>

      <button className="fab" aria-label="Open AI Advisor" onClick={() => setChatOpen((o) => !o)}>
        <span className="dot"></span> AI Advisor
      </button>
      <div className={`chat${chatOpen ? " open" : ""}`} role="dialog" aria-label="AI Advisor">
        <div className="chat-head">
          <span className="av"></span>
          <div>
            <b>AI Advisor</b>
            <span>Directional advice, instantly</span>
          </div>
          <button className="chat-close" aria-label="Close" onClick={() => setChatOpen(false)}>
            ×
          </button>
        </div>
        <div className="chat-body">
          <div className="bubble">
            Hi 👋 Tell me your business stage and biggest bottleneck, and I&apos;ll point you to the
            right service — or a human, if you want to take it further.
          </div>
          <div className="hint">{"// UI placeholder — wire this to your AI Advisor endpoint on deploy."}</div>
        </div>
      </div>
    </>
  );
}
