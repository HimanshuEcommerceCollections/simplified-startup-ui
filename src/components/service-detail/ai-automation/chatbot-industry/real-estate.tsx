import type { ChatbotIndustryData } from "./ChatbotIndustryView";

const ICON_PROPERTY_INQUIRIES = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_LEAD_CAPTURE_QUALIFICATION = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m16 4 2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_VIEWING_APPOINTMENT_SCHEDULI = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_CUSTOMER_SUPPORT_AUTOMATION = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M8 10h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_WEBSITE_VISITORS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_ACTIVE_BUYERS_RENTERS = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_EXISTING_CLIENTS_TENANTS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V8l7-5 7 5v13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M10 21v-6h4v6" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_AGENTS_SUPPORT_TEAMS = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="2" /><path d="M3 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5M11 18c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_HELPFUL = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m9 11 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_ACCURATE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_EASY_TO_USE = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_RELEVANT = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_CONNECTED = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" /><path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_FLEXIBLE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_PROPERTY_MANAGERS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M7 7h.01M3 5a2 2 0 0 1 2-2h5l9 9-7 7-9-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_REAL_ESTATE_DEVELOPERS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M6 21V11l6-4 6 4v10M10 21v-4h4v4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_HIGH_INQUIRY_VOLUME = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_DISCOVERY_AND_REQUIREMENTS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_CONVERSATION_PLANNING = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 3v6a3 3 0 0 0 3 3h6M18 9l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_FAQ_AND_KNOWLEDGE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_CHATBOT_CONFIGURATION_OR = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_TESTING_OF_KEY = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_DOCUMENTATION_HANDOVER = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const REAL_ESTATE: ChatbotIndustryData = {
  hero: {
    line1: "AI chatbots that answer property questions,",
    line2: <>qualify leads, and help book <span className="grad-text">viewings.</span></>,
    lead: <>A chatbot for your agency that answers property inquiries, shares listing details, captures and qualifies leads, <strong>and helps clients schedule viewings, day or night.</strong></>,
    primaryLabel: "Get your real estate chatbot",
    secondary: { label: "See how it works ↓", href: "#process" },
    card: {
      ariaLabel: "A real estate chatbot answering a property inquiry on an agency website",
      live: "Property chat",
      corner: "ON YOUR LISTING PAGE",
      botName: "Property Assistant",
      botStatus: "Online · day or night",
      bubbles: [
        { from: "them", text: "Hi, is the 2-bed apartment on Elm Street still available?" },
        { from: "bot", text: "It is. The 2-bed on Elm Street is available at £1,400/month. Want the full details, or to book a viewing?" },
        { from: "them", text: "Can I view it this Saturday?" },
        { from: "bot", text: "I can set that up. What time works best, and the best number for an agent to confirm?" },
      ],
      footLeft: "Inquiries, leads, viewings",
      footRight: "captured day & night →",
    },
  },
  trust: ["Faster answers to property inquiries", "Lead capture and qualification", "Viewing and appointment scheduling", "Support for routine questions"],
  why: {
    eyebrow: "Why real estate businesses need chatbots", heading: "Property inquiries don’t wait for office hours.",
    paragraphs: [
      <>Buyers and renters browse listings late at night and on weekends. When they find something they like, <strong>the agency that answers first often wins the lead.</strong></>,
      "Meanwhile, your agents are out showing properties, not sitting by the inbox. Slow replies let leads go cold, and the same questions get answered again and again.",
      <><a href="/ai-automation/ai-chatbots">A chatbot</a> handles the predictable part: <strong>instant answers, lead capture around the clock, and serious prospects passed to an agent with details gathered.</strong> It won’t close deals, but it stops good leads from slipping away.</>,
    ],
    glance: [
      "Answers common property questions instantly",
      "Captures leads outside office hours",
      "Qualifies prospects before an agent calls",
      "Shares listing details on demand",
      "Frees agents to focus on serious buyers",
    ],
    chips: [
      "Is this property still available?",
      "What’s the monthly rent?",
      "Does it have parking or a garden?",
      "Can I book a viewing this Saturday?",
      "Is it pet-friendly?",
    ],
  },
  capabilities: {
    eyebrow: "Built around business needs", heading: "What your chatbot does depends on your properties, clients, and team, not a template.",
    cards: [
      {
        label: "A · Inquiries",
        icon: ICON_PROPERTY_INQUIRIES,
        title: "Property inquiries",
        text: "Answers questions about listings so prospects get what they need without waiting for an agent.",
        items: ["Shares availability, price, and key features", "Answers location, size, and amenity questions", "Points clients to listings that match"],
      },
      {
        label: "B · Leads",
        icon: ICON_LEAD_CAPTURE_QUALIFICATION,
        title: "Lead capture & qualification",
        text: "Turns anonymous browsers into contacts, and sorts serious prospects from casual ones.",
        items: ["Collects name, contact details, requirements", "Asks about budget, timeline, property type", "Flags qualified leads for agents first"],
      },
      {
        label: "C · Viewings",
        icon: ICON_VIEWING_APPOINTMENT_SCHEDULI,
        title: "Viewing & appointment scheduling",
        text: "Helps clients book viewings or calls when the required calendar or CRM integration is in place.",
        items: ["Offers available slots (integration-dependent)", "Captures preferred times when not connected", "Sends details to your team to confirm"],
      },
      {
        label: "D · Support",
        icon: ICON_CUSTOMER_SUPPORT_AUTOMATION,
        title: "Customer support automation",
        text: "Handles routine questions and routes anything complex to the right person: negotiations, disputes, legal queries.",
        items: ["Answers FAQs on process, documents, policies", "Collects details before handing to an agent", "Recognises sensitive issues, offers human route"],
      },
    ],
  },
  touchpoints: {
    eyebrow: "Where your chatbot will help", heading: "We design for real touchpoints across the whole journey, not just one.",
    stackHead: "Your Real Estate Chatbot",
    layers: [
      { icon: ICON_WEBSITE_VISITORS, title: "Website visitors", items: ["Listing discovery & area guidance", "General questions about how you work", "First answers before they reach out"] },
      { icon: ICON_ACTIVE_BUYERS_RENTERS, title: "Active buyers & renters", items: ["Property details, pricing, availability", "Viewing requests and preferred times", "Comparison and suitability questions"] },
      { icon: ICON_EXISTING_CLIENTS_TENANTS, title: "Existing clients & tenants", items: ["Routing maintenance or repair requests", "Document and process questions", "Updates on where things stand"] },
      { icon: ICON_AGENTS_SUPPORT_TEAMS, title: "Agents & support teams", items: ["FAQs handled automatically", "Initial lead qualification & detail-gathering", "Routing complex issues to the right agent"] },
    ],
  },
  readiness: {
    eyebrow: "The chatbot readiness test", heading: "A capable real estate chatbot should pass all six.",
    tests: [
      { title: "Property questions", text: "Can it answer real questions about your listings, not just generic ones?", example: "“Does the 2-bed on Elm Street have a parking space?” should get a specific answer." },
      { title: "Pricing & availability", text: "Does it reflect current prices and what’s actually available today?", example: "“Is this still on the market?” should match your live listings, not a stale page." },
      { title: "Lead qualification", text: "Does it capture the details an agent needs before following up?", example: "Budget, timeline, and property type should be gathered, not just a name." },
      { title: "Agent handover", text: "When it can’t help, does it route to the right person clearly?", example: "“I’d like to negotiate on the asking price” should move to an agent, not loop FAQs." },
      { title: "Mobile experience", text: "Does it work smoothly on a phone, where most property searching happens?", example: "The chat should be easy to open, read, and type in on a small screen." },
      { title: "Integration readiness", text: "For live data or booking, is the right connection in place?", example: "“Book me a Saturday viewing” only works if connected to a calendar or CRM." },
    ],
  },
  discovery: {
    eyebrow: "What we ask before building", heading: "A short discovery conversation keeps the project focused.",
    questions: [
      { title: "Who are your clients?", text: "Buyers, renters, investors, or a mix: knowing who’s asking shapes the conversations." },
      { title: "What properties do you handle?", text: "Residential, commercial, rentals, or sales affects what it explains and qualifies." },
      { title: "Which questions eat your team’s time?", text: "The ones agents answer on repeat are the best place for a chatbot to start." },
      { title: "Where do clients need help?", text: "Browsing, inquiring, booking, or post-sale: this tells us where to focus." },
      { title: "Which CRM and tools do you use?", text: "Your CRM, calendar, and listing source determine possible integrations." },
      { title: "What should it achieve?", text: "More qualified leads, fewer repetitive calls, or more booked viewings." },
    ],
  },
  process: {
    eyebrow: "How it comes together", heading: "A focused process with clear checkpoints.",
    steps: [
      { title: "Discovery", text: "We learn your properties, clients, and the inquiries that take the most time.", output: "Requirements & direction" },
      { title: "Conversation planning", text: "We map common questions, journeys, and where a chat should move to an agent.", output: "Conversation flow plan" },
      { title: "Knowledge & integration planning", text: "Listing info, FAQs, policies, and the CRM or calendar integrations needed.", output: "Knowledge & integration plan" },
      { title: "Development & testing", text: "We build the chatbot, test responses, and check key client journeys before launch.", output: "Tested chatbot solution" },
      { title: "Launch & improvement", text: "We support launch, hand over, and recommend improvements from real chats.", output: "Launch-ready + recommendations" },
    ],
  },
  present: {
    eyebrow: "How we present & test", heading: "You see the chatbot the way your clients will: as real conversations.",
    steps: [
      { when: "First", title: "The use case", text: "We start with the client problem the chatbot is meant to solve." },
      { when: "Then", title: "The conversation", text: "How it responds to a realistic question: judge tone and answer." },
      { when: "Next", title: "In context", text: "How that conversation sits inside your website, so it fits how clients search." },
      { when: "Finally", title: "Feedback & refinement", text: "You review and request changes; approved updates built in before launch." },
    ],
    conversation: [
      { from: "them", text: "Hi, is the 2-bed apartment on Elm Street still available?" },
      { from: "bot", text: "It is. The 2-bed on Elm Street is available at £1,400/month. Would you like the full details, or to book a viewing?" },
      { from: "them", text: "Can I view it this Saturday?" },
      { from: "bot", text: "I can set that up. What time works best, and what’s the best number for an agent to confirm?" },
    ],
  },
  features: {
    eyebrow: "Features & deliverables", heading: "What a chatbot can include, and what each one needs.",
    rows: [
      { feature: "AI conversations", purpose: "Understand and respond in natural language", notes: "Quality depends on info provided" },
      { feature: "Property assistance", purpose: "Help clients learn about listings", notes: "Needs accurate listing data" },
      { feature: "Lead capture & qualification", purpose: "Turn browsers into qualified contacts", notes: "Qualification rules agreed in planning" },
      { feature: "FAQ automation", purpose: "Answer repetitive questions instantly", notes: "Built from your approved FAQs" },
      { feature: "Viewing scheduling", purpose: "Help clients book viewings or calls", notes: "Requires calendar/CRM integration" },
      { feature: "CRM integration", purpose: "Send leads into your pipeline", notes: "Subject to CRM access" },
      { feature: "Listing responses", purpose: "Share live availability and pricing", notes: "Depends on a connected source" },
      { feature: "Agent handover", purpose: "Route complex issues to your team", notes: "Needs a defined handover path" },
      { feature: "Conversation testing", purpose: "Check key journeys before launch", notes: "Scope agreed in planning" },
      { feature: "Documentation", purpose: "Give your team what they need to run it", notes: "Provided at project close" },
    ],
  },
  qualities: {
    eyebrow: "What makes an effective chatbot", heading: "Qualities we design toward on every project.",
    items: [
      { icon: ICON_HELPFUL, title: "Helpful", text: "Useful and easy to understand." },
      { icon: ICON_ACCURATE, title: "Accurate", text: "Draws on current, approved listing info." },
      { icon: ICON_EASY_TO_USE, title: "Easy to use", text: "Simple to ask a question and get an answer." },
      { icon: ICON_RELEVANT, title: "Relevant", text: "Responds to what the client actually asked." },
      { icon: ICON_CONNECTED, title: "Connected", text: "Uses integrations when live data or CRM is needed." },
      { icon: ICON_FLEXIBLE, title: "Flexible", text: "Reviewed and improved as your business changes." },
    ],
    note: { icon: "warn", text: <>No chatbot is right every time. Sensitive matters should always have a clear route to an agent: price negotiations, offers, complaints, legal or financial questions. <b>We design that handover in from the start rather than pretending AI can handle everything.</b></> },
  },
  mistakes: {
    eyebrow: "Common mistakes", heading: "Common real estate chatbot mistakes.",
    rows: [
      { problem: "Outdated listing or availability info", fix: "Connect to a live source and review regularly." },
      { problem: "Generic or irrelevant responses", fix: "Design around your real property questions." },
      { problem: "No lead qualification", fix: "Capture budget, timeline, requirements before handoff." },
      { problem: "No route to an agent", fix: "Set a clear handover path for complex issues." },
      { problem: "Outdated process or policy info", fix: "Keep responses in sync with your current process." },
      { problem: "Unclear integration requirements", fix: "Confirm CRM, calendar, and listing feasibility upfront." },
    ],
  },
  who: {
    eyebrow: "Who it’s for", heading: "Who real estate chatbot solutions are for.",
    items: [
      { icon: ICON_PROPERTY_INQUIRIES, title: "Agencies & brokerages", text: "Teams fielding more inquiries than agents can answer quickly.", useCase: "Responding to a weekend inquiry and booking a viewing before Monday." },
      { icon: ICON_ACTIVE_BUYERS_RENTERS, title: "Independent agents", text: "Solo agents who can’t be at the phone while showing properties.", useCase: "Answering “is this still available?” and capturing the lead while you’re out." },
      { icon: ICON_PROPERTY_MANAGERS, title: "Property managers", text: "Managers handling tenant questions, maintenance, and availability.", useCase: "Logging a maintenance request and passing it to the right team." },
      { icon: ICON_REAL_ESTATE_DEVELOPERS, title: "Real estate developers", text: "Developers marketing new projects who need early interest captured cleanly.", useCase: "Collecting and qualifying interest in a new development from the launch page." },
      { icon: ICON_HIGH_INQUIRY_VOLUME, title: "High inquiry volume", text: "Businesses where repeat questions bury the genuinely important ones.", useCase: "Auto-answering FAQs so agents focus on qualified, ready-to-move clients." },
    ],
  },
  included: {
    eyebrow: "What’s included", heading: "A project can include any of these, depending on your needs.",
    items: [
      { icon: ICON_DISCOVERY_AND_REQUIREMENTS, text: "Discovery and requirements discussion" },
      { icon: ICON_RELEVANT, text: "Client question analysis" },
      { icon: ICON_CONVERSATION_PLANNING, text: "Conversation planning" },
      { icon: ICON_FAQ_AND_KNOWLEDGE, text: "FAQ and knowledge base preparation" },
      { icon: ICON_LEAD_CAPTURE_QUALIFICATION, text: "Lead capture and qualification setup" },
      { icon: ICON_CHATBOT_CONFIGURATION_OR, text: "Chatbot configuration or development" },
      { icon: ICON_CONNECTED, text: "Integrations, where agreed (CRM, calendar, listings)" },
      { icon: ICON_TESTING_OF_KEY, text: "Testing of key conversation flows" },
      { icon: ICON_DISCOVERY_AND_REQUIREMENTS, text: "Launch support" },
      { icon: ICON_DOCUMENTATION_HANDOVER, text: "Documentation, handover & improvement recommendations" },
    ],
  },
  faq: {
    eyebrow: "Common questions", heading: "Asked before every chatbot.",
    items: [
      { q: "What is a real estate chatbot?", a: <>An automated assistant on your website that answers client questions in a conversation, sharing property details, <strong>capturing and qualifying leads, and helping schedule viewings.</strong></> },
      { q: "Can a chatbot qualify leads?", a: <>Yes. It can collect contact details and ask about budget, timeline, and property type, then flag which leads to prioritise. <strong>The exact questions are agreed with you in planning.</strong></> },
      { q: "Can it schedule property viewings?", a: <>Live booking depends on a calendar or CRM integration. <strong>Without it, the chatbot still captures preferred times and passes them to your team</strong>, so no inquiry is lost.</> },
      { q: "Can it integrate with my CRM?", a: <>Often possible, but it depends on the CRM, the access available, and your setup. <strong>We confirm what’s feasible during discovery</strong> rather than assuming.</> },
      { q: "Can it answer questions about specific listings?", a: <>Yes, when connected to a reliable, up-to-date listing source. <strong>Without a live connection it can answer general questions</strong> but may not reflect real-time availability.</> },
      { q: "Will it replace my agents?", a: <>No. It handles routine questions, captures leads, and gathers context, but negotiations and relationship-building need your agents. <strong>It supports your team, it doesn’t replace them.</strong></> },
      { q: "How much does it cost?", a: <>Cost depends on scope: conversations, integrations, and how much is built versus configured. <strong>We share clear pricing on the free call</strong> once we understand your requirements.</> },
      { q: "Can it provide 24/7 responses?", a: <>Yes. Once live, it responds to common questions at any hour, including evenings and weekends, and <strong>captures leads the rest of the time</strong> so after-hours inquiries aren’t lost.</> },
    ],
  },
  cta: {
    eyebrow: "Real Estate Chatbot Solutions",
    heading: "Answer every property inquiry, even the ones that arrive at midnight.",
    copy: <>A chatbot can answer property questions, capture and qualify leads, and help clients book viewings, so fewer good leads slip away. <strong style={{ color: "#fff", fontWeight: 600 }}>Let’s talk through where it would help your agency most.</strong></>,
    primaryLabel: "Discuss your real estate chatbot",
  },
};
