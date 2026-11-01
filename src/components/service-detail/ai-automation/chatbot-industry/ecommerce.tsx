import type { ChatbotIndustryData } from "./ChatbotIndustryView";

const ICON_PRODUCT_DISCOVERY = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_SALES_ASSISTANCE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_ORDER_DELIVERY_SUPPORT = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 7h4l1 2M4 7h16M8 7v10h12V9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_CUSTOMER_SUPPORT_AUTOMATION = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M8 10h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_WEBSITE_VISITORS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_POTENTIAL_BUYERS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_SUPPORT_TEAMS = (
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
const ICON_CONNECTED = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" /><path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_FLEXIBLE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_GROWING_ECOMMERCE_BRANDS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_LARGE_PRODUCT_CATALOGS = (
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

export const ECOMMERCE: ChatbotIndustryData = {
  hero: {
    line1: "AI chatbots that help your shoppers",
    line2: <>find, buy, and get <span className="grad-text">support.</span></>,
    lead: <>A chatbot for your online store that helps customers discover the right products, get quick answers, understand your policies, <strong>and reach your team when they need a person.</strong></>,
    primaryLabel: "Get your ecommerce chatbot",
    secondary: { label: "See how it works ↓", href: "#process" },
    card: {
      ariaLabel: "An ecommerce chatbot answering a shopper on a store page",
      live: "Store chat",
      corner: "ON YOUR PRODUCT PAGE",
      botName: "Shop Assistant",
      botStatus: "Online · replies instantly",
      bubbles: [
        { from: "them", text: "Hi, is the canvas weekender bag in stock in olive?" },
        { from: "bot", text: "It is. The olive canvas weekender is in stock. Want to see it, or check delivery to your area?" },
        { from: "them", text: "How long to the UK?" },
        { from: "bot", text: "Standard UK delivery is usually 3–5 working days. Shall I pull up the product page?" },
      ],
      footLeft: "Answers, discovery, handoff",
      footRight: "help at every stage →",
    },
  },
  trust: ["Faster answers to common questions", "Product discovery assistance", "Support for repetitive inquiries", "Built around your customers"],
  why: {
    eyebrow: "Why ecommerce businesses need chatbots", heading: "Most online stores answer the same questions all day.",
    paragraphs: [
      <>Is it in stock? How long is delivery? Will it fit? What if I need to return it? Simple questions, <strong>but they arrive all day, across every channel,</strong> and each needs a fast, accurate answer.</>,
      "When answers are slow, shoppers leave. Meanwhile your team burns hours on repetitive questions instead of the ones that need a person.",
      <><a href="/ai-automation/ai-chatbots">A chatbot</a> handles the predictable, high-volume part: <strong>instant answers, product pointers, and clean handoffs to your team for the rest.</strong> It won’t fix everything, and not every store needs one.</>,
    ],
    glance: [
      "Answers repetitive questions without the wait",
      "Helps shoppers find the right product faster",
      "Frees your team for complex, high-value issues",
      "Responds consistently across busy periods",
      "Gathers context before handing off to a person",
    ],
    chips: [
      "Do you have this in a medium?",
      "How long does shipping take to my area?",
      "What’s your return window?",
      "Which of these two would you recommend?",
      "Where’s my order?",
    ],
  },
  capabilities: {
    eyebrow: "Built around business needs", heading: "No two stores are the same. We build around your workflow, not a template.",
    cards: [
      {
        label: "A · Discovery",
        icon: ICON_PRODUCT_DISCOVERY,
        title: "Product discovery",
        text: "Helps shoppers narrow a large catalog down to products that fit what they’re looking for.",
        items: ["Suggests relevant products from a description", "Answers spec, material, or feature questions", "Points to the right category when unsure"],
      },
      {
        label: "B · Sales",
        icon: ICON_SALES_ASSISTANCE,
        title: "Sales assistance",
        text: "Answers the pre-purchase questions that decide whether a shopper buys now or leaves to think about it.",
        items: ["Explains differences between similar products", "Clarifies sizing, compatibility, or usage", "Shares stock, delivery, and policy at decision time"],
      },
      {
        label: "C · Orders",
        icon: ICON_ORDER_DELIVERY_SUPPORT,
        title: "Order & delivery support",
        text: "Helps with order questions when the required integration is in place, otherwise explains your general process.",
        items: ["Order status & tracking (integration-dependent)", "Explains delivery timeframes and options", "Walks through how returns and exchanges work"],
      },
      {
        label: "D · Support",
        icon: ICON_CUSTOMER_SUPPORT_AUTOMATION,
        title: "Customer support automation",
        text: "Handles routine questions and routes anything complex or sensitive to a human, with context attached.",
        items: ["Answers FAQs on policies, accounts, and issues", "Collects details before handing to support", "Recognises when a question needs a person"],
      },
    ],
  },
  touchpoints: {
    eyebrow: "Where your chatbot will help", heading: "We design for real touchpoints across the whole journey, not just one.",
    stackHead: "Your Ecommerce Chatbot",
    layers: [
      { icon: ICON_WEBSITE_VISITORS, title: "Website visitors", items: ["Product discovery & category guidance", "Store information and how things work", "Answers to first questions"] },
      { icon: ICON_POTENTIAL_BUYERS, title: "Potential buyers", items: ["Product details and comparisons", "Purchase and compatibility questions", "Delivery options and timeframes"] },
      { icon: ICON_ORDER_DELIVERY_SUPPORT, title: "Existing customers", items: ["Order inquiries & tracking (integration)", "Return and exchange policy info", "Common account or reorder help"] },
      { icon: ICON_SUPPORT_TEAMS, title: "Support teams", items: ["FAQs handled automatically", "Initial inquiry & detail-gathering", "Routing complex issues to the right person"] },
    ],
  },
  readiness: {
    eyebrow: "The chatbot readiness test", heading: "A capable ecommerce chatbot should pass all six.",
    tests: [
      { title: "Product questions", text: "Can it answer real questions about your products, not just generic ones?", example: "“Is the blue version waterproof?” should get a specific answer, not a search link." },
      { title: "Store policies", text: "Does it reflect your current shipping, returns, and warranty policies?", example: "“Can I return a sale item?” should match your policy page today." },
      { title: "Customer intent", text: "Does it understand what the shopper is trying to do, even when phrased loosely?", example: "“Something for a 6-year-old who likes dinosaurs” should lead somewhere useful." },
      { title: "Human handover", text: "When it can’t help, does it offer a clear route to a person?", example: "“My order arrived damaged” should move toward human support, not loop in FAQs." },
      { title: "Mobile experience", text: "Does it work smoothly on a phone, where most shopping happens?", example: "The chat should be easy to open, read, and type in on a small screen." },
      { title: "Integration readiness", text: "For live data like order status, is the right connection in place?", example: "“Where’s my order?” only works if connected to your order system." },
    ],
  },
  discovery: {
    eyebrow: "What we ask before building", heading: "A short discovery conversation keeps the project focused.",
    questions: [
      { title: "Who are your customers?", text: "How they talk helps us design conversations that feel natural, not robotic." },
      { title: "What products do you sell?", text: "Catalog size and product types affect how the chatbot handles discovery." },
      { title: "Which questions eat your team’s time?", text: "The repetitive ones are usually the best place for a chatbot to start." },
      { title: "Where do customers need help?", text: "Browsing, checkout, or post-purchase: this tells us where to focus." },
      { title: "Which platform do you use?", text: "Shopify, WooCommerce, or other determines possible integrations." },
      { title: "What should it achieve?", text: "Fewer tickets, better discovery, faster answers: keeps it measurable." },
    ],
  },
  process: {
    eyebrow: "How it comes together", heading: "A focused process with clear checkpoints.",
    steps: [
      { title: "Discovery", text: "We learn your store, customers, and the inquiries that take the most time.", output: "Requirements & direction" },
      { title: "Conversation planning", text: "We map common questions, journeys, and where a chat should move to a person.", output: "Conversation flow plan" },
      { title: "Knowledge & integration planning", text: "Product info, FAQs, policies, and the integrations needed for live data.", output: "Knowledge & integration plan" },
      { title: "Development & testing", text: "We build the chatbot, test responses, and check key journeys before launch.", output: "Tested chatbot solution" },
      { title: "Launch & improvement", text: "We support launch, hand over, and recommend improvements from real chats.", output: "Launch-ready + recommendations" },
    ],
  },
  present: {
    eyebrow: "How we present & test", heading: "You see the chatbot the way your customers will: as real conversations.",
    steps: [
      { when: "First", title: "The use case", text: "We start with the customer problem the chatbot is meant to solve." },
      { when: "Then", title: "The conversation", text: "How it responds to a realistic question: judge tone and answer, not just the idea." },
      { when: "Next", title: "In context", text: "How that conversation sits inside your store, so it fits how customers shop." },
      { when: "Finally", title: "Feedback & refinement", text: "You review and request changes; approved updates are built in before launch." },
    ],
    conversation: [
      { from: "them", text: "Hi, is the canvas weekender bag in stock in olive?" },
      { from: "bot", text: "It is. The olive canvas weekender is in stock. Would you like to see it, or check delivery times to your area?" },
      { from: "them", text: "How long to the UK?" },
      { from: "bot", text: "Standard UK delivery is usually 3–5 working days. Want me to pull up the product page so you can add it to your cart?" },
    ],
  },
  features: {
    eyebrow: "Features & deliverables", heading: "What a chatbot can include, and what each one needs.",
    rows: [
      { feature: "AI conversations", purpose: "Understand and respond in natural language", notes: "Quality depends on info provided" },
      { feature: "Product assistance", purpose: "Help shoppers learn before buying", notes: "Needs accurate product data" },
      { feature: "FAQ automation", purpose: "Answer repetitive questions instantly", notes: "Built from your approved FAQs" },
      { feature: "Shipping & returns", purpose: "Consistent answers on delivery and returns", notes: "Must reflect current policies" },
      { feature: "Order inquiry support", purpose: "Let customers check order status", notes: "Requires order-system integration" },
      { feature: "Product recommendations", purpose: "Point shoppers toward relevant products", notes: "Depends on catalog structure" },
      { feature: "Human handover", purpose: "Route complex issues to your team", notes: "Needs a defined handover path" },
      { feature: "Platform integration", purpose: "Connect to live store data", notes: "Subject to platform access" },
      { feature: "Conversation testing", purpose: "Check key journeys before launch", notes: "Scope agreed in planning" },
      { feature: "Documentation", purpose: "Give your team what they need to run it", notes: "Provided at project close" },
    ],
  },
  qualities: {
    eyebrow: "What makes an effective chatbot", heading: "Qualities we design toward on every project.",
    items: [
      { icon: ICON_HELPFUL, title: "Helpful", text: "Useful and easy to understand, not vague or evasive." },
      { icon: ICON_ACCURATE, title: "Accurate", text: "Draws on approved product info and current policies." },
      { icon: ICON_EASY_TO_USE, title: "Easy to use", text: "Simple to ask a question and get to an answer." },
      { icon: ICON_PRODUCT_DISCOVERY, title: "Relevant", text: "Responds to what the customer actually asked." },
      { icon: ICON_CONNECTED, title: "Connected", text: "Uses compatible integrations when live info is needed." },
      { icon: ICON_FLEXIBLE, title: "Flexible", text: "Reviewed and improved as your business changes." },
    ],
    note: { icon: "warn", text: <>No chatbot is right every time. Uncertain questions and sensitive issues should always have a clear route to a human: complaints, payment problems, anything personal. <b>We design that handover in from the start rather than pretending AI can handle everything.</b></> },
  },
  mistakes: {
    eyebrow: "Common mistakes", heading: "Common ecommerce chatbot mistakes.",
    rows: [
      { problem: "Incorrect product information", fix: "Build on accurate, approved data and review it." },
      { problem: "Generic or irrelevant responses", fix: "Design around your real questions and context." },
      { problem: "No route to human support", fix: "Set a clear handover path for complex issues." },
      { problem: "Outdated store policies", fix: "Sync responses to current terms." },
      { problem: "Inadequate testing", fix: "Test key journeys before launch, not after." },
      { problem: "No review of unanswered questions", fix: "Check what it couldn’t answer and improve over time." },
    ],
  },
  who: {
    eyebrow: "Who it’s for", heading: "Who ecommerce chatbot solutions are for.",
    items: [
      { icon: ICON_SALES_ASSISTANCE, title: "Online retail stores", text: "Stores answering the same product, shipping, and returns questions all day.", useCase: "Fielding “is this in stock?” around the clock." },
      { icon: ICON_CONNECTED, title: "Shopify & WooCommerce", text: "Merchants who want their chatbot connected to live store data.", useCase: "Checking order status where integration allows." },
      { icon: ICON_GROWING_ECOMMERCE_BRANDS, title: "Growing ecommerce brands", text: "Brands whose support volume is rising faster than their team.", useCase: "Steady response times through a seasonal rush." },
      { icon: ICON_LARGE_PRODUCT_CATALOGS, title: "Large product catalogs", text: "Stores where shoppers struggle to find the right product among thousands.", useCase: "Narrowing a big catalog to a few relevant options." },
      { icon: ICON_SUPPORT_TEAMS, title: "Support teams", text: "Teams spending too much time on repeat questions instead of complex issues.", useCase: "Auto-answering FAQs, passing detailed problems with context." },
    ],
  },
  included: {
    eyebrow: "What’s included", heading: "A project can include any of these, depending on your needs.",
    items: [
      { icon: ICON_DISCOVERY_AND_REQUIREMENTS, text: "Discovery and requirements discussion" },
      { icon: ICON_PRODUCT_DISCOVERY, text: "Customer question analysis" },
      { icon: ICON_CONVERSATION_PLANNING, text: "Conversation planning" },
      { icon: ICON_FAQ_AND_KNOWLEDGE, text: "FAQ and knowledge base preparation" },
      { icon: ICON_CHATBOT_CONFIGURATION_OR, text: "Chatbot configuration or development" },
      { icon: ICON_CONNECTED, text: "Relevant integrations, where agreed" },
      { icon: ICON_TESTING_OF_KEY, text: "Testing of key conversation flows" },
      { icon: ICON_DISCOVERY_AND_REQUIREMENTS, text: "Launch support" },
      { icon: ICON_FAQ_AND_KNOWLEDGE, text: "Documentation and handover" },
      { icon: ICON_GROWING_ECOMMERCE_BRANDS, text: "Improvement recommendations" },
    ],
  },
  faq: {
    eyebrow: "Common questions", heading: "Asked before every chatbot.",
    items: [
      { q: "What is an ecommerce chatbot?", a: <>An automated assistant on <a href="/website-development/ecommerce">your store</a> that answers customer questions in a conversation, helping shoppers find products, explain policies, and <strong>pass complex issues to your team.</strong></> },
      { q: "Can it recommend products?", a: <>Yes, within the limits of your product data. <strong>How well it recommends depends on how your catalog is structured</strong> and what info it can access.</> },
      { q: "Can a chatbot help customers track orders?", a: <>Only when connected to your order-management system. <strong>Without it, the chatbot can still explain your general shipping process,</strong> but can’t look up a specific order.</> },
      { q: "Can it integrate with Shopify or WooCommerce?", a: <>Often possible, but it depends on the platform, the access available, and your setup. <strong>We confirm what’s feasible during discovery</strong> rather than assuming.</> },
      { q: "Will it replace my support team?", a: <>No. It handles routine questions and gathers context, but complex or sensitive issues reach a person. <strong>Think of it as support for your team, not a replacement.</strong></> },
      { q: "How much does it cost?", a: <>Cost depends on scope: conversations, integrations, and how much is built versus configured. <strong>We share clear pricing on the free call</strong> once we understand your needs.</> },
      { q: "How long does implementation take?", a: <>It depends on scope, feedback speed, and integrations. <strong>We give a realistic timeline once discovery is complete,</strong> rather than quoting a date upfront.</> },
      { q: "Can it provide 24/7 responses?", a: <>Yes. Once live, it responds to common questions at any hour. <strong>Anything beyond what it’s set up to handle is queued or routed to your team.</strong></> },
    ],
  },
  cta: {
    eyebrow: "Ecommerce Chatbot Solutions",
    heading: "Give shoppers faster answers, and your team breathing room.",
    copy: <>A chatbot can help customers find products, get quick answers, understand your policies, and reach your team when they need a person. <strong style={{ color: "#fff", fontWeight: 600 }}>Let’s talk through where it would help your store most.</strong></>,
    primaryLabel: "Discuss your ecommerce chatbot",
  },
};
