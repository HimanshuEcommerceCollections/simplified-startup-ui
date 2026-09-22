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
import "./cb-page.css";

/* -------- icons -------- */

const ICON_BUBBLE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_BUBBLE_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_LIST_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 16.5 19.5 18l2.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CALENDAR_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_SHIELD = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CART = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);
const ICON_BAG = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 9h16l-1 11H5zM8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 3a9 9 0 0 1 0 18M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const ICON_APERTURE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_HANDOFF = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M10 9V5l-7 7 7 7v-4c5 0 8 2 10 5-1-6-5-11-10-11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_TREND = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BROWSER = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 8h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CHEVRON_DOWN = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6l8 12 8-12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SQUARE_DASH = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_INSTAGRAM = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);
const ICON_SMS = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_HOUSE = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 11l8-7 8 7M6 10v9h12v-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_TOOTH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M8 3c-2 0-3 2-3 5s1 13 3 13 2-5 4-5 2 5 4 5 3-10 3-13-1-5-3-5-2 1.5-4 1.5S10 3 8 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_SCALES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M6 8l-3 6h6zM18 8l-3 6h6zM5 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_LAPTOP = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 8h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ICON_WRENCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M14 6a4 4 0 0 0-5.5 5.5l-5 5L6 18.5l5-5A4 4 0 0 0 16.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BRIEFCASE = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ICON_CUTLERY = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M16 3c-1.5 0-2.5 2-2.5 5S15 21 16 21s2.5-10 2.5-13S17.5 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_X = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* -------- content -------- */

const WHY = [
  { icon: ICON_BUBBLE_LINES, title: "Handles 50–70% of support", text: <>Common questions answered automatically — <strong>cutting ticket volume</strong> and freeing your team for real conversations.</> },
  { icon: ICON_LIST_CHECK, title: "Qualifies & routes leads", text: <>Captures emails, scores prospects, and <strong>routes hot leads to sales</strong> — while you sleep, on weekends, in every timezone.</>, delay: 60 },
  { icon: ICON_SEARCH, title: "Instant answers, no waiting", text: <>Services, pricing, hours, availability — answered instantly. <strong>No form submissions, no 24-hour wait.</strong></>, delay: 120 },
  { icon: ICON_CLOCK, title: "A salesperson that never clocks out", text: <>24/7 coverage catches after-hours visitors <strong>who would otherwise just disappear.</strong></> },
  { icon: ICON_CALENDAR_CHECK, title: "Books appointments directly", text: <>Walks visitors through your calendar, books the meeting, and <strong>confirms by email or SMS.</strong></>, delay: 60 },
  { icon: ICON_SHIELD, title: "Win the visitor, not lose them", text: <>It’s the difference between capturing a visitor and <strong>losing them to the competitor whose site answered first.</strong></>, delay: 120 },
];

type Stat = { value?: string; count?: { target: number; suffix?: string }; label: string; text: string; delay: number };

const STATS: Stat[] = [
  { value: "50–70%", label: "Tickets resolved", text: "Of common support questions handled automatically — without a human touching them.", delay: 0 },
  { count: { target: 4, suffix: "x" }, label: "Faster qualification", text: "Vs. contact forms + manual follow-up, AI chatbots qualify leads 4× faster.", delay: 80 },
  { value: "24/7", label: "Always working", text: "Nights, weekends, holidays — your chatbot catches every visitor, every time.", delay: 160 },
];

const DONT = [
  { title: "Generic bots trained on nothing", text: <>Off-the-shelf chatbots that don’t know your business, hallucinate wrong answers, and make you look worse than having no chatbot at all.</>, delay: 0 },
  { title: "Rule-based decision trees", text: <>The old “click A or B” flowcharts — frustrating for users, limited by design, and outdated the moment ChatGPT-style AI took over.</>, delay: 70 },
  { title: "$50K enterprise custom LLMs", text: <>Real for banks, overkill for 99% of businesses. We use proven platforms (OpenAI, Claude, Gemini) trained on your business — <strong>same result at 1/10th the cost.</strong></>, delay: 0 },
  { title: "Bots with no human handoff", text: <>When the bot can’t help, it should hand off to your team — with full history. Most agencies skip this. It’s the difference between “AI experiment” and “actually works.”</>, delay: 70 },
];

