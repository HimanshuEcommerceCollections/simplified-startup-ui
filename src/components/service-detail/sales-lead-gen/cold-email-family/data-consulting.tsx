import type { VerticalPage } from "./ColdEmailVerticalView";
import {
  ICON_BOLT,
  ICON_BUILDING,
  ICON_BULB,
  ICON_CAL_CHECK,
  ICON_CHAT,
  ICON_CHAT_LINES,
  ICON_DOC,
  ICON_DOLLAR,
  ICON_EYE_WIDE,
  ICON_MAIL,
  ICON_MAIL_CHECK,
  ICON_PEN,
  ICON_PERSON,
  ICON_SEARCH,
  ICON_SHIELD,
  ICON_SHIELD_CHECK,
  ICON_TREND,
} from "./icons";

export const CONSULTING: VerticalPage = {
  hero: {
    line1: "Respectful outreach that opens doors",
    line2: "with senior",
    grad: "decision-makers.",
    lead: (
      <>
        Cold email for consultants and consulting firms:{" "}
        <strong>led by your expertise, written for executives, and focused on meaningful conversations.</strong>
      </>
    ),
    primaryLabel: "Book a consulting outreach call",
    secondary: { label: "See the sequence ↓", href: "#sequence" },
  },
  card: {
    ariaLabel: "An example consulting outreach sequence",
    live: "Outreach sequence",
    corner: "INSIGHT BEFORE ASKING",
    rows: [
      { title: "Insight opener", sub: "A relevant observation & short question", when: "Day 1" },
      { title: "Useful resource", sub: "A short article, framework, or idea", when: "Week 2" },
      { title: "Relevant experience", sub: "A brief example of similar work", when: "Week 3" },
      { title: "Polite close", sub: "A respectful final note", when: "Week 4" },
    ],
    footLeft: "Fewer, more thoughtful emails",
    footRight: "calls with the right people →",
  },
  trust: ["Executive-level targeting", "Expertise-led messaging", "Insight before asking", "Calls with the right people"],
  sections: [
    {
      kind: "glance",
      id: "why",
      tone: "dark",
      eyebrow: "Why outbound",
      heading: "Why consultants use cold email.",
      intro: "Your expertise is the offer. Cold email puts it in front of the right leaders.",
      paras: [
        <>
          Consulting is built on trust, so outreach has to feel <strong>thoughtful, not salesy.</strong>
        </>,
        <>
          Well-researched <a href="/sales-lead-gen/cold-email">cold email</a> can reach executives who might never find you through
          search or social.
        </>,
        <>
          The best approach <strong>leads with insight, keeps the ask small, and respects the reader’s time.</strong>
        </>,
      ],
      items: [
        "Reach senior leaders directly",
        "Lead with insight",
        "Small, respectful asks",
        "Builds on your expertise",
        "Complements referrals and speaking",
      ],
    },
    {
      kind: "table",
      id: "targeting",
      tone: "tint",
      eyebrow: "Targeting",
      heading: "Who consultants should target.",
      intro: "Specialization makes outreach far more relevant.",
      head: ["Consulting focus", "Who to reach", "Signals to watch"],
      rows: [
        { a: "Strategy & operations", b: "CEOs, COOs, and founders", c: "Rapid growth, restructuring, or new leadership" },
        { a: "Finance & fractional CFO", b: "CEOs and founders", c: "Fundraising, new investors, or growth plans" },
        { a: "Marketing & sales consulting", b: "CMOs, CROs, and founders", c: "Missed targets, new markets, or new sales leaders" },
        { a: "HR & people consulting", b: "CEOs and HR leaders", c: "Fast hiring, culture changes, or new offices" },
        { a: "Technology consulting", b: "CTOs and CIOs", c: "Migrations, new systems, or security needs" },
      ],
    },
    {
      kind: "flow",
      id: "approach",
      tone: "plain",
      eyebrow: "Approach",
      heading: "Insight-led outreach.",
      intro: "Each email gives value before asking for time.",
      steps: [
        { kicker: "Observe", icon: ICON_EYE_WIDE, title: "Show you’ve done the work", text: "A specific note about their company or industry." },
        { kicker: "Insight", icon: ICON_BULB, title: "Share something useful", text: "A trend, risk, or idea relevant to them." },
        { kicker: "Credibility", icon: ICON_SHIELD_CHECK, title: "Brief proof", text: "Relevant experience, without a long bio." },
        { kicker: "Ask", icon: ICON_CHAT, title: "Keep it small", text: "A short call or a reply with their view." },
      ],
    },
    {
      kind: "timeline",
      id: "sequence",
      tone: "tint",
      eyebrow: "Sequence",
      heading: "An example consulting sequence.",
      intro: "Fewer, more thoughtful emails suit executive audiences.",
      steps: [
        { when: "First email", title: "Insight opener", text: "A relevant observation and a short question." },
        { when: "About a week later", title: "Useful resource", text: "A short article, framework, or idea." },
        { when: "Later", title: "Relevant experience", text: "A brief example of similar work." },
        { when: "Final email", title: "Polite close", text: "A respectful final note." },
      ],
    },
    {
      kind: "offers3",
      id: "offers",
      tone: "plain",
      eyebrow: "Offers",
      heading: "First steps that work for consultants.",
      intro: "Executives say yes to small, valuable asks.",
      cards: [
        { icon: ICON_CHAT_LINES, title: "Short diagnostic call", text: "A focused conversation about one challenge." },
        { icon: ICON_TREND, title: "Benchmark or framework", text: "A useful tool they can apply right away." },
        { icon: ICON_DOC, title: "Executive briefing", text: "A concise summary of trends in their industry." },
      ],
    },
    {
      kind: "replies",
      id: "replies",
      tone: "tint",
      eyebrow: "Replies",
      heading: "Handling executive replies.",
      intro: "Every reply type gets a planned, respectful response.",
      items: [
        { q: "We handle this internally.", a: "Offer an outside perspective or a specific insight." },
        { q: "Send me something to read.", a: "A short, relevant summary instead of a long deck." },
        { q: "Talk to my team.", a: "A warm handoff with context." },
        { q: "Not a priority now.", a: "Ask permission to check back later." },
      ],
      note: true,
    },
    {
      kind: "fix",
      id: "mistakes",
      tone: "plain",
      eyebrow: "Common mistakes",
      heading: "Common consulting cold email mistakes.",
      rows: [
        { prob: "Long bios and credentials", fix: "Short, relevant proof." },
        { prob: "Selling a big engagement upfront", fix: "A small first step." },
        { prob: "Generic industry claims", fix: "Specific insights for their business." },
        { prob: "Too many follow-ups", fix: "Fewer, thoughtful touches." },
        { prob: "No clear specialty", fix: "A defined niche and offer." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tone: "tint",
      eyebrow: "What’s included",
      heading: "From specialty definition to weekly reporting.",
      items: [
        { icon: ICON_SHIELD, text: "Specialty and ideal client definition" },
        { icon: ICON_PERSON, text: "Executive-level prospect lists" },
        { icon: ICON_MAIL_CHECK, text: "Email verification" },
        { icon: ICON_MAIL, text: "Sending domain and inbox setup" },
        { icon: ICON_PEN, text: "Insight-led copy in your voice" },
        { icon: ICON_SEARCH, text: "Personalization research" },
        { icon: ICON_BOLT, text: "Campaign launch and monitoring" },
        { icon: ICON_CAL_CHECK, text: "Reply handling and meeting booking" },
        { icon: ICON_TREND, text: "Weekly reporting on replies and meetings" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      tone: "plain",
      eyebrow: "Who it’s for",
      heading: "Open doors with the leaders you want to work with.",
      items: [
        { icon: ICON_PERSON, lead: "Independent consultants", rest: "building a steady client flow." },
        { icon: ICON_BUILDING, lead: "Boutique consulting firms", rest: "targeting specific industries." },
        { icon: ICON_DOLLAR, lead: "Fractional executives", rest: "seeking new clients." },
        { icon: ICON_BULB, lead: "Coaches and advisors", rest: "working with business leaders." },
      ],
    },
  ],
  faq: {
    heading: "Cold email for consultants: asked a lot.",
    items: [
      {
        q: "How much does cold email for consultants cost?",
        a: (
          <>
            It depends on list size, personalization depth, and number of campaigns. <strong>We share pricing on the free call.</strong>
          </>
        ),
      },
      {
        q: "Does cold email work for high-value consulting?",
        a: (
          <>
            It can, when messaging is specific, respectful, and led by real insight. <strong>Results depend on your niche and offer.</strong>
          </>
        ),
      },
      {
        q: "Will emails sound like me?",
        a: (
          <>
            Yes. We write in your voice and <strong>you approve everything before it goes out.</strong>
          </>
        ),
      },
      {
        q: "How many follow-ups do you send?",
        a: (
          <>
            Usually fewer than for other industries, <strong>since executives value brevity.</strong>
          </>
        ),
      },
      {
        q: "Can you guarantee clients?",
        a: (
          <>
            No. Results depend on your expertise, market, and offer. <strong>We focus on targeting, messaging, and deliverability.</strong>
          </>
        ),
      },
      {
        q: "Will you send from our main domain?",
        a: (
          <>
            No. We use <strong>separate, warmed-up sending domains</strong> to protect your main domain’s reputation.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "Cold Email for Consulting",
    heading: "Open doors with the leaders you want to work with.",
    copy: (
      <>
        Book a free call to plan your consulting outreach:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll shape messaging around your strongest insights.</strong>
      </>
    ),
    primaryLabel: "Book a consulting outreach call",
    secondary: { label: "See the sequence", href: "#sequence" },
  },
};
