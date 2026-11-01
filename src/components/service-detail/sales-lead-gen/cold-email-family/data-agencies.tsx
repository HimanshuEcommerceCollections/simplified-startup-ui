import type { VerticalPage } from "./ColdEmailVerticalView";
import {
  ICON_BROWSER,
  ICON_BOLT,
  ICON_CAL_CHECK,
  ICON_CHAT,
  ICON_CODE,
  ICON_DOC,
  ICON_LIST_CHECK,
  ICON_MAIL,
  ICON_MEGAPHONE,
  ICON_NEWS,
  ICON_PEN,
  ICON_PEOPLE,
  ICON_REPLY,
  ICON_SEARCH,
  ICON_STAR,
  ICON_TARGET,
  ICON_TREND,
  ICON_VIDEO,
} from "./icons";

export const AGENCIES: VerticalPage = {
  hero: {
    line1: "Cold email that helps agencies win",
    line2: "clients without relying on",
    grad: "referrals.",
    lead: (
      <>
        Targeted outreach for marketing, creative, and development agencies:{" "}
        <strong>built around your niche, your proof, and conversations with real decision-makers.</strong>
      </>
    ),
    primaryLabel: "Book an agency outreach call",
    secondary: { label: "See the sequence ↓", href: "#sequence" },
  },
  card: {
    ariaLabel: "An example agency cold email sequence",
    live: "Outreach sequence",
    corner: "BUILT FOR YOUR NICHE",
    rows: [
      { title: "Relevant observation", sub: "A specific note & soft question", when: "Day 1" },
      { title: "Proof", sub: "A verifiable similar result", when: "Day 3" },
      { title: "Helpful idea", sub: "One quick, usable suggestion", when: "Day 8" },
      { title: "Easy next step", sub: "A short audit or call", when: "Day 12" },
      { title: "Polite close", sub: "Door left open", when: "Day 16" },
    ],
    footLeft: "Each email adds something new",
    footRight: "calls on your calendar →",
  },
  trust: ["Niche-focused targeting", "Personalized at scale", "Proof-led messaging", "Calls booked on your calendar"],
  sections: [
    {
      kind: "glance",
      id: "why",
      tone: "dark",
      eyebrow: "Why outbound",
      heading: "Why agencies need a steady outbound channel.",
      intro: "Referrals are great until they slow down. Cold email adds a channel you control.",
      paras: [
        <>
          Many agencies grow on referrals and word of mouth, which can <strong>make new business feel unpredictable.</strong>
        </>,
        <>
          <a href="/sales-lead-gen/cold-email">Cold email</a> lets you choose the clients you want, in the niche you serve best, and
          start conversations on your schedule.
        </>,
        <>
          It works best when you lead with <strong>a clear niche, relevant proof, and an easy next step.</strong>
        </>,
      ],
      items: [
        "Predictable new conversations",
        "Choose your ideal clients",
        "Niche-specific messaging",
        "Proof from past work",
        "Runs alongside referrals",
      ],
    },
    {
      kind: "table",
      id: "targeting",
      tone: "tint",
      eyebrow: "Targeting",
      heading: "Who agencies should target with cold email.",
      intro: "The tighter the niche, the more relevant every email feels.",
      head: ["Agency type", "Decision-makers to reach", "Buying signals to watch"],
      rows: [
        { a: "Marketing & growth agencies", b: "Founders, CMOs, Heads of Growth", c: "New funding, hiring marketers, product launches" },
        { a: "SEO & content agencies", b: "Marketing Directors, Content Leads", c: "Site redesigns, new blogs, falling organic visibility" },
        { a: "Paid media agencies", b: "Heads of Performance, E-commerce Managers", c: "Running ads with weak landing pages" },
        { a: "Creative & branding agencies", b: "Founders, Brand Managers", c: "Rebrands, new markets, funding announcements" },
        { a: "Web & development agencies", b: "CTOs, Product & Marketing Leads", c: "Outdated sites, platform migrations" },
      ],
    },
    {
      kind: "timeline",
      id: "sequence",
      tone: "plain",
      eyebrow: "Sequence",
      heading: "An example agency cold email sequence.",
      intro: "Each email adds something new instead of repeating the same pitch.",
      steps: [
        { when: "First email", title: "Relevant observation", text: "A specific note about their business and a short, low-pressure question." },
        { when: "A few days later", title: "Proof", text: "A brief example of similar work or a result you can verify." },
        { when: "The next week", title: "Helpful idea", text: "One quick suggestion they can use, even if they don’t reply." },
        { when: "Later", title: "Easy next step", text: "A simple offer, like a short audit or call." },
        { when: "Final email", title: "Polite close", text: "A respectful last note that leaves the door open." },
      ],
    },
    {
      kind: "angles",
      id: "personalization",
      tone: "tint",
      eyebrow: "Personalization",
      heading: "Personalization angles that work for agencies.",
      intro: "Good personalization shows you’ve actually looked at their business.",
      cards: [
        { icon: ICON_BROWSER, title: "Their website", text: "A specific observation about their site, offer, or messaging." },
        { icon: ICON_MEGAPHONE, title: "Their ads or content", text: "Something you noticed in their campaigns or posts." },
        { icon: ICON_NEWS, title: "Recent news", text: "Funding, launches, hires, or expansions." },
        { icon: ICON_CODE, title: "Their tech stack", text: "Platforms they use that you know well." },
        { icon: ICON_PEOPLE, title: "Their competitors", text: "How peers in their space are approaching growth." },
        { icon: ICON_STAR, title: "Shared niche", text: "Your experience in their exact industry." },
      ],
    },
    {
      kind: "offers",
      id: "offers",
      tone: "plain",
      eyebrow: "Offers",
      heading: "Offers that get agencies replies.",
      intro: "A low-commitment first step makes it easy to say yes.",
      cards: [
        { icon: ICON_SEARCH, title: "Short audit", text: "A quick review of their site, ads, or SEO with a few clear findings." },
        { icon: ICON_VIDEO, title: "Teardown video", text: "A short recorded walkthrough of improvement ideas." },
        { icon: ICON_CHAT, title: "Strategy call", text: "A focused conversation about one specific goal." },
        { icon: ICON_DOC, title: "Relevant example", text: "A case study from a similar business, shared on request." },
      ],
    },
    {
      kind: "replies",
      id: "replies",
      tone: "tint",
      eyebrow: "Replies",
      heading: "Handling common replies.",
      intro: "Every reply type gets a planned, helpful response.",
      items: [
        { q: "We already have an agency.", a: "A friendly reply offering a second opinion or a specific idea." },
        { q: "Not right now.", a: "A note to check back at a better time, with their permission." },
        { q: "Send more info.", a: "A short, relevant case study and a clear next step." },
        { q: "Who are you?", a: "A brief, honest intro and why you reached out." },
      ],
      note: true,
    },
    {
      kind: "fix",
      id: "mistakes",
      tone: "plain",
      eyebrow: "Common mistakes",
      heading: "Common agency cold email mistakes.",
      rows: [
        { prob: "Listing every service you offer", fix: "One clear offer for one niche." },
        { prob: "Talking only about your agency", fix: "Focusing on their goals and problems." },
        { prob: "Generic “quick question” emails", fix: "Specific, researched openers." },
        { prob: "Sending from your main domain", fix: "Separate, warmed-up sending domains." },
        { prob: "No follow-up", fix: "A short, value-adding sequence." },
        { prob: "Vague call to action", fix: "One easy next step." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tone: "tint",
      eyebrow: "What’s included",
      heading: "From niche definition to weekly reporting.",
      items: [
        { icon: ICON_TARGET, text: "Niche and ideal client definition" },
        { icon: ICON_LIST_CHECK, text: "Prospect list building and verification" },
        { icon: ICON_MAIL, text: "Sending domain and inbox setup" },
        { icon: ICON_PEN, text: "Email copy and sequence writing" },
        { icon: ICON_SEARCH, text: "Personalization research" },
        { icon: ICON_BOLT, text: "Campaign launch and monitoring" },
        { icon: ICON_REPLY, text: "Reply handling support" },
        { icon: ICON_CAL_CHECK, text: "Meeting booking on your calendar" },
        { icon: ICON_TREND, text: "Weekly reporting on replies and meetings" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      tone: "plain",
      eyebrow: "Who it’s for",
      heading: "Start conversations with clients you actually want.",
      items: [
        { icon: ICON_TREND, lead: "Marketing and growth agencies", rest: "ready to grow beyond referrals." },
        { icon: ICON_SEARCH, lead: "SEO, content, and paid media agencies", rest: "targeting a specific niche." },
        { icon: ICON_STAR, lead: "Creative and branding studios", rest: "pursuing larger clients." },
        { icon: ICON_CODE, lead: "Web and development agencies", rest: "looking for project work." },
      ],
    },
  ],
  faq: {
    heading: "Cold email for agencies: asked a lot.",
    items: [
      {
        q: "How much does cold email for agencies cost?",
        a: (
          <>
            It depends on list size, number of inboxes, and how much personalization is involved.{" "}
            <strong>We share pricing on the free call.</strong>
          </>
        ),
      },
      {
        q: "Does cold email work for agencies?",
        a: (
          <>
            It can, especially when you target a clear niche with relevant proof. <strong>Results depend on your offer and market.</strong>
          </>
        ),
      },
      {
        q: "Will you send from our main domain?",
        a: (
          <>
            No. We use <strong>separate sending domains to protect your main domain’s reputation.</strong>
          </>
        ),
      },
      {
        q: "Who writes the emails?",
        a: (
          <>
            We write them in your voice, and <strong>you approve everything before launch.</strong>
          </>
        ),
      },
      {
        q: "Can you guarantee meetings?",
        a: (
          <>
            No. Results depend on your niche, offer, and market. <strong>We focus on targeting, messaging, and deliverability.</strong>
          </>
        ),
      },
      {
        q: "How is this different from a generic list blast?",
        a: (
          <>
            We target one niche, personalize from real research, and lead with proof,{" "}
            <strong>so every email feels relevant, not mass-sent.</strong>
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "Cold Email for Agencies",
    heading: "Start conversations with clients you actually want.",
    copy: (
      <>
        Book a free call to plan outbound for your agency:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll look at your niche, offer, and ideal clients.</strong>
      </>
    ),
    primaryLabel: "Book an agency outreach call",
    secondary: { label: "See the sequence", href: "#sequence" },
  },
};
