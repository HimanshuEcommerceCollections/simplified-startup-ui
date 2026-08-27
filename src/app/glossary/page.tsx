import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import GlossaryView from "@/components/resources/glossary/GlossaryView";

export const metadata: Metadata = {
  title: "Marketing Glossary — Plain-English Definitions | Simplified Startup",
  description:
    "Every marketing term you've nodded along to, defined in plain English — the way we'd explain it to a friend.",
};

export default function GlossaryPage() {
  return (
    <ResourcePage name="glossary">
      <GlossaryView />
    </ResourcePage>
  );
}
