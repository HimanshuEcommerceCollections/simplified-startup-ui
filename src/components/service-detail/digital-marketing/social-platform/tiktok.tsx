import { TikTokFeedCard } from "./cards";
import * as I from "./icons";
import type { PlatformData } from "./types";

export const TIKTOK: PlatformData = {
  hero: {
    line1: "TikTok content that feels native",
    line2: (
      <>
        and gets your brand <span className="grad-text">noticed.</span>
      </>
    ),
    lead: (
      <>
        TikTok strategy, short-form video, trends, and creator partnerships, <strong>built for how people actually use the app.</strong>
      </>
    ),
    primaryLabel: "Book a TikTok call",
  },
  card: <TikTokFeedCard />,
  trust: ["Native, creator-style content", "Trend and sound planning", "Creator partnerships", "Spark Ads to boost what works"],
  sections: [
    {
      kind: "glance",
      id: "why",
      eyebrow: "Why TikTok works differently",
      heading: "Reach is driven by content, not just followers.",
      paragraphs: [
        <>
          On TikTok, the For You feed shows videos to people <strong>based on interest, not only to your followers.</strong>
        </>,
        "That means a new account can reach new people when the content is relevant and engaging.",
        <>
          What works is <strong>short, real, entertaining content that feels like it belongs on TikTok,</strong> not repurposed TV ads.
        </>,
      ],
      glance: ["Discovery through the For You feed", "Strong hooks in the first seconds", "Trends, sounds, and formats", "Creators and real faces", "Consistent posting rhythm"],
    },
    {
      kind: "tiltGrid",
      id: "pillars",
      tint: true,
      eyebrow: "Content pillars for TikTok",
      heading: "A few repeatable themes, so ideas never run dry.",
      cards: [
        { icon: I.ICON_CAP, title: "Educate", text: "Quick tips, how-tos, and myths busted." },
        { icon: I.ICON_EYE, title: "Behind the scenes", text: "How products are made, packed, or delivered." },
        { icon: I.ICON_BOLT, title: "Trends", text: "Relevant trends and sounds adapted to your brand." },
        { icon: I.ICON_STAR, title: "Customer stories", text: "Real customers, reviews, and reactions, with permission." },
        { icon: I.ICON_VIDEO, title: "Product in action", text: "Demos, use cases, and before-and-after moments." },
        { icon: I.ICON_PERSON, title: "Founder and team", text: "The people behind the brand, talking honestly." },
      ],
    },
    {
      kind: "iconTable",
      id: "formats",
      eyebrow: "TikTok formats we use",
      heading: "Different formats suit different goals.",
      head: ["Format", "What it is", "Best for"],
      rows: [
        { icon: I.ICON_REEL, name: "Short videos", what: "Quick vertical clips with a strong hook", best: "Reach and discovery" },
        { icon: I.ICON_DUET, name: "Duets and Stitches", what: "Responding to other creators’ videos", best: "Joining conversations" },
        { icon: I.ICON_CAROUSEL, name: "Photo carousels", what: "Swipeable image posts", best: "Tips, lists, and products" },
        { icon: I.ICON_LIVE, name: "LIVE", what: "Real-time video sessions", best: "Q&As, launches, and selling" },
        { icon: I.ICON_BOLT, name: "Spark Ads", what: "Boosting your own or creator posts as ads", best: "Scaling content that already works" },
      ],
    },
    {
      kind: "workflow",
      id: "workflow",
      tint: true,
      eyebrow: "Our TikTok content workflow",
      heading: "A steady rhythm from ideas to insights.",
      steps: [
        { title: "Research", text: "Trends, competitors, and what your audience watches.", outcome: "Monthly idea list" },
        { title: "Plan", text: "Content calendar built around pillars and trends.", outcome: "Content calendar" },
        { title: "Script and film", text: "Short scripts, shot lists, and filming support.", outcome: "Ready-to-edit footage" },
        { title: "Edit and post", text: "Native-style edits with captions, sounds, and hashtags.", outcome: "Published videos" },
        { title: "Review and learn", text: "We review what worked and adjust the next month.", outcome: "Monthly insights" },
      ],
    },
    {
      kind: "iconList",
      id: "anatomy",
      eyebrow: "Anatomy of a strong TikTok",
      heading: "Every video we plan is built around these parts.",
      cards: [
        { icon: I.ICON_BOLT, title: "Hook first", text: "A question, bold claim, or striking visual right away." },
        { icon: I.ICON_MINUS_CIRCLE, title: "One clear idea", text: "Each video makes a single point." },
        { icon: I.ICON_PEN, title: "Native editing", text: "Feels like TikTok, not an ad." },
        { icon: I.ICON_PERSON, title: "Real person", text: "Faces and voices build trust." },
        { icon: I.ICON_LINES, title: "Captions on screen", text: "Easy to follow with sound off." },
        { icon: I.ICON_ARROW, title: "Clear next step", text: "Follow, comment, or visit your link." },
      ],
    },
    {
      kind: "centerGrid",
      id: "creators",
      tint: true,
      eyebrow: "Working with creators",
      heading: "Creators can help your brand reach new audiences in an authentic way.",
      cards: [
        { icon: I.ICON_SEARCH, title: "Find creators", text: "Creators whose audiences match your buyers." },
        { icon: I.ICON_DOC, title: "Brief clearly", text: "Key messages and must-haves, with creative freedom." },
        { icon: I.ICON_BOLT, title: "Boost with Spark Ads", text: "Promote creator posts with their permission." },
      ],
    },
    {
      kind: "mistakes",
      id: "mistakes",
      eyebrow: "Common mistakes",
      heading: "Common TikTok mistakes.",
      rows: [
        { prob: "Posting polished TV-style ads", fix: "Native, creator-style content." },
        { prob: "Slow, unclear openings", fix: "Hooks placed right at the start." },
        { prob: "Chasing every trend", fix: "Only trends that fit your brand." },
        { prob: "Posting without a plan", fix: "Content pillars and a calendar." },
        { prob: "Ignoring comments", fix: "Active community replies." },
        { prob: "No link to business goals", fix: "Tracking and clear calls to action." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tint: true,
      eyebrow: "What’s included",
      heading: "From account audit to monthly insights.",
      items: [
        { icon: I.ICON_SEARCH, text: "TikTok account audit and setup" },
        { icon: I.ICON_CAP, text: "Content strategy and pillars" },
        { icon: I.ICON_CALENDAR, text: "Monthly content calendar" },
        { icon: I.ICON_LINES, text: "Scripts and shot lists" },
        { icon: I.ICON_PEN, text: "Video editing with captions and sounds" },
        { icon: I.ICON_CHAT, text: "Posting and community management" },
        { icon: I.ICON_CREATOR, text: "Creator partnership support" },
        { icon: I.ICON_BOLT, text: "Spark Ads support (ad spend paid to TikTok)" },
        { icon: I.ICON_TREND, text: "Monthly reporting and insights" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      eyebrow: "Who it’s for",
      heading: "Show up on TikTok the right way.",
      items: [
        { icon: I.ICON_BAG, text: <><strong>Consumer brands</strong> reaching younger and trend-aware audiences.</> },
        { icon: I.ICON_VIDEO, text: <><strong>E-commerce and TikTok Shop sellers</strong> showing products in action.</> },
        { icon: I.ICON_HOME, text: <><strong>Local businesses</strong> with personality and visual appeal.</> },
        { icon: I.ICON_PERSON, text: <><strong>Founders and experts</strong> building a personal brand.</> },
      ],
    },
  ],
  faq: {
    heading: "Asked before every account.",
    items: [
      {
        q: "How much does TikTok marketing cost?",
        a: <>It depends on posting frequency, video production needs, and creator work. <strong>We share pricing on the free call.</strong></>,
      },
      {
        q: "Do we need to be on camera?",
        a: <>It helps, but it’s not required. <strong>We can use creators, voiceovers, or product-focused content.</strong></>,
      },
      {
        q: "How often should we post?",
        a: <>It depends on your capacity. <strong>Consistency matters more than volume,</strong> and we plan a rhythm you can sustain.</>,
      },
      {
        q: "Can you run TikTok ads too?",
        a: <>Yes. We can <strong>boost top content with Spark Ads and run paid campaigns</strong> alongside organic content.</>,
      },
      {
        q: "Can you guarantee views or followers?",
        a: <>No. Reach depends on content, timing, and the platform. <strong>We focus on strategy, quality, and consistency.</strong></>,
      },
      {
        q: "Who makes the videos?",
        a: <>We handle scripting, editing, captions, and sounds, and can <strong>film, use your footage, or work with creators</strong> depending on your setup.</>,
      },
    ],
  },
  cta: {
    eyebrow: "TikTok Marketing",
    heading: "Show up on TikTok the right way.",
    copy: (
      <>
        Book a free call to plan your TikTok content:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your audience and what content could work.</strong>
      </>
    ),
    primaryLabel: "Book a TikTok call",
  },
};
