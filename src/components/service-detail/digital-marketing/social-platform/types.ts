import type { ReactNode } from "react";

/** One icon card: tilt grid, icon list, centred grid, side grid. */
export type IconCard = { icon: ReactNode; title: string; text: ReactNode };

type SectionBase = {
  /** Section id from the design (in-page anchors and scroll offsets target it). */
  id: string;
  /** Tinted band (the designs alternate plain / tint per platform). */
  tint?: boolean;
  eyebrow: string;
  heading: string;
};

export type GlanceSection = SectionBase & { kind: "glance"; paragraphs: ReactNode[]; glance: string[] };
export type IconTableSection = SectionBase & {
  kind: "iconTable";
  head: [string, string, string];
  rows: { icon: ReactNode; name: string; what: ReactNode; best: ReactNode }[];
};
export type VsTableSection = SectionBase & {
  kind: "vsTable";
  head: [string, string];
  rows: { label: string; left: ReactNode; right: ReactNode }[];
};
export type TiltGridSection = SectionBase & { kind: "tiltGrid"; cards: IconCard[] };
export type WorkflowSection = SectionBase & { kind: "workflow"; steps: { title: string; text: ReactNode; outcome: string }[] };
export type IconListSection = SectionBase & { kind: "iconList"; cards: IconCard[] };
export type CenterGridSection = SectionBase & { kind: "centerGrid"; cards: IconCard[] };
export type SideGridSection = SectionBase & { kind: "sideGrid"; large?: boolean; cards: IconCard[] };
export type MistakesSection = SectionBase & { kind: "mistakes"; rows: { prob: ReactNode; fix: ReactNode }[] };
export type IncludedSection = SectionBase & { kind: "included"; items: { icon: ReactNode; text: ReactNode }[] };
export type WhoSection = SectionBase & { kind: "who"; items: { icon: ReactNode; text: ReactNode }[] };

export type PlatformSection =
  | GlanceSection
  | IconTableSection
  | VsTableSection
  | TiltGridSection
  | WorkflowSection
  | IconListSection
  | CenterGridSection
  | SideGridSection
  | MistakesSection
  | IncludedSection
  | WhoSection;

export type PlatformData = {
  hero: { line1: ReactNode; line2: ReactNode; lead: ReactNode; primaryLabel: string };
  /** The platform's signature card (rendered in the hero's right column). */
  card: ReactNode;
  trust: string[];
  /** Body sections between the trust bar and the FAQ, in the design's order. */
  sections: PlatformSection[];
  faq: { heading: string; items: { q: string; a: ReactNode }[] };
  cta: { eyebrow: string; heading: string; copy: ReactNode; primaryLabel: string };
};
