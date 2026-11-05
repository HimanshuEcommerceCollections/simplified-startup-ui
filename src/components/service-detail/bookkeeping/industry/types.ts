import type { ReactNode } from "react";

/* -------- hero "breakdown" card --------
   every industry card shares the shell (top bar, net row, foot); the body varies:
   a gradient "gross" row (absent on real estate), then either deduction rows or,
   for SaaS, recognition bars */

export type HeroRowTone = "amber" | "teal" | "blue" | "cyan";

export type HeroCardRow = { icon: ReactNode; name: ReactNode; value: string; tone?: HeroRowTone };

export type HeroCardBar = { label: string; width: string; value: string };

export type HeroCardData = {
  ariaLabel: string;
  live: string;
  corner: string;
  gross?: { label: string; value: string };
  rows?: HeroCardRow[];
  bars?: HeroCardBar[];
  net: { label: string; value: string };
  footLeft: string;
  footRight: string;
};

/* -------- the industry-specific middle sections -------- */

export type TableBlock = { kind: "table"; head: [string, string, string]; rows: [string, string, string][] };

export type WaterfallBlock = {
  kind: "waterfall";
  steps: { key: string; title: string; text: string; tag: string; tagKind: "base" | "minus" | "pr"; variant?: "plus" | "profit" }[];
};

export type PayoutBlock = { kind: "payout"; steps: { key: string; title: string; text: string; net?: boolean }[] };

export type CardsBlock = {
  kind: "cards";
  cards: { icon: ReactNode; title: string; text: string; kicker?: string; sub?: string }[];
};

export type TimelineBlock = { kind: "timeline"; steps: { when: string; title: string; text: string }[] };

export type ReportsBlock = { kind: "reports"; items: { icon: ReactNode; title: string; text: string }[] };

export type PropertyTreeBlock = {
  kind: "propertyTree";
  head: string;
  nodes: { kicker: string; title: string; label: string; items: string[]; portfolio?: boolean }[];
};

export type TxTableBlock = {
  kind: "txTable";
  head: [string, string, string];
  rows: { item: string; mistake: string; fix: string }[];
};

export type PrimeCostBlock = {
  kind: "primeCost";
  bars: { icon: ReactNode; label: string; fill: "food" | "bev" | "labor"; width: string; value: string }[];
  total: { title: string; text: string; value: string };
};

export type CompareBlock = {
  kind: "compare";
  head: [string, string];
  rows: { k: string; cash: string; acc: string }[];
};

export type AccountsBlock = { kind: "accounts"; cards: { kicker: string; icon: ReactNode; title: string; text: string }[] };

export type Reports6Block = { kind: "reports6"; items: { icon: ReactNode; title: string; text: string }[] };

export type FounderQsBlock = { kind: "founderQs"; items: { q: string; a: string }[] };

export type MiddleBlock =
  | TableBlock
  | WaterfallBlock
  | PayoutBlock
  | CardsBlock
  | TimelineBlock
  | ReportsBlock
  | PropertyTreeBlock
  | TxTableBlock
  | PrimeCostBlock
  | CompareBlock
  | AccountsBlock
  | Reports6Block
  | FounderQsBlock;

export type MiddleSection = { id: string; eyebrow: string; heading: string; block: MiddleBlock };

/* -------- the whole page -------- */

export type IndustryData = {
  hero: {
    line1: ReactNode;
    line2: ReactNode;
    lead: ReactNode;
    primaryLabel: string;
    /** in-page anchor of the page's signature section */
    secondaryHref: string;
    card: HeroCardData;
  };
  trust: string[];
  why: { eyebrow: string; heading: string; paras: ReactNode[]; glance: string[] };
  /** the sections between the dark "why" band and the tools band; tint alternates, starting tinted */
  middle: MiddleSection[];
  tools: { names: string[]; note: ReactNode };
  problems: { heading: string; rows: [string, string][] };
  included: { heading: string; items: { icon: ReactNode; text: string }[] };
  who: { heading: string; items: { icon: ReactNode; text: ReactNode }[] };
  faq: { heading: string; items: { q: string; a: ReactNode }[] };
  cta: { eyebrow: string; heading: string; copy: ReactNode; primaryLabel: string; secondaryHref: string };
};
