/* Line icons shared by the email-family pages (e-commerce email, automation, deliverability, newsletter, SMS). */

const S = { stroke: "currentColor", strokeWidth: 2 } as const;
const RC = { strokeLinecap: "round" } as const;
const RJ = { strokeLinejoin: "round" } as const;
const RCJ = { strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" {...S} strokeWidth="2.6" {...RCJ} />
  </svg>
);
export const ICON_CHECK_BOLD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" {...S} strokeWidth="2.4" {...RCJ} />
  </svg>
);
export const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" {...S} strokeWidth="2.4" {...RC} />
  </svg>
);
export const ICON_ARROW = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" {...S} {...RCJ} />
  </svg>
);
export const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v12H4zM4 7l8 6 8-6" {...S} {...RJ} />
  </svg>
);
export const ICON_EYE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" {...S} {...RJ} />
    <circle cx="12" cy="12" r="3" {...S} />
  </svg>
);
export const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" {...S} {...RJ} />
  </svg>
);
export const ICON_CHAT_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" {...S} {...RJ} />
    <path d="m9 11 2 2 4-4" {...S} {...RCJ} />
  </svg>
);
export const ICON_CHAT_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" {...S} {...RJ} />
    <path d="M8 10h8M8 13h4" {...S} {...RC} />
  </svg>
);
export const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...S} {...RJ} />
  </svg>
);
export const ICON_SHIELD_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...S} {...RJ} />
    <path d="m9 12 2 2 4-4" {...S} {...RCJ} />
  </svg>
);
export const ICON_REFRESH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" {...S} {...RCJ} />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" {...S} {...RC} />
  </svg>
);
/** Three lines with a tick (back-in-stock / restocks). */
export const ICON_LIST_TICK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" {...S} {...RC} />
    <path d="M16 16l2 2 3-3" {...S} {...RCJ} />
  </svg>
);
/** Tapered lines with a tick (prioritized plan). */
export const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" {...S} {...RC} />
    <path d="M18 16.5 19.5 18l2.5-3" {...S} {...RCJ} />
  </svg>
);
export const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" {...S} {...RC} />
  </svg>
);
export const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" {...S} {...RJ} />
  </svg>
);
export const ICON_CAL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 3v4M16 3v4" {...S} />
  </svg>
);
export const ICON_CAL_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" {...S} {...RCJ} />
  </svg>
);
/** Calendar body with a tick, no binder rings (scheduling and sending). */
export const ICON_CAL_SEND = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 15l2 2 4-4" {...S} {...RCJ} />
  </svg>
);
export const ICON_DOC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3h9l4 4v14H6z" {...S} {...RJ} />
    <path d="M9 12h6M9 16h4" {...S} {...RC} />
  </svg>
);
export const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" {...S} strokeWidth="1.8" {...RJ} />
  </svg>
);
export const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" {...S} />
    <path d="m20 20-3.2-3.2" {...S} {...RC} />
  </svg>
);
export const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" {...S} {...RJ} />
  </svg>
);
export const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.6" {...S} />
    <circle cx="16" cy="8" r="2.6" {...S} />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" {...S} {...RC} />
  </svg>
);
export const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" {...S} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...S} {...RC} />
  </svg>
);
export const ICON_PERSON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" {...S} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...S} {...RC} />
    <path d="m16 4 2 2 3-3" {...S} {...RCJ} />
  </svg>
);
export const ICON_PEN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" {...S} {...RCJ} />
  </svg>
);
export const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" {...S} {...RCJ} />
  </svg>
);
export const ICON_PLUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" {...S} strokeWidth="2.4" {...RC} />
  </svg>
);
export const ICON_FILTER = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M7 12h10M10 18h4" {...S} {...RC} />
  </svg>
);
export const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M12 7v5l3 2" {...S} {...RCJ} />
  </svg>
);
export const ICON_BRANCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3v6a3 3 0 0 0 3 3h6M18 9l3 3-3 3" {...S} {...RCJ} />
  </svg>
);
export const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" {...S} {...RJ} />
    <circle cx="12" cy="9" r="2.5" {...S} />
  </svg>
);
export const ICON_GRID = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" {...S} />
    <rect x="14" y="3" width="7" height="7" rx="1.5" {...S} />
    <rect x="3" y="14" width="7" height="7" rx="1.5" {...S} />
    <rect x="14" y="14" width="7" height="7" rx="1.5" {...S} />
  </svg>
);
export const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" {...S} {...RCJ} />
  </svg>
);
export const ICON_CONNECT = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" {...S} />
    <circle cx="17" cy="17" r="3" {...S} />
    <path d="M10 7h7v7" {...S} {...RCJ} />
  </svg>
);
export const ICON_MONITOR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 21h8" {...S} {...RC} />
  </svg>
);
export const ICON_HEART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" {...S} {...RJ} />
  </svg>
);
export const ICON_WARN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" {...S} {...RJ} />
  </svg>
);
export const ICON_MEGAPHONE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M3 11l14-6v14L3 13z" {...S} {...RJ} />
  </svg>
);
export const ICON_FORM = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" {...S} />
    <path d="M8 9h8M8 13h5" {...S} {...RC} />
  </svg>
);
export const ICON_TEMPLATE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" {...S} />
    <path d="M8 8h8M8 12h8M8 16h5" {...S} {...RC} />
  </svg>
);
export const ICON_FORM_PLUS = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" {...S} />
    <path d="M8 9h8M12 13v4M10 15h4" {...S} {...RC} />
  </svg>
);
export const ICON_SHARE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="3" {...S} />
    <circle cx="6" cy="12" r="3" {...S} />
    <circle cx="18" cy="19" r="3" {...S} />
    <path d="m8.5 10.5 7-4M8.5 13.5l7 4" {...S} />
  </svg>
);
export const ICON_SWAP = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 8V4h4M20 16v4h-4M4 4l6 6M20 20l-6-6" {...S} {...RCJ} />
  </svg>
);
export const ICON_REPLY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 17l-5-5 5-5M20 6v6a5 5 0 0 1-5 5H5" {...S} {...RCJ} />
  </svg>
);
export const ICON_MINUS_CIRCLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M8 12h8" {...S} {...RC} />
  </svg>
);
export const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 7h4l1 2M4 7h16M8 7v10h12V9" {...S} {...RJ} />
  </svg>
);
export const ICON_TEXT_BOX = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" {...S} />
    <path d="M8 9h8M8 13h5" {...S} {...RC} />
  </svg>
);
export const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18" {...S} />
  </svg>
);
