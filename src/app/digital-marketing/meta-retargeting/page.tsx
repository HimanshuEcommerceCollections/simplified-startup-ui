import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import MetaRetargetingView from "@/components/service-detail/digital-marketing/meta-retargeting/MetaRetargetingView";

export const metadata: Metadata = {
  title: "Meta Retargeting Campaigns | Facebook & Instagram Remarketing | Simplified Startup",
  description:
    "Facebook and Instagram retargeting campaigns that bring back site visitors, engaged followers, and past customers, with the right message for each stage.",
};

export default function MetaRetargetingPage() {
  return (
    <ResourcePage name="service-detail">
      <MetaRetargetingView />
    </ResourcePage>
  );
}