type CapKey = "support" | "leadgen" | "booking" | "sales" | "ecom" | "internal";

const CAPS: { key: CapKey; icon: ReactNode; label: string; sub: string; name: string; tag: string; items: string[] }[] = [
  {
    key: "support",
    icon: ICON_BUBBLE,
    label: "Customer support",
    sub: "FAQs, 24/7",
    name: "AI Customer Support Chatbot",
    tag: "Answer FAQs, order status, return policies, and common tickets — 24/7.",
    items: ["FAQ auto-answer (trained on your docs)", "Order status + tracking lookups", "Return + refund policy questions", "Escalation to human when needed", "Multi-language support"],
  },
  {
    key: "leadgen",
    icon: ICON_LIST_CHECK,
    label: "Lead generation",
    sub: "Qualify & route",
    name: "AI Lead Generation Chatbot",
    tag: "Qualify visitors, capture emails, and route hot prospects to sales automatically.",
    items: ["Qualifying questions (BANT / custom)", "Email + phone capture", "Real-time hot-lead alerts", "CRM integration (HubSpot, Salesforce)", "Lead scoring built in"],
  },
  {
    key: "booking",
    icon: ICON_CALENDAR,
    label: "Appointment booking",
    sub: "Straight to calendar",
    name: "AI Appointment Booking Bot",
    tag: "Walk visitors through your calendar, book meetings, and confirm by email or SMS.",
    items: ["Calendly / Google Calendar integration", "Service selection + duration", "Automatic confirmation email", "SMS reminders", "Reschedule and cancel flows"],
  },
  {
    key: "sales",
    icon: ICON_CART,
    label: "Sales & product",
    sub: "Recommend & convert",
    name: "AI Sales & Product Assistant",
    tag: "Recommend products, compare options, answer pricing, and guide to purchase.",
    items: ["Product recommendation engine", "Price and package comparisons", "Add-to-cart via chat", "Discount code delivery", "Cart abandonment recovery"],
  },
  {
    key: "ecom",
    icon: ICON_BAG,
    label: "Ecommerce",
    sub: "Shopify / Woo",
    name: "AI Ecommerce Chatbot",
    tag: "Built for Shopify, WooCommerce, and BigCommerce — products, orders, support.",
    items: ["Shopify / WooCommerce native integration", "Product Q&A from your catalog", "Order tracking and status", "Upsell and cross-sell prompts", "Multi-channel (web + Instagram DM)"],
  },
  {
    key: "internal",
    icon: ICON_SHIELD,
    label: "Internal knowledge",
    sub: "Team Q&A",
    name: "AI Internal Knowledge Bot",
    tag: "Trained on your internal docs, wiki, or SOPs — instant answers instead of Slack pings.",
    items: ["Trained on Notion, Google Drive, docs", "Employee Q&A (HR, IT, policies)", "Slack + Microsoft Teams integration", "Permission-based access control", "Ongoing content sync"],
  },
];

const INCLUDED = [
  { no: "01", icon: ICON_GLOBE, title: "Strategy & scoping", text: "Business + audience discovery, use-case prioritization, success metrics, conversation flow, and escalation rules." },
  { no: "02", icon: ICON_STAR, title: "Custom AI training", text: "Trained on your actual business — website, docs, FAQs, policies, PDFs — with ongoing sync as content updates." },
  { no: "03", icon: ICON_APERTURE, title: "Design & branding", text: "Your colors, fonts, avatar, and voice — not a generic widget. Mobile-optimized, with custom conversation starters." },
  { no: "04", icon: ICON_LIST_CHECK, title: "Lead capture & CRM", text: "Email/phone capture, qualifying questions, lead scoring, CRM push (HubSpot, Salesforce, Pipedrive, GHL), real-time alerts." },
  { no: "05", icon: ICON_CALENDAR, title: "Appointment booking", text: "Calendly / Google Calendar / HubSpot Meetings, timezone detection, confirmations, SMS reminders, reschedule flows." },
  { no: "06", icon: ICON_HANDOFF, title: "Human handoff & live chat", text: "One-click escalation with full history preserved, team availability detection, and help-desk integration (Intercom, Zendesk)." },
  { no: "07", icon: ICON_LINK, title: "Multi-channel deployment", text: "One brain, many channels — website widget, WhatsApp, Instagram DM, Messenger, SMS, and in-app chat." },
  { no: "08", icon: ICON_TREND, title: "Optimization & reporting", text: "Weekly conversation review, accuracy scoring, failed-chat retraining, and a monthly report on tickets, leads, and meetings." },
];

