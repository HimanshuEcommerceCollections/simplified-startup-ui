export type GlossaryTerm = { name: string; def: string };
export type GlossaryLetter = { letter: string; terms: GlossaryTerm[] };

export const GLOSSARY: GlossaryLetter[] = [
  {
    letter: "A",
    terms: [
      { name: "A/B Testing", def: "Showing two versions of something (a page, an email, an ad) to different people at the same time to see which performs better. The winner becomes the new standard." },
      { name: "AI Search", def: "When people search using AI tools like ChatGPT, Gemini, Claude, or Perplexity instead of Google. Businesses can now show up (or not) inside those AI answers." },
      { name: "Alt Text", def: "A short description of an image added to the site's code. It helps visually impaired visitors and helps Google understand the picture." },
      { name: "Analytics", def: "The data that shows how people use your website — how many visitors, where they came from, what they clicked, and what they did." },
      { name: "Anchor Text", def: "The clickable words in a link. Good anchor text describes where the link goes (e.g. “our pricing page” rather than “click here”)." },
    ],
  },
  {
    letter: "B",
    terms: [
      { name: "Backlink", def: "A link from another website to yours. Google treats backlinks a bit like recommendations — the more good ones you have, the more trusted your site looks." },
      { name: "Bounce Rate", def: "The percentage of visitors who leave after seeing only one page. A very high bounce rate can mean the page didn't match what they were looking for." },
      { name: "Branding", def: "The overall look, feel, and voice of your business — logo, colors, tone, messaging. It's how people recognize and remember you." },
      { name: "Bundle", def: "A few related services grouped together as one offer — usually easier to buy and often at a small discount vs picking each service on its own." },
    ],
  },
  {
    letter: "C",
    terms: [
      { name: "Call-to-Action (CTA)", def: "The one thing you want a visitor to do next — like “Book a Free Call” or “See Pricing.” Every good page has a clear CTA." },
      { name: "Content Marketing", def: "Creating useful articles, guides, videos, or posts that attract customers over time — instead of paying for ads." },
      { name: "Conversion", def: "When a visitor takes the action you wanted — filling out a form, buying, booking a call. Every campaign is measured by conversions." },
      { name: "Conversion Rate", def: "The percentage of visitors who convert. If 100 people visit and 3 book a call, the conversion rate is 3%." },
      { name: "CPC (Cost Per Click)", def: "How much you pay each time someone clicks one of your ads." },
      { name: "CPM (Cost Per Thousand Impressions)", def: "How much you pay to have your ad shown a thousand times, whether or not people click." },
      { name: "CRM (Customer Relationship Management)", def: "A tool for keeping track of your leads and customers — who they are, what they've asked about, and what stage they're at in your pipeline." },
      { name: "CRO (Conversion Rate Optimization)", def: "Improving a website so more visitors take action — like booking a call or making a purchase." },
      { name: "CTR (Click-Through Rate)", def: "The percentage of people who see something (an ad, an email, a search result) and actually click on it." },
    ],
  },
  {
    letter: "D",
    terms: [
      { name: "Domain", def: "Your website address — like simplifiedstartup.com. Something you own and use across your website and email." },
      { name: "Domain Authority", def: "A score (out of 100) that estimates how strong a website looks to search engines. Higher usually means better ranking chances." },
    ],
  },
  {
    letter: "E",
    terms: [
      { name: "Email Marketing", def: "Sending emails to a list of customers or prospects — newsletters, offers, updates — to keep them engaged and drive sales." },
      { name: "Engagement", def: "Any action people take with your content — likes, comments, shares, replies. It's a sign your content is resonating." },
      { name: "E-E-A-T", def: "Google's standard for good content: Experience, Expertise, Authoritativeness, and Trustworthiness. Sites that clearly show these tend to rank better." },
    ],
  },
  {
    letter: "F",
    terms: [
      { name: "Funnel", def: "The path someone takes from first hearing about you to becoming a customer — usually awareness, interest, decision, and action." },
    ],
  },
  {
    letter: "G",
    terms: [
      { name: "GEO (Generative Engine Optimization)", def: "Optimizing your content so AI tools like ChatGPT, Gemini, Claude, or Perplexity mention and recommend your business when people ask them questions." },
      { name: "Google Ads", def: "Paid ads that appear at the top of Google search results. You pay per click." },
      { name: "Google Analytics", def: "A free tool from Google that shows you how visitors are using your website." },
      { name: "Google Business Profile", def: "Your free business listing on Google — what people see on Google Maps and in local search results. Formerly Google My Business." },
    ],
  },
  {
    letter: "H",
    terms: [
      { name: "Hashtag", def: "A word or phrase preceded by # on social media. It groups posts around a topic so people searching for that topic can find them." },
      { name: "Homepage", def: "The main page of your website — what people usually see first. Its job is to explain who you are and where to go next." },
    ],
  },
  {
    letter: "I",
    terms: [
      { name: "Impression", def: "A single instance of your content or ad being shown to someone — whether or not they clicked or engaged." },
      { name: "Influencer Marketing", def: "Paying (or partnering with) someone who has a following on social media to promote your business to their audience." },
      { name: "Internal Linking", def: "Links from one page on your site to another. Helps visitors navigate and helps Google understand which pages are important." },
    ],
  },
  {
    letter: "K",
    terms: [
      { name: "Keyword", def: "A word or phrase people type into Google. SEO is largely about matching the keywords your customers use with the pages you create." },
      { name: "Keyword Research", def: "The work of finding out which keywords your customers actually search for, so your content targets the right ones." },
      { name: "KPI (Key Performance Indicator)", def: "The main numbers you use to measure success — like leads per month, cost per click, or search rankings." },
    ],
  },
  {
    letter: "L",
    terms: [
      { name: "Landing Page", def: "A single page built for one specific purpose — usually to convert visitors from an ad or campaign into leads or customers." },
      { name: "Lead", def: "Someone who has shown interest in your business — filled out a form, requested a quote, or booked a call." },
      { name: "Lead Generation", def: "The work of attracting people interested in your business and collecting their contact details so you can follow up." },
      { name: "Local SEO", def: "The kind of SEO that helps a business show up on Google Maps and in local search results (e.g. “coffee shop near me”)." },
    ],
  },
  {
    letter: "M",
    terms: [
      { name: "Meta Description", def: "The short description of a page shown under its title in Google results. It doesn't affect ranking directly but does affect whether people click." },
      { name: "Meta Title", def: "The clickable page title shown in Google search results. One of the most important SEO elements on any page." },
      { name: "Mobile-Friendly", def: "A site that looks and works well on phones and tablets. Google prefers these, and most of your visitors are on mobile." },
      { name: "Money Page", def: "A page built around one specific service, business type, and location — like “SEO for realtors in Raleigh.” Designed to attract high-intent searches." },
    ],
  },
  {
    letter: "O",
    terms: [
      { name: "Off-Page SEO", def: "SEO work done off your own site — mainly earning backlinks and mentions from other trusted websites." },
      { name: "Open Rate", def: "The percentage of people who open an email you send. A quick health check on your subject line and audience." },
      { name: "Organic Traffic", def: "Visitors who come from Google's free (unpaid) search results — as opposed to paid ads or social." },
    ],
  },
  {
    letter: "P",
    terms: [
      { name: "Package", def: "A big all-in-one offer that covers many services together, usually at a lower price than buying each separately." },
      { name: "Paid Search", def: "Ads shown in search results that you pay for — the top of Google, above the free results. Also called PPC or SEM." },
      { name: "Paid Social", def: "Ads run on social media platforms like Facebook, Instagram, LinkedIn, or TikTok." },
      { name: "PPC (Pay-Per-Click)", def: "A paid advertising model where you only pay when someone clicks your ad. Google Ads and most social ads work this way." },
    ],
  },
  {
    letter: "R",
    terms: [
      { name: "Ranking", def: "Where your page appears in Google's results for a given keyword. Position 1 is the top, and higher is almost always better." },
      { name: "Reach", def: "The number of unique people who saw your content — different from impressions, which count each view." },
      { name: "Retargeting", def: "Ads shown to people who already visited your site — a reminder to come back and take the next step." },
      { name: "ROI (Return on Investment)", def: "How much money you got back compared to how much you spent. A simple way to measure whether a campaign was worth it." },
    ],
  },
  {
    letter: "S",
    terms: [
      { name: "Schema Markup", def: "Extra code added to a page that helps Google understand what's on it — like reviews, prices, or FAQs. Often produces the “rich results” you see in search." },
      { name: "SEM (Search Engine Marketing)", def: "A broad term that usually means paid search ads on Google. Sometimes used to mean SEO + paid search together." },
      { name: "SEO (Search Engine Optimization)", def: "The work that helps a website show up higher in Google's free (unpaid) search results." },
      { name: "SERP (Search Engine Results Page)", def: "The page you see after typing something into Google. What appears where decides who gets clicked." },
      { name: "Sitemap", def: "A file that lists all the pages on your site so Google can find and index them more easily." },
      { name: "Social Media Management", def: "The ongoing work of running a business's social accounts — posting, responding, and growing an audience." },
    ],
  },
  {
    letter: "T",
    terms: [
      { name: "Target Audience", def: "The specific group of people your marketing is meant to reach — defined by things like age, location, industry, or interests." },
      { name: "Technical SEO", def: "The behind-the-scenes SEO work — site speed, mobile-friendliness, clean code, and structure — that makes Google trust and understand your site." },
      { name: "Traffic", def: "The number of people visiting your website, from all sources combined." },
    ],
  },
  {
    letter: "U",
    terms: [
      { name: "URL", def: "The web address of a page — like simplifiedstartup.com/services/seo. Clean, readable URLs are better for people and search engines." },
      { name: "UX (User Experience)", def: "How easy and pleasant a website is to use. Good UX keeps visitors around and helps them convert." },
    ],
  },
  {
    letter: "W",
    terms: [
      { name: "Web Design", def: "The visual and structural design of a website — how it looks, how it's laid out, and how visitors move through it." },
      { name: "Workflow Automation", def: "Setting up your tools so repetitive tasks happen automatically — like follow-up emails, moving leads through your CRM, or posting to social media." },
    ],
  },
];

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const ACTIVE_LETTERS = new Set(GLOSSARY.map((g) => g.letter));
export const TOTAL_TERMS = GLOSSARY.reduce((n, g) => n + g.terms.length, 0);
