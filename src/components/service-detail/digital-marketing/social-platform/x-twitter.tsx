import { XThreadCard } from "./cards";
import * as I from "./icons";
import type { PlatformData } from "./types";

export const X_TWITTER: PlatformData = {
  hero: {
    line1: "Join the conversation on X with a",
    line2: (
      <>
        clear, confident <span className="grad-text">voice.</span>
      </>
    ),
    lead: (
      <>
        X strategy, posts, threads, and community engagement,{" "}
        <strong>for brands, founders, and B2B teams who want to be part of real-time conversations.</strong>
      </>
    ),
    primaryLabel: "Book an X marketing call",
  },
  card: <XThreadCard />,
  trust: ["Clear brand or founder voice", "Threads that teach and engage", "Active community replies", "Real-time topics handled with care"],
  sections: [
    {
      kind: "glance",
      id: "why",
      eyebrow: "Why X works for certain brands",
      heading: "Fast conversations, industry voices, and real-time news.",
      paragraphs: [
        <>
          X is where many industries, journalists, and founders <strong>share ideas and react to news as it happens.</strong>
        </>,
        "It rewards clear opinions, useful insights, and active participation in conversations.",
        <>
          It works especially well for <strong>B2B companies, tech brands, media, and founders building a personal brand.</strong>
        </>,
      ],
      glance: ["Real-time conversations", "Strong for B2B and tech", "Founder and expert voices", "Threads for deeper ideas", "Replies matter as much as posts"],
    },
    {
      kind: "iconTable",
      id: "formats",
      tint: true,
      eyebrow: "X formats we use",
      heading: "Each format serves a different purpose.",
      head: ["Format", "What it is", "Best for"],
      rows: [
        { icon: I.ICON_LINES, name: "Posts", what: "Short updates and ideas", best: "Opinions, tips, and news" },
        { icon: I.ICON_THREAD, name: "Threads", what: "A series of connected posts", best: "Explaining ideas in more depth" },
        { icon: I.ICON_REPLY, name: "Replies and quotes", what: "Responding to others’ posts", best: "Joining industry conversations" },
        { icon: I.ICON_IMAGE, name: "Images and video", what: "Visual posts", best: "Product updates and demos" },
        { icon: I.ICON_MIC, name: "Spaces", what: "Live audio conversations", best: "Q&As and expert discussions" },
        { icon: I.ICON_PEOPLE, name: "Communities", what: "Topic-based groups", best: "Engaging a niche audience" },
      ],
    },
    {
      kind: "tiltGrid",
      id: "pillars",
      eyebrow: "Content pillars for X",
      heading: "A few clear themes make your account recognizable.",
      cards: [
        { icon: I.ICON_TREND, title: "Industry insights", text: "Your take on trends and news in your field." },
        { icon: I.ICON_BOLT, title: "Practical tips", text: "Short, useful advice your audience can apply." },
        { icon: I.ICON_CODE, title: "Behind the build", text: "What you’re working on and learning." },
        { icon: I.ICON_STAR, title: "Customer wins", text: "Stories shared with permission." },
        { icon: I.ICON_QUESTION, title: "Opinions", text: "Thoughtful points of view that start conversations." },
        { icon: I.ICON_MEGAPHONE, title: "Product updates", text: "New features and announcements." },
      ],
    },
    {
      kind: "workflow",
      id: "workflow",
      tint: true,
      eyebrow: "Our X workflow",
      heading: "A steady rhythm of posting and engaging.",
      steps: [
        { title: "Define the voice", text: "Tone, topics, and boundaries agreed upfront.", outcome: "Voice and topic guide" },
        { title: "Plan content", text: "Weekly posts and threads planned ahead.", outcome: "Content calendar" },
        { title: "Write and schedule", text: "Posts and threads written and scheduled.", outcome: "Scheduled content" },
        { title: "Engage daily", text: "Replies, quotes, and conversations with your audience.", outcome: "Active presence" },
        { title: "Review", text: "Monthly look at what resonated.", outcome: "Monthly insights" },
      ],
    },
    {
      kind: "iconList",
      id: "thread",
      eyebrow: "Anatomy of a strong thread",
      heading: "Threads help share bigger ideas in a readable way.",
      cards: [
        { icon: I.ICON_BOLT, title: "Strong first post", text: "A clear promise of what the thread covers." },
        { icon: I.ICON_LINES, title: "One idea per post", text: "Easy to read and share." },
        { icon: I.ICON_FOLDER, title: "Examples and specifics", text: "Real details, not vague advice." },
        { icon: I.ICON_IMAGE, title: "Visuals where helpful", text: "Images or screenshots to explain points." },
        { icon: I.ICON_CIRCLE_CHECK, title: "Clear ending", text: "A summary or takeaway." },
        { icon: I.ICON_ARROW, title: "Soft call to action", text: "Follow, reply, or visit your site." },
      ],
    },
    {
      kind: "sideGrid",
      id: "realtime",
      tint: true,
      eyebrow: "Real-time care",
      heading: "X moves fast, so we plan for sensitive moments.",
      cards: [
        { icon: I.ICON_SHIELD_CHECK, title: "Approval rules", text: "Clear guidance on what needs your sign-off." },
        { icon: I.ICON_PAUSE, title: "Pause plan", text: "When to pause scheduled posts during major news." },
        { icon: I.ICON_CHAT_LINES_SHORT, title: "Response guidelines", text: "How to handle criticism and questions." },
        { icon: I.ICON_WARNING, title: "Escalation", text: "Who to contact if something needs urgent attention." },
      ],
    },
    {
      kind: "mistakes",
      id: "mistakes",
      eyebrow: "Common mistakes",
      heading: "Common X mistakes.",
      rows: [
        { prob: "Only posting links", fix: "Native posts and threads with real insight." },
        { prob: "Posting without replying", fix: "Daily engagement with your audience." },
        { prob: "Generic corporate tone", fix: "A clear, human voice." },
        { prob: "Scheduled posts during sensitive news", fix: "Pause plan and real-time checks." },
        { prob: "No clear topics", fix: "Defined content pillars." },
        { prob: "Inconsistent activity", fix: "A realistic posting rhythm." },
      ],
    },
    {
      kind: "included",
      id: "included",
      tint: true,
      eyebrow: "What’s included",
      heading: "From profile audit to monthly insights.",
      items: [
        { icon: I.ICON_SEARCH, text: "X profile audit and optimization" },
        { icon: I.ICON_SHIELD, text: "Voice and topic guide" },
        { icon: I.ICON_CALENDAR, text: "Content strategy and calendar" },
        { icon: I.ICON_THREAD, text: "Post and thread writing" },
        { icon: I.ICON_CALENDAR_CHECK, text: "Scheduling and publishing" },
        { icon: I.ICON_REPLY, text: "Daily engagement and replies" },
        { icon: I.ICON_MIC, text: "Spaces and Communities support (if needed)" },
        { icon: I.ICON_WARNING, text: "Real-time care guidelines" },
        { icon: I.ICON_TREND, text: "Monthly reporting and insights" },
      ],
    },
    {
      kind: "who",
      id: "forwho",
      eyebrow: "Who it’s for",
      heading: "Be part of the conversation.",
      items: [
        { icon: I.ICON_PERSON, text: <><strong>Founders and executives</strong> building a personal brand.</> },
        { icon: I.ICON_MONITOR, text: <><strong>B2B and SaaS companies</strong> reaching industry audiences.</> },
        { icon: I.ICON_LINES, text: <><strong>Tech and media brands</strong> joining real-time conversations.</> },
        { icon: I.ICON_STAR, text: <><strong>Experts and consultants</strong> sharing insights.</> },
      ],
    },
  ],
  faq: {
    heading: "Asked before every account.",
    items: [
      {
        q: "How much does X marketing cost?",
        a: (
          <>
            It depends on posting frequency, engagement level, and whether we manage a brand or founder account. <strong>We share pricing on the free call.</strong>
          </>
        ),
      },
      {
        q: "Can you write in my personal voice?",
        a: <>Yes. We learn your voice and topics, and <strong>nothing goes out without your approval rules in place.</strong></>,
      },
      {
        q: "How often should we post on X?",
        a: <>It depends on your goals. <strong>Regular posting and daily replies usually matter more than volume.</strong></>,
      },
      {
        q: "What happens during major news events?",
        a: <>We follow your pause plan and <strong>review scheduled content so nothing feels out of place.</strong></>,
      },
      {
        q: "Can you guarantee followers or engagement?",
        a: <>No. Growth depends on content, voice, and consistency. <strong>We focus on quality and active participation.</strong></>,
      },
      {
        q: "Do you manage founder and brand accounts?",
        a: (
          <>
            Yes, both. <strong>We can run a company account, a founder’s personal voice, or coordinate the two</strong> so they support each other.
          </>
        ),
      },
    ],
  },
  cta: {
    eyebrow: "X (Twitter) Marketing",
    heading: "Be part of the conversation.",
    copy: (
      <>
        Book a free call to plan your X presence:{" "}
        <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll help define the voice and topics that fit you.</strong>
      </>
    ),
    primaryLabel: "Book an X marketing call",
  },
};