const PLATFORMS = [
  { icon: ICON_BROWSER, name: "WordPress", how: "Native plugin or custom widget.", best: "Content sites · services" },
  { icon: ICON_CART, name: "Shopify", how: "Native app or custom integration.", best: "Ecommerce · orders" },
  { icon: ICON_CHEVRON_DOWN, name: "Webflow", how: "Custom embed + CMS integration.", best: "Design-driven · SaaS" },
  { icon: ICON_SQUARE_DASH, name: "Wix / Squarespace", how: "Custom embed widget.", best: "Small biz · portfolios" },
  { icon: ICON_CODE, name: "Custom / Framer", how: "JavaScript embed.", best: "SaaS · agencies" },
  { icon: ICON_BUBBLE, name: "WhatsApp Business", how: "WhatsApp Business API.", best: "Local · consumer brands" },
  { icon: ICON_INSTAGRAM, name: "Instagram + Messenger", how: "Meta Business Suite integration.", best: "DTC · salons · hospitality" },
  { icon: ICON_SMS, name: "SMS", how: "Twilio integration.", best: "Appointment-heavy services" },
];

const INDUSTRIES = [
  { icon: ICON_CART, name: "Ecommerce", text: "Product Q&A, order tracking, cart recovery, upsells." },
  { icon: ICON_HOUSE, name: "Real estate", text: "Property inquiries, showing scheduling, area info." },
  { icon: ICON_TOOTH, name: "Dental & medical", text: "Booking, insurance questions, new-patient intake." },
  { icon: ICON_SCALES, name: "Law firms", text: "Case intake, practice-area Q&A, consultation booking." },
  { icon: ICON_LAPTOP, name: "SaaS", text: "In-app support, feature Q&A, trial signup, demo booking." },
  { icon: ICON_WRENCH, name: "Local services", text: "Service area, quote requests, emergency booking." },
  { icon: ICON_BRIEFCASE, name: "Agencies & consultants", text: "Service inquiries, case-study delivery, call booking." },
  { icon: ICON_CUTLERY, name: "Restaurants & hospitality", text: "Reservations, menu Q&A, event bookings, hours." },
];

const STEPS = [
  { no: "Week 1", title: "Strategy & ingestion", text: "Discovery call locks use cases, KPIs, and voice. We ingest your site, docs, FAQs, and knowledge base to train the AI.", delay: 0 },
  { no: "Week 2", title: "Build & design", text: "Custom design in your brand. Conversation flows built. Lead capture, CRM, and booking flows connected.", delay: 70 },
  { no: "Week 3", title: "Testing & training", text: "We test hundreds of real questions and edge cases, retrain on gaps, refine tone and accuracy. You review & approve.", delay: 140 },
  { no: "Week 4", title: "Launch & handover", text: "Deploy to your site and channels. Team training on the dashboard. Analytics set up. 30 days of support included.", delay: 210 },
  { no: "Ongoing", title: "Optimize & scale", text: "Monthly retraining as your business evolves, new use cases added, performance reports, continuous accuracy gains.", delay: 280 },
];

const TIERS = [
  { name: "Starter Chatbot", best: "Small businesses — 1 use case (support OR lead gen), website only, up to 200 pages of training content.", price: "Published" },
  { name: "Growth Chatbot", best: "2–3 use cases, website + 1 messaging channel (WhatsApp, Instagram, or Messenger), CRM integration.", price: "Published", featured: true, badge: "Most popular", delay: 70 },
  { name: "Scale Chatbot", best: "Ecommerce & larger businesses — full use-case suite, multi-channel deployment, custom integrations, multi-language.", price: "Published", delay: 140 },
  { name: "Monthly Optimization", best: "Optional — ongoing retraining, content updates, new use cases, and monthly reporting.", price: "Published /mo", delay: 210 },
];

