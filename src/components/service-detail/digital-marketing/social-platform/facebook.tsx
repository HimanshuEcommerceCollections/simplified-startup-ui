import { FacebookPageCard } from "./cards";
import * as I from "./icons";
import type { PlatformData } from "./types";

export const FACEBOOK: PlatformData = {
  hero: {
    line1: "Facebook content that builds community",
    line2: (
      <>
        and keeps customers coming <span className="grad-text">back.</span>
      </>
    ),
    lead: (
      <>
        Facebook Page management, content, Reels, Groups, and community care, <strong>for businesses that want to stay connected with their audience.</strong>
      </>
    ),
    primaryLabel: "Book a Facebook call",
  },
  card: <FacebookPageCard />,
  trust: ["Consistent, on-brand posting", "Reels and video content", "Groups and community care", "Messages answered on time"],
  sections: [
    {
      kind: "glance",
      id: "why",
      eyebrow: "Why Facebook still matters",
      heading: "Community, local reach, and customer service in one place.",
      paragraphs: [
        <>
          Many customers still use Facebook to <strong>find local businesses, read reviews, join groups, and send messages.</strong>
        </>,
        "It’s a strong place to build community, share updates, promote events, and answer questions.",
        <>
          The key is <strong>consistent, useful content and quick replies,</strong> so your Page feels active and trustworthy.
        </>,
      ],
      glance: ["Business Page as a trust signal", "Reels for reach", "Groups for community", "Events for local promotion", "Messenger for questions"],
    },
    {
      kind: "iconTable",
      id: "tools",
      tint: true,
      eyebrow: "Facebook tools we use",
      heading: "Each tool helps with a different goal.",
      head: ["Tool", "What it does", "Best for"],
      rows: [
        { icon: I.ICON_LINES, name: "Page posts", what: "Updates, photos, and links on your Page", best: "Keeping customers informed" },
        { icon: I.ICON_REEL, name: "Reels", what: "Short vertical videos", best: "Reaching new people" },
        { icon: I.ICON_STORIES, name: "Stories", what: "Short-lived updates", best: "Behind-the-scenes and quick news" },
        { icon: I.ICON_PEOPLE, name: "Groups", what: "Community spaces around a topic", best: "Loyal customers and members" },
        { icon: I.ICON_CALENDAR, name: "Events", what: "Event pages with RSVPs", best: "Workshops, launches, and openings" },
        { icon: I.ICON_CHAT, name: "Messenger", what: "Direct messages with customers", best: "Questions and bookings" },
      ],
    },
    {
      kind: "tiltGrid",
      id: "mix",
      eyebrow: "Content mix for Facebook",
      heading: "A balanced mix keeps your Page useful and engaging.",
      cards: [
        { icon: I.ICON_BOLT, title: "Helpful tips", text: "Advice your customers can use right away." },
        { icon: I.ICON_STAR, title: "Customer stories", text: "Reviews and experiences, shared with permission." },
        { icon: I.ICON_MEGAPHONE, title: "Offers and news", text: "Promotions, launches, and updates." },
        { icon: I.ICON_EYE, title: "Behind the scenes", text: "Your team, process, and workplace." },
        { icon: I.ICON_PEOPLE, title: "Community posts", text: "Questions, polls, and local happenings." },
        { icon: I.ICON_REEL, title: "Short videos", text: "Reels showing products, services, or tips." },
      ],
    },
    {
      kind: "workflow",
      id: "workflow",
      tint: true,
      eyebrow: "Our Facebook workflow",
      heading: "A steady monthly rhythm.",
      steps: [
        { title: "Plan", text: "Monthly content calendar based on your goals and events.", outcome: "Approved calendar" },
        { title: "Create", text: "Posts, graphics, Reels, and captions.", outcome: "Ready-to-post content" },
        { title: "Schedule", text: "Posts scheduled through Meta Business Suite.", outcome: "Consistent posting" },
        { title: "Engage", text: "Comments and messages answered within agreed hours.", outcome: "Active community" },
        { title: "Review", text: "Monthly look at reach, engagement, and messages.", outcome: "Monthly insights" },
      ],
    },
    {
      kind: "iconList",
      id: "essentials",
      eyebrow: "Facebook Page essentials",
      heading: "We make sure your Page is complete and trustworthy.",
      cards: [
        { icon: I.ICON_IMAGE, title: "Profile and cover images", text: "Clear, on-brand visuals." },
        { icon: I.ICON_INFO, title: "About section", text: "What you do, where, and for whom." },
        { icon: I.ICON_PHONE, title: "Contact details", text: "Phone, website, hours, and address." },
        { icon: I.ICON_CIRCLE_CHECK, title: "Call-to-action button", text: "Book, call, message, or shop." },
        { icon: I.ICON_STAR, title: "Reviews", text: "Recommendations turned on and answered." },
        { icon: I.ICON_PIN, title: "Pinned post", text: "Your most important update at the top." },
      ],
    },
    {
      kind: "centerGrid",
      id: "groups",
      tint: true,
      eyebrow: "Growing a Facebook Group",
      heading: "Groups can turn customers into a loyal community.",
      cards: [
        { icon: I.ICON_TARGET, title: "Clear purpose", text: "A group focused on a topic members care about." },
        { icon: I.ICON_DOC, title: "Simple rules", text: "Guidelines that keep conversations helpful." },
        { icon: I.ICON_CHAT_LINES, title: "Regular prompts", text: "Weekly questions, tips, and live sessions." },
      ],
    },
    {
      kind: "mistakes",
      id: "mistakes",
      eyebrow: "Common mistakes",
      heading: "Common Facebook mistakes.",
      rows: [
        { prob: "Inactive Page", fix: "Consistent posting schedule." },
        { prob: "Only promotional posts", fix: "Balanced, helpful content mix." },
        { prob: "Unanswered messages", fix: "Agreed reply hours and saved replies." },
        { prob: "Incomplete Page details", fix: "Full profile, hours, and contact info." },
        { prob: "Ignoring reviews", fix: "Thoughtful replies to every review." },
        { prob: "Boosting without a goal", fix: "Boosts tied to clear objectives." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tint: true,
      eyebrow: "What’s included",
      heading: "From Page audit to monthly insights.",
      items: [
        { icon: I.ICON_SEARCH, text: "Facebook Page audit and setup" },
        { icon: I.ICON_CALENDAR, text: "Content strategy and monthly calendar" },
        { icon: I.ICON_PEN, text: "Post design and captions" },
        { icon: I.ICON_REEL, text: "Reels and short video editing" },
        { icon: I.ICON_CALENDAR_CHECK, text: "Scheduling through Meta Business Suite" },
        { icon: I.ICON_CHAT, text: "Comment and message management" },
        { icon: I.ICON_PEOPLE, text: "Group setup and moderation (if needed)" },
        { icon: I.ICON_CALENDAR, text: "Event promotion" },
        { icon: I.ICON_TREND, text: "Monthly reporting and insights" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      eyebrow: "Who it’s for",
      heading: "Keep your community connected.",
      items: [
        { icon: I.ICON_HOME, text: <><strong>Local businesses</strong> keeping customers updated.</> },
        { icon: I.ICON_TROPHY, text: <><strong>Restaurants, gyms, and clinics</strong> promoting events and offers.</> },
        { icon: I.ICON_PEOPLE, text: <><strong>Community-driven brands</strong> building groups.</> },
        { icon: I.ICON_REFRESH, text: <><strong>Businesses with inactive Pages</strong> ready to restart.</> },
      ],
    },
  ],
  faq: {
    heading: "Asked before every Page.",
    items: [
      {
        q: "How much does Facebook marketing cost?",
        a: <>It depends on posting frequency, content types, and community management needs. <strong>We share pricing on the free call.</strong></>,
      },
      {
        q: "Do you reply to comments and messages?",
        a: <>Yes. We manage comments and messages during agreed hours and <strong>flag anything that needs your input.</strong></>,
      },
      {
        q: "Is Facebook still worth it?",
        a: <>For many businesses, yes, <strong>especially local businesses and brands with community-focused audiences.</strong></>,
      },
      {
        q: "Can you run Facebook ads too?",
        a: (
          <>
            Yes. We can{" "}
            <strong>
              boost posts or run full <a className="spf-faq-link" href="/digital-marketing/meta-ads">Meta ad campaigns</a>
            </strong>{" "}
            alongside organic content.
          </>
        ),
      },
      {
        q: "Can you guarantee likes or followers?",
        a: <>No. Growth depends on content, audience, and consistency. <strong>We focus on quality content and engagement.</strong></>,
      },
      {
        q: "How often will you post?",
        a: <>We agree a realistic schedule for your business, <strong>often a few posts a week plus Reels,</strong> balanced across the content mix.</>,
      },
    ],
  },
  cta: {
    eyebrow: "Facebook Marketing",
    heading: "Keep your community connected.",
    copy: (
      <>
        Book a free call to plan your Facebook content:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your Page and plan a posting rhythm that fits your business.</strong>
      </>
    ),
    primaryLabel: "Book a Facebook call",
  },
};
