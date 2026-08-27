import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";

/** Shared chrome for the resource pages (faq / blog / glossary / why-us / careers). */
export default function ResourcePage({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className={`page-resource page-${name}`}>
      <a href={`#${name}-main`} className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id={`${name}-main`}>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