const FAQS = [
  { q: "How much does an AI chatbot cost?", a: <>Depends on complexity. Simple support bots start at Starter; lead-capture + booking + CRM bots (Growth) are most popular; multi-channel builds land in Scale. <strong>Full pricing is published on this page</strong> — no hidden fees, no “custom quote” runaround.</> },
  { q: "How long does it take to build?", a: <>Starter: 2 weeks. Growth: 3 weeks. Scale (multi-channel + complex integrations): 3–4 weeks. <strong>Timelines depend on how quickly you review and approve</strong> at each stage.</> },
  { q: "Will it actually know my business?", a: <>Yes — it’s trained specifically on YOUR business: website, product docs, FAQs, policies, PDFs, knowledge base. <strong>Every answer comes from your content,</strong> not a generic AI dataset. That’s the difference between helping and hallucinating.</> },
  { q: "Can it handle booking and lead capture?", a: <>Yes — both are core in Growth and Scale. Appointments book directly to your calendar (Calendly, Google, HubSpot); leads capture into your CRM with <strong>real-time alerts.</strong></> },
  { q: "Which AI platforms do you use?", a: <>Whichever fits best — usually <strong>OpenAI (GPT-4/GPT-5) or Claude.</strong> For data-sensitive businesses we can deploy on Azure OpenAI or self-hosted models. We recommend during the strategy call.</> },
  { q: "What if it doesn’t know the answer?", a: <>It escalates to a human on your team with <strong>full conversation history preserved</strong> — or offers to email/call back, capture contact info, or book a time. We configure the rules to your use case.</> },
  { q: "Can I install it on WordPress, Shopify, Webflow, Wix?", a: <>Yes — all of them, plus Squarespace, Framer, and any custom site via JavaScript embed. See the platforms section for the full list.</> },
  { q: "Does it work on WhatsApp, Instagram, Messenger?", a: <>Yes — same AI brain across channels. Growth includes 1 messaging channel; Scale includes all. <strong>Unified conversation history in one dashboard.</strong></> },
  { q: "Will the chatbot get better over time?", a: <>Yes — with the Monthly Optimization retainer. Every week we review conversations, catch gaps, retrain, and add content. <strong>Without optimization, bots drift; with it, they sharpen every month.</strong></> },
  { q: "Do I own the chatbot and data?", a: <>Yes, 100% — the chatbot, training data, and conversation history, deployed on your accounts. <strong>If you leave, you keep everything.</strong> No proprietary lock-ins.</> },
  { q: "Can it integrate with my CRM?", a: <>Yes — every captured lead pushes into your CRM with full context. Native integrations with <strong>HubSpot, Salesforce, Pipedrive, GoHighLevel, Zoho;</strong> others via Zapier or custom webhooks.</> },
  { q: "Is this different from Intercom, Drift, or Tidio?", a: <>Those are platforms you configure yourself. This is <strong>done-for-you</strong> — we build, train, deploy, and optimize on your behalf. We can even deploy on top of Intercom or Drift if you already use them.</> },
];

/* -------- hero signature: sample chatbot conversation -------- */

