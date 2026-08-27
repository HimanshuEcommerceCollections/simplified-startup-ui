import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import WhyUsView from "@/components/resources/why-us/WhyUsView";

export const metadata: Metadata = {
  title: "Why Simplified Startup — The Anti-Agency for Founders",
  description:
    "Every rule here came from a bad experience elsewhere: published pricing, senior operators on every account, assets you own, and reporting that leads with the numbers that matter.",
};

export default function WhyUsPage() {
  return (
    <ResourcePage name="why-us">
      <WhyUsView />
    </ResourcePage>
  );
}
