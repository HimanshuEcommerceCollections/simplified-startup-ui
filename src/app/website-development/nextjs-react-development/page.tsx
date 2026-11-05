import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import NextjsReactDevelopmentView from "@/components/service-detail/website-development/nextjs-react-development/NextjsReactDevelopmentView";

export const metadata: Metadata = {
  title: "Custom Next.js & React Website Development | Simplified Startup",
  description:
    "Custom Next.js and React websites and web apps. Fast, scalable builds with headless CMS, server rendering, strong SEO foundations, and modern hosting on Vercel.",
};

export default function NextjsReactDevelopmentPage() {
  return (
    <ResourcePage name="service-detail">
      <NextjsReactDevelopmentView />
    </ResourcePage>
  );
}
