"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  FeatureGrid,
  NoteCallout,
  PricingTiers,
  ServiceDetailHero,
  ServiceFaq,
  TrustBar,
  d,
} from "../../ServiceDetailKit";
import "./acm-page.css";

/* -------- icons -------- */

const ICON_BOLT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_PERSON_SPARK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PERSON = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_X_SM = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHECK_SM = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BLOG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v14H4zM4 9h16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SOCIAL = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_INSTAGRAM = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);
const ICON_ADS = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_TARGET = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);
const ICON_REPURPOSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_PEOPLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    <path d="M3 19c0-2.8 2.2-5 5-5M21 19c0-2.8-2.2-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_MIC = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="2" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_EDIT = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 20h9M4 20V4M4 8h12M4 14h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m16 4 2 2-6 6-2.5.5.5-2.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_PUBLISH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M8 11l4 4 4-4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_IMAGE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M4 15l4-4 3 3 3-3 6 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="15" cy="9" r="1.4" fill="currentColor" />
  </svg>
);
const ICON_VIDEO = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 9.5v5l4-2.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_NODES = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 7 11 16M16 7l-3 9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_LAPTOP = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_PIN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* -------- content -------- */

const WHY = [
  { icon: ICON_BOLT, title: "Drafts in minutes, not days", text: <>AI produces first drafts of blogs, email sequences, ad copy, and captions <strong>in minutes — not days.</strong></> },
  { icon: ICON_LINK, title: "Content connects to distribution", text: <>A blog auto-syndicates to email, becomes social posts, and <strong>gets repurposed into ads.</strong></>, delay: 60 },
  { icon: ICON_PERSON_SPARK, title: "AI + human keeps the speed", text: <>Human editorial catches hallucinations, weak arguments, and <strong>brand-voice drift</strong> — at AI speed.</>, delay: 120 },
  { icon: ICON_LINES, title: "Personalization per segment", text: <>The same email can look entirely different to a <strong>small-business vs an enterprise buyer.</strong></> },
  { icon: ICON_TREND, title: "Real-time measurement", text: <>See what’s working live and <strong>reallocate spend automatically</strong> — no more monthly report meetings.</>, delay: 60 },
  { icon: ICON_SHIELD, title: "The right content, faster", text: <>2026 winners aren’t producing more — they’re producing <strong>the right content, in the right places, faster.</strong></>, delay: 120 },
];

type Stat = { value?: string; count?: { target: number; suffix?: string }; label: string; text: ReactNode; delay: number };

const STATS: Stat[] = [
  { count: { target: 70, suffix: "%" }, label: "Time saved", text: "Teams producing 50+ pieces/month report 70% time savings vs pure human production.", delay: 0 },
  { count: { target: 8, suffix: "x" }, label: "Faster execution", text: "AI-native marketing teams report 8× faster campaign execution vs traditional workflows.", delay: 80 },
  { value: "$0.12", label: "Per AI article", text: "Median AI article cost — vs $150 freelance. 1,250× cheaper (before editing).", delay: 160 },
];

const SLOP = [
  "Generic ChatGPT prompts, no brand training",
  "Zero fact-checking (hallucinations everywhere)",
  "Same output as competitors (same prompts)",
  "No editing = wooden, obvious AI voice",
  "Keyword-stuffed for old-school SEO",
  "Published straight from AI to your site",
  "Google spam updates penalize it",
  "Sounds like every other AI blog online",
];

const RIGHT = [
  "Custom-trained on YOUR brand voice",
  "Human editorial: fact-check, tighten, add expertise",
  "Original angles + real examples added",
  "Uses your case studies, data, opinions",
  "Written for real reader intent, not just SEO",
  "Two-tier review (writer + editor) before publish",
  "E-E-A-T signals baked in (Google 2026)",
  "Sounds like a person from your team wrote it",
];

