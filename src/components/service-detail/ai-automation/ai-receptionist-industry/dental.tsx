import {
  ICON_BUILDING,
  ICON_CAL,
  ICON_CAL_CHECK,
  ICON_CARD,
  ICON_CHAT_CHECK,
  ICON_CHAT_DOTS,
  ICON_CLOCK,
  ICON_DOC,
  ICON_FLOW,
  ICON_HOME,
  ICON_MIC,
  ICON_QUESTION,
  ICON_REFRESH,
  ICON_SHIELD_ARROW,
  ICON_SHIELD_CHECK,
  ICON_TOOTH,
  ICON_WARN,
} from "./icons";
import type { RcpIndustry } from "./types";

export const DENTAL: RcpIndustry = {
  hero: {
    line1: "Answer every patient call, even",
    line2: (
      <>
        when the front desk is <span className="grad-text">busy.</span>
      </>
    ),
    lead: (
      <>
        An AI receptionist for dental practices that{" "}
        <strong>answers calls, books and reschedules appointments, and passes urgent or complex calls to your team.</strong>
      </>
    ),
    primaryLabel: "Book a dental AI demo",
    card: {
      ariaLabel: "An AI receptionist booking a dental appointment",
      live: "Patient call",
      callerTitle: "Incoming · new patient",
      callerSub: "“Need a cleaning”",
      time: "0:10",
      lines: [
        { who: "ai", text: "Thanks for calling Bright Smile Dental! I can help book a cleaning. Are you a new patient with us?" },
        { who: "caller", text: "Yes, first time. Anything next week?" },
        {
          who: "ai",
          text: "We have Tuesday at 10 or Thursday at 2. I’ll grab your details and send a confirmation by text. Which works best?",
        },
      ],
      badge: { text: "Built with privacy in mind · no medical advice", tone: "teal" },
      footLeft: "Booked, confirmed, logged",
      footRight: "front desk freed up →",
    },
  },
  trust: ["Answers calls around the clock", "Books into your schedule", "Urgent calls routed to staff", "Built with privacy in mind"],
  why: {
    eyebrow: "Why dental offices use AI receptionists",
    heading: "Your front desk can’t answer every call at once.",
    paras: [
      <>
        Front desk teams juggle check-ins, insurance questions, and patients in the chair, <strong>so calls often go to voicemail.</strong>
      </>,
      "Many callers won’t leave a message. They simply call the next practice.",
      <>
        An <a href="/ai-automation/ai-voice-agents">AI receptionist</a>{" "}
        <strong>answers those calls, handles routine requests, and frees your team to focus on patients in the office.</strong>
      </>,
    ],
    glance: ["Busy front desk moments", "After-hours calls", "Lunch breaks and holidays", "Routine scheduling requests", "Common patient questions"],
  },
  callTypes: {
    heading: "Routine calls are handled. Clinical and sensitive ones go to your team.",
    rows: [
      { type: "New patient booking", does: "Collects details and offers open times", hand: "If the request needs staff review" },
      { type: "Reschedule or cancel", does: "Updates the appointment where connected", hand: "If rules or fees need a human" },
      { type: "Hours and location", does: "Answers instantly", hand: "Rarely needed" },
      { type: "Insurance questions", does: "Shares general accepted-plan info you provide", hand: "For coverage or billing specifics" },
      { type: "Dental pain or emergency", does: "Follows your urgent-call rules", hand: "On-call staff, or 911 for emergencies" },
      { type: "Billing questions", does: "Takes a message or transfers", hand: "Always, for account details" },
    ],
  },
  middle: [
    {
      kind: "example",
      eyebrow: "Example: a new patient call",
      heading: "How a typical call might flow.",
      steps: [
        { when: "Greeting", title: "Friendly welcome", text: "Answers with your practice name and a short AI disclosure where required." },
        { when: "Understand", title: "Reason for call", text: "Asks what the caller needs, such as a cleaning or check-up." },
        { when: "Collect", title: "Basic details", text: "Name, contact details, and how they heard about you." },
        { when: "Book", title: "Appointment offered", text: "Offers available times from your schedule, where connected." },
        { when: "Confirm", title: "Wrap up", text: "Confirms the booking and sends a text or email confirmation." },
      ],
    },
    {
      kind: "knowledge",
      id: "knows",
      eyebrow: "What your AI receptionist knows",
      heading: "It only shares information you approve.",
      cards: [
        { kicker: "Practice basics", icon: ICON_HOME, title: "Hours, location, parking", text: "Kept current by your team." },
        { kicker: "Services", icon: ICON_TOOTH, title: "Treatments you offer", text: "General descriptions, no medical advice." },
        { kicker: "Policies", icon: ICON_DOC, title: "New patients, cancellations, payments", text: "Your rules, worded your way." },
        { kicker: "Insurance", icon: ICON_SHIELD_CHECK, title: "Accepted plans", text: "Only the general list you provide." },
        { kicker: "Escalation rules", icon: ICON_SHIELD_ARROW, title: "When to transfer", text: "Urgent, clinical, or sensitive calls." },
      ],
    },
    {
      kind: "escalation",
      id: "escalation",
      eyebrow: "Escalation rules we set up",
      heading: "Clear rules decide which calls go to your team.",
      cards: [
        {
          icon: ICON_WARN,
          title: "Dental emergencies",
          text: "Swelling, trauma, or severe pain routed to on-call staff, with 911 guidance for medical emergencies.",
          urgent: true,
        },
        { icon: ICON_QUESTION, title: "Clinical questions", text: "Treatment or medication questions passed to your clinical team." },
        { icon: ICON_CARD, title: "Billing and accounts", text: "Account-specific questions transferred or messaged to billing." },
        { icon: ICON_CHAT_DOTS, title: "Upset callers", text: "Frustrated patients transferred to a team member." },
      ],
    },
  ],
  tools: {
    names: [
      "Dentrix",
      "Eaglesoft",
      "Open Dental",
      "Curve Dental",
      "NexHealth",
      "Weave",
      "Google Calendar",
      "Twilio",
      "RingCentral",
      "Zapier",
      "Make",
      "Slack",
    ],
    note: (
      <>
        Patient information is sensitive.{" "}
        <b>
          We choose tools and settings with HIPAA requirements in mind and expect vendors handling patient data to sign business associate
          agreements where required.
        </b>{" "}
        The AI receptionist does not give medical or dental advice. Call recording and AI disclosure rules vary by state and country. Some
        places require consent from everyone on the call. We set up disclosures and recording settings with this in mind, but please confirm
        requirements with your own legal counsel.
      </>
    ),
  },
  questions: {
    id: "practiceq",
    eyebrow: "Questions practices ask",
    items: [
      { q: "Will patients know it’s AI?", a: "We recommend a short disclosure at the start of calls." },
      { q: "Can it book directly into our software?", a: "Often, depending on your practice management system." },
      { q: "What about after-hours emergencies?", a: "Calls follow your on-call rules, with 911 guidance for medical emergencies." },
      { q: "Can we change what it says?", a: "Yes. Scripts, answers, and rules can be updated." },
    ],
  },
  problems: {
    heading: "Common front desk problems.",
    rows: [
      { prob: "Calls going to voicemail", fix: "Every call answered." },
      { prob: "New patients lost after hours", fix: "After-hours booking and messages." },
      { prob: "Staff repeating the same answers", fix: "Common questions answered automatically." },
      { prob: "No record of missed calls", fix: "Call summaries sent to your team." },
      { prob: "Busy-time hold queues", fix: "Overflow calls handled by AI." },
    ],
  },
  included: {
    heading: "From call flow planning to ongoing reviews.",
    items: [
      { icon: ICON_FLOW, text: "Call flow planning with your team" },
      { icon: ICON_MIC, text: "Custom greeting and voice" },
      { icon: ICON_DOC, text: "Knowledge base of practice details" },
      { icon: ICON_CAL_CHECK, text: "Scheduling integration where available" },
      { icon: ICON_SHIELD_ARROW, text: "Escalation and transfer rules" },
      { icon: ICON_CHAT_CHECK, text: "Text or email confirmations" },
      { icon: ICON_DOC, text: "Call summaries and transcripts" },
      { icon: ICON_SHIELD_CHECK, text: "Testing before going live" },
      { icon: ICON_REFRESH, text: "Ongoing updates and reviews" },
    ],
  },
  who: {
    heading: "Never miss a patient call again.",
    items: [
      { icon: ICON_TOOTH, text: <><strong>General and family dental practices</strong> with busy front desks.</> },
      { icon: ICON_CAL, text: <><strong>Orthodontic and specialty practices</strong> handling many scheduling calls.</> },
      { icon: ICON_BUILDING, text: <><strong>Multi-location dental groups</strong> needing consistent call handling.</> },
      { icon: ICON_CLOCK, text: <><strong>Practices with after-hours calls</strong> they can’t currently answer.</> },
    ],
  },
  faq: {
    heading: "Dental AI receptionist: asked a lot.",
    items: [
      {
        q: "How much does a dental AI receptionist cost?",
        a: <>It depends on call volume, integrations, and features. <strong>We share pricing on the free demo call.</strong></>,
      },
      {
        q: "Is it HIPAA compliant?",
        a: (
          <>
            We set up tools and processes with HIPAA in mind.{" "}
            <strong>Compliance also depends on your vendors and policies, so review with your compliance advisor.</strong>
          </>
        ),
      },
      { q: "Does it replace our front desk?", a: <>No. It supports your team by <strong>handling routine and overflow calls.</strong></> },
      {
        q: "Can it handle dental emergencies?",
        a: <>It follows your urgent-call rules and <strong>routes emergencies to staff or advises calling 911 when needed.</strong></>,
      },
      { q: "How long does setup take?", a: <>It depends on your systems and call flows. <strong>We share a timeline after discovery.</strong></> },
      {
        q: "Does it give dental advice?",
        a: <>No. It shares general practice information only. <strong>Clinical and treatment questions are routed to your team.</strong></>,
      },
    ],
  },
  cta: {
    eyebrow: "AI Receptionist for Dental Practices",
    heading: "Never miss a patient call again.",
    copy: (
      <>
        Book a free demo for your dental practice:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll show how an AI receptionist would answer your practice’s calls.</strong>
      </>
    ),
    primaryLabel: "Book a dental AI demo",
  },
};
