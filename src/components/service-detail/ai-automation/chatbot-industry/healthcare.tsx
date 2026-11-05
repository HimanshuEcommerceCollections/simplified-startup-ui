import type { ChatbotIndustryData } from "./ChatbotIndustryView";

const ICON_APPOINTMENT_REQUESTS = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_CLINIC_INFORMATION = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_REMINDERS_ROUTINE_ADMIN = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_PATIENT_SUPPORT_NON_CLINICAL = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M8 10h8M8 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_WEBSITE_VISITORS = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_PROSPECTIVE_PATIENTS = (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_EXISTING_PATIENTS = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M9 4V2h6v2M9 10h6M9 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_RECEPTION_ADMIN_TEAMS = (
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
const ICON_MEDICAL_DENTAL_PRACTICES = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_CLINICS_OUTPATIENT_CENTRES = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V8l7-5 7 5v13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M12 8v4M10 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_HOSPITALS_HEALTH_SYSTEMS = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M9 8V5a3 3 0 0 1 6 0v3M10 14h4M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_HEALTHCARE_SERVICE_BUSINESSE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_DISCOVERY_REQUIREMENTS_AND = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
const ICON_CONVERSATION_PLANNING = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 3v6a3 3 0 0 0 3 3h6M18 9l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_FAQ_AND_KNOWLEDGE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_CLINICAL_BOUNDARY_AND_EMERGE = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const ICON_CHATBOT_CONFIGURATION_OR = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_A_DATA_HANDLING_APPROACH = (
  <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" /></svg>
);
const ICON_TESTING_OF_KEY = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V7l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ICON_LAUNCH_SUPPORT_HANDOVER = (
  <svg viewBox="0 0 24 24" fill="none"><path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const HEALTHCARE: ChatbotIndustryData = {
  hero: {
    line1: "AI chatbots that help patients book,",
    line2: <>ask, and find <span className="grad-text">information.</span></>,
    lead: <>A chatbot for your practice that helps patients request appointments, find clinic information, get reminders, and ask routine questions, <strong>with a clear route to your team for anything clinical.</strong></>,
    primaryLabel: "Get your healthcare chatbot",
    secondary: { label: "See how it works ↓", href: "#process" },
    card: {
      ariaLabel: "A healthcare chatbot helping a patient with a routine admin question",
      live: "Clinic chat",
      corner: "ADMIN ONLY",
      botName: "Clinic Assistant",
      botStatus: "Online · routine questions",
      bubbles: [
        { from: "them", text: "Hi, can I book a check-up for next week?" },
        { from: "bot", text: "Of course. We have morning and afternoon slots next week. Shall I pass your request to reception with your preferred day and time?" },
        { from: "them", text: "Yes, Thursday morning." },
        { from: "bot", text: "Noted Thursday morning. I’ll pass that to reception. For anything clinical, it’s best to speak with a clinician." },
      ],
      disclaimer: "Admin support only · not for diagnosis, medical advice, or emergencies",
      footLeft: "Helpful on admin, clear on limits",
      footRight: "clinical goes to your team →",
    },
  },
  trust: ["Faster answers to routine questions", "Appointment request assistance", "Clinic information on demand", "Clear handover to your team"],
  why: {
    eyebrow: "Why healthcare businesses need chatbots", heading: "Your front desk spends much of its day on the same routine questions.",
    paragraphs: [
      <>Patients call to ask your opening hours, how to book, where you’re located, and what to bring. Simple questions, but they tie up the phone and <strong>leave patients on hold while reception looks after people in the waiting room.</strong></>,
      "After hours, those questions don’t stop; they go unanswered until morning, and your team starts the day with a backlog of voicemails.",
      <><a href="/ai-automation/ai-chatbots">A chatbot</a> helps with the routine, administrative part: <strong>instant answers, appointment requests, and anything clinical or sensitive routed to your team.</strong> It handles admin, not care.</>,
    ],
    glance: [
      "Answers routine admin questions instantly",
      "Helps patients request appointments",
      "Reduces repetitive front-desk calls",
      "Shares clinic information on demand",
      "Routes clinical and sensitive matters to staff",
    ],
    safety: { title: "A chatbot is not a substitute for a clinician.", text: "It does not diagnose, give medical advice, or handle emergencies. Anyone with an urgent or emergency concern should be directed to call emergency services or contact a healthcare professional." },
    chips: [
      "What are your opening hours?",
      "How do I book an appointment?",
      "Where are you located, and is there parking?",
      "What should I bring to my appointment?",
      "Do you offer this service?",
    ],
  },
  capabilities: {
    eyebrow: "Built around your practice", heading: "We build around your admin workflow, and keep clear boundaries around anything clinical.",
    cards: [
      {
        label: "A · Appointments",
        icon: ICON_APPOINTMENT_REQUESTS,
        title: "Appointment requests",
        text: "Helps patients start, reschedule, or cancel requests, then routes them to your booking system or team.",
        items: ["Captures requests and preferred times", "Routes to booking system (integration-dependent)", "Passes to reception when not connected"],
      },
      {
        label: "B · Info",
        icon: ICON_CLINIC_INFORMATION,
        title: "Clinic information",
        text: "Answers the practical questions patients ask most, so they don’t have to call to find out.",
        items: ["Opening hours, location, parking, directions", "Services offered and how to register", "What to bring or prepare"],
      },
      {
        label: "C · Reminders",
        icon: ICON_REMINDERS_ROUTINE_ADMIN,
        title: "Reminders & routine admin",
        text: "Supports reminders and routine pre-visit admin where the right integration and patient consent are in place.",
        items: ["Reminders (integration- & consent-dependent)", "Pointers to forms and registration steps", "General pre-visit information"],
      },
      {
        label: "D · Support",
        icon: ICON_PATIENT_SUPPORT_NON_CLINICAL,
        title: "Patient support (non-clinical)",
        text: "Handles routine, non-clinical questions and routes anything medical, urgent, or sensitive to your team.",
        items: ["Answers FAQs on process, documents, admin", "Recognises clinical questions, defers to staff", "Offers a clear route to a person when needed"],
      },
    ],
  },
  touchpoints: {
    eyebrow: "Where your chatbot will help", heading: "We design for real touchpoints, while keeping clinical matters with your team.",
    stackHead: "Your Healthcare Chatbot",
    layers: [
      { icon: ICON_WEBSITE_VISITORS, title: "Website visitors", items: ["Services, hours, and location", "How to register or get started", "First answers before they call"] },
      { icon: ICON_PROSPECTIVE_PATIENTS, title: "Prospective patients", items: ["What you offer and how booking works", "General “what to expect” info", "How to request an appointment"] },
      { icon: ICON_EXISTING_PATIENTS, title: "Existing patients", items: ["Appointment requests & reminders (integration)", "Forms, registration, document questions", "Routine updates on process"] },
      { icon: ICON_RECEPTION_ADMIN_TEAMS, title: "Reception & admin teams", items: ["FAQs handled automatically", "Initial handling of routine admin", "Routing clinical or urgent matters"] },
    ],
  },
  readiness: {
    eyebrow: "The chatbot readiness test", heading: "For healthcare, the safety-related tests matter as much as the convenience ones.",
    tests: [
      { title: "Routine questions", text: "Can it accurately answer practical questions about your practice?", example: "“What do I need for my first appointment?” should give correct, current info." },
      { title: "Appointment handling", text: "Does it capture appointment requests cleanly and route them properly?", example: "“I’d like to book next week” should reach your booking system or reception without detail loss." },
      { title: "Clinical boundaries", text: "Does it recognise medical questions and decline, deferring to staff?", example: "“Is this rash serious?” should route to a clinician, never receive a medical opinion." },
      { title: "Emergency handover", text: "Does it recognise urgent language and direct people to the right help?", example: "“I’m having chest pain” should prompt the patient to call emergency services immediately." },
      { title: "Mobile & accessibility", text: "Does it work well on a phone and for patients with varying needs?", example: "Clear text, easy input, and readable contrast on a small screen." },
      { title: "Privacy & integration", text: "Is patient information handled appropriately, with the right connections in place?", example: "Any data captured is handled per your confirmed privacy and security requirements." },
    ],
  },
  discovery: {
    eyebrow: "What we ask before building", heading: "A short discovery conversation keeps the project focused and safe.",
    questions: [
      { title: "Who are your patients?", text: "Knowing who’s contacting you helps us design clear, accessible conversations." },
      { title: "What services do you offer?", text: "Your services determine what the chatbot explains and how it routes requests." },
      { title: "Which questions eat your team’s time?", text: "The routine ones your reception answers on repeat are the best place to start." },
      { title: "Where do patients need help?", text: "Finding info, booking, or pre-visit admin: this tells us where to focus." },
      { title: "Which systems do you use?", text: "Your booking system and privacy requirements determine possible integrations." },
      { title: "What must it never do?", text: "We set clear boundaries so it never strays into clinical advice or emergencies." },
    ],
  },
  process: {
    eyebrow: "How it comes together", heading: "A focused process with clear checkpoints.",
    steps: [
      { title: "Discovery", text: "We learn your services, patients, and what the chatbot should achieve and avoid.", output: "Requirements & boundaries" },
      { title: "Conversation planning", text: "We map questions, journeys, and the points where a chat must move to staff.", output: "Conversation flow plan" },
      { title: "Knowledge & integration planning", text: "Clinic info, FAQs, integrations needed, and how data will be handled.", output: "Knowledge & data plan" },
      { title: "Development & testing", text: "We build and test responses, including clinical-boundary and emergency cases.", output: "Tested chatbot solution" },
      { title: "Launch & improvement", text: "We support launch, hand over, and recommend improvements from real chats.", output: "Launch-ready + recommendations" },
    ],
  },
  present: {
    eyebrow: "How we present & test", heading: "You see it the way your patients will, including how it handles questions it should not answer.",
    steps: [
      { when: "First", title: "The use case", text: "The patient problem the chatbot is meant to solve, appropriately." },
      { when: "Then", title: "The conversation", text: "How it responds to a realistic question: judge tone, answer, and boundaries." },
      { when: "Next", title: "In context", text: "How that conversation sits inside your website or another channel." },
      { when: "Finally", title: "Feedback & refinement", text: "You review and request changes; approved updates built in before launch." },
    ],
    conversation: [
      { from: "them", text: "Hi, can I book a check-up for next week?" },
      { from: "bot", text: "Of course. We have morning and afternoon slots. Would you like me to pass your request to reception with your preferred day and time?" },
      { from: "them", text: "Yes, Thursday morning. Also, I’ve had a sore throat for days. What should I take?" },
      { from: "bot", text: "I’ve noted Thursday morning and will pass that to reception. I can’t give medical advice, though. For your sore throat, it’s best to speak with a clinician. Shall I flag this when I send your request?" },
    ],
    note: { icon: "warn", text: <>Helpful on admin, and clear about its limits. <b>If a patient describes an emergency, the chatbot is set up to direct them to call emergency services immediately.</b></> },
  },
  features: {
    eyebrow: "Features & deliverables", heading: "What a chatbot can include, and what each one needs.",
    rows: [
      { feature: "AI conversations", purpose: "Understand and respond to routine questions", notes: "Quality depends on info provided" },
      { feature: "Clinic information", purpose: "Answer hours, location, services, prep", notes: "Needs accurate practice info" },
      { feature: "Appointment handling", purpose: "Help patients request or reschedule", notes: "Routing is integration-dependent" },
      { feature: "Reminders & admin", purpose: "Support reminders and pre-visit steps", notes: "Integration- & consent-dependent" },
      { feature: "FAQ automation", purpose: "Answer repetitive questions instantly", notes: "Built from your approved FAQs" },
      { feature: "Boundary & emergency routing", purpose: "Keep the chatbot within safe limits", notes: "Defers medical; directs emergencies" },
      { feature: "Human handover", purpose: "Route clinical or sensitive matters to staff", notes: "Needs a defined handover path" },
      { feature: "System integration", purpose: "Connect to your existing systems", notes: "Subject to access & privacy rules" },
      { feature: "Conversation testing", purpose: "Check key journeys, including boundary cases", notes: "Scope agreed in planning" },
      { feature: "Documentation", purpose: "Give your team what they need to run it", notes: "Provided at project close" },
    ],
    note: { icon: "privacy", text: <><b>Privacy note:</b> any handling of patient information must meet your organisation’s privacy and security obligations. Specific regulatory requirements are confirmed with your team before build.</> },
  },
  qualities: {
    eyebrow: "What makes an effective chatbot", heading: "Qualities we design toward on every project.",
    items: [
      { icon: ICON_HELPFUL, title: "Helpful", text: "Answers routine questions clearly and in plain language." },
      { icon: ICON_ACCURATE, title: "Accurate", text: "Draws on current, approved practice information." },
      { icon: ICON_EASY_TO_USE, title: "Easy to use", text: "Accessible for patients of varying comfort with tech." },
      { icon: ICON_RELEVANT, title: "Relevant", text: "Responds to what the patient asked, within admin boundaries." },
      { icon: ICON_CONNECTED, title: "Connected", text: "Uses integrations when booking or live info is needed." },
      { icon: ICON_FLEXIBLE, title: "Flexible", text: "Reviewed and improved as your services change." },
    ],
    note: { icon: "shield", text: <>A healthcare chatbot must know its limits. <b>It should never diagnose, give medical advice, or handle emergencies.</b> Clinical questions, urgent concerns, and sensitive issues must always route to a person, and emergencies should prompt the patient to call emergency services. Patient information must be handled in line with your organisation’s privacy and security requirements.</> },
  },
  mistakes: {
    eyebrow: "Common mistakes", heading: "Common healthcare chatbot mistakes.",
    rows: [
      { problem: "Giving medical advice or diagnosis", fix: "Strict clinical boundaries; defer all medical questions." },
      { problem: "Not recognising an emergency", fix: "Emergency language detection that directs to urgent help." },
      { problem: "Outdated clinic information", fix: "Keep hours, services, and policies current and reviewed." },
      { problem: "No route to a human", fix: "Clear handover path for clinical or sensitive matters." },
      { problem: "Mishandling patient data", fix: "Design for privacy; confirm security & regulatory needs." },
      { problem: "Inadequate testing", fix: "Test key journeys, including boundary and emergency cases." },
    ],
  },
  who: {
    eyebrow: "Who it’s for", heading: "Who healthcare chatbot solutions are for.",
    items: [
      { icon: ICON_MEDICAL_DENTAL_PRACTICES, title: "Medical & dental practices", text: "Practices whose reception fields the same booking and info questions all day.", useCase: "Answering “how do I book?” and passing the request to reception." },
      { icon: ICON_CLINICS_OUTPATIENT_CENTRES, title: "Clinics & outpatient centres", text: "Clinics with steady patient admin and limited front-desk capacity.", useCase: "Sharing prep instructions so patients arrive ready." },
      { icon: ICON_HOSPITALS_HEALTH_SYSTEMS, title: "Hospitals & health systems", text: "Large providers needing to route general enquiries to the right department.", useCase: "Directing visitors to the right service, without clinical advice." },
      { icon: ICON_PROSPECTIVE_PATIENTS, title: "Specialist practices", text: "Specialists who answer recurring questions about services and referrals.", useCase: "Explaining your referral and registration process." },
      { icon: ICON_HEALTHCARE_SERVICE_BUSINESSE, title: "Healthcare service businesses", text: "Physiotherapy, optometry, and similar with admin-heavy front desks.", useCase: "Answering hours, pricing-structure, and booking questions." },
    ],
  },
  included: {
    eyebrow: "What’s included", heading: "A project can include any of these, depending on your needs.",
    items: [
      { icon: ICON_DISCOVERY_REQUIREMENTS_AND, text: "Discovery, requirements, and boundary discussion" },
      { icon: ICON_RELEVANT, text: "Patient question analysis" },
      { icon: ICON_CONVERSATION_PLANNING, text: "Conversation planning" },
      { icon: ICON_FAQ_AND_KNOWLEDGE, text: "FAQ and knowledge base preparation" },
      { icon: ICON_CLINICAL_BOUNDARY_AND_EMERGE, text: "Clinical-boundary and emergency-routing setup" },
      { icon: ICON_CHATBOT_CONFIGURATION_OR, text: "Chatbot configuration or development" },
      { icon: ICON_CONNECTED, text: "Integrations, where agreed (booking / practice mgmt)" },
      { icon: ICON_A_DATA_HANDLING_APPROACH, text: "A data-handling approach aligned to your privacy" },
      { icon: ICON_TESTING_OF_KEY, text: "Testing of key flows, including boundary cases" },
      { icon: ICON_LAUNCH_SUPPORT_HANDOVER, text: "Launch support, handover & recommendations" },
    ],
  },
  faq: {
    eyebrow: "Common questions", heading: "Asked before every chatbot.",
    items: [
      { q: "What is a healthcare chatbot?", a: <>An automated assistant on your website that helps patients with administrative tasks: answering routine questions, sharing clinic info, helping request appointments, and <strong>routing clinical or urgent matters to your team. It supports admin. It does not provide medical care.</strong></> },
      { q: "Can it book appointments?", a: <>It can help patients request and reschedule. Live booking depends on an integration. <strong>Where that isn’t in place, it captures the request and passes it to reception</strong>, so nothing is lost.</> },
      { q: "Can a chatbot answer medical questions?", a: <>No. It does not diagnose or give medical advice. <strong>It is designed to recognise clinical questions and route them to a clinician</strong>: medical judgement should always come from a qualified professional.</> },
      { q: "What happens in an emergency?", a: <>A healthcare chatbot is not for emergencies. <strong>It recognises urgent language and directs the person to call emergency services</strong> or seek immediate help, and this routing is tested before launch.</> },
      { q: "Is patient data kept private and secure?", a: <>Patient information must be handled in line with your organisation’s privacy and security obligations, confirmed before build. <strong>We design with privacy in mind but don’t make blanket compliance claims</strong>. Data handling is agreed with your team and, where needed, your legal advisor.</> },
      { q: "Can it integrate with my booking system?", a: <>Often possible, but it depends on the system, access, your setup, and privacy requirements. <strong>We confirm what’s technically and appropriately feasible during discovery.</strong></> },
      { q: "Will it replace my staff or clinicians?", a: <>No. It handles routine admin and gathers context, but <strong>clinical care, judgement, and sensitive conversations stay with your people.</strong> It supports your staff, it doesn’t replace them.</> },
      { q: "How much does it cost?", a: <>Cost depends on scope: conversations, integrations, privacy requirements, and build versus configure. <strong>We share clear pricing on the free call</strong> once we understand your needs.</> },
    ],
  },
  cta: {
    eyebrow: "Healthcare Chatbot Solutions",
    heading: "Take routine admin off your front desk, safely.",
    copy: <>A healthcare chatbot can answer routine questions, help patients request appointments, and share clinic information, while routing anything clinical, urgent, or sensitive to your team. <strong style={{ color: "#fff", fontWeight: 600 }}>Let’s talk through where it would help your practice most.</strong></>,
    primaryLabel: "Discuss your healthcare chatbot",
  },
};
