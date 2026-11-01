import {
  ICON_BOX_CHECK,
  ICON_BUILDING,
  ICON_CAL_CHECK,
  ICON_CHAT_LINES,
  ICON_CLOCK,
  ICON_DOC,
  ICON_FAMILY,
  ICON_FILE,
  ICON_FLOW,
  ICON_GLOBE,
  ICON_INFO,
  ICON_LINK,
  ICON_LOCK,
  ICON_MIC,
  ICON_PERSON,
  ICON_PULSE,
  ICON_REFRESH,
  ICON_SCALES,
  ICON_SHIELD_ARROW,
  ICON_SHIELD_CHECK,
} from "./icons";
import type { RcpIndustry } from "./types";

export const LAW_FIRMS: RcpIndustry = {
  hero: {
    line1: "Capture every potential client call,",
    line2: (
      <>
        day or <span className="grad-text">night.</span>
      </>
    ),
    lead: (
      <>
        An AI receptionist for law firms that{" "}
        <strong>answers calls, gathers intake details, schedules consultations, and routes urgent matters to your team.</strong>
      </>
    ),
    primaryLabel: "Book a law firm AI demo",
    card: {
      ariaLabel: "An AI receptionist taking a new client intake call",
      live: "Intake call",
      callerTitle: "Incoming · new inquiry",
      callerSub: "“Was in a car accident”",
      time: "0:14",
      lines: [
        {
          who: "ai",
          text: "Thanks for calling Marsh & Lee. I can take a few details to set up a consultation. Can you tell me when the accident happened?",
        },
        { who: "caller", text: "Last Tuesday. Do I have a case?" },
        {
          who: "ai",
          text: "I can’t give legal advice, but I can book you a consultation with an attorney who can review it. What’s the best time to reach you?",
        },
      ],
      badge: { text: "No legal advice · no attorney-client relationship", tone: "amber" },
      footLeft: "Intake taken, consult booked",
      footRight: "routed to your team →",
    },
  },
  trust: ["Answers every call", "Structured intake questions", "Consultations scheduled", "No legal advice given"],
  why: {
    eyebrow: "Why law firms use AI receptionists",
    heading: "Potential clients often call when they’re stressed and need help now.",
    paras: [
      <>
        People often contact several firms at once. <strong>The firm that answers first is often the one they speak with.</strong>
      </>,
      "Attorneys and staff can’t answer every call while in court, meetings, or after hours.",
      <>
        An <a href="/ai-automation/ai-voice-agents">AI receptionist</a>{" "}
        <strong>answers promptly, gathers intake details, and books consultations, while leaving legal advice to your attorneys.</strong>
      </>,
    ],
    glance: [
      "After-hours and weekend calls",
      "Calls during court or meetings",
      "Consistent intake questions",
      "Consultation booking",
      "Clear boundaries on advice",
    ],
  },
  callTypes: {
    heading: "Routine and intake calls are handled. Legal matters go to your team.",
    rows: [
      { type: "New client inquiry", does: "Asks intake questions and records answers", hand: "If the matter is urgent or sensitive" },
      { type: "Consultation booking", does: "Offers available times", hand: "If scheduling needs attorney approval" },
      { type: "Existing client calls", does: "Takes a message or transfers", hand: "For case-specific questions" },
      { type: "Office information", does: "Shares hours, location, and practice areas", hand: "Rarely needed" },
      { type: "Urgent matters", does: "Follows your urgent rules", hand: "Routes to on-call staff" },
      { type: "Requests for legal advice", does: "Explains it can’t give advice", hand: "Offers a consultation instead" },
    ],
  },
  middle: [
    {
      kind: "example",
      eyebrow: "Example: a new client intake call",
      heading: "How a single call flows from hello to consultation.",
      steps: [
        { when: "Greeting", title: "Welcome and disclosure", text: "Firm name and a short AI disclosure where required." },
        { when: "Practice area", title: "Type of matter", text: "Identifies the general area, such as family law or injury." },
        { when: "Intake questions", title: "Key details", text: "Your firm’s screening questions, like dates and location." },
        { when: "Conflict info", title: "Names for checking", text: "Collects names your team can use for conflict checks." },
        { when: "Next step", title: "Consultation", text: "Books a consultation or promises a callback." },
      ],
    },
    {
      kind: "boundaries",
      id: "boundaries",
      eyebrow: "Clear boundaries for legal calls",
      heading: "The AI is set up to help without crossing professional lines.",
      cards: [
        { kicker: "No legal advice", icon: ICON_INFO, title: "Information only", text: "Shares general firm information, never legal opinions." },
        {
          kicker: "No relationship formed",
          icon: ICON_BOX_CHECK,
          title: "Clear language",
          text: "Callers are told intake doesn’t create an attorney-client relationship.",
        },
        { kicker: "Confidential handling", icon: ICON_LOCK, title: "Limited data", text: "Collects only what your intake process needs." },
        { kicker: "Human review", icon: ICON_PERSON, title: "Attorney decision", text: "Your team decides whether to take a matter." },
      ],
    },
    {
      kind: "six",
      id: "areas",
      eyebrow: "Intake built for your practice areas",
      heading: "Questions are tailored to each type of matter.",
      cards: [
        { icon: ICON_PULSE, title: "Personal injury", text: "Incident date, location, and injuries." },
        { icon: ICON_FAMILY, title: "Family law", text: "Type of matter and timing." },
        { icon: ICON_SCALES, title: "Criminal defense", text: "Charges, court dates, and urgency." },
        { icon: ICON_FILE, title: "Estate planning", text: "Type of documents needed." },
        { icon: ICON_GLOBE, title: "Immigration", text: "Type of case and deadlines." },
        { icon: ICON_BUILDING, title: "Business law", text: "Company details and needs." },
      ],
    },
  ],
  tools: {
    names: [
      "Clio",
      "MyCase",
      "PracticePanther",
      "Lawmatics",
      "Smokeball",
      "Filevine",
      "Calendly",
      "Google Calendar",
      "Microsoft 365",
      "RingCentral",
      "Zapier",
      "Slack",
    ],
    note: (
      <>
        The AI receptionist does not provide legal advice, and <b>intake calls do not create an attorney-client relationship.</b> Your firm
        should review scripts against your professional responsibility rules and advertising guidelines. Call recording and AI disclosure
        rules vary by state and country. Some places require consent from everyone on the call. We set up disclosures and recording settings
        with this in mind, but please confirm requirements with your own legal counsel.
      </>
    ),
  },
  questions: {
    id: "firmq",
    eyebrow: "Questions firms ask",
    items: [
      { q: "Can it run conflict checks?", a: "It collects names; your team runs the actual conflict check." },
      { q: "Will it handle existing clients?", a: "It can take messages or transfer to the right person." },
      { q: "Can it screen out matters we don’t take?", a: "Yes, with polite messaging and referrals you approve." },
      { q: "Can it speak Spanish?", a: "Multilingual options are available depending on the tools used." },
    ],
  },
  problems: {
    heading: "Common intake problems.",
    rows: [
      { prob: "Calls missed during court", fix: "Every call answered." },
      { prob: "Inconsistent intake questions", fix: "Structured intake every time." },
      { prob: "Slow follow-up", fix: "Instant summaries to your team." },
      { prob: "Unqualified consultations", fix: "Screening questions before booking." },
      { prob: "After-hours leads lost", fix: "Around-the-clock answering." },
    ],
  },
  included: {
    heading: "From intake planning to attorney review.",
    items: [
      { icon: ICON_FLOW, text: "Intake flow planning by practice area" },
      { icon: ICON_MIC, text: "Custom greeting and disclosures" },
      { icon: ICON_DOC, text: "Screening and intake questions" },
      { icon: ICON_CAL_CHECK, text: "Consultation scheduling" },
      { icon: ICON_SHIELD_ARROW, text: "Escalation and transfer rules" },
      { icon: ICON_LINK, text: "Integration with case management where available" },
      { icon: ICON_CHAT_LINES, text: "Call summaries and transcripts" },
      { icon: ICON_SHIELD_CHECK, text: "Testing and attorney review before launch" },
      { icon: ICON_REFRESH, text: "Ongoing updates and reviews" },
    ],
  },
  who: {
    heading: "Be the firm that answers first.",
    items: [
      { icon: ICON_PULSE, text: <><strong>Personal injury and family law firms</strong> with high call volume.</> },
      { icon: ICON_PERSON, text: <><strong>Solo and small firms</strong> without full-time reception.</> },
      { icon: ICON_CLOCK, text: <><strong>Firms with after-hours inquiries</strong> they currently miss.</> },
      { icon: ICON_BUILDING, text: <><strong>Multi-office firms</strong> needing consistent intake.</> },
    ],
  },
  faq: {
    heading: "Law firm AI receptionist: asked a lot.",
    items: [
      {
        q: "How much does a law firm AI receptionist cost?",
        a: <>It depends on call volume, practice areas, and integrations. <strong>We share pricing on the free demo call.</strong></>,
      },
      { q: "Does it give legal advice?", a: <>No. It shares general firm information and <strong>gathers intake details only.</strong></> },
      {
        q: "Is caller information kept confidential?",
        a: <>We choose tools and settings with confidentiality in mind and <strong>collect only what your intake needs.</strong></>,
      },
      { q: "Can it connect to Clio?", a: <>Often, yes, depending on the setup. We also work with <strong>other case management tools.</strong></> },
      { q: "Does it replace our staff?", a: <>No. It supports your team by <strong>handling intake and overflow calls.</strong></> },
      {
        q: "Can we review scripts before launch?",
        a: (
          <>
            Yes. <strong>Your attorneys review intake scripts and disclosures</strong> against your professional responsibility rules before
            anything goes live.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "AI Receptionist for Law Firms",
    heading: "Be the firm that answers first.",
    copy: (
      <>
        Book a free demo for your law firm:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll show how AI intake could work for your practice area.</strong>
      </>
    ),
    primaryLabel: "Book a law firm AI demo",
  },
};
