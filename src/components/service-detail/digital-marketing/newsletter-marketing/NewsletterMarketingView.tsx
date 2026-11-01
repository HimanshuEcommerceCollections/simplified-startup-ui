"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import { GlanceBand, IncludedGrid, PlatformsBand, ProcessList, SecHead, WhoGrid2, useHeroRun } from "../email-family/EmailFamily";
import {
  ICON_BOLT,
  ICON_CAL,
  ICON_CAL_SEND,
  ICON_CODE,
  ICON_DOC,
  ICON_FORM,
  ICON_FORM_PLUS,
  ICON_MAIL,
  ICON_MEGAPHONE,
  ICON_MINUS_CIRCLE,
  ICON_MONITOR,
  ICON_PEN,
  ICON_PEOPLE,
  ICON_PERSON,
  ICON_PERSON_CHECK,
  ICON_REPLY,
  ICON_SHARE,
  ICON_SHIELD,
  ICON_STAR,
  ICON_SWAP,
  ICON_TEMPLATE,
  ICON_TREND,
} from "../email-family/icons";
import "./nlm-page.css";

/* -------- hero signature: issue preview skeleton -------- */

function IssuePreviewCard() {
  // reduced motion: the issue sections are shown in their end state on first paint
  const run = useHeroRun();
  return (
    <SignatureCard
      ariaLabel="The structure of a great newsletter issue"
      className={`nlm-nl${run ? " run" : ""}`}
      live="Issue preview"
      corner="BUILT TO SCAN"
      footLeft="Useful first, light on selling"
      footRight="trust, one issue at a time →"
    >
      <div className="nlm-subj">
        <span className="si">{ICON_MAIL}</span>
        <span className="st">
          <b>The 3 tools we switched to this month</b>
          <small>Subject · clear &amp; specific</small>
        </span>
      </div>
      <div className="nlm-body">
        <div className="nlm-sec">
          <span className="nk">Short intro</span>
          <div className="nln w1"></div>
          <div className="nln w2"></div>
        </div>
        <div className="nlm-sec">
          <span className="nk">Main section</span>
          <div className="nln main"></div>
          <div className="nln w1"></div>
          <div className="nln w2"></div>
        </div>
        <div className="nlm-sec">
          <span className="nk">Quick hits</span>
          <div className="nhits">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        <div className="nlm-sec">
          <span className="nk">One call to action</span>
          <span className="ncta"></span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- formats (6, tilt) -------- */

const FORMATS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_CODE, title: "Curated roundup", text: "The best links, news, and tips in your space, with your commentary." },
  { icon: ICON_DOC, title: "Single deep dive", text: "One topic explained clearly in each issue." },
  { icon: ICON_PERSON, title: "Founder letter", text: "Personal notes and lessons from the founder." },
  { icon: ICON_MEGAPHONE, title: "Product and company news", text: "Updates, launches, and customer stories." },
  { icon: ICON_BOLT, title: "Tips and how-tos", text: "Practical advice readers can use right away." },
  { icon: ICON_PEOPLE, title: "Community spotlight", text: "Customers, partners, or members featured." },
];

function FormatsGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="nlm-fo6-grid">
        {FORMATS.map((card) => (
          <article className="nlm-fo6" key={card.title} data-tilt>
            <span className="nlm-fo6-spot"></span>
            <div className="f6i">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- anatomy of an issue (8) -------- */

const ANATOMY: { title: string; text: string }[] = [
  { title: "Subject line", text: "Clear, honest, and specific." },
  { title: "Preview text", text: "A second hook that supports the subject." },
  { title: "Short intro", text: "A quick, personal opening." },
  { title: "Main section", text: "The core value of the issue." },
  { title: "Quick hits", text: "A few short extras or links." },
  { title: "One call to action", text: "A single next step, kept light." },
  { title: "Sign-off", text: "A human, consistent closing." },
  { title: "Easy unsubscribe", text: "Clear and simple, as required." },
];

/* -------- editorial workflow (5) -------- */

const WORKFLOW = [
  { title: "Plan topics", text: "A monthly topic plan based on audience questions.", out: "Editorial calendar" },
  { title: "Write", text: "Each issue drafted in your voice.", out: "Draft issue" },
  { title: "Design", text: "Clean, mobile-friendly templates.", out: "Designed issue" },
  { title: "Review and send", text: "You approve, then we schedule.", out: "Sent issue" },
  { title: "Learn", text: "Opens, clicks, and replies reviewed.", out: "Monthly insights" },
];

/* -------- list growth (6) -------- */

const GROWTH: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_FORM, title: "Website signup forms", text: "Clear forms on key pages and blog posts." },
  { icon: ICON_BOLT, title: "Lead magnets", text: "Guides or checklists in exchange for signup." },
  { icon: ICON_SHARE, title: "Social promotion", text: "Sharing issue highlights on social channels." },
  { icon: ICON_PERSON_CHECK, title: "Referral programs", text: "Readers invite others, where your platform supports it." },
  { icon: ICON_SWAP, title: "Partner swaps", text: "Cross-promotion with related newsletters." },
  { icon: ICON_CAL, title: "Events and webinars", text: "Signup offered to attendees with consent." },
];

/* -------- metrics (4) -------- */

const METRICS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_MAIL, title: "Opens and clicks", text: "How readers engage with each issue." },
  { icon: ICON_REPLY, title: "Replies", text: "A strong sign readers feel connected." },
  { icon: ICON_TREND, title: "List growth", text: "New subscribers and where they came from." },
  { icon: ICON_MINUS_CIRCLE, title: "Unsubscribes", text: "Signals that content or frequency needs adjusting." },
];

/* -------- included (8) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_DOC, text: "Newsletter strategy and format" },
  { icon: ICON_SHIELD, text: "Voice and topic guide" },
  { icon: ICON_CAL, text: "Editorial calendar" },
  { icon: ICON_PEN, text: "Writing and editing each issue" },
  { icon: ICON_TEMPLATE, text: "Newsletter template design" },
  { icon: ICON_CAL_SEND, text: "Scheduling and sending" },
  { icon: ICON_FORM_PLUS, text: "Signup forms and list growth plan" },
  { icon: ICON_TREND, text: "Monthly reporting and insights" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_PERSON, text: <><strong>Founders and experts</strong> building a personal audience.</> },
  { icon: ICON_MONITOR, text: <><strong>B2B companies</strong> staying top of mind with prospects.</> },
  { icon: ICON_STAR, text: <><strong>Brands with loyal customers</strong> who want regular updates.</> },
  { icon: ICON_MAIL, text: <><strong>Businesses with a list</strong> that rarely hears from them.</> },
];

/* -------- faq -------- */

const FAQS = [
  { q: "How much does newsletter marketing cost?", a: <>It depends on frequency, length, and research needed. <strong>We share pricing on the free call.</strong></> },
  { q: "How often should we send a newsletter?", a: <>It depends on your capacity and audience. <strong>A consistent schedule matters more than frequency.</strong></> },
  { q: "Can you write in our founder’s voice?", a: <>Yes. We learn your voice and <strong>get approval before anything is sent.</strong></> },
  { q: "Which platform should we use?", a: <>It depends on your goals. <strong>We’ll compare options like Beehiiv, Kit, and HubSpot</strong> with you.</> },
  { q: "Can you guarantee subscribers?", a: <>No. Growth depends on content, promotion, and audience. <strong>We focus on quality and steady promotion.</strong></> },
  {
    q: "Can you fix our existing newsletter?",
    a: <>Yes. We review your <strong>format, voice, and schedule,</strong> then refresh the structure and set a rhythm you can keep.</>,
  },
];

/* -------- page -------- */

