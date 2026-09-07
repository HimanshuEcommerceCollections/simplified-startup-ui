import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResourcePage from "@/components/resources/ResourcePage";
import Reveal from "@/components/ui/Reveal";
import ApplyForm from "@/components/resources/careers/ApplyForm";
import { GENERAL_APPLICATION_SLUG, fetchRoles, withSlugs, type RoleWithSlug } from "@/components/resources/careers/careers-api";
import "@/components/resources/careers/careers-page.css"; // shared cr-apply-* form + JD-body styles
import "./apply-page.css";

/** One apply page per published role, plus the general application. */
export async function generateStaticParams() {
  const roles = withSlugs(await fetchRoles());
  return [...roles.map((r) => ({ slug: r.slug })), { slug: GENERAL_APPLICATION_SLUG }];
}

export const dynamicParams = false;
// static pages, fresh data each build (no persistent fetch-cache reuse)
export const dynamic = "force-static";

async function findRole(slug: string): Promise<RoleWithSlug | null> {
  const roles = withSlugs(await fetchRoles());
  return roles.find((r) => r.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === GENERAL_APPLICATION_SLUG) {
    return {
      title: "General Application | Simplified Startup",
      description: "Don't see your exact role? Tell us what you're great at — we make room for great people.",
    };
  }
  const role = await findRole(slug);
  if (!role) return { title: "Apply | Simplified Startup" };
  return { title: `${role.title} — Apply | Simplified Startup`, description: role.desc };
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const general = slug === GENERAL_APPLICATION_SLUG;
  const role = general ? null : await findRole(slug);
  if (!general && !role) notFound();

  return (
    <ResourcePage name="careers">
      <section className="band ap-band">
        <div className="wrap">
          <Reveal>
            <Link className="ap-back" href="/careers#roles">
              ← All openings
            </Link>
          </Reveal>
          <div className="ap-layout">
            {/* Left: the job description */}
            <Reveal as="article" className="ap-jd">
              <span className="eyebrow">{general ? "General application" : "Open role"}</span>
              <h1 className="ap-title">{general ? "Tell us what you're great at." : role!.title}</h1>
              <div className="ap-pills">
                <span className="role-pill">{general ? "Remote" : role!.location || "Remote"}</span>
                {!general && <span className="role-pill type">{role!.type}</span>}
              </div>
              <p className="ap-desc">
                {general
                  ? "Don't see your exact role on the openings list? Send us the best thing you've built, shipped, or grown — we read every application and make room for great people."
                  : role!.desc}
              </p>
              {/* rich description authored in the dashboard; sanitized server-side */}
              {role?.body && <div className="cr-apply-body ap-body" dangerouslySetInnerHTML={{ __html: role.body }} />}
              <a className="ap-jump btn btn-primary" href="#apply-form">
                Jump to application ↓
              </a>
            </Reveal>

            {/* Right: the application form */}
            <Reveal as="aside" className="ap-form-col" id="apply-form">
              <div className="ap-form-card">
                <h2 className="ap-form-title">Apply for this role</h2>
                <ApplyForm role={role} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </ResourcePage>
  );
}
