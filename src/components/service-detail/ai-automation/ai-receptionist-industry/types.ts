import type { ReactNode } from "react";

/* Data contract for the three AI receptionist industry pages (dental, home services, law firms). */

export type RcpIcon = ReactNode;

export type RcpCallLine = { who: "ai" | "caller"; text: ReactNode };

export type RcpHero = {
  line1: ReactNode;
  line2: ReactNode;
  lead: ReactNode;
  primaryLabel: string;
  card: {
    ariaLabel: string;
    live: string;
    callerTitle: ReactNode;
    callerSub: ReactNode;
    time: string;
    lines: RcpCallLine[];
    /** Disclosure pill under the transcript (dental: teal, law: amber; home services has none). */
    badge?: { text: ReactNode; tone: "teal" | "amber" };
    footLeft: string;
    footRight: string;
  };
};

export type RcpExampleSection = {
  kind: "example";
  eyebrow: string;
  heading: string;
  steps: { when: string; title: string; text: ReactNode }[];
};

/** Dental: "What your AI receptionist knows" (5 kicker cards, 3 columns). */
export type RcpKnowledgeSection = {
  kind: "knowledge";
  id: string;
  eyebrow: string;
  heading: string;
  cards: { kicker: string; icon: RcpIcon; title: string; text: ReactNode }[];
};

/** Dental: escalation rules (2x2, first card flagged urgent). */
export type RcpEscalationSection = {
  kind: "escalation";
  id: string;
  eyebrow: string;
  heading: string;
  cards: { icon: RcpIcon; title: string; text: ReactNode; urgent?: boolean }[];
};

/** Home services: 4-step triage ladder (severity 1 to 4). */
export type RcpTriageSection = {
  kind: "triage";
  id: string;
  eyebrow: string;
  heading: string;
  tiers: { label: string; icon: RcpIcon; title: string; text: ReactNode }[];
};

/** Law firms: boundaries (2x2 kicker cards). */
export type RcpBoundariesSection = {
  kind: "boundaries";
  id: string;
  eyebrow: string;
  heading: string;
  cards: { kicker: string; icon: RcpIcon; title: string; text: ReactNode }[];
};

/** Home services trades / law practice areas: 6 tilt cards. */
export type RcpSixSection = {
  kind: "six";
  id: string;
  eyebrow: string;
  heading: string;
  cards: { icon: RcpIcon; title: string; text: ReactNode }[];
};

export type RcpMiddleSection =
  | RcpExampleSection
  | RcpKnowledgeSection
  | RcpEscalationSection
  | RcpTriageSection
  | RcpBoundariesSection
  | RcpSixSection;

export type RcpIndustry = {
  hero: RcpHero;
  trust: string[];
  why: { eyebrow: string; heading: ReactNode; paras: ReactNode[]; glance: string[] };
  callTypes: { heading: string; rows: { type: string; does: string; hand: string }[] };
  /** The three industry-specific sections between the call-types table and the tools band, in design order. */
  middle: [RcpMiddleSection, RcpMiddleSection, RcpMiddleSection];
  tools: { names: string[]; note: ReactNode };
  questions: { id: string; eyebrow: string; items: { q: string; a: ReactNode }[] };
  problems: { heading: string; rows: { prob: string; fix: string }[] };
  included: { heading: string; items: { icon: RcpIcon; text: string }[] };
  who: { heading: string; items: { icon: RcpIcon; text: ReactNode }[] };
  faq: { heading: string; items: { q: string; a: ReactNode }[] };
  cta: { eyebrow: string; heading: string; copy: ReactNode; primaryLabel: string };
};
