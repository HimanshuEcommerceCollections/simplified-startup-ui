export type FaqItem = { q: string; a: string };
export type FaqCategory = { key: string; label: string; num: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    key: "general",
    label: "General",
    num: "01",
    items: [
      {
        q: "What is Simplified Startup?",
        a: "We're a digital marketing agency that helps businesses grow online — SEO, ads, social media, websites, AI automation, and more. The whole idea is simple: show prices openly, do great work, and skip the sales games.",
      },
      {
        q: "Where are you based?",
        a: "We're based in the Raleigh–Cary area of North Carolina, and we work with clients across the country.",
      },
      {
        q: "What size businesses do you work with?",
        a: "Mostly small and mid-sized businesses — from brand-new startups to established local companies with several locations. If your business fits somewhere in that range, we can help.",
      },
      {
        q: "What industries do you work with?",
        a: "A wide range: realtors, lawyers, therapists, dentists, doctors, restaurants, salons, gyms, home services, e-commerce, and more. We have dedicated pages for each industry we support.",
      },
      {
        q: "What makes you different from other agencies?",
        a: "Two things. First, our prices are shown publicly — no “book a call to hear our rates.” Second, we lead with AI and automation, so we can do more work faster without cutting quality.",
      },
    ],
  },
  {
    key: "services",
    label: "Services",
    num: "02",
    items: [
      {
        q: "What services do you offer?",
        a: "Pretty much every marketing service: SEO, Google Ads, social media, website design, branding, email marketing, lead generation, AI automation, and more. See the full list on the Services page.",
      },
      {
        q: "Can I buy just one service, or do I have to pick a package?",
        a: "Both work. You can buy any service on its own, pick a bundle (a few related services grouped together), or choose a full package for a bundle discount.",
      },
      {
        q: "Do you offer accounting or bookkeeping?",
        a: "Not yet — it's listed as “coming soon” and we'll launch it once we have the right team in place.",
      },
      {
        q: "Do you build websites?",
        a: "Yes. We build fast, mobile-friendly websites, single landing pages, and full e-commerce stores. Website design is one of our core services.",
      },
      {
        q: "Can you handle just my Google Business Profile or reviews?",
        a: "Yes — individual services like Google Business Profile setup and review management can be booked on their own.",
      },
      {
        q: "Do you do AI-related work?",
        a: "Yes, and it's a focus for us. AI automation, chatbots, workflow automation, and getting your business mentioned inside AI tools like ChatGPT are all services we offer.",
      },
    ],
  },
  {
    key: "pricing",
    label: "Pricing",
    num: "03",
    items: [
      {
        q: "Where can I see your prices?",
        a: "On every service page and on our main Pricing page. Every service and package has a clear price — no hidden fees, no gotcha upsells.",
      },
      {
        q: "Why do you show your prices publicly when most agencies don't?",
        a: "Because we think it's the right thing to do. It respects your time, and it means the people who reach out already know what things cost — so conversations get straight to the point.",
      },
      {
        q: "Do you charge monthly or one-time?",
        a: "Both. Some services (like SEO or social media management) are monthly; others (like a logo or a one-time website build) are one-time. The pricing on each service page makes it clear.",
      },
      {
        q: "Do bundles or packages save money?",
        a: "Yes — packages come with roughly a 20% discount compared to buying each service on its own.",
      },
    ],
  },
  {
    key: "start",
    label: "Getting Started",
    num: "04",
    items: [
      {
        q: "How do I get started with Simplified Startup?",
        a: "Book a free strategy call through our Contact page. We'll talk about your goals, recommend the right service or package, and answer any questions before you commit to anything.",
      },
      {
        q: "Is the first call really free?",
        a: "Yes — no charge, no pressure, no obligation. It's a real conversation to see if we're a good fit.",
      },
      {
        q: "What do I need to prepare before we start?",
        a: "Not much. We'll send a short intake form covering your business, goals, existing accounts, and brand assets. We handle the rest.",
      },
      {
        q: "Do I need to already have a website?",
        a: "No. If you don't have one, we can build it. If you do, we can work with it and improve it.",
      },
    ],
  },
  {
    key: "work",
    label: "How We Work",
    num: "05",
    items: [
      {
        q: "How long until I see results?",
        a: "It depends on the service. Paid ads and social media can produce results within days or weeks. SEO and content take longer — usually 3–6 months to see meaningful movement. We tell you what to expect up front.",
      },
      {
        q: "Will I be assigned a dedicated point of contact?",
        a: "Yes. You'll have a main point of contact who handles your account and coordinates the specialists working on it.",
      },
      {
        q: "How often will we communicate?",
        a: "For most clients: weekly or biweekly check-ins by email or short call, plus a monthly report. We're flexible — tell us what works.",
      },
      {
        q: "How do you report on results?",
        a: "You get a plain-language monthly report showing what we did, what changed, and what's next — no dashboard full of jargon you'd need a translator for.",
      },
      {
        q: "Do you use AI in your work?",
        a: "Yes — we use AI to speed up research, first drafts, and repetitive tasks. Our marketing team then reviews, edits, and finalizes everything. AI helps us go faster, not lower quality.",
      },
      {
        q: "Can I request changes to my strategy?",
        a: "Absolutely. Your strategy is a plan, not a contract carved in stone. If something needs to change, we adjust.",
      },
    ],
  },
  {
    key: "seo",
    label: "SEO & Marketing",
    num: "06",
    items: [
      {
        q: "What is SEO?",
        a: "Search Engine Optimization — the work that helps your website show up higher in Google's free (unpaid) search results.",
      },
      {
        q: "How long does SEO take?",
        a: "Usually 3–6 months to see meaningful movement, and 6–12 months for stronger results. Anyone promising rankings in 30 days is not being honest with you.",
      },
      {
        q: "What's the difference between SEO and Google Ads?",
        a: "SEO is free traffic from Google, but it takes time to build. Google Ads are paid — you show up immediately, but you stop showing up when the budget runs out. Most businesses do both.",
      },
      {
        q: "Do I need to be on every social media platform?",
        a: "No. Being on the right two or three platforms consistently beats being on all of them halfheartedly.",
      },
      {
        q: "What is a “money page”?",
        a: "A page built around one specific service, business type, and location — like “SEO for realtors in Raleigh.” It's designed to rank for very specific searches with strong buying intent.",
      },
      {
        q: "What is AI search / GEO?",
        a: "“GEO” is Generative Engine Optimization — the work of getting your business mentioned when someone asks ChatGPT, Gemini, Claude, or Perplexity for recommendations. It matters more every year.",
      },
    ],
  },
  {
    key: "contracts",
    label: "Contracts",
    num: "07",
    items: [
      {
        q: "Do I have to sign a long-term contract?",
        a: "No long lock-in contracts. Most services are month-to-month.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. We ask for a short notice period (usually 30 days) so we can wrap things up cleanly.",
      },
      {
        q: "What happens if I pause services and want to come back?",
        a: "You can. We keep your account details on file, and starting up again is quick.",
      },
      {
        q: "What happens to my website, content, and social accounts if we part ways?",
        a: "They're yours. We build everything under your ownership, and you keep full access to all your accounts.",
      },
    ],
  },
  {
    key: "support",
    label: "Support",
    num: "08",
    items: [
      {
        q: "I'm an existing client and need help — what's the fastest way to reach you?",
        a: "Email your account contact directly, or reply to your most recent thread. For urgent things, call the number we shared during onboarding.",
      },
      {
        q: "Can I add a new service to my existing account?",
        a: "Yes — just let your account contact know what you'd like to add and we'll set it up.",
      },
      {
        q: "How do I get access to my reports?",
        a: "Reports are emailed monthly. If you need one resent, just ask.",
      },
    ],
  },
  {
    key: "privacy",
    label: "Data & Privacy",
    num: "09",
    items: [
      {
        q: "Who owns the content and assets you create for me?",
        a: "You do. Everything we create for your business — content, designs, ad accounts, social accounts — belongs to you.",
      },
      {
        q: "What data do you collect?",
        a: "The information needed to do the work: contact info, business details, account access, and marketing performance data. We don't sell your data. See our Privacy Policy for full details.",
      },
      {
        q: "Do you share client information with third parties?",
        a: "Only with the tools we use to do the work (e.g. Google Ads, Meta, email platforms) — never for marketing or resale.",
      },
      {
        q: "Is my account access secure?",
        a: "Yes. Sensitive credentials are stored in a password manager with restricted access, and we recommend keeping ownership of critical accounts under your own login with us added as a manager.",
      },
    ],
  },
  {
    key: "careers",
    label: "Careers",
    num: "10",
    items: [
      {
        q: "Are you hiring?",
        a: "Often, yes. Check the Careers page for current openings. Even if nothing there fits, we like meeting good people early — send us a note.",
      },
      {
        q: "Do you take interns?",
        a: "Yes — we currently work with interns across marketing, SEO, and design.",
      },
    ],
  },
];

/** Category titles shown as section headings (some differ from their chip label). */
export const FAQ_CATEGORY_TITLES: Record<string, string> = {
  general: "General",
  services: "Services",
  pricing: "Pricing & Payments",
  start: "Getting Started",
  work: "How We Work",
  seo: "SEO & Marketing",
  contracts: "Contracts & Cancellation",
  support: "Support & Account",
  privacy: "Data & Privacy",
  careers: "Careers",
};

/** Chip labels (some differ from the section headings). */
export const FAQ_CHIP_LABELS: Record<string, string> = {
  general: "General",
  services: "Services",
  pricing: "Pricing",
  start: "Getting Started",
  work: "How We Work",
  seo: "SEO & Marketing",
  contracts: "Contracts",
  support: "Support",
  privacy: "Data & Privacy",
  careers: "Careers",
};
