import type { ChatbotIndustryData } from "./ChatbotIndustryView";

const ICON_PRODUCT_QUESTIONS_FEATURES = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M7 9h4M7 13h7M15 8l2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_USER_ONBOARDING_GUIDANCE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h7l-1 8 9-12h-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_SUPPORT_AUTOMATION = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M8 10h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_LEAD_CAPTURE_QUALIFICATION = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m16 4 2 2 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_WEBSITE_VISITORS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_EXISTING_CUSTOMERS = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_SUPPORT_SUCCESS_TEAMS = (
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
const ICON_B2B_SOFTWARE_BUSINESSES = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 9h18M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_SAAS_SCALING_SUPPORT = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_DISCOVERY_AND_REQUIREMENTS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_CONVERSATION_AND_ONBOARDING_ = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 3v6a3 3 0 0 0 3 3h6M18 9l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_DOCS_AND_KNOWLEDGE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_CHATBOT_CONFIGURATION_OR = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_TESTING_OF_KEY = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const SAAS: ChatbotIndustryData = {
  hero: {
    line1: "AI chatbots that onboard users, answer",
    line2: <>product questions, and qualify <span className="grad-text">leads.</span></>,
    lead: <>A chatbot for your SaaS that helps prospects understand your product, guides new users through onboarding, automates routine support, <strong>and points people to the right docs, on your site or in-app.</strong></>,
    primaryLabel: "Get your SaaS chatbot",
    secondary: { label: "See how it works ↓", href: "#process" },
    card: {
      ariaLabel: "A SaaS chatbot answering a product question inside an app",
      live: "In-app chat",
      corner: "SITE & IN-PRODUCT",
      botName: "Product Assistant",
      botStatus: "Online · answers from your docs",
      bubbles: [
        { from: "them", text: "How do I connect Slack to my account?" },
        { from: "bot", text: "Go to Settings → Integrations → Slack, then click Connect and approve access. Want me to open the step-by-step guide?" },
        { from: "them", text: "Thanks. Also, why was I billed twice this month?" },
        { from: "bot", text: "That one’s account-specific, so I’ll pass you to support, who can look at your billing securely, and share this chat so you don’t repeat yourself." },
      ],
      footLeft: "Onboard, answer, qualify",
      footRight: "help across the lifecycle →",
    },
  },
  trust: ["Faster answers to product questions", "Onboarding guidance for new users", "Support for routine, repetitive tickets", "Lead capture and qualification"],
  why: {
    eyebrow: "Why SaaS businesses need chatbots", heading: "The gap between a question and an answer is where users drop off.",
    paragraphs: [
      <>Prospects have questions before they’ll sign up: does it integrate, does it do X, what’s in each plan. <strong>If those go unanswered, they leave the trial and don’t come back.</strong></>,
      "New users get stuck during onboarding. The faster they reach their first win, the more they stick. Meanwhile your team answers the same how-to questions over and over, even though the answer is already in your docs, where users didn’t think to look.",
      <>A <a href="/ai-automation/ai-chatbots">SaaS chatbot</a> handles the predictable, high-volume part: <strong>product answers, onboarding guidance, the right doc on demand, and account-specific issues routed to your team.</strong> It won’t replace your product or people: it closes the gap where users stall.</>,
    ],
    glance: [
      "Answers product questions instantly",
      "Guides new users through onboarding",
      "Deflects repetitive support tickets",
      "Surfaces the right docs on demand",
      "Captures and qualifies leads",
    ],
    chips: [
      "Does it integrate with Slack?",
      "How do I set up single sign-on?",
      "What’s included in the Pro plan?",
      "Where do I find my API key?",
      "How do I invite my team?",
    ],
  },
  capabilities: {
    eyebrow: "Built around your product", heading: "What your chatbot does depends on your product, users, and where they get stuck, not a template.",
    cards: [
      {
        label: "A · Product",
        icon: ICON_PRODUCT_QUESTIONS_FEATURES,
        title: "Product questions & features",
        text: "Answers what your software does, before sign-up and inside the product, so no one’s left guessing.",
        items: ["Explains features and what each plan includes", "Answers integration and compatibility questions", "Clarifies how specific functionality works"],
      },
      {
        label: "B · Onboarding",
        icon: ICON_USER_ONBOARDING_GUIDANCE,
        title: "User onboarding guidance",
        text: "Helps new users get set up and reach their first result faster, where activation and retention are won.",
        items: ["Walks users through setup steps", "Points to the right action at the right moment", "Surfaces onboarding docs and guides on demand"],
      },
      {
        label: "C · Support",
        icon: ICON_SUPPORT_AUTOMATION,
        title: "Support automation",
        text: "Handles routine how-to and troubleshooting, and routes complex or account-specific issues to your team.",
        items: ["Answers common how-to and FAQ questions", "Pulls answers from your knowledge base (source-dependent)", "Hands off for anything it shouldn’t answer"],
      },
      {
        label: "D · Leads",
        icon: ICON_LEAD_CAPTURE_QUALIFICATION,
        title: "Lead capture & qualification",
        text: "Turns interested visitors into qualified leads and routes them to sales with context attached.",
        items: ["Captures contact details and use case", "Asks about team size, plan interest, and needs", "Passes qualified leads to CRM or sales (integration)"],
      },
    ],
  },
  touchpoints: {
    eyebrow: "Where your chatbot will help", heading: "We design for the whole lifecycle, not just one stage.",
    stackHead: "Your SaaS Chatbot",
    layers: [
      { icon: ICON_WEBSITE_VISITORS, title: "Website visitors", items: ["Feature and integration questions", "Plan and “what’s included” questions", "Pointers to demos, docs, or sales"] },
      { icon: ICON_USER_ONBOARDING_GUIDANCE, title: "Trial & new users", items: ["Setup and configuration help", "Guidance to first value during onboarding", "Answers that keep users moving"] },
      { icon: ICON_EXISTING_CUSTOMERS, title: "Existing customers", items: ["How-to and feature questions", "Finding the right setting, doc, or guide", "Routing account-specific issues to support"] },
      { icon: ICON_SUPPORT_SUCCESS_TEAMS, title: "Support & success teams", items: ["Deflection of repetitive FAQ tickets", "Initial triage and detail-gathering", "Routing complex issues to the right person"] },
    ],
  },
  readiness: {
    eyebrow: "The chatbot readiness test", heading: "A capable SaaS chatbot should pass all six.",
    tests: [
      { title: "Product questions", text: "Can it answer real, current questions about your product and plans?", example: "“Does the Starter plan include the API?” should get an accurate, up-to-date answer." },
      { title: "Onboarding guidance", text: "Can it help a new user get unstuck during setup?", example: "“How do I connect my data source?” should walk the user through, not just link out." },
      { title: "Doc & knowledge retrieval", text: "Does it pull from your current documentation?", example: "Answers should reflect your latest docs, not an outdated or guessed version." },
      { title: "Help-desk handover", text: "Does it route account-specific or complex issues to a person?", example: "“Why was I charged twice?” should go to authenticated support, never a guessed answer." },
      { title: "In-app & mobile", text: "Does it work where your users actually are?", example: "The chat should function cleanly in-app and on mobile, not just the marketing site." },
      { title: "Integration readiness", text: "Are the right connections in place for docs, help desk, and CRM?", example: "Lead routing and knowledge answers only work if those systems are connected." },
    ],
  },
  discovery: {
    eyebrow: "What we ask before building", heading: "A short discovery conversation keeps the project focused.",
    questions: [
      { title: "Who are your users, and buyers?", text: "In B2B SaaS the person asking isn’t always the one paying. Knowing both shapes the conversations." },
      { title: "What does your product do?", text: "Your core features, plans, and integrations determine what the chatbot explains and how." },
      { title: "Which questions eat your team’s time?", text: "The repetitive tickets are usually the best place for a chatbot to start." },
      { title: "Where do users get stuck?", text: "Mapping the friction tells us where to focus: onboarding, specific features, setup." },
      { title: "Which tools do you use?", text: "Your help desk, CRM, docs or knowledge base, and auth determine possible integrations." },
      { title: "What should it achieve?", text: "Ticket deflection, faster activation, or more qualified leads: keeps the build measurable." },
    ],
  },
  process: {
    eyebrow: "How it comes together", heading: "A focused process with clear checkpoints.",
    steps: [
      { title: "Discovery", text: "We learn your product, users, the tickets that take the most time, and what you want to achieve.", output: "Requirements & direction" },
      { title: "Conversation planning", text: "We map questions, onboarding journeys, and the points where a chat should move to a person.", output: "Conversation flow plan" },
      { title: "Knowledge & integration planning", text: "Docs, FAQs, and product info, plus help-desk, CRM, or knowledge-base integrations.", output: "Knowledge & integration plan" },
      { title: "Development & testing", text: "We build and test responses, checking the journeys that matter: onboarding and handover.", output: "Tested chatbot solution" },
      { title: "Launch & improvement", text: "We support launch, hand over, and recommend improvements from real chats.", output: "Launch-ready + recommendations" },
    ],
  },
  present: {
    eyebrow: "How we present & test", heading: "You see it the way your users will, including how it handles what it shouldn’t answer.",
    steps: [
      { when: "First", title: "The use case", text: "The user problem the chatbot is meant to solve, so every conversation has a clear purpose." },
      { when: "Then", title: "The conversation", text: "How it responds to a realistic question: judge the tone and the answer." },
      { when: "Next", title: "In context", text: "How that conversation sits on your site or in-app, so it fits how users work." },
      { when: "Finally", title: "Feedback & refinement", text: "You review and request changes; approved updates built in before launch." },
    ],
    conversation: [
      { from: "them", text: "How do I connect Slack to my account?" },
      { from: "bot", text: "Go to Settings → Integrations → Slack, then click Connect and approve access. Want me to open the step-by-step guide?" },
      { from: "them", text: "Thanks. Also, why was I billed twice this month?" },
      { from: "bot", text: "That one’s account-specific, so I’ll pass you to our support team, who can look at your billing securely. I’ll share this conversation so you don’t have to repeat yourself." },
    ],
  },
  features: {
    eyebrow: "Features & deliverables", heading: "What a chatbot can include, and what each one needs.",
    rows: [
      { feature: "AI conversations", purpose: "Understand and respond in natural language", notes: "Quality depends on info provided" },
      { feature: "Product & feature answers", purpose: "Help prospects and users understand your product", notes: "Needs accurate, up-to-date info" },
      { feature: "Onboarding guidance", purpose: "Help new users reach first value", notes: "Based on your onboarding steps and docs" },
      { feature: "Docs / knowledge retrieval", purpose: "Surface the right answer from your content", notes: "Requires a connected, current source" },
      { feature: "Routine support automation", purpose: "Deflect repetitive how-to tickets", notes: "Scope agreed during planning" },
      { feature: "Lead capture & qualification", purpose: "Turn visitors into qualified leads", notes: "Qualification rules agreed with you" },
      { feature: "Help-desk handover", purpose: "Route complex or account issues to support", notes: "Requires help-desk integration" },
      { feature: "CRM integration", purpose: "Send qualified leads into your pipeline", notes: "Subject to CRM access" },
      { feature: "In-app deployment", purpose: "Meet users inside your product", notes: "Depends on your app and front-end" },
      { feature: "Conversation testing", purpose: "Check key journeys before launch", notes: "Includes onboarding & handover cases" },
    ],
  },
  qualities: {
    eyebrow: "What makes an effective chatbot", heading: "Qualities we design toward on every project.",
    items: [
      { icon: ICON_HELPFUL, title: "Helpful", text: "Answers product and support questions users can act on." },
      { icon: ICON_ACCURATE, title: "Accurate", text: "Draws on current, approved docs and product info." },
      { icon: ICON_EASY_TO_USE, title: "Easy to use", text: "Simple to reach an answer, on your site or in-app." },
      { icon: ICON_RELEVANT, title: "Relevant", text: "Responds to what the user asked, in their product context." },
      { icon: ICON_CONNECTED, title: "Connected", text: "Uses integrations when docs, help desk, or CRM are needed." },
      { icon: ICON_FLEXIBLE, title: "Flexible", text: "Reviewed and improved as your product and docs evolve." },
    ],
    note: { icon: "warn", text: <>A chatbot is only as current as the information behind it, and no AI is right every time. Account-specific questions (billing, private data), complex technical issues, and anything sensitive should route to a person or your help desk. <b>We design that handover in from the start, and accuracy depends on keeping your docs up to date.</b></> },
  },
  mistakes: {
    eyebrow: "Common mistakes", heading: "Common SaaS chatbot mistakes.",
    rows: [
      { problem: "Outdated product or feature info", fix: "Connect to current docs; keep answers in sync with releases." },
      { problem: "Generic or irrelevant responses", fix: "Design conversations around your real product questions." },
      { problem: "No onboarding focus", fix: "Map the activation journey and guide users to first value." },
      { problem: "No route to support or help desk", fix: "Set a clear handover path for complex issues." },
      { problem: "Answering account-specific questions it can’t verify", fix: "Route billing and private-data questions to authenticated support." },
      { problem: "Unclear integration requirements", fix: "Confirm docs, help-desk, and CRM feasibility upfront." },
    ],
  },
  who: {
    eyebrow: "Who it’s for", heading: "Who SaaS chatbot solutions are for.",
    items: [
      { icon: ICON_PRODUCT_QUESTIONS_FEATURES, title: "SaaS companies & startups", text: "Teams whose growth outpaces their support and success capacity.", useCase: "Answering trial users’ setup questions so more of them activate." },
      { icon: ICON_B2B_SOFTWARE_BUSINESSES, title: "B2B software businesses", text: "Products with a sales-assisted motion where leads need qualifying before a demo.", useCase: "Qualifying a prospect by team size and use case, then routing to sales." },
      { icon: ICON_FLEXIBLE, title: "Subscription platforms", text: "Platforms with ongoing users who need quick, self-serve answers to keep working.", useCase: "Helping a user find the right setting without opening a ticket." },
      { icon: ICON_SUPPORT_SUCCESS_TEAMS, title: "Product & success teams", text: "Teams that want to deflect routine questions and focus on high-value accounts.", useCase: "Auto-answering how-tos and escalating complex issues with context." },
      { icon: ICON_SAAS_SCALING_SUPPORT, title: "SaaS scaling support", text: "Businesses whose ticket volume is rising faster than headcount.", useCase: "Deflecting repetitive FAQ tickets so support handles the ones that truly need a person." },
    ],
  },
  included: {
    eyebrow: "What’s included", heading: "A project can include any of these, depending on your needs.",
    items: [
      { icon: ICON_DISCOVERY_AND_REQUIREMENTS, text: "Discovery and requirements discussion" },
      { icon: ICON_RELEVANT, text: "User and ticket analysis" },
      { icon: ICON_CONVERSATION_AND_ONBOARDING_, text: "Conversation and onboarding-flow planning" },
      { icon: ICON_DOCS_AND_KNOWLEDGE, text: "Docs and knowledge base preparation" },
      { icon: ICON_CHATBOT_CONFIGURATION_OR, text: "Chatbot configuration or development" },
      { icon: ICON_CONNECTED, text: "Integrations, where agreed (help desk, CRM, knowledge base)" },
      { icon: ICON_LEAD_CAPTURE_QUALIFICATION, text: "Lead capture and qualification setup" },
      { icon: ICON_TESTING_OF_KEY, text: "Testing of key conversation flows" },
      { icon: ICON_DISCOVERY_AND_REQUIREMENTS, text: "Launch support" },
      { icon: ICON_DOCS_AND_KNOWLEDGE, text: "Documentation, handover & improvement recommendations" },
    ],
  },
  faq: {
    eyebrow: "Common questions", heading: "Asked before every chatbot.",
    items: [
      { q: "What is a SaaS chatbot?", a: <>An automated assistant on your website or inside your product that answers questions in a conversation, explaining features, guiding onboarding, answering routine support, surfacing docs, and <strong>qualifying leads.</strong></> },
      { q: "Can it help with user onboarding?", a: <>Yes. It can guide new users through setup, answer questions at the moment they’re stuck, and point to the right docs. <strong>How much it helps depends on how clearly your onboarding steps are defined.</strong></> },
      { q: "Can it answer product & feature questions?", a: <>Yes, within the limits of the information it’s given. <strong>Its answers are only as reliable as the product info and docs behind it,</strong> so keeping those updated matters.</> },
      { q: "Can it pull answers from our docs?", a: <>Yes, when connected to a current, reliable knowledge source. It can surface relevant answers rather than guessing. <strong>Without it, the chatbot is limited to information it’s been given directly.</strong></> },
      { q: "Can it qualify and route leads?", a: <>Yes. It can capture contact details and use case, ask about team size and plan interest, and <strong>pass qualified leads to your CRM or sales team where that integration is in place.</strong></> },
      { q: "Will it replace my support team?", a: <>No. It handles routine, high-volume questions and gathers context, but complex and account-specific issues route to a person. <strong>It supports your team, it doesn’t replace them.</strong></> },
      { q: "How much does it cost?", a: <>Cost depends on scope: conversations, integrations, and how much is built versus configured. <strong>We share clear pricing on the free call</strong> once we understand your needs.</> },
      { q: "How long does implementation take?", a: <>It depends on scope, integrations, and how your docs and systems are set up. <strong>We give a realistic timeline once discovery is complete,</strong> rather than quoting a date upfront.</> },
    ],
  },
  cta: {
    eyebrow: "SaaS Chatbot Solutions",
    heading: "Close the gap where users stall, and free your team.",
    copy: <>A SaaS chatbot can answer product questions, guide onboarding, automate routine support, and qualify leads, while routing account-specific issues to your team. <strong style={{ color: "#fff", fontWeight: 600 }}>Let’s talk through where it would help your product most.</strong></>,
    primaryLabel: "Discuss your SaaS chatbot",
  },
};