const PATHS = [
  { name: "In-house writer", cost: "$150–$300", speed: "2–5 days", tradeoff: "High quality, but doesn’t scale past 4–8 pieces/mo per writer" },
  { name: "Freelance writer", cost: "$100–$300", speed: "3–7 days", tradeoff: "Quality inconsistent, availability unpredictable" },
  { name: "Pure AI ($99/mo tools)", cost: "$0.12–$5", speed: "5 minutes", tradeoff: "Hallucinations, generic, harms brand & SEO" },
  { name: "AI + human editorial", cost: "$40–$120", speed: "1–2 days", tradeoff: "High + on-brand — needs editorial oversight (which is why we exist)", win: true },
];

type SystemKey = "blog" | "email" | "social" | "ads" | "repurpose" | "personal";

const SYSTEMS: { key: SystemKey; icon: ReactNode; label: string; sub: string; name: string; tag: string; items: string[] }[] = [
  {
    key: "blog",
    icon: ICON_BLOG,
    label: "Blog content",
    sub: "SEO at scale",
    name: "Blog Content System",
    tag: "SEO-driven blog content at scale — researched, written, edited, and published.",
    items: ["Keyword + topic research", "SEO-structured long-form articles", "Human editorial + fact-check", "Internal linking + on-page SEO", "Featured images (AI-generated)", "Auto-publish to your CMS"],
  },
  {
    key: "email",
    icon: ICON_MAIL,
    label: "Email automation",
    sub: "Flows + campaigns",
    name: "Email Marketing Automation",
    tag: "Flows and campaigns that nurture and convert — written and automated.",
    items: ["Welcome + onboarding sequences", "Nurture + drip campaigns", "Newsletter production", "Segmentation + personalization", "A/B subject-line testing", "Platform setup (Klaviyo, HubSpot, Brevo)"],
  },
  {
    key: "social",
    icon: ICON_INSTAGRAM,
    label: "Social content",
    sub: "Weekly, on-brand",
    name: "Social Media Content",
    tag: "On-brand posts across platforms, produced weekly and scheduled for you.",
    items: ["Platform-specific posts (LI, IG, X, FB)", "Content calendar + scheduling", "Branded graphics (Canva AI, Firefly)", "Caption + hashtag optimization", "Repurposed from blog + email", "Engagement-ready formats"],
  },
  {
    key: "ads",
    icon: ICON_TARGET,
    label: "Ad copy & creative",
    sub: "Variations at scale",
    name: "Ad Copy & Creative",
    tag: "High-volume ad variations for Meta, Google, and LinkedIn — built to test.",
    items: ["Headline + primary-text variations", "Audience-specific angles", "Ad creative direction (AI images)", "Landing-page copy match", "A/B test frameworks", "Refreshed on performance data"],
  },
  {
    key: "repurpose",
    icon: ICON_REPURPOSE,
    label: "Repurposing engine",
    sub: "1 → 10+ assets",
    name: "Content Repurposing Engine",
    tag: "One piece becomes ten — automatically fanned out across every channel.",
    items: ["Blog → email newsletter", "Blog → 5+ social posts", "Webinar / video → blog + clips", "Podcast → quotes + carousels", "Long-form → ad copy", "Automated scheduling across channels"],
  },
  {
    key: "personal",
    icon: ICON_PEOPLE,
    label: "Cross-channel personalization",
    sub: "Per audience",
    name: "Cross-Channel Personalization",
    tag: "The same campaign, tailored per audience segment — at scale.",
    items: ["Segment-specific messaging", "Dynamic email content blocks", "Persona-based landing variants", "Industry / size / role tailoring", "Behavior-triggered content", "Unified voice across every channel"],
  },
];

