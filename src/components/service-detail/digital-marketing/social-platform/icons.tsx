import type { ReactNode } from "react";

/* Icon set shared by the four social platform pages (paths copied from the designs). */

const svg = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none">
    {children}
  </svg>
);
const S = { stroke: "currentColor", strokeWidth: 2 } as const;
const R = { ...S, strokeLinecap: "round" } as const;
const J = { ...S, strokeLinejoin: "round" } as const;
const RJ = { ...S, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ICON_CHECK = svg(<path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />);
export const ICON_X = svg(<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />);

export const ICON_LINES = svg(<path d="M4 6h16M4 12h10M4 18h6" {...R} />);
export const ICON_REEL = svg(
  <>
    <rect x="7" y="3" width="10" height="18" rx="2" {...S} />
    <path d="m11 10 3 2-3 2z" fill="currentColor" />
  </>
);
export const ICON_STORIES = svg(
  <>
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M12 3v18" {...S} />
  </>
);
export const ICON_PEOPLE = svg(
  <>
    <circle cx="8" cy="8" r="2.6" {...S} />
    <circle cx="16" cy="8" r="2.6" {...S} />
    <path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" {...R} />
  </>
);
export const ICON_CALENDAR = svg(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 3v4M16 3v4" {...S} />
  </>
);
export const ICON_CALENDAR_CHECK = svg(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 15l2 2 4-4" {...RJ} />
  </>
);
export const ICON_CHAT = svg(<path d="M4 6h16v11H7l-3 3z" {...J} />);
export const ICON_CHAT_LINES = svg(
  <>
    <path d="M4 6h16v11H7l-3 3z" {...J} />
    <path d="M8 10h8M8 13h5" {...R} />
  </>
);
export const ICON_CHAT_LINES_SHORT = svg(
  <>
    <path d="M4 6h16v11H7l-3 3z" {...J} />
    <path d="M8 10h8M8 13h4" {...R} />
  </>
);
export const ICON_BOLT = svg(<path d="M13 2 4 14h7l-1 8 9-12h-7z" {...J} />);
export const ICON_STAR = svg(<path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />);
export const ICON_MEGAPHONE = svg(<path d="M3 11l14-6v14L3 13z" {...J} />);
export const ICON_EYE = svg(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" {...J} />
    <circle cx="12" cy="12" r="3" {...S} />
  </>
);
export const ICON_EYE_NARROW = svg(
  <>
    <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" {...J} />
    <circle cx="12" cy="12" r="3" {...S} />
  </>
);
export const ICON_IMAGE = svg(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" {...S} />
    <circle cx="9" cy="11" r="2" {...S} />
    <path d="m5 18 4-3 3 2 3-3 4 4" {...J} />
  </>
);
export const ICON_INFO = svg(
  <>
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M12 8v5M12 16h.01" {...R} />
  </>
);
export const ICON_PHONE = svg(<path d="M4 5c0 8 7 15 15 15l-1-4-4-1-2 2c-3-1.5-5.5-4-7-7l2-2-1-4z" {...J} />);
export const ICON_CIRCLE_CHECK = svg(
  <>
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="m8 12 3 3 5-6" {...RJ} />
  </>
);
export const ICON_PIN = svg(<path d="M12 3v12M8 7l4-4 4 4M5 21h14" {...RJ} />);
export const ICON_TARGET = svg(
  <>
    <circle cx="12" cy="12" r="4" {...S} />
    <circle cx="12" cy="12" r="9" {...S} />
  </>
);
export const ICON_DOC = svg(
  <>
    <path d="M6 3h9l4 4v14H6z" {...J} />
    <path d="M9 12h6M9 16h4" {...R} />
  </>
);
export const ICON_SEARCH = svg(
  <>
    <circle cx="11" cy="11" r="7" {...S} />
    <path d="m20 20-3.2-3.2" {...R} />
  </>
);
export const ICON_SEARCH_MINUS = svg(
  <>
    <circle cx="11" cy="11" r="7" {...S} />
    <path d="m20 20-3.2-3.2" {...R} />
    <path d="M8 11h6" {...R} />
  </>
);
export const ICON_PEN = svg(<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" {...RJ} />);
export const ICON_TREND = svg(<path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" {...RJ} />);
export const ICON_HOME = svg(<path d="M3 11l9-7 9 7M5 10v9h14v-9" {...J} />);
export const ICON_TROPHY = svg(<path d="M6 4v7a6 6 0 0 0 12 0V4M9 20h6M12 17v3" {...RJ} />);
export const ICON_REFRESH = svg(
  <>
    <path d="M4 4v6h6M20 20v-6h-6" {...RJ} />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" {...R} />
  </>
);
export const ICON_BAG = svg(<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" {...J} />);
export const ICON_CAP = svg(<path d="M12 3 2 8l10 5 10-5-10-5ZM6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" {...J} />);
export const ICON_PERSON = svg(
  <>
    <circle cx="12" cy="8" r="3.4" {...S} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...R} />
  </>
);
export const ICON_CREATOR = svg(
  <>
    <circle cx="12" cy="8" r="3.4" {...S} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...R} />
    <path d="m16 4 2 2 3-3" {...RJ} />
  </>
);
export const ICON_CREATOR_LEFT = svg(
  <>
    <circle cx="12" cy="8" r="3.4" {...S} />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" {...R} />
    <path d="m15 5 2 2 3-3" {...RJ} />
  </>
);
export const ICON_VIDEO = svg(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" {...S} />
    <path d="m11 10 4 2-4 2z" fill="currentColor" />
  </>
);
export const ICON_DUET = svg(
  <>
    <rect x="3" y="4" width="8" height="16" rx="1.5" {...S} />
    <rect x="13" y="4" width="8" height="16" rx="1.5" {...S} />
  </>
);
export const ICON_CAROUSEL = svg(
  <>
    <rect x="3" y="6" width="12" height="12" rx="2" {...S} />
    <path d="M18 8v8M21 10v4" {...R} />
  </>
);
export const ICON_LIVE = svg(
  <>
    <circle cx="12" cy="12" r="9" {...S} />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </>
);
export const ICON_MINUS_CIRCLE = svg(
  <>
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M8 12h8" {...R} />
  </>
);
export const ICON_ARROW = svg(<path d="M5 12h14M13 6l6 6-6 6" {...RJ} />);
export const ICON_THREAD = svg(<path d="M6 4v16M6 8h8M6 14h6" {...R} />);
export const ICON_REPLY = svg(<path d="M9 17l-5-5 5-5M20 6v6a5 5 0 0 1-5 5H5" {...RJ} />);
export const ICON_MIC = svg(
  <>
    <path d="M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" {...S} />
    <path d="M6 11a6 6 0 0 0 12 0M12 18v3" {...R} />
  </>
);
export const ICON_CODE = svg(<path d="M9 8l-4 4 4 4M15 8l4 4-4 4" {...RJ} />);
export const ICON_QUESTION = svg(
  <>
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 17h.01" {...R} />
    <circle cx="12" cy="12" r="9" {...S} />
  </>
);
export const ICON_FOLDER = svg(<path d="M4 7h4l1 2M4 7h16M8 7v10h12V9" {...J} />);
export const ICON_SHIELD = svg(<path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...J} />);
export const ICON_SHIELD_CHECK = svg(
  <>
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" {...J} />
    <path d="m9 12 2 2 4-4" {...RJ} />
  </>
);
export const ICON_PAUSE = svg(
  <>
    <rect x="6" y="4" width="4" height="16" rx="1" {...S} />
    <rect x="14" y="4" width="4" height="16" rx="1" {...S} />
  </>
);
export const ICON_WARNING = svg(<path d="M12 9v4M12 16h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" {...J} />);
export const ICON_MONITOR = svg(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" {...S} />
    <path d="M3 9h18M8 21h8" {...R} />
  </>
);
export const ICON_TUTORIAL = svg(
  <>
    <path d="M4 6h16M4 12h10M4 18h6" {...R} />
    <path d="M16 15l2 2 3-3" {...RJ} />
  </>
);
export const ICON_COMPARE = svg(<path d="M9 4v16M15 4v16M4 9h4M16 9h4M4 15h4M16 15h4" {...R} />);
export const ICON_WEBINAR = svg(
  <>
    <path d="M9 4v16M15 4v16" {...R} />
    <rect x="3" y="4" width="18" height="16" rx="2" {...S} />
  </>
);
export const ICON_TITLE = svg(<path d="M4 7V5h16v2M9 19h6M12 5v14" {...R} />);
export const ICON_CLOCK = svg(
  <>
    <circle cx="12" cy="12" r="9" {...S} />
    <path d="M12 7v5l3 2" {...RJ} />
  </>
);
export const ICON_CAPTIONS = svg(
  <>
    <path d="M4 6h16v12H4z" {...J} />
    <path d="M8 14h3M14 14h2" {...R} />
  </>
);
export const ICON_PLAYLIST = svg(
  <>
    <path d="M4 6h10M4 12h10M4 18h7" {...R} />
    <path d="m16 5 5 3-5 3z" fill="currentColor" />
  </>
);
export const ICON_END_SCREEN = svg(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" {...S} />
    <rect x="14" y="13" width="5" height="4" rx="1" {...S} />
  </>
);
export const ICON_RETENTION = svg(<path d="M3 18V6M3 18h18M7 15l4-5 3 3 5-7" {...RJ} />);
export const ICON_TRAFFIC = svg(
  <>
    <path d="M12 3v18M12 3l-5 5M12 3l5 5" {...RJ} />
    <path d="M4 21h16" {...R} />
  </>
);
export const ICON_SUBSCRIBERS = svg(
  <>
    <circle cx="9" cy="8" r="3.2" {...S} />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" {...R} />
    <path d="M16 4a3.2 3.2 0 0 1 0 6M18 14c2 .8 3 2.5 3 4.5" {...R} />
  </>
);
export const ICON_MUSIC = svg(
  <>
    <path d="M9 18V6l10-2v12" {...R} />
    <circle cx="6" cy="18" r="3" {...S} />
    <circle cx="16" cy="16" r="3" {...S} />
  </>
);
export const ICON_REPOST = svg(<path d="M4 8V4h4M20 16v4h-4M4 4l6 6M20 20l-6-6" {...RJ} />);
export const ICON_HEART = svg(<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" {...J} />);
