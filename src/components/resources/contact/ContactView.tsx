"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { ServiceFaq, d } from "@/components/service-detail/ServiceDetailKit";
import ContactForm from "./ContactForm";
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

            <ContactForm page="/contact" />
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