const INCLUDED = [
  { no: "01", icon: ICON_SEARCH, title: "Strategy & audit", text: "Goals, audience, competitor teardown, content audit, and a 90-day roadmap with a real KPI framework." },
  { no: "02", icon: ICON_MIC, title: "Brand voice training", text: "The most important part — we train the AI on how you write, what you say, and what you never say." },
  { no: "03", icon: ICON_BOLT, title: "AI content production", text: "First drafts at AI speed — blogs, emails, social, ad copy, video scripts — all from your voice guidelines." },
  { no: "04", icon: ICON_EDIT, title: "Human editorial review", text: "The step that separates us from $99/mo tools — fact-check, tighten, add expertise, E-E-A-T signals." },
  { no: "05", icon: ICON_PUBLISH, title: "Distribution & publishing", text: "Published to WordPress/Webflow/Shopify, emailed, scheduled to social, uploaded to ad platforms, auto-repurposed." },
  { no: "06", icon: ICON_LINK, title: "Marketing automation setup", text: "Email platform, CRM triggers, social scheduling, analytics + attribution, and Zapier/Make between it all." },
  { no: "07", icon: ICON_TREND, title: "Reporting & optimization", text: "Monthly plain-language report by channel, top performers, revenue attribution, and roadmap updates from data." },
  { no: "08", icon: ICON_REPURPOSE, title: "Cross-channel repurposing", text: "One piece becomes ten — blog → email → social → ads — scheduled automatically across channels." },
];

const STACK = [
  { icon: ICON_BOLT, cat: "AI writing + drafting", tools: "Claude · GPT-5 · Jasper · Copy.ai" },
  { icon: ICON_SEARCH, cat: "Research + fact-checking", tools: "Perplexity · You.com · SciSpace · Consensus" },
  { icon: ICON_TREND, cat: "SEO content", tools: "Semrush · Ahrefs · Frase · SurferSEO · MarketMuse" },
  { icon: ICON_IMAGE, cat: "Image + graphic AI", tools: "Midjourney · DALL-E · Canva AI · Adobe Firefly" },
  { icon: ICON_VIDEO, cat: "Video + audio AI", tools: "Descript · ElevenLabs · Runway · Opus Clip" },
  { icon: ICON_MAIL, cat: "Email platforms", tools: "Klaviyo · HubSpot · Brevo · Mailchimp · ConvertKit" },
  { icon: ICON_SOCIAL, cat: "Social scheduling", tools: "Buffer · Hootsuite · Sprout Social · Taplio" },
  { icon: ICON_NODES, cat: "Automation + orchestration", tools: "Zapier · Make · n8n · Tofu" },
];

const WHO = [
  { icon: ICON_LAPTOP, text: <><strong>A SaaS or B2B company</strong> needing consistent blog + email + social to feed SEO, nurture, and pipeline.</>, delay: 0 },
  { icon: ICON_CART, text: <><strong>An ecommerce brand</strong> running Klaviyo flows, product content, and social ads at scale.</>, delay: 60 },
  { icon: ICON_BRIEFCASE, text: <><strong>An agency</strong> producing content for multiple clients — needs a repeatable system, not just more writers.</>, delay: 120 },
  { icon: ICON_PIN, text: <><strong>A local business</strong> finally wanting to be consistent on social and blog — without hiring a marketing team.</>, delay: 0 },
  { icon: ICON_PERSON, text: <><strong>A founder or personal brand</strong> who wants weekly content in their voice — without spending Sundays writing.</>, delay: 60 },
  { icon: ICON_REPURPOSE, text: <><strong>A team tired of freelance writers</strong> — inconsistent quality, missed deadlines, slow turnaround.</>, delay: 120 },
];

