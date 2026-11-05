/* Icon set for the industry bookkeeping pages (24px viewBox line icons, ported from the designs). */

const P = { stroke: "currentColor", strokeWidth: 2 } as const;
const L = { ...P, strokeLinecap: "round" } as const;
const J = { ...P, strokeLinejoin: "round" } as const;
const LJ = { ...P, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* -------- marks -------- */

export const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const ICON_X_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
export const ICON_MINUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" {...J} />
  </svg>
);

/* -------- money / reports -------- */

export const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" {...LJ} />
  </svg>
);
export const ICON_PIE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 12a9 9 0 1 0 9-9v9z" {...J} />
  </svg>
);
export const ICON_BANK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" {...P} />
    <path d="M3 10h18" {...P} />
  </svg>
);
export const ICON_CASH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 7h18v12H3z" {...J} />
    <path d="M3 11h18M7 15h4" {...L} />
  </svg>
);
export const ICON_CASH_WIDE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 7h18v12H3z" {...J} />
    <path d="M3 11h18M8 15h4" {...L} />
  </svg>
);
export const ICON_CASH_PLAIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 7h18v12H3z" {...J} />
    <path d="M3 11h18" {...P} />
  </svg>
);
export const ICON_AGING = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" {...P} />
    <path d="M7 10h6M7 14h4" {...L} />
    <circle cx="17" cy="13" r="2" {...P} />
  </svg>
);
export const ICON_LIST_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" {...L} />
    <circle cx="18" cy="16" r="3" {...P} />
  </svg>
);
export const ICON_LIST_CIRCLE_7 = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h7" {...L} />
    <circle cx="18" cy="16" r="3" {...P} />
  </svg>
);
export const ICON_LIST_TICK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h7" {...L} />
    <path d="M15 9l3 3 3-5" {...LJ} />
  </svg>
);
export const ICON_LIST_TICK_LOW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h7" {...L} />
    <path d="m16 15 2 2 4-4" {...LJ} />
  </svg>
);
export const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2h9l5 5v15H6z" {...J} />
    <path d="M14 2v5h5M9 13h6M9 17h4" {...L} />
  </svg>
);
export const ICON_CLIPBOARD = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="5" y="4" width="14" height="17" rx="2" {...P} />
    <path d="M9 4V2h6v2M9 10h6M9 14h4" {...L} />
  </svg>
);
export const ICON_RECEIPT = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" {...P} />
    <path d="M8 7h8M8 11h8M8 15h5" {...L} />
  </svg>
);
export const ICON_GRID4 = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" {...P} />
    <rect x="14" y="3" width="7" height="7" rx="1.5" {...P} />
    <rect x="3" y="14" width="7" height="7" rx="1.5" {...P} />
    <rect x="14" y="14" width="7" height="7" rx="1.5" {...P} />
  </svg>
);
export const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4zM4 7l8 6 8-6" {...J} />
  </svg>
);
export const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...J} />
  </svg>
);
export const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...J} />
    <path d="m9 12 2 2 4-4" {...LJ} />
  </svg>
);
export const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" {...LJ} />
  </svg>
);
export const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" {...L} />
  </svg>
);
export const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v6M12 22v-4M5 12H2M22 12h-3" {...L} />
    <circle cx="12" cy="12" r="4" {...P} />
  </svg>
);
export const ICON_TABLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" {...P} />
    <path d="M8 4v16M8 9h13M8 14h13" {...P} />
  </svg>
);
export const ICON_LEDGER = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" {...P} />
    <path d="M3 9h18" {...P} />
  </svg>
);
export const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" {...P} />
    <path d="M3 9h18M8 3v4M16 3v4M8 13h3" {...L} />
  </svg>
);
export const ICON_CLOUD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 19a4 4 0 0 1-.9-7.9 5 5 0 0 1 9.6-2A4.5 4.5 0 1 1 17 19z" {...J} />
  </svg>
);
export const ICON_GEAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" {...P} />
    <path
      d="M19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.2-1.3L14 2h-4l-.4 2.5a7 7 0 0 0-2.2 1.3l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2.6l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.2 1.3L10 22h4l.4-2.5a7 7 0 0 0 2.2-1.3l2.3 1 2-3.4-2-1.5A7 7 0 0 0 19 12Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);
export const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" {...J} />
  </svg>
);

/* -------- people -------- */

export const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" {...P} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...L} />
  </svg>
);
export const ICON_PERSON_ARMS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" {...P} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...L} />
    <path d="M4 6h3M18 6h3" {...L} />
  </svg>
);
export const ICON_PAIR = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" {...P} />
    <circle cx="16" cy="8" r="2.6" {...P} />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" {...L} />
  </svg>
);
export const ICON_TEAM = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" {...P} />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 0 1 0 6M18 14c2 .8 3 2.4 3 4.5" {...L} />
  </svg>
);
export const ICON_TEAM_SHORT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" {...P} />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 0 1 0 6" {...L} />
  </svg>
);
export const ICON_PEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 19l7-7-4-4-7 7v4z" {...J} />
    <path d="M14 6l4 4" {...L} />
  </svg>
);

/* -------- commerce -------- */

export const ICON_BOX = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7" {...J} />
  </svg>
);
export const ICON_TRUCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 13h13V6H3zM16 9h3l2 3v1h-5" {...J} />
    <circle cx="7" cy="17" r="2" {...P} />
    <circle cx="17" cy="17" r="2" {...P} />
  </svg>
);
export const ICON_COUNT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h16" {...L} />
    <circle cx="8" cy="6" r="1.5" fill="currentColor" />
    <circle cx="14" cy="12" r="1.5" fill="currentColor" />
    <circle cx="10" cy="18" r="1.5" fill="currentColor" />
  </svg>
);
export const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" {...J} />
  </svg>
);
export const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4l1 2M4 7h16M8 7v10h12V9" {...J} />
  </svg>
);

/* -------- property -------- */

export const ICON_HOUSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M5 21V8l7-5 7 5v13" {...J} />
  </svg>
);
export const ICON_HOUSE_DOOR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M10 21v-6h4v6" {...J} />
  </svg>
);
export const ICON_HOUSE_DOOR_SPLIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M5 21V8l7-5 7 5v13" {...J} />
    <path d="M10 21v-5h4v5" {...P} />
  </svg>
);
export const ICON_CABIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" {...J} />
    <path d="M9 19v-5h6v5" {...P} />
  </svg>
);
export const ICON_ROOF = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l9-7 9 7M5 10v9h14v-9" {...J} />
  </svg>
);

/* -------- restaurant -------- */

export const ICON_FORK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 3v8a3 3 0 0 0 6 0V3M8 3v18M16 3c-1.5 0-2 2-2 5s.5 4 2 4 2-1 2-4-.5-5-2-5Zm0 9v9" {...L} />
  </svg>
);
export const ICON_GLASS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h12l-1 6a5 5 0 0 1-10 0zM12 14v5M8 21h8" {...J} />
  </svg>
);
export const ICON_COIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" {...P} />
    <path d="M12 8v8M9.5 10a2.5 2.5 0 0 1 5 0c0 1.5-2.5 1.5-2.5 3" {...L} />
  </svg>
);
export const ICON_TICKET = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16v10H4zM4 11h16" {...J} />
    <path d="M8 15h3" {...L} />
  </svg>
);