function ChatCard() {
  const reduce = useReducedMotion();
  const [rawRun, setRun] = useState(false);
  // reduced motion: messages are shown in their end state on first paint
  const run = reduce || rawRun;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setRun(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside className={`cb-chat${run ? " run" : ""}`} aria-label="A sample AI chatbot conversation">
      <div className="cb-chat-top">
        <span className="lt">
          <span className="av">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="12" rx="3" stroke="#fff" strokeWidth="2" />
              <circle cx="9" cy="12" r="1.3" fill="#fff" />
              <circle cx="15" cy="12" r="1.3" fill="#fff" />
              <path d="M12 3v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>{" "}
          Assistant <span className="dot2"></span>
        </span>
        <span className="rt">TRAINED ON YOU</span>
      </div>
      <div className="cb-chat-body">
        <div className="cb-msg bot">Hi! I’m the Rapid Rooter assistant — how can I help? 👋</div>
        <div className="cb-msg user">Do you cover the 90210 area? And can I book same-day?</div>
        <div className="cb-msg bot">
          Yes — we serve 90210 with <b>same-day service</b>. I can book you right now. What’s the best email for the
          confirmation?
        </div>
        <div className="cb-msg user">alex@example.com</div>
        <span className="cb-chip">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>{" "}
          Lead captured → CRM &nbsp;·&nbsp; Booked: Thu 2:00 PM
        </span>
      </div>
      <div className="cb-chat-input">
        <span className="ph">
          Ask anything…<span className="cur"></span>
        </span>
        <span className="send">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 12l16-8-6 16-3-6-7-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="cb-chat-foot">
        <span>Answers 24/7</span>
        <span className="gt">human handoff built in →</span>
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
    let raf: number;
    let start: number | null = null;
    function tick(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = `${Math.round(eased * target)}${suffix}`;
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
    <div className="cb-stat-grid" ref={gridRef}>
      {STATS.map((stat) => (
        <Reveal className="cb-stat" key={stat.label} style={d(stat.delay)}>
          <StatValue count={stat.count} value={stat.value} run={gridIn} reduce={reduce} />
          <span className="sk">{stat.label}</span>
          <p>{stat.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* -------- capabilities (tabs) -------- */

function CapabilitiesExplorer() {
  const [selected, setSelected] = useState<CapKey>("support");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = CAPS.find((c) => c.key === selected) ?? CAPS[0];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % CAPS.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + CAPS.length) % CAPS.length;
    if (next === null) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
    setSelected(CAPS[next].key);
  }

  return (
    <Reveal className="cb-wb-wrap" id="can-int">
      <div className="cb-wb-list" role="tablist" aria-label="Capabilities">
        {CAPS.map((c, i) => (
          <button
            key={c.key}
            className="cb-wb-btn"
            role="tab"
            type="button"
            aria-selected={c.key === selected}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            onClick={() => setSelected(c.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="di">{c.icon}</span>
            <span className="dn">
              <b>{c.label}</b>
              <small>{c.sub}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="cb-wb-panel">
        <div className="cb-wp-top">
          {/* the design renders the same chat-bubble mark for every capability */}
          <span className="big">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v11H7l-3 3z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h3>{active.name}</h3>
            <div className="tagline">{active.tag}</div>
          </div>
        </div>
        {/* keyed so the fade-in replays on every switch, like the design's re-render */}
        <div className="cb-wp-body cb-wp-fade" key={active.key}>
          <span className="k">What’s inside</span>
          <div className="cb-wp-list">
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

export default function AiChatbotsView() {
  return (
    <div className="cb-page">
      <ServiceDetailHero
        crumb={{ label: "AI Automation", href: "/ai-automation" }}
        eyebrow="AI chatbots for websites · Custom-trained · Live in 2–4 weeks"
        line1="An AI chatbot trained"
        line2={
          <>
            on <span className="grad-text">your business.</span>
          </>
        }
        lead={
          <>
            Done-for-you AI chatbot development — custom-trained on your website, docs, and FAQs. It answers customer
            questions, qualifies leads, books appointments, and hands hot conversations to your team.{" "}
            <strong>Live 24/7, without the enterprise price tag.</strong>
          </>
        }
        primary={{ label: "Book a free AI chatbot demo", href: "/start-project" }}
        secondary={{ label: "See how it works ↓", href: "#included" }}
        compact
      >
        <ChatCard />
      </ServiceDetailHero>

      <TrustBar items={["Custom-trained on YOUR business", "Human handoff built in", "Transparent published pricing", "Month-to-month"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why every business needs one in 2026</span>
            <h2>Visitors want answers now — not a contact form.</h2>
            <p>
              They’re asking about pricing, checking your service area, comparing your product, or trying to book — right
              now. An AI chatbot answers instantly, 24/7, on their terms.
            </p>
          </Reveal>
          <div className="cb-why">
            <FeatureGrid cards={WHY} columns={3} />
          </div>
        </div>
      </section>

      {/* STATS (dark) */}
      <section className="band dark" id="stats">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What a well-built chatbot delivers</span>
            <h2>Real 2026 benchmarks — not enterprise-only.</h2>
            <p>What businesses using custom-trained AI chatbots for support and lead gen actually hit — every week.</p>
          </Reveal>
          <StatsGrid />
          <Reveal as="p" className="cb-stat-note">
            Small businesses, local services, and agencies hit these <strong>with the right chatbot setup</strong> — that’s
            what we build.
          </Reveal>
        </div>
      </section>

      {/* DON'T BUILD */}
      <section className="band" id="dont">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What we don’t build</span>
            <h2>Most “AI chatbot” services are broken.</h2>
            <p>
              Being honest about what we <em>don’t</em> build — so you know exactly what you’re getting.
            </p>
          </Reveal>
          <div className="cb-dont-grid">
            {DONT.map((item) => (
              <Reveal className="cb-dontc" key={item.title} style={d(item.delay)}>
                <h3>
                  <span className="x">{ICON_X}</span>
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="cb-dont-note">
            <span className="mk">{ICON_CHECK}</span>
            <p>
              We build chatbots that <strong>know your business, answer accurately, capture leads, and hand off to humans</strong>{" "}
              when they should.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES (interactive) */}
      <section className="band tint" id="can">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What your chatbot can do</span>
            <h2>Not just support anymore.</h2>
            <p>
              Pick the ones that matter for your business — most clients start with two or three, and add more as the
              chatbot proves its worth.
            </p>
          </Reveal>
          <CapabilitiesExplorer />
        </div>
      </section>

      {/* INCLUDED (8 parts) */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Everything the chatbot needs to actually work.</h2>
            <p>Strategy, training, build, integrations, and ongoing optimization — run by one team, eight parts.</p>
          </Reveal>
          <Reveal className="cb-inc-grid">
            {INCLUDED.map((item) => (
              <div className="cb-inc" key={item.no}>
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

      {/* PLATFORMS */}
      <section className="band tint" id="platforms">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Platforms we deploy on</span>
            <h2>Wherever your customers already are.</h2>
            <p>
              We deploy on the platforms you already use — no forced migration. Most start with website + one messaging
              channel.
            </p>
          </Reveal>
          <Reveal className="cb-plat-grid">
            {PLATFORMS.map((p) => (
              <div className="cb-platc" key={p.name}>
                <span className="pi">{p.icon}</span>
                <h3>{p.name}</h3>
                <p className="pw">{p.how}</p>
                <span className="pb">{p.best}</span>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="cb-plat-note">
            Not sure which platforms you need? <strong>We’ll recommend during the strategy call.</strong>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="band" id="industries">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Industries we build for</span>
            <h2>Where chatbots deliver the fastest ROI.</h2>
          </Reveal>
          <Reveal className="cb-ind-grid">
            {INDUSTRIES.map((ind) => (
              <div className="cb-indc" key={ind.name}>
                <span className="ii">{ind.icon}</span>
                <h3>{ind.name}</h3>
                <p>{ind.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="band tint" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>Kickoff to a live chatbot in 2–4 weeks.</h2>
            <p>A structured process — every step ends with a clear deliverable and your sign-off.</p>
          </Reveal>
          <div className="cb-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="cb-step" key={step.title} style={d(step.delay)}>
                <span className="cb-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="band" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No “how much does an AI chatbot cost?” runaround. One-time build fee, optional monthly optimization retainer.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} columns={4} />
          <NoteCallout>
            Project fees paid in two installments — <strong>50% at kickoff, 50% at launch.</strong> AI platform costs
            (OpenAI, Claude API usage) are separate, usage-based — typically $20–$200/mo — passed through at cost. Every
            rate is on the <a href="/pricing">pricing page</a>.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every build." />

      <CtaBand
        id="start"
        eyebrow="AI Chatbots & Website Assistants"
        heading="Ready for an AI chatbot that actually converts?"
        copy={
          <>
            Book a free AI chatbot demo. We’ll look at your website, walk through the use cases that fit, and show a live
            demo of what a custom-trained chatbot could do for you —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              with a clear price at the end. No obligation, no jargon, no enterprise sales cycle.
            </strong>
          </>
        }
        primaryLabel="Book a free AI chatbot demo"
        primaryHref="/start-project"
        secondary={{ label: "See full pricing", href: "#pricing", arrow: "↗" }}
      />
    </div>
  );
}