const STEPS = [
  { no: "Week 1", title: "Strategy + voice training", text: "Discovery, content audit, audience mapping, brand voice documented, AI system prompts built, 90-day roadmap.", delay: 0 },
  { no: "Week 2", title: "Tool setup + integrations", text: "Email platform, social scheduler, SEO tools, analytics set up and connected. AI stack configured, workflow defined.", delay: 70 },
  { no: "Weeks 3–4", title: "First content wave", text: "First month produced and edited. You approve. Publishing begins, distribution channels and automations activate.", delay: 140 },
  { no: "Month 2", title: "Optimize + expand", text: "Data flows in. What works gets doubled down; what doesn’t gets cut. Systems refined, new channels added if ROI’s there.", delay: 210 },
  { no: "Ongoing", title: "Scale + report", text: "Monthly cadence: strategy → production → editorial → publishing → reporting. Content compounds every month.", delay: 280 },
];

const TIERS = [
  { name: "Content Audit", best: "One-off audit + roadmap of your existing content and marketing systems — no commitment.", price: "Published" },
  { name: "Starter Content", best: "Small businesses — 1–2 channels, 4–8 pieces/month, basic automation.", price: "Published /mo", delay: 70 },
  { name: "Growth Content", best: "Growing brands — 3–4 channels, 15–25 pieces/month, cross-channel automation, personalization.", price: "Published /mo", featured: true, badge: "Most popular", delay: 140 },
  { name: "Scale Content", best: "Larger teams & ecommerce — all channels, 30+ pieces/month, advanced automation, multi-brand/language.", price: "Published /mo", delay: 210 },
];

const FAQS = [
  { q: "How much does it cost?", a: <>Depends on channels and volume. The Content Audit shows what to build. Starter covers 1–2 channels; Growth (3–4 channels, 15–25 pieces) is most popular; Scale handles ecommerce and larger teams. <strong>Full pricing is published — no “custom quote” wall.</strong></> },
  { q: "Will it sound like AI wrote it?", a: <>No — that’s the whole point of the human editorial layer. Every piece is reviewed, tightened, and rewritten where needed. <strong>It reads like a person from your team wrote it</strong> — not a ChatGPT dump.</> },
  { q: "Will Google penalize AI content?", a: <>Only low-quality slop with no human oversight. Google rewards high-quality content regardless of how it’s produced. <strong>Our editorial adds E-E-A-T signals</strong> Google specifically rewards in 2026.</> },
  { q: "Which AI writing tools do you use?", a: <><strong>Claude and GPT-5</strong> as primary models, Jasper for templates, Perplexity for research, Frase/SurferSEO for SEO. We use whichever performs best per content type — not single-tool loyalty.</> },
  { q: "Blog, email AND social?", a: <>Yes — that’s cross-channel automation. One piece becomes many: a blog becomes an email, becomes 5 social posts, becomes ad copy. <strong>Growth and Scale cover multiple channels.</strong></> },
  { q: "How is this different from using ChatGPT ourselves?", a: <>ChatGPT alone is generic, in an obvious AI voice, with hallucinations and no distribution. This adds <strong>brand-voice training, human editorial, SEO, repurposing, distribution, and measurement.</strong> It’s a system — not a prompt.</> },
  { q: "What if the AI gets facts wrong?", a: <>Exactly what editorial catches. Every piece is <strong>fact-checked against sources before publishing</strong> — statistics verified, claims validated. We’d rather delay a day than publish something inaccurate.</> },
  { q: "Legal, medical, or finance industries?", a: <>Yes — with extra care. For regulated industries we add <strong>subject-matter-expert review</strong> on top of standard editorial. We’ll discuss the review process on the strategy call.</> },
  { q: "Can you set up my email platform too?", a: <>Yes — platform setup, flow design, and campaign automation are part of the Email system. Klaviyo, HubSpot, Brevo, Mailchimp, ConvertKit — or starting fresh. <strong>We handle the whole stack.</strong></> },
  { q: "Do I own the content and setup?", a: <>Yes, 100% — all content, brand-voice training, and system prompts are documented and yours. All platform accounts are yours. <strong>If you leave, you keep everything.</strong></> },
  { q: "How is this different from your SEO / Email pages?", a: <>Those are single-channel services. This is the <strong>AI-powered production and automation layer</strong> that runs across all of them. Many clients bundle it with SEO or Email so the whole operation runs as one system.</> },
  { q: "Can this replace my content team?", a: <>For most SMB/mid-market: yes. For enterprise with senior writers: no — but it accelerates them 3–5×. <strong>Best answer: pair AI production with your existing editorial + strategy team.</strong></> },
];

