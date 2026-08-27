import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BlogView from "@/components/resources/blog/BlogView";

export const metadata: Metadata = {
  title: "The Blog — Straight Talk on SEO, Social, Ads & AI | Simplified Startup",
  description:
    "SEO, social media, ads, and AI — written for business owners, not marketers. No jargon we won't explain, no fluff to hit a word count.",
};

export default function BlogPage() {
  return (
    <ResourcePage name="blog">
      <BlogView />
    </ResourcePage>
  );
}
