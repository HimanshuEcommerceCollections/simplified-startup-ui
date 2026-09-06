"use client";

import { useEffect, useState } from "react";
import "./floating.css";

export const OPEN_AI_ADVISOR_EVENT = "open-ai-advisor";

/** Programmatically open the AI Advisor chat from anywhere on the page. */
export function openAiAdvisor() {
  window.dispatchEvent(new Event(OPEN_AI_ADVISOR_EVENT));
}

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setChatOpen(true);
    }
    window.addEventListener(OPEN_AI_ADVISOR_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AI_ADVISOR_EVENT, onOpen);
  }, []);

  return (
    <>
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