/* -------- hero signature: AI draft -> human editorial -> publish -------- */

function DocCard() {
  const reduce = useReducedMotion();
  const [rawRun, setRun] = useState(false);
  // reduced motion: the edit rows and channel chips are shown in their end state on first paint
  const run = reduce || rawRun;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setRun(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside className={`acm-doc${run ? " run" : ""}`} aria-label="A sample AI draft going through human editorial to publish">
      <div className="acm-doc-top">
        <span className="lt">
          <span className="dot2"></span> Draft · Editing
        </span>
        <span className="rt">AI + HUMAN</span>
      </div>
      <div className="acm-doc-draft">
        <span className="dl">AI first draft — from your brand voice</span>
        <span className="acm-dline w1"></span>
        <span className="acm-dline w2"></span>
        <span className="acm-dline w3"></span>
      </div>
      <div className="acm-doc-edit">
        <div className="acm-erow">
          <span className="em">{ICON_CHECK_SM}</span>
          <span>
            Editor <b>fact-checked</b> against sources
          </span>
        </div>
        <div className="acm-erow">
          <span className="em">{ICON_CHECK_SM}</span>
          <span>
            Brand voice + <b>real examples</b> added
          </span>
        </div>
        <div className="acm-erow">
          <span className="em">{ICON_CHECK_SM}</span>
          <span>E-E-A-T signals + SEO polish</span>
        </div>
      </div>
      <div className="acm-doc-dist">
        <span className="acm-dchip">{ICON_BLOG}Blog</span>
        <span className="acm-dchip">{ICON_MAIL}Email</span>
        <span className="acm-dchip">{ICON_SOCIAL}Social</span>
        <span className="acm-dchip">{ICON_ADS}Ads</span>
      </div>
      <div className="acm-doc-foot">
        <span>10× speed, human-checked</span>
        <span className="gt">on-brand &amp; accurate →</span>
      </div>
    </aside>
  );
}

/* -------- dark stats with count-up -------- */