export default function NewsletterMarketingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Email Marketing", href: "/digital-marketing/email-marketing" }}
        line1="A newsletter people look"
        line2={
          <>
            forward to <span className="grad-text">opening.</span>
          </>
        }
        lead={
          <>
            Editorial strategy, writing, design, and list growth for newsletters{" "}
            <strong>that build trust and keep your brand top of mind.</strong>
          </>
        }
        primary={{ label: "Book a newsletter call", href: "/contact" }}
        secondary={{ label: "See newsletter formats ↓", href: "#formats" }}
      >
        <IssuePreviewCard />
      </ServiceDetailHero>

      <TrustBar items={["Clear editorial voice", "Consistent schedule", "Clean, readable design", "Steady list growth"]} />

      <GlanceBand
        eyebrow="Why newsletters"
        heading="Trust is built one issue at a time."
        sub="A good newsletter gives value first and sells second."
        paragraphs={[
          <>
            Newsletters keep your brand in <a href="/digital-marketing/email-marketing">someone’s inbox</a> on a regular rhythm,{" "}
            <strong>without needing a sale every time.</strong>
          </>,
          <>When each issue is useful or interesting, readers start to trust your expertise.</>,
          <>
            That trust makes it easier when they’re <strong>ready to buy, book, or refer someone.</strong>
          </>,
        ]}
        items={["Regular, predictable schedule", "Useful content first", "Clear voice and format", "Light calls to action", "Builds long-term trust"]}
      />

      {/* FORMATS */}
      <section className="band tint" id="formats">
        <div className="wrap">
          <SecHead eyebrow="Formats" heading="Newsletter formats." sub="The format shapes how readers experience each issue." />
          <FormatsGrid />
        </div>
      </section>

      {/* ANATOMY */}
      <section className="band" id="anatomy">
        <div className="wrap">
          <SecHead eyebrow="Anatomy of a great issue" heading="Every issue follows a familiar structure readers can scan." />
          <Reveal className="nlm-ia-grid">
            {ANATOMY.map((item, i) => (
              <article className="nlm-ia" key={item.title}>
                <span className="ian">{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="band tint" id="workflow">
        <div className="wrap">
          <SecHead eyebrow="Editorial workflow" heading="Our editorial workflow." />
          <ProcessList steps={WORKFLOW} />
        </div>
      </section>

      {/* GROWTH */}
      <section className="band" id="growth">
        <div className="wrap">
          <SecHead eyebrow="List growth" heading="Ways to grow your list." sub="Steady growth comes from many small sources." />
          <Reveal className="nlm-gw-grid">
            {GROWTH.map((card) => (
              <article className="nlm-gw" key={card.title}>
                <span className="gwi">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* METRICS */}
      <section className="band tint" id="metrics">
        <div className="wrap">
          <SecHead eyebrow="What we track" heading="We watch the signals that show real connection, not just sends." />
          <Reveal className="nlm-mx-grid">
            {METRICS.map((card) => (
              <article className="nlm-mx" key={card.title}>
                <span className="mxi">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <PlatformsBand items={["Beehiiv", "Kit", "Substack", "Mailchimp", "HubSpot", "Brevo"]} />

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <SecHead eyebrow="What’s included" heading="From editorial strategy to monthly insights." />
          <IncludedGrid items={INCLUDED} />
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <SecHead eyebrow="Who it’s for" heading="Start a newsletter people want to read." />
          <WhoGrid2 items={WHO} />
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every newsletter." />

      <CtaBand
        id="start"
        eyebrow="Newsletter Marketing"
        heading="Start a newsletter people want to read."
        copy={
          <>
            Book a free call to plan your newsletter:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through your audience and what they’d want to read.</strong>
          </>
        }
        primaryLabel="Book a newsletter call"
        primaryHref="/contact"
        secondary={{ label: "See newsletter formats", href: "#formats", arrow: "↗" }}
      />
    </>
  );
}
