import type { Metadata } from "next";
import ResourcePage from "@/components/resources/ResourcePage";
import BusinessPlanFinancialModelView from "@/components/service-detail/business-advisory/business-plan-financial-model/BusinessPlanFinancialModelView";

export const metadata: Metadata = {
  title: "Business Plan & Financial Model: Defensible Plans & 3-Statement Models | Simplified Startup",
  description:
    "Investor- and lender-ready business plans and connected three-statement financial models - revenue build, unit economics, cash runway, and conservative/base/growth scenarios. Every number traces to an assumption you can defend.",
};

export default function BusinessPlanFinancialModelPage() {
  return (
    <ResourcePage name="service-detail">
      <BusinessPlanFinancialModelView />
    </ResourcePage>
  );
}
