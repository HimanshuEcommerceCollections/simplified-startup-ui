import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LinkBuildingView from "@/components/service-detail/digital-marketing/link-building/LinkBuildingView";

export const metadata: Metadata = {
  title: "Link Building Services | White-Hat Backlinks & Digital PR | Simplified Startup",
  description:
    "White-hat link building and digital PR that earns relevant backlinks from real websites. Linkable assets, outreach, and unlinked mentions - no link schemes.",
};

export default function LinkBuildingPage() {
  return (
    <ResourcePage name="service-detail">
      <LinkBuildingView />
    </ResourcePage>
  );
}
