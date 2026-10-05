"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceFaq, d } from "@/components/service-detail/ServiceDetailKit";
import "./contact-page.css";

/* -------- icons -------- */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_MAIL = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ICON_CAL = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M8 3v4M16 3v4M9 15l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_BOT = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="12" r="1.3" fill="currentColor" />
    <circle cx="15" cy="12" r="1.3" fill="currentColor" />
    <path d="M12 3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------- content -------- */

const SERVICES = [
  "Digital Marketing",
  "Website Development",
  "Branding & Growth",
  "Sales & Lead Generation",
  "AI Automation",
  "Business & Startup Advisory",
  "Talent & Staffing",
  "Bookkeeping & Accounting",
  "Not sure yet",
];

const STAGES = ["Idea stage", "Pre-revenue", "Early revenue", "Growing", "Established business"];
const TIMINGS = ["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Just exploring"];
const SOURCES = ["Google search", "AI search (ChatGPT, Perplexity, etc.)", "LinkedIn", "Referral", "Social media", "Other"];

const WAYS: { icon: ReactNode; title: string; value: ReactNode; text: string }[] = [
  {
    icon: ICON_MAIL,
    title: "Email",
    value: <a href="mailto:contact@simplifiedstartup.com">contact@simplifiedstartup.com</a>,
    text: "Best for detailed questions or sharing files and briefs.",
  },
  {
    icon: ICON_CAL,
    title: "Book a Call",
    value: <a href="/start-project">Free consultation</a>,
    text: "Pick a time that suits you and talk through your goals.",
  },
  {
    icon: ICON_BOT,
    title: "AI Advisor",
    value: <a href="/start-project">On every page</a>,
    text: "Describe your stage and bottleneck to get a quick service suggestion.",
  },
];

const STEPS = [
  { no: "Step 1 · First", title: "We read it", text: "A team member reviews your message and the services you selected.", delay: 0 },
  { no: "Step 2 · By email", title: "We reply", text: "We respond with questions or a link to book a call.", delay: 70 },
  { no: "Step 3 · Free call", title: "We talk", text: "A short call to understand your goals and current setup.", delay: 140 },
  { no: "Step 4 · No pressure", title: "You decide", text: "You get clear next steps. Whether to move forward is up to you.", delay: 210 },
];

const INQUIRIES: { q: string; when: string; where: ReactNode }[] = [
  { q: "New project", when: "You want help with marketing, web, brand, sales, AI, advisory, staffing, or bookkeeping.", where: "Use the form above" },
  { q: "Not sure what you need", when: "You know something needs fixing but aren’t sure which service fits.", where: "Form → choose “Not sure yet”" },
  { q: "Partnerships", when: "Agencies, freelancers, or tools interested in working together.", where: "Email with “Partnership” in the subject" },
  {
    q: "Careers",
    when: "You’d like to join the team.",
    where: (
      <>
        See the <Link href="/careers">Careers page</Link>
      </>
    ),
  },
  { q: "Existing clients", when: "Questions about an active project.", where: "Contact your project lead directly" },
];

const FAQS = [
  { q: "Is the first consultation free?", a: <>Yes. The first call is free and focused on understanding your goals. <strong>There’s no obligation to move forward.</strong></> },
  { q: "Do you work with businesses outside North Carolina?", a: <>Yes. We work with clients <strong>remotely,</strong> so location isn’t a barrier.</> },
  { q: "What should I include in my message?", a: <>A short description of your business, what you’d like help with, and your timeline. <strong>Links to your website or current materials are helpful too.</strong></> },
  { q: "Will you share my information?", a: <>No. Your details are <strong>only used to respond to your inquiry.</strong> See our Privacy Policy for more.</> },
];

/* -------- form -------- */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type FieldName = "first" | "last" | "email" | "business" | "website" | "services" | "stage" | "timing" | "project" | "consent";
type Errors = Partial<Record<FieldName, boolean>>;

const MSG_REQUIRED = "Please fill in this field.";

/** `need` is capped at 120 chars server-side: cut at the last comma that fits and mark the cut. */
function needSummary(chips: string[]): string {
  const full = chips.join(", ");
  if (full.length <= 120) return full;
  const cut = full.lastIndexOf(",", 119);
  return (cut > 0 ? full.slice(0, cut) : full.slice(0, 119)) + "…";
}

