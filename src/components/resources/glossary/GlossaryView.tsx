"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ResourceHero from "@/components/resources/ResourceHero";
import CtaBand from "@/components/home/CtaBand";
import Highlight from "@/components/resources/Highlight";
import GlossaryHeroCard from "./GlossaryHeroCard";
import { ACTIVE_LETTERS, ALPHABET, GLOSSARY, TOTAL_TERMS } from "./glossary-data";
import "./glossary-page.css";

export default function GlossaryView() {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const azRef = useRef<HTMLElement>(null);

  const q = query.trim().toLowerCase();

  const { matches, shown, lettersWithMatches } = useMemo(() => {
    const map = new Map<string, boolean>();
    const letters = new Set<string>();
    let count = 0;
    GLOSSARY.forEach((group) => {
      group.terms.forEach((term) => {
        const match = q ? `${term.name} ${term.def}`.toLowerCase().includes(q) : true;
        map.set(term.name, match);
        if (match) {
          count++;
          letters.add(group.letter);
        }
      });
    });
    return { matches: map, shown: count, lettersWithMatches: letters };
  }, [q]);

  // scroll-spy: highlight the letter currently in view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const sections = Array.from(list.querySelectorAll<HTMLElement>(".gl-letter"));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const letter = (entry.target as HTMLElement).dataset.letter ?? null;
            setActiveLetter(letter);
            if (letter && azRef.current) {
              azRef.current
                .querySelector(`[data-letter="${letter}"]`)
                ?.scrollIntoView({ block: "nearest", inline: "nearest" });
            }
          }
        });
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [shown]);

  const countText = q ? (shown === 1 ? "1 term" : `${shown} terms`) : `${TOTAL_TERMS} terms, plain and simple`;

  return (
    <>
      <ResourceHero
        variant="glossary"
        eyebrow="Marketing glossary"
        ariaTitle="Marketing without the jargon."
        line1="Marketing"
        line2={
          <>
            without the <span className="grad-text">jargon.</span>
          </>
        }
        lead="If you've ever nodded along in a meeting without knowing what a term meant, start here. Every definition is written in plain English — the way we'd explain it to a friend."
        search={{
          placeholder: `Search ${TOTAL_TERMS} terms…`,
          ariaLabel: "Search terms",
          value: query,
          onChange: setQuery,
        }}
      >
        <GlossaryHeroCard />
      </ResourceHero>

      <div className="gl-az-wrap">
        <div className="wrap">
          <nav className="gl-az" aria-label="Jump to letter" ref={azRef}>
            {ALPHABET.map((letter) => {
              if (!ACTIVE_LETTERS.has(letter)) {
                return (
                  <span key={letter} className="gl-az-l is-off" aria-disabled="true">
                    {letter}
                  </span>
                );
              }
              const dim = q && !lettersWithMatches.has(letter);
              return (
                <a
                  key={letter}
                  href={`#gl-${letter.toLowerCase()}`}
                  className={`gl-az-l${activeLetter === letter ? " is-active" : ""}${dim ? " is-dim" : ""}`}
                  data-letter={letter}
                >
                  {letter}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <section className="band gl-body" id="glossary">
        <div className="wrap">
          <p className="gl-count">{countText}</p>
          <div className="gl-list" ref={listRef}>
            {GLOSSARY.map((group) => {
              const visibleTerms = group.terms.filter((t) => matches.get(t.name));
              if (visibleTerms.length === 0) return null;
              return (
                <div className="gl-letter" id={`gl-${group.letter.toLowerCase()}`} data-letter={group.letter} key={group.letter}>
                  <div className="gl-letter-inner">
                    <div className="gl-letter-mark">
                      <span>{group.letter}</span>
                    </div>
                    <div className="gl-terms">
                      {visibleTerms.map((term) => (
                        <Reveal as="article" className="gl-term" key={term.name}>
                          <h3 className="gl-term-name">
                            <Highlight text={term.name} query={q} />
                          </h3>
                          <p className="gl-term-def">
                            <Highlight text={term.def} query={q} />
                          </p>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {shown === 0 && (
            <div className="gl-empty">
              <p>No terms match “{query}”.</p>
              <button className="btn btn-ghost" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Have a term we missed?"
        heading="Ask — we'll explain it plainly."
        copy={
          <>
            Marketing changes fast, and we add new terms as they come up.{" "}
            <strong>Heard something you&apos;re not sure about? We&apos;ll add it here.</strong>
          </>
        }
        primaryLabel="Contact us"
        primaryHref="/#book"
        secondary={{ label: "Back to top", href: "#top" }}
      />
    </>
  );
}
