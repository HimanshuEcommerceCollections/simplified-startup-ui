import {
  ICON_BELL,
  ICON_BOLT,
  ICON_CAL_CHECK,
  ICON_CHAT_CHECK,
  ICON_CLOCK,
  ICON_DOC,
  ICON_FLASK,
  ICON_FLOW,
  ICON_HOME,
  ICON_MIC,
  ICON_PERSON_PIN,
  ICON_REFRESH,
  ICON_SHIELD,
  ICON_SHIELD_CHECK,
  ICON_SPROUT,
  ICON_STORE,
  ICON_TAG,
  ICON_TRUCK,
  ICON_WARN,
  ICON_WAVES,
} from "./icons";
import type { RcpIndustry } from "./types";

export const HOME_SERVICES: RcpIndustry = {
  hero: {
    line1: "Book more jobs, even when your",
    line2: (
      <>
        team is on a roof or under a <span className="grad-text">sink.</span>
      </>
    ),
    lead: (
      <>
        An AI receptionist for home service businesses that{" "}
        <strong>answers calls, books jobs, and routes emergencies to your on-call technician.</strong>
      </>
    ),
    primaryLabel: "Book a home services AI demo",
    card: {
      ariaLabel: "An AI receptionist answering an after-hours emergency call",
      live: "After-hours call",
      callerTitle: "Incoming · 9:48 PM",
      callerSub: "“No heat and it’s freezing”",
      time: "0:11",
      lines: [
        { who: "ai", text: "Thanks for calling Harbor Heating & Air. I can help. Is anyone unsafe, or is this a no-heat issue?" },
        { who: "caller", text: "No-heat. House is down to 54 and we have a baby." },
        {
          who: "ai",
          text: "That’s urgent. I’m paging the on-call tech now and sending your address and number so they can call you right back.",
        },
      ],
      footLeft: "Triaged, routed, confirmed",
      footRight: "on-call tech paged →",
    },
  },
  trust: ["Answers calls in the field", "Books jobs into your schedule", "Emergencies routed fast", "Works after hours and weekends"],
  why: {
    eyebrow: "Why home service businesses use AI receptionists",
    heading: "Missed calls often mean missed jobs.",
    paras: [
      <>
        When a pipe bursts or the AC stops, homeowners <strong>call until someone answers.</strong>
      </>,
      "Your team is often on job sites, driving, or off for the night when those calls come in.",
      <>
        An <a href="/ai-automation/ai-voice-agents">AI receptionist</a>{" "}
        <strong>answers right away, books the job, and sends true emergencies straight to your on-call tech.</strong>
      </>,
    ],
    glance: ["Calls while techs are on jobs", "Evenings and weekends", "Emergency triage", "Job booking", "Lead details captured"],
  },
  callTypes: {
    heading: "Each call type is handled, with clear handoffs.",
    rows: [
      { type: "New service request", does: "Collects address, issue, and contact details", hand: "If the job needs a quote review" },
      { type: "Emergency calls", does: "Asks triage questions", hand: "Routes to on-call tech right away" },
      { type: "Scheduling & rescheduling", does: "Offers available time windows", hand: "If dispatch rules need a human" },
      { type: "Estimate requests", does: "Books an estimate visit", hand: "For complex projects" },
      { type: "Service area questions", does: "Confirms if you serve their area", hand: "Rarely needed" },
      { type: "Existing job updates", does: "Takes a message or transfers", hand: "For job-specific details" },
    ],
  },
  middle: [
    {
      kind: "triage",
      id: "triage",
      eyebrow: "Emergency triage rules",
      heading: "Your rules decide what counts as urgent.",
      tiers: [
        {
          label: "Safety first",
          icon: ICON_WARN,
          title: "Immediate danger",
          text: "Gas leaks, electrical hazards, or fire: caller told to leave and call 911 or the utility.",
        },
        { label: "Urgent", icon: ICON_BOLT, title: "Same-day issues", text: "No heat, no AC in extreme weather, or major leaks routed to on-call tech." },
        { label: "Priority", icon: ICON_CLOCK, title: "Soon", text: "Problems that need attention within your normal schedule." },
        { label: "Routine", icon: ICON_CAL_CHECK, title: "Scheduled", text: "Maintenance, tune-ups, and quotes booked normally." },
      ],
    },
    {
      kind: "example",
      eyebrow: "Example: an after-hours call",
      heading: "How a single call flows from hello to confirmation.",
      steps: [
        { when: "Greeting", title: "Answer and disclose", text: "Business name and a short AI disclosure where required." },
        { when: "Triage", title: "What’s happening", text: "Questions to understand the problem and urgency." },
        { when: "Route", title: "Emergency or not", text: "Urgent calls go to on-call; others are booked." },
        { when: "Book", title: "Time window", text: "Offers the next available appointment." },
        { when: "Confirm", title: "Wrap up", text: "Sends confirmation and notifies your team." },
      ],
    },
    {
      kind: "six",
      id: "trades",
      eyebrow: "Trades we support",
      heading: "Set up for how your trade takes calls.",
      cards: [
        { icon: ICON_WAVES, title: "HVAC", text: "Heating, cooling, and maintenance plans." },
        { icon: ICON_FLASK, title: "Plumbing", text: "Leaks, drains, and water heaters." },
        { icon: ICON_BOLT, title: "Electrical", text: "Repairs, panels, and installs." },
        { icon: ICON_HOME, title: "Roofing", text: "Leaks, storm damage, and estimates." },
        { icon: ICON_SPROUT, title: "Pest control", text: "Inspections and recurring service." },
        { icon: ICON_STORE, title: "Cleaning & landscaping", text: "Recurring and one-time bookings." },
      ],
    },
  ],
  tools: {
    names: [
      "ServiceTitan",
      "Jobber",
      "Housecall Pro",
      "FieldEdge",
      "Workiz",
      "Google Calendar",
      "Twilio",
      "RingCentral",
      "HubSpot",
      "Zapier",
      "Make",
      "Slack",
    ],
    note: (
      <>
        The AI receptionist is not an emergency service.{" "}
        <b>For safety hazards like gas leaks or electrical fires, callers are directed to call 911 or their utility.</b> Call recording and
        AI disclosure rules vary by state and country. Some places require consent from everyone on the call. We set up disclosures and
        recording settings with this in mind, but please confirm requirements with your own legal counsel.
      </>
    ),
  },
  questions: {
    id: "ownerq",
    eyebrow: "Questions owners ask",
    items: [
      { q: "Can it quote prices?", a: "It can share standard fees you approve, like service call fees, and books estimates for the rest." },
      { q: "Can it check our service area?", a: "Yes, using the ZIP codes or areas you provide." },
      { q: "Will it page our on-call tech?", a: "Yes, through calls, texts, or your dispatch tool where connected." },
      { q: "Can it book into ServiceTitan or Jobber?", a: "Often, depending on your setup." },
    ],
  },
  problems: {
    heading: "Common call problems.",
    rows: [
      { prob: "Missed calls on job sites", fix: "Every call answered." },
      { prob: "After-hours calls lost", fix: "Around-the-clock answering." },
      { prob: "Emergencies mixed with routine calls", fix: "Clear triage rules." },
      { prob: "Incomplete job details", fix: "Structured questions every time." },
      { prob: "Office staff overwhelmed", fix: "Routine calls handled automatically." },
    ],
  },
  included: {
    heading: "From triage planning to ongoing reviews.",
    items: [
      { icon: ICON_FLOW, text: "Call flow and triage planning" },
      { icon: ICON_MIC, text: "Custom greeting and voice" },
      { icon: ICON_SHIELD, text: "Service area and pricing rules you approve" },
      { icon: ICON_CAL_CHECK, text: "Scheduling integration where available" },
      { icon: ICON_BELL, text: "On-call routing and alerts" },
      { icon: ICON_CHAT_CHECK, text: "Text confirmations" },
      { icon: ICON_DOC, text: "Call summaries and recordings where permitted" },
      { icon: ICON_SHIELD_CHECK, text: "Testing before going live" },
      { icon: ICON_REFRESH, text: "Ongoing updates and reviews" },
    ],
  },
  who: {
    heading: "Turn every call into a booked job.",
    items: [
      { icon: ICON_BOLT, text: <><strong>HVAC, plumbing, and electrical companies</strong> with emergency calls.</> },
      { icon: ICON_TAG, text: <><strong>Owner-operators</strong> who can’t answer while working.</> },
      { icon: ICON_TRUCK, text: <><strong>Growing service businesses</strong> adding trucks and techs.</> },
      { icon: ICON_PERSON_PIN, text: <><strong>Seasonal businesses</strong> handling call spikes.</> },
    ],
  },
  faq: {
    heading: "Home services AI receptionist: asked a lot.",
    items: [
      {
        q: "How much does a home services AI receptionist cost?",
        a: <>It depends on call volume, integrations, and features. <strong>We share pricing on the free demo call.</strong></>,
      },
      {
        q: "Can it handle emergency calls?",
        a: <>It follows your triage rules, routes urgent calls to on-call staff, and <strong>directs safety hazards to 911 or the utility.</strong></>,
      },
      { q: "Does it work with ServiceTitan?", a: <>Often, yes. We also work with <strong>Jobber, Housecall Pro, and other tools.</strong></> },
      { q: "Will it sound robotic?", a: <>Modern AI voices sound natural, and <strong>we tune scripts to match how your team talks.</strong></> },
      { q: "Does it replace our dispatcher?", a: <>No. It handles routine and overflow calls <strong>so your team can focus on dispatching.</strong></> },
      {
        q: "What about peak-season call spikes?",
        a: (
          <>
            It answers every call at once, so a heat wave or cold snap rush <strong>never sends jobs to voicemail</strong>: routine calls
            are booked and emergencies are routed.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "AI Receptionist for Home Services",
    heading: "Turn every call into a booked job.",
    copy: (
      <>
        Book a free demo for your home service business:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll show how AI would handle your incoming calls.</strong>
      </>
    ),
    primaryLabel: "Book a home services AI demo",
  },
};
