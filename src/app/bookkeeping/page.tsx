import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";
import BookkeepingHero from "@/components/bookkeeping/BookkeepingHero";
import EngagementAccordion from "@/components/bookkeeping/EngagementAccordion";
import HowItRuns from "@/components/bookkeeping/HowItRuns";
import Discipline from "@/components/bookkeeping/Discipline";
import MonthlyJobs from "@/components/bookkeeping/MonthlyJobs";
import HonestComparison from "@/components/bookkeeping/HonestComparison";
import VsAccounting from "@/components/bookkeeping/VsAccounting";
import CatchupCallout from "@/components/bookkeeping/CatchupCallout";
import ServiceLines from "@/components/bookkeeping/ServiceLines";
import CostBand from "@/components/bookkeeping/CostBand";
import AdjacentPractices from "@/components/bookkeeping/AdjacentPractices";
import ResourcesNote from "@/components/bookkeeping/ResourcesNote";

export const metadata: Metadata = {
  title: "Bookkeeping & Accounting — Books, Handled | Simplified Startup",
  description:
    "Small business bookkeeping services with a close date you can circle. Transactions categorized, accounts reconciled, reports in plain English — CPA-ready when tax season comes.",
};

const BOOKKEEPING_FAQS = [
  {
    question: "Which software do you work with?",
    answer:
      "The major platforms — QuickBooks, Xero, and the ecosystem around them. If you're already on something, we work in it; if you're starting fresh, your plan recommends the fit and the setup is part of the scope.",
  },
  {
    question: "Do you replace my CPA?",
    answer:
      "No — we complement them. We keep the books clean and current all year; your CPA handles tax strategy and filing. They get organized, reconciled books instead of a shoebox, which typically makes their work faster and their bill smaller.",
  },
  {
    question: "My books are a disaster. How bad is too bad?",
    answer:
      'We\'ve yet to meet too bad — but we scope catch-up honestly before touching it, in writing, so you know the size of the cleanup before you commit. No discovering the "real" scope three invoices in.',
  },
  {
    question: "How much do small business bookkeeping services cost?",
    answer:
      "Published here: $300–$900/mo, priced by transaction volume and number of accounts, fixed in your plan before work starts. Market-wide it's $150–$900/mo for small businesses; an in-house bookkeeper runs $3,000–$5,000/mo all-in. Flat-rate, no hourly surprises.",
  },
  {
    question: "What's included in monthly bookkeeping?",
    answer:
      "Six things, every month: categorization, reconciliation, a dated month-end close, financial statements in plain English, issue resolution, and a CPA-ready file. Payroll and sales-tax filing are add-ons, priced separately so you only pay for what you use.",
  },
];

export default function BookkeepingPage() {
  return (
    <div className="page-bookkeeping">
      <a href="#bookkeeping-main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="bookkeeping-main">
        <BookkeepingHero />
        <EngagementAccordion />
        <HowItRuns />
        <Discipline />
        <MonthlyJobs />
        <HonestComparison />
        <VsAccounting />
        <CatchupCallout />
        <ServiceLines />
        <CostBand />
        <Faq title="Asked by every smart buyer." eyebrow="— Fair questions" items={BOOKKEEPING_FAQS} />
        <AdjacentPractices />
        <ResourcesNote />
        <CtaBand
          eyebrow="End of file · SS-WEB-10"
          heading="Get your free growth plan."
          copy="A working session on your goals, then a written plan with the exact scope, price, and sequence we'd recommend — free, and yours to keep whether or not you hire us."
          primaryLabel="Get your free growth plan"
          secondary={{ label: "See pricing", href: "/pricing" }}
          fine="Flat, published pricing. You own everything. No lock-in."
        />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
