/* Line icons shared by the cold email family pages (agencies, consulting, SaaS, deliverability).
   Paths are copied from the designs; names describe the glyph, not the section. */

const S = { stroke: "currentColor", strokeWidth: 2 } as const;
const RJ = { strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" {...RJ} />
  </svg>
);
export const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" {...RJ} />
  </svg>
);
export const ICON_CHECK_THIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" {...S} {...RJ} />
  </svg>
);
export const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" {...S} {...RJ} />
  </svg>
);
export const ICON_BROWSER = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18" {...S} />
  </svg>
);
export const ICON_MEGAPHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_NEWS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" {...S} strokeLinecap="round" />
    <path d="M16 15l2 2 3-3" {...S} {...RJ} />
  </svg>
);
export const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" {...S} {...RJ} />
  </svg>
);
export const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" {...S} />
    <circle cx="16" cy="8" r="2.6" {...S} />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" {...S} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
export const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" {...S} />
    <path d="m20 20-3.2-3.2" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_VIDEO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" {...S} />
    <path d="m11 10 4 2-4 2z" fill="currentColor" />
  </svg>
);
export const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_CHAT_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" {...S} strokeLinejoin="round" />
    <path d="M8 10h8M8 13h4" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" {...S} strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" {...S} />
    <circle cx="12" cy="12" r="9" {...S} />
  </svg>
);
export const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h10M4 12h10M4 18h7" {...S} strokeLinecap="round" />
    <path d="m16 15 2 2 4-4" {...S} {...RJ} />
  </svg>
);
export const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4zM4 7l8 6 8-6" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_MAIL_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4zM4 7l8 6 8-6" {...S} strokeLinejoin="round" />
    <path d="m15 14 2 2 4-4" {...S} {...RJ} />
  </svg>
);
export const ICON_PEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" {...S} {...RJ} />
  </svg>
);
export const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_REPLY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 17l-5-5 5-5M20 6v6a5 5 0 0 1-5 5H5" {...S} {...RJ} />
  </svg>
);
export const ICON_CAL_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" {...S} {...RJ} />
  </svg>
);
export const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" {...S} {...RJ} />
  </svg>
);
export const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...S} strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" {...S} {...RJ} />
  </svg>
);
export const ICON_EYE_WIDE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" {...S} strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" {...S} />
  </svg>
);
export const ICON_EYE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" {...S} strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" {...S} />
  </svg>
);
export const ICON_BULB = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.1h6c0-.8.4-1.5 1-2.1A6 6 0 0 0 12 3Z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_BUILDING = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_DOLLAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_TAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M7 7h.01M3 5a2 2 0 0 1 2-2h5l9 9-7 7-9-9z" {...S} strokeLinejoin="round" />
  </svg>
);
export const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" {...S} />
    <circle cx="17" cy="17" r="3" {...S} />
    <path d="M10 7h7v7" {...S} {...RJ} />
  </svg>
);
export const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18" {...S} />
  </svg>
);
export const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" {...S} {...RJ} />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" {...S} strokeLinecap="round" />
  </svg>
);
export const ICON_MINUS_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M8 12h8" {...S} strokeLinecap="round" />
  </svg>
);