function StatValue({ count, value, run, reduce }: { count?: Stat["count"]; value?: string; run: boolean; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!count || !run || reduce || !ref.current) return;
    const { target, suffix = "" } = count;
    const decimal = target % 1 !== 0;
    let raf: number;
    let start: number | null = null;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = eased * target;
      if (ref.current) ref.current.textContent = `${decimal ? v.toFixed(1) : Math.round(v)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, run, reduce]);

  if (!count) return <div className="sv">{value}</div>;
  return (
    <div className="sv" ref={ref}>
      {reduce ? `${count.target}${count.suffix ?? ""}` : "0"}
    </div>
  );
}

function StatsGrid() {
  const reduce = useReducedMotion();
  // Design fires the count-up once #stats' top passes 85% of the viewport.
  const [gridRef, gridIn] = useInView<HTMLDivElement>({ threshold: 0, rootMargin: "0px 0px -15% 0px" });

  return (
    <div className="acm-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <Reveal className="acm-stat" key={stat.label} style={d(stat.delay)}>
          <StatValue count={stat.count} value={stat.value} run={gridIn} reduce={reduce} />
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- content systems (tabs) -------- */

function SystemsExplorer() {
  const [selected, setSelected] = useState<SystemKey>("blog");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = SYSTEMS.find((s) => s.key === selected) ?? SYSTEMS[0];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % SYSTEMS.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + SYSTEMS.length) % SYSTEMS.length;
    if (next === null) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
    setSelected(SYSTEMS[next].key);
  }

  return (
    <Reveal className="acm-wb-wrap" id="systems-int">
      <div className="acm-wb-list" role="tablist" aria-label="Content systems">
        {SYSTEMS.map((s, i) => (
          <button
            key={s.key}
            className="acm-wb-btn"
            role="tab"
            type="button"
            aria-selected={s.key === selected}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setSelected(s.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{s.icon}</span>
            <span className="dn">
              <b>{s.label}</b>
              <small>{s.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="acm-wb-panel">
        <div className="acm-wp-top">
          {/* the design renders the same bolt mark for every system */}
          <span className="big">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h3>{active.name}</h3>
            <div className="tagline">{active.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="acm-wp-body acm-wp-fade" key={active.key}>
          <span className="k">What’s inside</span>
          <div className="acm-wp-list">
            {active.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------- page -------- */

export default function AiContentMarketingView() {
  return (
    <div className="acm-page">
      <ServiceDetailHero
        crumb={{ label: "AI Automation", href: "/ai-automation" }}
        eyebrow="AI content at scale · Human editorial · Brand-voice trained"
        line1="AI content that doesn’t"
        line2={
          <>
            sound like <span className="grad-text">AI wrote it.</span>
          </>
        }
        lead={
          <>
            Done-for-you AI content marketing — blogs, emails, social, ad copy, SEO, and cross-channel campaigns at 10×
            speed and 1/10th the cost — <strong>but edited by real humans so it stays on-brand and accurate.</strong>{" "}
            Trained on your voice, connected to your tools, priced transparently.
          </>
        }
        primary={{ label: "Book a free content audit", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#how" }}
        compact
      >
        <DocCard />
      </ServiceDetailHero>

      <TrustBar items={["AI production + human editorial", "Trained on YOUR brand voice", "Transparent published pricing", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why AI content works now</span>
            <h2>AI changed the math — one person does what took six.</h2>
            <p>
              Content was always the highest-ROI channel long-term, and the biggest bottleneck. To feed SEO, email, and
              social you needed 30–50 pieces a month — a whole team. Now the right systems change that.
            </p>
          </Reveal>
          <div className="acm-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What AI content costs and saves</span>
            <h2>Real 2026 benchmarks — with human editorial.</h2>
            <p>What businesses running AI-powered content with a human layer actually see.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="acm-stat-note">
            The catch: unedited AI averages <strong>3–5 factual errors and 2–3 brand-voice misses per piece.</strong> Human
            editorial is what turns “AI slop” into “actually publishable” — the entire difference between this and the
            $99/mo AI tools.
          </Reveal>
        </div>
      </section>

      {/* SLOP VS RIGHT */}
      <section className="band" id="compare">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">AI slop vs AI content done right</span>
            <h2>Your biggest fear about AI content is valid.</h2>
            <p>
              90% of AI content is generic garbage that hurts your brand. Here’s the difference between the two paths —
              we publish only the right column, every time.
            </p>
          </Reveal>
          <div className="acm-vs2">
            <Reveal className="acm-vscol wrong">
              <div className="vh">
                <span className="vi">{ICON_X}</span>
                <h3>AI slop (most agencies)</h3>
              </div>
              <ul>
                {SLOP.map((item) => (
                  <li key={item}>
                    <span className="m">{ICON_X_SM}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="acm-vscol right" style={d(90)}>
              <div className="vh">
                <span className="vi">{ICON_CHECK}</span>
                <h3>AI content done right</h3>
              </div>
              <ul>
                {RIGHT.map((item) => (
                  <li key={item}>
                    <span className="m">{ICON_CHECK_SM}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="acm-vs-note">
            Every piece we publish follows the <strong>“done right” column. Every time.</strong>
          </Reveal>
        </div>
      </section>

      {/* PATHS */}
      <section className="band tint" id="paths">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you’re really paying for</span>
            <h2>Four honest paths — the real cost + quality math.</h2>
            <p>
              Content marketing has four paths in 2026, each with trade-offs. Here’s how they compare per 1,500-word
              piece.
            </p>
          </Reveal>
          <Reveal className="acm-path-scroll">
            <div className="acm-path-tbl" role="table" aria-label="Cost and quality comparison per 1,500-word piece">
              <div className="acm-path-row head" role="row">
                <div role="columnheader">Path</div>
                <div role="columnheader">Cost / piece</div>
                <div className="pc3" role="columnheader">Speed</div>
                <div className="pc4" role="columnheader">Trade-off</div>
              </div>
              {PATHS.map((p) => (
                <div className={`acm-path-row${p.win ? " win" : ""}`} role="row" key={p.name}>
                  <div className="pn" role="cell">
                    {p.name}
                    {p.win && <span className="tag">Ours</span>}
                  </div>
                  <div className="pcost" role="cell">{p.cost}</div>
                  <div className="pc3" role="cell">{p.speed}</div>
                  <div className="pc4" role="cell">{p.tradeoff}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal as="p" className="acm-path-note">
            At the same monthly budget as one full-time writer, <strong>AI + human editorial delivers 4–10× more content</strong>{" "}
            — with quality that actually ranks and converts.
          </Reveal>
        </div>
      </section>

      {/* SYSTEMS (interactive) */}
      <section className="band" id="systems">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Content systems we build</span>
            <h2>Six proven systems, custom to you.</h2>
            <p>Most clients start with 2–3 and expand as they see the ROI. Pick one to see what’s inside.</p>
          </Reveal>
          <SystemsExplorer />
        </div>
      </section>

      {/* INCLUDED (8 parts) */}
      <section className="band tint" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>The full stack, run by one team.</h2>
            <p>Strategy, brand-voice training, production, editorial, distribution, and measurement — seven parts.</p>
          </Reveal>
          <Reveal className="acm-inc-grid">
            {INCLUDED.map((item) => (
              <div className="acm-inc" key={item.no}>
                <div className="ihead">
                  <span className="ii">{item.icon}</span>
                  <div>
                    <span className="in-no">{item.no}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STACK */}
      <section className="band" id="stack">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The AI content stack we run</span>
            <h2>Best-in-class per category, one system.</h2>
            <p>
              The tools we use to produce and distribute at scale — platform-agnostic, the right tool per client, not the
              one that pays a commission.
            </p>
          </Reveal>
          <Reveal className="acm-st-grid">
            {STACK.map((s) => (
              <div className="acm-stc" key={s.cat}>
                <span className="si">{s.icon}</span>
                <div>
                  <div className="scat">{s.cat}</div>
                  <div className="stools">{s.tools}</div>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="acm-st-note">
            We’re <strong>platform-agnostic</strong> — we recommend the right tool per client, not the one that pays a
            commission.
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="band tint" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>The right fit if you’re…</h2>
          </Reveal>
          <div className="acm-who-grid">
            {WHO.map((w, i) => (
              <Reveal className="acm-who" key={i} style={d(w.delay)}>
                <span className="wi">{w.icon}</span>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A 3–5 week ramp to your first content wave.</h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <div className="acm-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="acm-step" key={step.title} style={d(step.delay)}>
                <span className="acm-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>Priced by content volume + channels, not by the hour. No “custom quote” runaround.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Retainers are <strong>month-to-month.</strong> AI tool subscriptions (Jasper, Claude API, SEO tools) are
            separate and passed through at cost — typically $100–$500/mo depending on volume. Every rate is on the{" "}
            <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every engagement." />

      <CtaBand
        id="start"
        eyebrow="AI Content & Marketing Automation"
        heading="Content that works — without hiring a team of five."
        copy={
          <>
            Book a free content audit. We’ll review your current content, your channels, and your goals, and come back
            with a clear plan and price —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>usually within 48 hours. No obligation, no jargon, no AI slop.</strong>
          </>
        }
        primaryLabel="Book a free content audit"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
