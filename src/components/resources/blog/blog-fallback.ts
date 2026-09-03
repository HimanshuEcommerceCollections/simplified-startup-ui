export type BlogCategory = { key: string; label: string };

export type BlogCard = {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  artwork: string;
  featured: boolean;
  categoryKey: string;
  categoryLabel: string;
  hasBody: boolean;
  cover: { url: string; alt: string } | null;
};

/**
 * Fallback content — used when the content API is unreachable at build time.
 * The live lists come from simplifiedstartup-server, managed in the dashboard.
 */
export const FALLBACK_CATEGORIES: BlogCategory[] = [
  { key: "seo", label: "SEO" },
  { key: "social", label: "Social Media" },
  { key: "ads", label: "Paid Ads" },
  { key: "ai", label: "AI & Automation" },
  { key: "pricing", label: "Pricing & Choosing an Agency" },
];

export const FALLBACK_ARTICLES: BlogCard[] = [
  {
    slug: "how-to-choose-a-digital-marketing-agency",
    title: "How to Choose a Digital Marketing Agency (Without Getting Burned)",
    summary:
      "What to ask before signing with any agency, the red flags that mean walk away, and why hidden pricing is usually a bad sign. Ends with a short checklist you can use on your own.",
    readTime: "6 min read",
    artwork: "agency-checklist",
    featured: true,
    categoryKey: "pricing",
    categoryLabel: "Pricing & Choosing an Agency",
    hasBody: false,
    cover: null,
  },
  {
    slug: "what-marketing-actually-costs-in-2026",
    title: "What Marketing Actually Costs in 2026 (With Real Numbers)",
    summary:
      "A transparent breakdown of typical SEO, social, and ad-management pricing across the industry — so you know whether a quote you received is fair.",
    readTime: "7 min read",
    artwork: "cost-bars",
    featured: false,
    categoryKey: "pricing",
    categoryLabel: "Pricing & Choosing an Agency",
    hasBody: false,
    cover: null,
  },
  {
    slug: "seo-checklist-for-small-businesses",
    title: "SEO Checklist for Small Businesses",
    summary:
      "The exact on-page, technical, and local SEO basics every small-business site needs — a step-by-step list a non-technical owner can follow.",
    readTime: "8 min read",
    artwork: "seo-scope",
    featured: false,
    categoryKey: "seo",
    categoryLabel: "SEO",
    hasBody: false,
    cover: null,
  },
  {
    slug: "5-social-media-mistakes-quietly-hurting-local-businesses",
    title: "5 Social Media Mistakes Quietly Hurting Local Businesses",
    summary:
      "Common, fixable mistakes seen across every industry — posting without a goal, ignoring comments, inconsistent branding, and more.",
    readTime: "5 min read",
    artwork: "social-chat",
    featured: false,
    categoryKey: "social",
    categoryLabel: "Social Media",
    hasBody: false,
    cover: null,
  },
];
