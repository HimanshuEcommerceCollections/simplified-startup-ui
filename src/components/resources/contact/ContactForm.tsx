"use client";

import { useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import "./contact-form.css";

/* The one inquiry form used on /contact and /start-project. Posts to the
   existing leads endpoint; fields the server has no column for are folded
   into `message`. */

const ICON_CHECK = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ICON_CHAT = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16v11H7l-3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type FieldName = "first" | "last" | "email" | "website" | "services" | "consent";
type Errors = Partial<Record<FieldName, boolean>>;

const MSG_REQUIRED = "Please fill in this field.";

/** `need` is capped at 120 chars server-side: cut at the last comma that fits and mark the cut. */
function needSummary(chips: string[]): string {
  const full = chips.join(", ");
  if (full.length <= 120) return full;
  const cut = full.lastIndexOf(",", 119);
  return (cut > 0 ? full.slice(0, cut) : full.slice(0, 119)) + "…";
}

export type ContactFormProps = {
  /** Route the form sits on; recorded in the lead message. */
  page: string;
  heading?: string;
  submitLabel?: string;
  /** Success state copy. `link: null` hides the follow-up button. */
  success?: { text: string; link?: { label: string; href: string } | null };
};

const DEFAULT_SUCCESS = {
  text: "Your message is in. We’ll reply to your email soon. Want to talk sooner? Book a time below.",
  link: { label: "Book a free consultation", href: "/start-project" },
};

export default function ContactForm({ page, heading = "Send us a message", submitLabel = "Send Message", success = DEFAULT_SUCCESS }: ContactFormProps) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [chips, setChips] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const scrollBehavior: ScrollBehavior = reduce ? "auto" : "smooth";
  const successLink = success.link === undefined ? DEFAULT_SUCCESS.link : success.link;

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

    // required: names, email, at least one service, consent. Website only has to look like a URL when given.
    const next: Errors = {
      first: !first,
      last: !last,
      email: !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
      website: !!website && !/^https?:\/\/.+/.test(website),
      services: chips.length === 0,
      consent: !consent,
    };
    setErrors(next);

    const order: FieldName[] = ["first", "last", "email", "website", "services", "consent"];
    const firstBad = order.find((n) => next[n]);
    if (firstBad) {
      const target = firstBad === "services" ? chipsRef.current : (el(firstBad) as HTMLElement);
      target?.scrollIntoView({ behavior: scrollBehavior, block: "center" });
      const focusable = firstBad === "services" ? chipsRef.current?.querySelector<HTMLElement>("button") : (target as HTMLElement);
      focusable?.focus({ preventScroll: true });
      return;
    }

    const message = [
      project || "-",
      "",
      `Services: ${chips.join(", ")}`,
      `Timing: ${timing || "-"}`,
      `Website: ${website || "-"}`,
      `Phone: ${phone || "-"}`,
      `Source: ${source || "-"}`,
      "Consent: yes",
      `Page: ${page}`,
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
          stage: (stage || "Not specified").slice(0, 60), // the server requires a stage
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
          <p>{success.text}</p>
          {successLink && (
            <a className="btn btn-primary" href={successLink.href}>
              {successLink.label} <span className="arw">↗</span>
            </a>
          )}
        </div>
      ) : (
        <form id="contactForm" noValidate onSubmit={onSubmit}>
          <h2>
            <span className="fi">{ICON_CHAT}</span>
            {heading}
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
              <label htmlFor="ctBusiness">Company name</label>
              {/* named `business` on purpose: `company` is the server's honeypot field */}
              <input id="ctBusiness" type="text" name="business" placeholder="Your company" autoComplete="organization" />
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
              <label htmlFor="ctStage">Business stage</label>
              <select id="ctStage" name="stage" defaultValue="">
                <option value="">Select…</option>
                {STAGES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="ct-field">
              <label htmlFor="ctTiming">When do you want to start?</label>
              <select id="ctTiming" name="timing" defaultValue="">
                <option value="">Select…</option>
                {TIMINGS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="ct-field full">
              <label htmlFor="ctProject">Tell us about your project</label>
              <textarea id="ctProject" name="project" placeholder="What are you working on, and what would a great outcome look like?"></textarea>
            </div>
            <div className="ct-field full">
              <label htmlFor="ctSource">How did you hear about us?</label>
              <select id="ctSource" name="source" defaultValue="">
                <option value="">Select…</option>
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
            {sending ? "Sending…" : submitLabel}
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