function ContactForm() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [chips, setChips] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const scrollBehavior: ScrollBehavior = reduce ? "auto" : "smooth";

  function clearError(name: FieldName) {
    setErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
  }

  function toggleChip(value: string) {
    setChips((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]));
    clearError("services");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const el = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const value = (n: string) => el(n).value.trim();

    const first = value("first");
    const last = value("last");
    const email = value("email");
    const business = value("business");
    const website = value("website");
    const phone = value("phone");
    const stage = value("stage");
    const timing = value("timing");
    const project = value("project");
    const source = value("source");
    const consent = (el("consent") as HTMLInputElement).checked;

    // the design's rules: required, email shape, URL must start with http(s)://, at least one chip, consent
    const next: Errors = {
      first: !first,
      last: !last,
      email: !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
      business: !business,
      website: !!website && !/^https?:\/\/.+/.test(website),
      services: chips.length === 0,
      stage: !stage,
      timing: !timing,
      project: !project,
      consent: !consent,
    };
    setErrors(next);

    const order: FieldName[] = ["first", "last", "email", "business", "website", "services", "stage", "timing", "project", "consent"];
    const firstBad = order.find((n) => next[n]);
    if (firstBad) {
      const target = firstBad === "services" ? chipsRef.current : (el(firstBad) as HTMLElement);
      target?.scrollIntoView({ behavior: scrollBehavior, block: "center" });
      const focusable = firstBad === "services" ? chipsRef.current?.querySelector<HTMLElement>("button") : (target as HTMLElement);
      focusable?.focus({ preventScroll: true });
      return;
    }

    const message = [
      project,
      "",
      `Services: ${chips.join(", ")}`,
      `Timing: ${timing}`,
      `Website: ${website || "-"}`,
      `Phone: ${phone || "-"}`,
      `Source: ${source || "-"}`,
      "Consent: yes",
      "Page: /contact",
    ]
      .join("\n")
      .slice(0, 4000);

    setSending(true);
    setSubmitError(false);
    try {
      const res = await fetch(`${API_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${first} ${last}`.trim().slice(0, 120),
          email,
          business: business.slice(0, 200),
          stage: stage.slice(0, 60),
          need: needSummary(chips),
          message,
          company: value("company"), // honeypot, humans never fill it
        }),
      });
      if (!res.ok) throw new Error(`request failed (${res.status})`);
      setSubmittedName(first || "there");
      cardRef.current?.scrollIntoView({ behavior: scrollBehavior, block: "center" });
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  }

  const err = (n: FieldName) => (errors[n] ? "err" : undefined);
  const fieldErr = (n: FieldName, text: string, id: string) => (
    <span className={`ct-fielderr${errors[n] ? " on" : ""}`} id={id} role={errors[n] ? "alert" : undefined}>
      {text}
    </span>
  );

  return (
    <div className="ct-form" id="cform" ref={cardRef}>
      {submittedName !== null ? (
        <div className="ct-fsuccess" role="status">
          <span className="sk">{ICON_CHECK}</span>
          <h3>Thanks, {submittedName}!</h3>
          <p>Your message is in. We’ll reply to your email soon. Want to talk sooner? Book a time below.</p>
          <a className="btn btn-primary" href="/start-project">
            Book a free consultation <span className="arw">↗</span>
          </a>
        </div>
      ) : (
        <form id="contactForm" noValidate onSubmit={onSubmit}>
          <h2>
            <span className="fi">{ICON_CHAT}</span>Send us a message
          </h2>
          <div className="ct-fgrid">
            <div className="ct-field">
              <label htmlFor="ctFirst">
                First name <span className="req">*</span>
              </label>
              <input id="ctFirst" type="text" name="first" placeholder="Jane" autoComplete="given-name" required className={err("first")} aria-invalid={errors.first || undefined} aria-describedby="ctFirstErr" onInput={() => clearError("first")} />
              {fieldErr("first", MSG_REQUIRED, "ctFirstErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctLast">
                Last name <span className="req">*</span>
              </label>
              <input id="ctLast" type="text" name="last" placeholder="Doe" autoComplete="family-name" required className={err("last")} aria-invalid={errors.last || undefined} aria-describedby="ctLastErr" onInput={() => clearError("last")} />
              {fieldErr("last", MSG_REQUIRED, "ctLastErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctEmail">
                Work email <span className="req">*</span>
              </label>
              <input id="ctEmail" type="email" name="email" placeholder="jane@company.com" autoComplete="email" required className={err("email")} aria-invalid={errors.email || undefined} aria-describedby="ctEmailErr" onInput={() => clearError("email")} />
              {fieldErr("email", "Please enter a valid email address.", "ctEmailErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctBusiness">
                Company name <span className="req">*</span>
              </label>
              {/* named `business` on purpose: `company` is the server's honeypot field */}
              <input id="ctBusiness" type="text" name="business" placeholder="Your company" autoComplete="organization" required className={err("business")} aria-invalid={errors.business || undefined} aria-describedby="ctBusinessErr" onInput={() => clearError("business")} />
              {fieldErr("business", MSG_REQUIRED, "ctBusinessErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctWebsite">Website</label>
              <input id="ctWebsite" type="url" name="website" placeholder="https://yourcompany.com" autoComplete="url" className={err("website")} aria-invalid={errors.website || undefined} aria-describedby="ctWebsiteErr" onInput={() => clearError("website")} />
              {fieldErr("website", "Please enter a valid URL.", "ctWebsiteErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctPhone">Phone</label>
              <input id="ctPhone" type="tel" name="phone" placeholder="(555) 555-5555" autoComplete="tel" />
            </div>
            <div className="ct-field full">
              <label id="ctServicesLabel">
                What do you need help with? <span className="req">*</span>
              </label>
              <div className="ct-chips" id="svcChips" ref={chipsRef} role="group" aria-labelledby="ctServicesLabel" aria-describedby="ctServicesErr">
                {SERVICES.map((svc) => {
                  const on = chips.includes(svc);
                  return (
                    <button type="button" className={`ct-chip${on ? " on" : ""}`} key={svc} aria-pressed={on} onClick={() => toggleChip(svc)}>
                      {svc}
                    </button>
                  );
                })}
              </div>
              {fieldErr("services", "Please choose at least one option (or “Not sure yet”).", "ctServicesErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctStage">
                Business stage <span className="req">*</span>
              </label>
              <select id="ctStage" name="stage" required defaultValue="" className={err("stage")} aria-invalid={errors.stage || undefined} aria-describedby="ctStageErr" onChange={() => clearError("stage")}>
                <option value="" disabled>
                  Select…
                </option>
                {STAGES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {fieldErr("stage", MSG_REQUIRED, "ctStageErr")}
            </div>
            <div className="ct-field">
              <label htmlFor="ctTiming">
                When do you want to start? <span className="req">*</span>
              </label>
              <select id="ctTiming" name="timing" required defaultValue="" className={err("timing")} aria-invalid={errors.timing || undefined} aria-describedby="ctTimingErr" onChange={() => clearError("timing")}>
                <option value="" disabled>
                  Select…
                </option>
                {TIMINGS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {fieldErr("timing", MSG_REQUIRED, "ctTimingErr")}
            </div>
            <div className="ct-field full">
              <label htmlFor="ctProject">
                Tell us about your project <span className="req">*</span>
              </label>
              <textarea id="ctProject" name="project" placeholder="What are you working on, and what would a great outcome look like?" required className={err("project")} aria-invalid={errors.project || undefined} aria-describedby="ctProjectErr" onInput={() => clearError("project")}></textarea>
              {fieldErr("project", MSG_REQUIRED, "ctProjectErr")}
            </div>
            <div className="ct-field full">
              <label htmlFor="ctSource">How did you hear about us?</label>
              <select id="ctSource" name="source" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="ct-field full">
              <label className="ct-consent">
                <input type="checkbox" name="consent" required aria-invalid={errors.consent || undefined} aria-describedby="ctConsentErr" onChange={() => clearError("consent")} />
                <span>
                  I agree to be contacted about my inquiry and accept the Privacy Policy. <span className="req">*</span>
                </span>
              </label>
              {fieldErr("consent", "Please tick the box to continue.", "ctConsentErr")}
            </div>
          </div>
          <div className="ct-hp" aria-hidden="true">
            <label htmlFor="ctCompany">Company</label>
            <input id="ctCompany" name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          <button type="submit" className="ct-submit" disabled={sending}>
            {sending ? "Sending…" : "Send Message"}
          </button>
          {submitError && (
            <p className="ct-form-error" role="alert">
              Something went wrong sending your message. Please try again, or email us at{" "}
              <a href="mailto:contact@simplifiedstartup.com">contact@simplifiedstartup.com</a>.
            </p>
          )}
          <p className="ct-fnote">We’ll only use your details to respond to this inquiry.</p>
        </form>
      )}
    </div>
  );
}

/* -------- page -------- */

export default function ContactView() {
  return (
    <div className="ct-page">
      {/* HERO: copy + form */}
      <section className="ct-hero" id="top">
        <div className="ct-grid-bg" aria-hidden="true"></div>
        <div className="wrap">
          <div className="ct-hero-grid">
            <Reveal className="ct-hero-copy">
              <span className="eyebrow">Contact us</span>
              <h1>
                Let’s talk about <span className="grad-text">what you’re building.</span>
              </h1>
              <p className="ct-lead">Tell us where your business is today and what you need help with. A real person will read your message and reply by email.</p>
              <ul className="ct-sup">
                <li>
                  <span className="m">{ICON_CHECK}</span>
                  <span>
                    One team across <b>marketing, web, brand, sales, AI, and finance</b>
                  </span>
                </li>
                <li>
                  <span className="m">{ICON_CHECK}</span>
                  <span>
                    <b>Free first consultation</b>, no pressure, no pitch deck
                  </span>
                </li>
                <li>
                  <span className="m">{ICON_CHECK}</span>
                  <span>
                    Not sure what you need? Choose <b>“Not sure yet”</b> and we’ll help you scope it
                  </span>
                </li>
              </ul>
              <div className="ct-mail">
                {ICON_MAIL}
                <span>
                  Prefer email? <a href="mailto:contact@simplifiedstartup.com">contact@simplifiedstartup.com</a>
                </span>
              </div>
            </Reveal>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* OTHER WAYS */}
      <section className="band tint" id="ways">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Other ways to reach us</span>
            <h2>Pick whatever works best for you.</h2>
          </Reveal>
          <Reveal className="ct-ways-grid">
            {WAYS.map((way) => (
              <article className="ct-way" key={way.title}>
                <span className="wi">{way.icon}</span>
                <h3>{way.title}</h3>
                <div className="wv">{way.value}</div>
                <p>{way.text}</p>
              </article>
            ))}
          </Reveal>
          <Reveal className="ct-ways-cta">
            <a className="btn btn-primary" href="/start-project">
              Book a free consultation <span className="arw">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHAT HAPPENS AFTER */}
      <section className="band" id="after">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What happens after you reach out</span>
            <h2>No black box: here’s exactly what follows.</h2>
          </Reveal>
          <div className="ct-steps">
            {STEPS.map((step) => (
              <Reveal as="article" className="ct-step" key={step.title} style={d(step.delay)}>
                <span className="ct-step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHOOSE INQUIRY */}
      <section className="band tint" id="inquiry">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Choose the right inquiry</span>
            <h2>Help your message reach the right person faster.</h2>
            <p>Mention the type of inquiry in your message so it lands with the right team.</p>
          </Reveal>
          <Reveal className="ct-inq-tbl">
            <div className="ct-inq-row head">
              <div>Inquiry</div>
              <div className="ic2">When to use it</div>
              <div>Where to send it</div>
            </div>
            {INQUIRIES.map((row) => (
              <div className="ct-inq-row" key={row.q}>
                <div className="iq">{row.q}</div>
                <div className="ic2">{row.when}</div>
                <div className="iw">{row.where}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Before you get in touch." />

      <CtaBand
        id="start"
        eyebrow="Contact"
        heading="Send a message, or book a free consultation."
        copy={
          <>
            Tell us where you are and what you need:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll map out where to start based on your goals. No pressure, no pitch deck.</strong>
          </>
        }
        primaryLabel="Send a message"
        primaryHref="#top"
        secondary={{ label: "Book a free consultation", href: "/start-project", arrow: "↗" }}
      />
    </div>
  );
}
