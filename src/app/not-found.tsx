import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import NotFoundView from "@/components/resources/not-found/NotFoundView";

export const metadata: Metadata = {
  title: "Page not found | Simplified Startup",
  description: "That page doesn't exist or has moved. Find what you need from the services, pricing, or start a project.",
  robots: { index: false, follow: true },
};

/** Rendered by Next.js for any route that doesn't exist, and by notFound() in dynamic routes. */
export default function NotFound() {
  return (
    <ResourcePage name="not-found">
      <NotFoundView />
    </ResourcePage>
  );
}
