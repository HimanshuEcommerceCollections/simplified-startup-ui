import type { ReactNode } from "react";

/**
 * Card-art presets. Articles in the dashboard pick one by key (an uploaded
 * cover image overrides it). The keys are part of the content contract —
 * the dashboard's ARTWORK_PRESETS list mirrors them.
 */
export type ArtPreset = { cover: "seo" | "social" | "pricing"; art: ReactNode };

export const ART_PRESETS: Record<string, ArtPreset> = {
  "agency-checklist": {
    cover: "pricing",
    art: (
      <svg className="bl-art" viewBox="0 0 200 140" fill="none">
        <rect className="a" x="30" y="30" width="140" height="82" rx="8" />
        <line className="a" x1="46" y1="52" x2="120" y2="52" />
        <line className="a" x1="46" y1="68" x2="150" y2="68" />
        <line className="a" x1="46" y1="84" x2="104" y2="84" />
        <path className="b" d="M126 88l10 10 20-24" />
        <circle className="c" cx="150" cy="42" r="14" />
      </svg>
    ),
  },
  "cost-bars": {
    cover: "pricing",
    art: (
      <svg className="bl-art" viewBox="0 0 200 130" fill="none">
        <line className="a" x1="40" y1="100" x2="164" y2="100" />
        <rect className="b" x="52" y="70" width="20" height="30" rx="3" />
        <rect className="b" x="88" y="54" width="20" height="46" rx="3" />
        <rect className="c" x="124" y="34" width="20" height="66" rx="3" />
        <text className="t" x="40" y="30">
          $
        </text>
      </svg>
    ),
  },
  "seo-scope": {
    cover: "seo",
    art: (
      <svg className="bl-art" viewBox="0 0 200 130" fill="none">
        <circle className="a" cx="88" cy="58" r="30" />
        <line className="b" x1="110" y1="80" x2="140" y2="110" />
        <path className="c" d="M74 58l10 10 20-22" />
      </svg>
    ),
  },
  "social-chat": {
    cover: "social",
    art: (
      <svg className="bl-art" viewBox="0 0 200 130" fill="none">
        <rect className="a" x="42" y="40" width="70" height="46" rx="12" />
        <path className="a" d="M64 86l-6 16 22-16" />
        <rect className="c" x="104" y="60" width="54" height="36" rx="11" />
        <circle className="b" cx="120" cy="78" r="2.6" />
        <circle className="b" cx="131" cy="78" r="2.6" />
        <circle className="b" cx="142" cy="78" r="2.6" />
      </svg>
    ),
  },
};

export const DEFAULT_ART_KEY = "agency-checklist";
