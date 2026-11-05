import { YouTubeSearchCard } from "./cards";
import * as I from "./icons";
import type { PlatformData } from "./types";

export const YOUTUBE: PlatformData = {
  hero: {
    line1: "A YouTube channel that keeps",
    line2: (
      <>
        working long after you hit <span className="grad-text">publish.</span>
      </>
    ),
    lead: (
      <>
        Channel strategy, long-form videos, Shorts, and YouTube SEO, <strong>built so your videos can be found, watched, and remembered.</strong>
      </>
    ),
    primaryLabel: "Book a YouTube call",
  },
  card: <YouTubeSearchCard />,
  trust: ["Search-driven video topics", "Long-form and Shorts together", "Titles and thumbnails that earn clicks", "Built for the long term"],
  sections: [
    {
      kind: "glance",
      id: "why",
      eyebrow: "Why YouTube is different",
      heading: "It’s a video platform and a search engine at the same time.",
      paragraphs: [
        <>
          People go to YouTube to learn, compare, and decide. <strong>Many search for answers the same way they do on Google.</strong>
        </>,
        "Good videos can keep getting views long after they’re published, which makes YouTube a long-term asset.",
        <>
          Success comes from <strong>the right topics, clear titles and thumbnails, and videos that keep people watching.</strong>
        </>,
      ],
      glance: ["Search plus recommendations", "Videos stay discoverable for years", "Long-form builds trust", "Shorts build reach", "Titles and thumbnails drive clicks"],
    },
    {
      kind: "vsTable",
      id: "formats",
      tint: true,
      eyebrow: "Long-form vs Shorts",
      heading: "Most channels benefit from both, used for different jobs.",
      head: ["Long-form videos", "YouTube Shorts"],
      rows: [
        { label: "Length", left: "Several minutes or more", right: "Short, vertical videos" },
        { label: "Main job", left: "Teach, explain, and build trust", right: "Reach new viewers quickly" },
        { label: "Discovery", left: "Search, suggested, and home feed", right: "Shorts feed" },
        { label: "Best for", left: "Tutorials, reviews, and deep dives", right: "Tips, teasers, and highlights" },
      ],
    },
    {
      kind: "tiltGrid",
      id: "types",
      eyebrow: "Video types that work",
      heading: "We match video types to what your audience searches and needs.",
      cards: [
        { icon: I.ICON_TUTORIAL, title: "How-to and tutorials", text: "Step-by-step help related to your product or industry." },
        { icon: I.ICON_VIDEO, title: "Product demos", text: "Walkthroughs of features and real use cases." },
        { icon: I.ICON_COMPARE, title: "Comparisons and reviews", text: "Honest comparisons buyers search for." },
        { icon: I.ICON_CREATOR_LEFT, title: "Customer stories", text: "Real results and experiences, with permission." },
        { icon: I.ICON_QUESTION, title: "Expert explainers", text: "Your team explaining topics clearly." },
        { icon: I.ICON_WEBINAR, title: "Webinar and event clips", text: "Repurposed talks turned into useful videos." },
      ],
    },
    {
      kind: "iconList",
      id: "seo",
      tint: true,
      eyebrow: "YouTube SEO essentials",
      heading: "Every video is optimized to be found and clicked.",
      cards: [
        { icon: I.ICON_SEARCH, title: "Topic research", text: "Topics people actually search for." },
        { icon: I.ICON_TITLE, title: "Clear titles", text: "Specific, honest, and click-worthy." },
        { icon: I.ICON_IMAGE, title: "Custom thumbnails", text: "Simple designs that stand out." },
        { icon: I.ICON_LINES, title: "Descriptions", text: "Useful summaries with key terms and links." },
        { icon: I.ICON_CLOCK, title: "Chapters", text: "Timestamps that help viewers navigate." },
        { icon: I.ICON_CAPTIONS, title: "Captions", text: "Accurate captions for accessibility and search." },
        { icon: I.ICON_PLAYLIST, title: "Playlists", text: "Videos grouped by topic to keep viewers watching." },
        { icon: I.ICON_END_SCREEN, title: "End screens and cards", text: "Pointing viewers to the next video." },
      ],
    },
    {
      kind: "workflow",
      id: "workflow",
      eyebrow: "Our YouTube workflow",
      heading: "From topic research to channel insights.",
      steps: [
        { title: "Research", text: "Search topics, competitor channels, and audience questions.", outcome: "Topic list and plan" },
        { title: "Script", text: "Outlines or scripts with a strong opening.", outcome: "Approved scripts" },
        { title: "Film and edit", text: "Filming support and editing with pacing and graphics.", outcome: "Finished videos" },
        { title: "Optimize and publish", text: "Titles, thumbnails, descriptions, chapters, and Shorts cut-downs.", outcome: "Published videos" },
        { title: "Review", text: "Watch time and audience retention reviewed monthly.", outcome: "Monthly channel insights" },
      ],
    },
    {
      kind: "sideGrid",
      id: "metrics",
      tint: true,
      large: true,
      eyebrow: "Metrics we watch",
      heading: "We focus on signals that show whether people find and enjoy your videos.",
      cards: [
        { icon: I.ICON_EYE_NARROW, title: "Click-through rate", text: "How often people click after seeing your thumbnail." },
        { icon: I.ICON_RETENTION, title: "Audience retention", text: "How long people keep watching each video." },
        { icon: I.ICON_TRAFFIC, title: "Traffic sources", text: "Whether views come from search, suggested, or Shorts." },
        { icon: I.ICON_SUBSCRIBERS, title: "Subscribers and returning viewers", text: "Whether people come back for more." },
      ],
    },
    {
      kind: "mistakes",
      id: "mistakes",
      eyebrow: "Common mistakes",
      heading: "Common YouTube mistakes.",
      rows: [
        { prob: "Videos no one is searching for", fix: "Topics based on real search demand." },
        { prob: "Vague titles and busy thumbnails", fix: "Clear titles and simple thumbnails." },
        { prob: "Slow introductions", fix: "Strong openings that get to the point." },
        { prob: "No playlists or end screens", fix: "Viewers guided to the next video." },
        { prob: "Uploading only webinars", fix: "Clips and edited videos made from long recordings." },
        { prob: "Inconsistent posting", fix: "A realistic publishing schedule." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tint: true,
      eyebrow: "What’s included",
      heading: "From channel audit to monthly insights.",
      items: [
        { icon: I.ICON_SEARCH, text: "Channel audit and setup" },
        { icon: I.ICON_VIDEO, text: "Channel branding and About section" },
        { icon: I.ICON_SEARCH_MINUS, text: "Topic and keyword research" },
        { icon: I.ICON_CALENDAR, text: "Content calendar for long-form and Shorts" },
        { icon: I.ICON_LINES, text: "Scripts or outlines" },
        { icon: I.ICON_PEN, text: "Video editing and graphics" },
        { icon: I.ICON_IMAGE, text: "Thumbnails, titles, and descriptions" },
        { icon: I.ICON_PLAYLIST, text: "Playlists, chapters, and end screens" },
        { icon: I.ICON_TREND, text: "Monthly reporting and insights" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      eyebrow: "Who it’s for",
      heading: "Build a YouTube channel that lasts.",
      items: [
        { icon: I.ICON_MONITOR, text: <><strong>B2B and SaaS companies</strong> teaching buyers before they talk to sales.</> },
        { icon: I.ICON_PERSON, text: <><strong>Experts and consultants</strong> building authority.</> },
        { icon: I.ICON_BAG, text: <><strong>E-commerce brands</strong> showing products in detail.</> },
        { icon: I.ICON_VIDEO, text: <><strong>Businesses with webinars or events</strong> ready to repurpose content.</> },
      ],
    },
  ],
  faq: {
    heading: "Asked before every channel.",
    items: [
      {
        q: "How much does YouTube marketing cost?",
        a: <>It depends on video length, production needs, and how often you publish. <strong>We share pricing on the free call.</strong></>,
      },
      {
        q: "Do you film the videos?",
        a: <>We can support filming or work with footage you record. <strong>We’ll recommend a setup that fits your team.</strong></>,
      },
      {
        q: "Should we post Shorts or long videos?",
        a: <>Usually both. <strong>Shorts help reach new viewers, while long videos build trust and search visibility.</strong></>,
      },
      {
        q: "Can you run YouTube ads too?",
        a: (
          <>
            Yes. We can{" "}
            <strong>
              promote videos with <a className="spf-faq-link" href="/digital-marketing/youtube-ads">YouTube ads</a> alongside organic content.
            </strong>
          </>
        ),
      },
      {
        q: "Can you guarantee subscribers or views?",
        a: <>No. Growth depends on content, topics, and consistency. <strong>We focus on research, quality, and optimization.</strong></>,
      },
      {
        q: "How often should we publish?",
        a: <>Consistency matters more than volume. <strong>We set a realistic schedule</strong> you can keep, often one strong long-form video plus a few Shorts per week.</>,
      },
    ],
  },
  cta: {
    eyebrow: "YouTube Marketing",
    heading: "Build a YouTube channel that lasts.",
    copy: (
      <>
        Book a free call to plan your YouTube content:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll plan topics your audience is already searching for.</strong>
      </>
    ),
    primaryLabel: "Book a YouTube call",
  },
};
