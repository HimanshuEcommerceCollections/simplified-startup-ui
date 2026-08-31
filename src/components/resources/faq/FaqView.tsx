"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ResourceHero from "@/components/resources/ResourceHero";
import CtaBand from "@/components/home/CtaBand";
import Highlight from "@/components/resources/Highlight";
import FaqDemoCard from "./FaqDemoCard";
import { FAQ_CATEGORIES, FAQ_CATEGORY_TITLES, FAQ_CHIP_LABELS } from "./faq-data";
import "./faq-page.css";

const TOTAL = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

export default function FaqView() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const chipBgRef = useRef<HTMLSpanElement>(null);

  const q = query.trim().toLowerCase();

  // slide the gradient pill behind the active chip
  useEffect(() => {
    function moveChip() {
      const chips = chipsRef.current;
      const bg = chipBgRef.current;
      if (!chips || !bg) return;
      const active = chips.querySelector<HTMLElement>(".fq-chip.is-active") ?? chips.querySelector<HTMLElement>(".fq-chip");
      if (!active) return;
      bg.style.width = `${active.offsetWidth}px`;
      bg.style.transform = `translateX(${active.offsetLeft - 6}px)`;
    }
    const t = setTimeout(moveChip, 300);
    document.fonts?.ready.then(moveChip);
    window.addEventListener("resize", moveChip);
    moveChip();
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", moveChip);
    };
  }, [activeCat]);

  const { visible, shown } = useMemo(() => {
    let count = 0;
    const map = new Map<string, boolean>();
    FAQ_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item, i) => {
        const inCat = activeCat === "all" || cat.key === activeCat;
        const match = q ? `${item.q} ${item.a}`.toLowerCase().includes(q) : true;
        const vis = q ? match : inCat; // search overrides category
        map.set(`${cat.key}-${i}`, vis);
        if (vis) count++;
      });
    });
    return { visible: map, shown: count };
  }, [q, activeCat]);

  const countText = q
    ? shown === 1
      ? "1 result"
      : `${shown} results`
    : activeCat === "all"
      ? `${TOTAL} questions`
      : `${shown} ${shown === 1 ? "question" : "questions"}`;

  function selectCat(key: string) {
    setActiveCat(key);
    if (query) setQuery("");
  }

  return (
    <>
      <ResourceHero
        variant="faq"
        eyebrow="Help centre"
        ariaTitle="Questions? We've got answers."
        line1="Questions?"
        line2={
          <>
            We&apos;ve got <span className="grad-text">answers.</span>
          </>
        }
        lead="Everything people commonly ask — about our services, pricing, process, and how we work. In plain language, not sales pitches."
        search={{
          placeholder: "Search questions…",
          ariaLabel: "Search questions",
          value: query,
          onChange: setQuery,
        }}
      >
        <FaqDemoCard />
      </ResourceHero>

      <section className="band fq-body" id="faq">
        <div className="wrap">
          <Reveal className="fq-chips" role="tablist" aria-label="Filter by topic">
            <div ref={chipsRef} style={{ display: "contents" }}>
              <span className="fq-chipbg" ref={chipBgRef} aria-hidden="true"></span>
              <button className={`fq-chip${activeCat === "all" ? " is-active" : ""}`} onClick={() => selectCat("all")}>
                All
              </button>
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className={`fq-chip${activeCat === cat.key ? " is-active" : ""}`}
                  onClick={() => selectCat(cat.key)}
                >
                  {FAQ_CHIP_LABELS[cat.key]}
                </button>
              ))}
            </div>
          </Reveal>
          <p className="fq-count" aria-live="polite">
            {countText}
          </p>

          <div className="fq-list">
            {FAQ_CATEGORIES.map((cat) => {
              const anyVisible = cat.items.some((_, i) => visible.get(`${cat.key}-${i}`));
              const catAllowed = q ? true : activeCat === "all" || activeCat === cat.key;
              if (!anyVisible || !catAllowed) return null;
              return (
                <div className="fq-cat" key={cat.key}>
                  <Reveal as="h2" className="fq-cat-title">
                    <span className="fq-cat-i">{cat.num}</span>
                    {FAQ_CATEGORY_TITLES[cat.key]}
                  </Reveal>
                  <div className="fq-acc">
                    {cat.items.map((item, i) => {
                      const key = `${cat.key}-${i}`;
                      if (!visible.get(key)) return null;
                      const open = q ? true : openKey === key;
                      return (
                        <div className={`fq-item${open ? " open" : ""}`} key={key}>
                          <button
                            className="fq-q"
                            aria-expanded={open}
                            onClick={() => setOpenKey(open && !q ? null : key)}
                          >
                            <span>
                              <Highlight text={item.q} query={q} />
                            </span>
                            <span className="fq-chev"></span>
                          </button>
                          {open && (
                            <div className="fq-a">
                              <p>
                                <Highlight text={item.a} query={q} />
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {shown === 0 && (
            <div className="fq-empty">
              <p>No questions match “{query}”.</p>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setQuery("");
                  setActiveCat("all");
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Still have a question?"
        heading="Ask us directly."
        copy={
          <>
            Didn&apos;t find what you were looking for?{" "}
            <strong>We answer real questions in plain language — not sales pitches.</strong>
          </>
        }
        primaryLabel="Contact us"
        primaryHref="/#book"
        secondary={{ label: "Back to questions", href: "#faq" }}
      />
    </>
  );
}
