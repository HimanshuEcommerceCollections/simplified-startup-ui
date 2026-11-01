"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import { GlanceBand, IncludedGrid, PlatformsBand, SecHead, Timeline, WhoGrid2, useHeroRun } from "../email-family/EmailFamily";
import {
  ICON_ARROW,
  ICON_BAG,
  ICON_CAL,
  ICON_CAL_CHECK,
  ICON_CART,
  ICON_CHAT,
  ICON_CHAT_CHECK,
  ICON_CHAT_LINES,
  ICON_CLOCK,
  ICON_DOC,
  ICON_FORM,
  ICON_GLOBE,
  ICON_LINES,
  ICON_LIST_TICK,
  ICON_MAIL,
  ICON_MINUS_CIRCLE,
  ICON_REFRESH,
  ICON_REPLY,
  ICON_SHIELD_CHECK,
  ICON_STAR,
  ICON_TEXT_BOX,
  ICON_TREND,
  ICON_WARN,
} from "../email-family/icons";
import "./smw-page.css";

/* -------- hero signature: message thread -------- */

function ThreadCard() {
  // reduced motion: the bubbles are shown in their end state on first paint
  const run = useHeroRun();
  return (
    <SignatureCard
      ariaLabel="A respectful text message conversation"
      className={`smw-sm${run ? " run" : ""}`}
      live="Message thread"
      corner="CONSENT FIRST"
      footLeft="Useful, timely, two-way"
      footRight="messages they welcome →"
    >
      <div className="smw-chat">
        <div className="smw-bub them">
          <div className="bb">
            <b>YourStore:</b> Thanks for opting in! You’ll get order updates &amp; the occasional offer.
            <span className="optout">Reply STOP to opt out</span>
          </div>
          <span className="meta">Welcome · opt-in confirmed</span>
        </div>
        <div className="smw-bub them">
          <div className="bb">
            <b>YourStore:</b> Your order shipped! Track it here → <span className="lnk">track.link/ab12</span>
          </div>
          <span className="meta">Shipping update</span>
        </div>
        <div className="smw-bub me">
          <div className="bb">Thanks! Just got it, love it 👍</div>
          <span className="meta">Customer reply</span>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- email vs sms vs whatsapp -------- */

const COMPARE: { k: string; em: string; sms: string; wa: string }[] = [
  { k: "Best for", em: "Detailed content and campaigns", sms: "Short, timely alerts", wa: "Conversations and rich messages" },
  { k: "Length", em: "Long or short", sms: "Very short", wa: "Short, with media" },
  { k: "Consent", em: "Opt-in recommended", sms: "Clear opt-in required", wa: "Opt-in and approved templates" },
  { k: "Two-way", em: "Limited", sms: "Yes", wa: "Yes, conversational" },
  { k: "Often used for", em: "Newsletters and flows", sms: "Cart and order alerts", wa: "Support, updates, and offers" },
];

/* -------- consent & compliance (6) -------- */

const CONSENT: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_SHIELD_CHECK, title: "Clear opt-in", text: "Subscribers agree to receive messages, with clear terms shown." },
  { icon: ICON_MINUS_CIRCLE, title: "Easy opt-out", text: "Simple ways to stop messages, such as replying STOP." },
  { icon: ICON_CLOCK, title: "Quiet hours", text: "Messages scheduled to avoid late nights and early mornings." },
  { icon: ICON_CHAT_CHECK, title: "WhatsApp templates", text: "Business-initiated messages use templates approved by WhatsApp." },
  { icon: ICON_TREND, title: "Message frequency", text: "Expectations set at signup and respected after." },
  { icon: ICON_DOC, title: "Records kept", text: "Consent details stored in case they’re ever needed." },
];

/* -------- use cases (6, tilt) -------- */

const USE_CASES: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_CART, title: "Order and shipping updates", text: "Confirmations and delivery alerts." },
  { icon: ICON_CHAT, title: "Cart reminders", text: "A short nudge to finish checkout." },
  { icon: ICON_CAL_CHECK, title: "Appointment reminders", text: "Fewer missed bookings." },
  { icon: ICON_LIST_TICK, title: "Back in stock", text: "Alerts when wanted items return." },
  { icon: ICON_STAR, title: "VIP offers", text: "Early access for top customers." },
  { icon: ICON_CHAT_LINES, title: "Support conversations", text: "Quick answers over chat." },
];

function UseCaseGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="smw-uc-grid">
        {USE_CASES.map((card) => (
          <article className="smw-uc" key={card.title} data-tilt>
            <span className="smw-uc-spot"></span>
            <div className="uci">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- order journey -------- */

const JOURNEY = [
  { when: "At checkout", title: "Opt-in", text: "Customer agrees to receive order updates and offers." },
  { when: "After ordering", title: "Confirmation", text: "Order details and a support contact." },
  { when: "When it ships", title: "Shipping update", text: "Tracking link and timing." },
  { when: "After delivery", title: "Check-in", text: "A thank-you and a review request." },
];

/* -------- anatomy of a text (4) -------- */

const WRITING: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_TEXT_BOX, title: "Brand name", text: "So people know who it’s from." },
  { icon: ICON_LINES, title: "One clear message", text: "Short and to the point." },
  { icon: ICON_ARROW, title: "Clear action", text: "A link or reply option." },
  { icon: ICON_MINUS_CIRCLE, title: "Opt-out reminder", text: "Where required, how to stop messages." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: string }[] = [
  { icon: ICON_LINES, text: "Channel and use case planning" },
  { icon: ICON_SHIELD_CHECK, text: "Consent and opt-in setup" },
  { icon: ICON_FORM, text: "Signup forms and keywords" },
  { icon: ICON_REFRESH, text: "Automated message flows" },
  { icon: ICON_CAL, text: "Campaign planning and writing" },
  { icon: ICON_CHAT_CHECK, text: "WhatsApp template preparation" },
  { icon: ICON_REPLY, text: "Two-way conversation setup" },
  { icon: ICON_CLOCK, text: "Frequency and quiet-hour rules" },
  { icon: ICON_TREND, text: "Monthly reporting on engagement and results" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_BAG, text: <><strong>Online stores</strong> sending order updates and offers.</> },
  { icon: ICON_CAL, text: <><strong>Service businesses</strong> sending booking reminders.</> },
  { icon: ICON_GLOBE, text: <><strong>Brands with international customers</strong> who prefer WhatsApp.</> },
  {
    icon: ICON_MAIL,
    text: (
      <>
        <strong>
          Businesses with strong{" "}
          <a className="emf-link" href="/digital-marketing/email-marketing">
            email programs
          </a>
        </strong>{" "}
        ready to add SMS.
      </>
    ),
  },
];

/* -------- faq -------- */

const FAQS = [
  {
    q: "How much does SMS and WhatsApp marketing cost?",
    a: <>It depends on the platform, message volume, and setup needs. <strong>Platform and message fees are paid to the provider.</strong> We share our pricing on the free call.</>,
  },
  { q: "Do subscribers need to opt in?", a: <>Yes. Clear consent is required before sending marketing texts, and <strong>rules vary by location.</strong></> },
  { q: "Can we text our existing email list?", a: <>Not without consent for text messages. <strong>We help you collect SMS opt-ins properly.</strong></> },
  {
    q: "What is the WhatsApp Business Platform?",
    a: <>It’s WhatsApp’s option for businesses to <strong>send messages at scale through approved providers and templates.</strong></>,
  },
  { q: "Can you guarantee results from SMS?", a: <>No. Results depend on your audience, offers, and timing. <strong>We focus on consent, relevance, and testing.</strong></> },
  {
    q: "Should we run SMS alongside email?",
    a: <>Often, yes. They work best together: <strong>email for detail, SMS for timely alerts</strong>, with rules so people aren’t over-messaged.</>,
  },
];

/* -------- page -------- */

export default function SmsWhatsappMarketingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Digital Marketing", href: "/digital-marketing" }}
        line1="Text messages customers"
        line2={
          <>
            actually <span className="grad-text">welcome.</span>
          </>
        }
        lead={
          <>
            Permission-based SMS and WhatsApp marketing:{" "}
            <strong>automated messages, timely campaigns, and real conversations, set up with consent first.</strong>
          </>
        }
        primary={{ label: "Book an SMS call", href: "/contact" }}
        secondary={{ label: "See compliance basics ↓", href: "#consent" }}
      >
        <ThreadCard />
      </ServiceDetailHero>

      <TrustBar items={["Consent-first setup", "Automated and campaign messages", "Two-way conversations", "Clear opt-out options"]} />

      <GlanceBand
        eyebrow="Why messaging"
        heading="Messages live where people look most."
        sub="Texts are personal, so they work best when they’re useful and expected."
        paragraphs={[
          <>
            Text and chat messages land on the phone people check all day.{" "}
            <strong>That makes them powerful for timely updates, reminders, and offers</strong>, and easy to overuse.
          </>,
          <>
            We focus on <strong>permission, relevance, and frequency</strong> so messages stay welcome.
          </>,
        ]}
        items={["Consent before sending", "Short, useful messages", "Timely triggers", "Two-way replies", "Respectful frequency"]}
      >
        <Reveal className="smw-cnote">
          {ICON_WARN}
          <p>
            SMS and WhatsApp marketing are regulated, and rules vary by country and state.{" "}
            <b>We set up programs with consent and opt-outs in mind, but you should confirm legal requirements with your own counsel.</b>
          </p>
        </Reveal>
      </GlanceBand>

      {/* COMPARE */}
      <section className="band tint" id="compare">
        <div className="wrap">
          <SecHead eyebrow="Email vs SMS vs WhatsApp" heading="Each channel has a different role." />
          <Reveal className="smw-cm3-tbl">
            <div className="smw-cm3-row head">
              <div></div>
              <div className="em">Email</div>
              <div className="sms">SMS</div>
              <div className="wa">WhatsApp</div>
            </div>
            {COMPARE.map((row) => (
              <div className="smw-cm3-row" key={row.k}>
                <div>{row.k}</div>
                <div className="em">{row.em}</div>
                <div className="sms">{row.sms}</div>
                <div className="wa">{row.wa}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONSENT */}
      <section className="band" id="consent">
        <div className="wrap">
          <SecHead eyebrow="Consent & compliance basics" heading="Getting permission right is the foundation of every program." />
          <Reveal className="smw-co6-grid">
            {CONSENT.map((card) => (
              <article className="smw-co6" key={card.title}>
                <div className="c6i">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="band tint" id="usecases">
        <div className="wrap">
          <SecHead eyebrow="Use cases" heading="Messages that work well." />
          <UseCaseGrid />
        </div>
      </section>

      {/* ORDER JOURNEY */}
      <section className="band" id="journey">
        <div className="wrap">
          <SecHead eyebrow="Example" heading="An order journey over text." sub="Messages follow the order, so customers always know what’s happening." />
          <Timeline steps={JOURNEY} whenWidth={92} />
        </div>
      </section>

      {/* TEXT ANATOMY */}
      <section className="band tint" id="writing">
        <div className="wrap">
          <SecHead eyebrow="Writing" heading="Anatomy of a good text message." />
          <Reveal className="smw-ta4-grid">
            {WRITING.map((card) => (
              <article className="smw-ta4" key={card.title}>
                <span className="t4i">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <PlatformsBand items={["Klaviyo SMS", "Attentive", "Postscript", "Twilio", "WhatsApp Business Platform", "Brevo"]} />

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <SecHead eyebrow="What’s included" heading="From consent setup to monthly reporting." />
          <IncludedGrid items={INCLUDED} />
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <SecHead eyebrow="Who it’s for" heading="Send messages people are glad to get." />
          <WhoGrid2 items={WHO} />
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every program." />

      <CtaBand
        id="start"
        eyebrow="SMS & WhatsApp Marketing"
        heading="Send messages people are glad to get."
        copy={
          <>
            Book a free call to plan your SMS and WhatsApp program:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll talk through use cases and consent setup.</strong>
          </>
        }
        primaryLabel="Book an SMS call"
        primaryHref="/contact"
        secondary={{ label: "See compliance basics", href: "#consent", arrow: "↗" }}
      />
    </>
  );
}
