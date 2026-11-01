import type { VerticalPage } from "./ColdEmailVerticalView";
import {
  ICON_BOLT,
  ICON_BUILDING,
  ICON_CAL_CHECK,
  ICON_CODE,
  ICON_LINK,
  ICON_MAIL,
  ICON_MAIL_CHECK,
  ICON_PEN,
  ICON_PEOPLE,
  ICON_PERSON,
  ICON_TAG,
  ICON_TARGET,
  ICON_TREND,
  ICON_VIDEO,
} from "./icons";

export const SAAS: VerticalPage = {
  hero: {
    line1: "Outbound that puts your product in",
    line2: "front of the right",
    grad: "buyers.",
    lead: (
      <>
        Cold email for SaaS companies:{" "}
        <strong>built around your ICP, real buying triggers, and a clear path to demos or trials.</strong>
      </>
    ),
    primaryLabel: "Book a SaaS outbound call",
    secondary: { label: "See the sequence ↓", href: "#sequence" },
  },
  card: {
    ariaLabel: "An example SaaS outbound sequence",
    live: "Outbound sequence",
    corner: "ICP + TRIGGERS",
    rows: [
      { title: "Trigger-based opener", sub: "Relevant note + one goal question", when: "Day 1" },
      { title: "Use case", sub: "How a similar team uses it", when: "Day 3" },
      { title: "Short demo video", sub: "A quick, personalized walkthrough", when: "Day 8" },
      { title: "Easy offer", sub: "A short demo or free trial", when: "Day 12" },
      { title: "Polite close", sub: "A respectful last check-in", when: "Day 16" },
    ],
    footLeft: "Short emails, clear purpose",
    footRight: "demos on your calendar →",
  },
  trust: ["ICP-based targeting", "Trigger-driven timing", "Demos booked for your team", "Synced with your CRM"],
  sections: [
    {
      kind: "glance",
      id: "why",
      tone: "dark",
      eyebrow: "Why outbound",
      heading: "Why SaaS companies use cold email.",
      intro: "Inbound takes time to build. Outbound starts conversations now.",
      paras: [
        <>
          Many SaaS companies need pipeline <strong>before content and SEO have time to work.</strong>
        </>,
        <>
          <a href="/sales-lead-gen/cold-email">Cold email</a> lets you reach your exact ICP, test messaging fast, and learn what
          resonates with buyers.
        </>,
        <>
          It works best with <strong>a sharp ICP, timely triggers, and a simple first step like a short demo.</strong>
        </>,
      ],
      items: [
        "Fast pipeline while inbound grows",
        "Exact ICP targeting",
        "Quick message testing",
        "Trigger-based timing",
        "CRM-connected tracking",
      ],
    },
    {
      kind: "icp",
      id: "icp",
      tone: "tint",
      eyebrow: "ICP",
      heading: "Building your SaaS ideal customer profile.",
      intro: "A clear ICP makes every other part of outbound easier.",
      cards: [
        { kicker: "Firmographics", icon: ICON_BUILDING, title: "Company fit", sub: "Who the company is", text: "Industry, size, region, and business model." },
        { kicker: "Technographics", icon: ICON_CODE, title: "Tools they use", sub: "What they run on", text: "Software that signals fit or integration value." },
        { kicker: "Roles", icon: ICON_PEOPLE, title: "Who buys and who uses", sub: "The buying group", text: "Decision-makers, champions, and end users." },
        { kicker: "Triggers", icon: ICON_BOLT, title: "Why now", sub: "The timing signal", text: "Hiring, funding, growth, or tool changes." },
      ],
    },
    {
      kind: "table",
      id: "triggers",
      tone: "plain",
      eyebrow: "Triggers",
      heading: "Buying triggers for SaaS outreach.",
      intro: "Reaching out at the right moment makes emails more relevant.",
      head: ["Trigger", "What it suggests", "How we reference it"],
      rows: [
        { a: "New funding", b: "Budget to invest in tools", c: "Congratulate and connect to their growth plans" },
        { a: "Hiring for key roles", b: "A team is scaling", c: "Tie your product to that team’s work" },
        { a: "New leadership", b: "Fresh priorities", c: "Offer a quick win for a new leader" },
        { a: "Competitor tool in use", b: "Possible switching interest", c: "Share a fair comparison point" },
        { a: "Product launch or expansion", b: "New challenges to solve", c: "Link your product to the launch" },
      ],
    },
    {
      kind: "timeline",
      id: "sequence",
      tone: "tint",
      eyebrow: "Sequence",
      heading: "An example SaaS outbound sequence.",
      intro: "Short emails, each with a clear purpose.",
      steps: [
        { when: "First email", title: "Trigger-based opener", text: "A relevant observation and one question about their goals." },
        { when: "A few days later", title: "Use case", text: "How a similar team uses your product." },
        { when: "The next week", title: "Short demo video", text: "A quick, personalized product walkthrough." },
        { when: "Later", title: "Easy offer", text: "A short demo or free trial." },
        { when: "Final email", title: "Polite close", text: "A respectful last check-in." },
      ],
    },
    {
      kind: "personas",
      id: "personas",
      tone: "plain",
      eyebrow: "Personas",
      heading: "Messaging by persona.",
      intro: "Each person in the buying group cares about something different.",
      cards: [
        { icon: ICON_TREND, title: "Executive", focus: "Outcomes and risk", text: "Growth, efficiency, and fit with strategy." },
        { icon: ICON_PERSON, title: "Manager", focus: "Team results", text: "Saved time, better reporting, and easier workflows.", mid: true },
        { icon: ICON_TAG, title: "User", focus: "Daily work", text: "Less manual effort and easier tools." },
      ],
    },
    {
      kind: "rows",
      id: "crm",
      tone: "tint",
      eyebrow: "CRM",
      heading: "Connecting outbound to your CRM.",
      intro: "Every prospect, reply, and demo flows into your pipeline.",
      rows: [
        { title: "Sync contacts", text: "Prospects and activity logged in your CRM.", out: "Clean CRM records" },
        { title: "Route replies", text: "Interested replies sent to the right rep.", out: "Faster follow-up" },
        { title: "Book demos", text: "Meetings booked straight onto calendars.", out: "Booked demos" },
        { title: "Track pipeline", text: "Outbound-sourced deals tagged for reporting.", out: "Pipeline visibility" },
      ],
      note: true,
    },
    {
      kind: "fix",
      id: "mistakes",
      tone: "plain",
      eyebrow: "Common mistakes",
      heading: "Common SaaS cold email mistakes.",
      rows: [
        { prob: "Leading with features", fix: "Leading with the problem you solve." },
        { prob: "Targeting everyone", fix: "A tight ICP with clear triggers." },
        { prob: "Long product explanations", fix: "Short emails with one idea each." },
        { prob: "Asking for a long demo first", fix: "A smaller first step." },
        { prob: "No CRM tracking", fix: "Activity and deals synced." },
        { prob: "Sending from your main domain", fix: "Separate, warmed-up domains." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tone: "tint",
      eyebrow: "What’s included",
      heading: "From ICP definition to pipeline reporting.",
      items: [
        { icon: ICON_TARGET, text: "ICP and persona definition" },
        { icon: ICON_BOLT, text: "Trigger research and list building" },
        { icon: ICON_MAIL_CHECK, text: "Email verification" },
        { icon: ICON_MAIL, text: "Sending domain and inbox setup" },
        { icon: ICON_PEN, text: "Sequence copy by persona" },
        { icon: ICON_VIDEO, text: "Personalization and short demo videos (optional)" },
        { icon: ICON_LINK, text: "CRM integration" },
        { icon: ICON_CAL_CHECK, text: "Reply handling and demo booking" },
        { icon: ICON_TREND, text: "Weekly reporting on replies, demos, and pipeline" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      tone: "plain",
      eyebrow: "Who it’s for",
      heading: "Get your product in front of the right buyers.",
      items: [
        { icon: ICON_BOLT, lead: "Early-stage SaaS", rest: "finding first customers and product-market fit." },
        { icon: ICON_TREND, lead: "Growth-stage SaaS", rest: "adding outbound to inbound." },
        { icon: ICON_PERSON, lead: "Founders selling before hiring SDRs", rest: "who need help with outreach." },
        { icon: ICON_PEOPLE, lead: "Sales teams", rest: "testing new markets or segments." },
      ],
    },
  ],
  faq: {
    heading: "Cold email for SaaS: asked a lot.",
    items: [
      {
        q: "How much does SaaS cold email outreach cost?",
        a: (
          <>
            It depends on list size, personas, and personalization depth. <strong>We share pricing on the free call.</strong>
          </>
        ),
      },
      {
        q: "Can you book demos directly for our team?",
        a: (
          <>
            Yes. We handle replies and <strong>book meetings onto your team’s calendars.</strong>
          </>
        ),
      },
      {
        q: "Do you integrate with HubSpot or Salesforce?",
        a: (
          <>
            Yes. We sync{" "}
            <strong>
              contacts, activity, and booked meetings with{" "}
              <a className="cev-link" href="/ai-automation/crm-sales-automation">
                common CRMs
              </a>
              .
            </strong>
          </>
        ),
      },
      {
        q: "Should we offer a demo or a free trial?",
        a: (
          <>
            It depends on your product and buyer. <strong>We often test both.</strong>
          </>
        ),
      },
      {
        q: "Can you guarantee a number of demos?",
        a: (
          <>
            No. Results depend on your ICP, offer, and market. <strong>We focus on targeting, messaging, and deliverability.</strong>
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
    eyebrow: "Cold Email for SaaS",
    heading: "Get your product in front of the right buyers.",
    copy: (
      <>
        Book a free call to plan SaaS outbound:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your ICP and current outreach.</strong>
      </>
    ),
    primaryLabel: "Book a SaaS outbound call",
    secondary: { label: "See the sequence", href: "#sequence" },
  },
};
