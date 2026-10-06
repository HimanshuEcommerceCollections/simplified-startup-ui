import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import LinkedinOutreachView from "@/components/service-detail/sales-lead-gen/linkedin-outreach/LinkedinOutreachView";

/**
 * Unlisted copy of the LinkedIn Outreach page under Social Media Management.
 * Reachable by URL only: not linked from any parent page, the navbar or the footer.
 * The design file (designs/digital-marketing/linkedin-outreach.html) is identical in
 * copy to the Sales & Lead Generation one, so the same view is rendered with a
 * Digital Marketing crumb and a canonical pointing at the original.
 */
export const metadata: Metadata = {
  title: "LinkedIn Outreach & Lead Generation: Compliant, Done-For-You | Simplified Startup",
  description:
    "Managed LinkedIn outreach for B2B - profile optimization, Sales Navigator prospecting, signal-based targeting, personalized messaging, and content. Compliant, flat monthly, no risk-your-account automation.",
  alternates: { canonical: "/sales-lead-gen/linkedin-outreach" },
};

export default function SocialLinkedinOutreachPage() {
  return (
    <ResourcePage name="service-detail">
      <LinkedinOutreachView crumb={{ label: "Digital Marketing", href: "/digital-marketing" }} />
    </ResourcePage>
  );
}
