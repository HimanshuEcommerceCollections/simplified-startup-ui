import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import PitchDeckInvestorView from "@/components/service-detail/branding-growth/pitch-deck-investor/PitchDeckInvestorView";

export const metadata: Metadata = {
  title: "Pitch Deck & Investor Materials: Decks That Get the Meeting | Simplified Startup",
  description:
    "Investor-ready pitch decks, one-pagers, and financial materials for founders raising pre-seed to Series A, or applying for SBA and bank loans. Narrative, numbers, and design in one team.",
};

export default function PitchDeckInvestorPage() {
  return (
    <ResourcePage name="service-detail">
      <PitchDeckInvestorView />
    </ResourcePage>
  );
}
