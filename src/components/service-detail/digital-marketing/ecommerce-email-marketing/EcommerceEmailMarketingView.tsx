"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import { useTiltCards } from "@/lib/useTilt";
import { ServiceDetailHero, ServiceFaq, SignatureCard, TrustBar } from "../../ServiceDetailKit";
import { FixTable, GlanceBand, IncludedGrid, PlatformsBand, SecHead, Timeline, WhoGrid2, useHeroRun } from "../email-family/EmailFamily";
import {
  ICON_ARROW,
  ICON_BAG,
  ICON_BOLT,
  ICON_CAL,
  ICON_CHAT,
  ICON_DOC,
  ICON_EYE,
  ICON_LINES,
  ICON_LIST_TICK,
  ICON_MAIL,
  ICON_PEN,
  ICON_PEOPLE,
  ICON_PLUS,
  ICON_REFRESH,
  ICON_SEARCH,
  ICON_SHIELD,
  ICON_SHIELD_CHECK,
  ICON_STAR,
  ICON_TREND,
} from "../email-family/icons";
import "./eem-page.css";

const AUTOMATION_HREF = "/digital-marketing/email-automation-flows";

/* -------- hero signature: automated flows -------- */

const FLOW_ROWS: { trig: string; icon: ReactNode; name: string }[] = [
  { trig: "Signs up", icon: ICON_MAIL, name: "Welcome series" },
  { trig: "Views product", icon: ICON_EYE, name: "Browse abandonment" },
  { trig: "Leaves cart", icon: ICON_CHAT, name: "Cart recovery" },
  { trig: "Places order", icon: ICON_SHIELD, name: "Post-purchase" },
];

function FlowsCard() {
  // reduced motion: rows are shown in their end state on first paint
  const run = useHeroRun();
  return (
    <SignatureCard
      ariaLabel="Automated email flows triggered by shopper actions"
      className={`eem-fl${run ? " run" : ""}`}
      live="Automated flows"
      corner="RUNS 24/7"
      footLeft="Triggered by shopper actions"
      footRight="works while you sleep →"
    >
      <div className="eem-fl-body">
        {FLOW_ROWS.map((row) => (
          <div className="eem-flr" key={row.name}>
            <span className="trig">{row.trig}</span>
            <span className="flarr">{ICON_ARROW}</span>
            <span className="fle">
              <span className="fli">{row.icon}</span>
              <span className="fln">
                <b>{row.name}</b>
              </span>
            </span>
            <span className="live2">Live</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- core flows (6, tilt) -------- */

const FLOWS: { icon: ReactNode; title: string; text: string; trig: string }[] = [
  { icon: ICON_MAIL, title: "Welcome series", text: "Introduces your brand to new subscribers.", trig: "signing up" },
  { icon: ICON_EYE, title: "Browse abandonment", text: "Reminds shoppers of products they viewed.", trig: "viewing a product" },
  { icon: ICON_CHAT, title: "Cart and checkout abandonment", text: "Helps shoppers finish what they started.", trig: "leaving items in cart" },
  { icon: ICON_SHIELD_CHECK, title: "Post-purchase", text: "Thanks, tips, and next steps after an order.", trig: "placing an order" },
  { icon: ICON_REFRESH, title: "Win-back", text: "Re-engages customers who haven’t bought in a while.", trig: "time since last order" },
  { icon: ICON_LIST_TICK, title: "Back in stock & replenishment", text: "Alerts when items return or need restocking.", trig: "availability or reorder timing" },
];

function FlowsGrid() {
  // Reveal owns its own ref, so the tilt root is a plain wrapper around it
  const gridRef = useTiltCards<HTMLDivElement>();
  return (
    <div ref={gridRef}>
      <Reveal className="eem-cf-grid">
        {FLOWS.map((card) => (
          <article className="eem-cf" key={card.title} data-tilt>
            <span className="eem-cf-spot"></span>
            <div className="cfi">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <span className="trig2">
              <b>Triggered by:</b> {card.trig}
            </span>
          </article>
        ))}
      </Reveal>
    </div>
  );
}

/* -------- cart abandonment timeline -------- */

const CART_STEPS = [
  { when: "Shortly after", title: "Friendly reminder", text: "Shows the items left in the cart with a clear return link." },
  { when: "The next day", title: "Answer doubts", text: "Shipping, returns, sizing, or reviews." },
  { when: "A few days later", title: "Social proof", text: "Customer reviews or popular pairings." },
  { when: "Final email", title: "Last nudge", text: "A gentle reminder, sometimes with an offer if it fits your margins." },
];

/* -------- segments table -------- */

const SEGMENTS: { seg: string; who: string; send: string }[] = [
  { seg: "New subscribers", who: "Signed up but haven’t bought", send: "Welcome content and first-order nudge" },
  { seg: "First-time buyers", who: "One order so far", send: "Care tips and second-purchase ideas" },
  { seg: "Repeat customers", who: "Several orders", send: "Early access and loyalty perks" },
  { seg: "VIPs", who: "Highest-value customers", send: "Exclusive launches and thank-yous" },
  { seg: "At-risk customers", who: "Haven’t ordered recently", send: "Win-back offers and reminders" },
  { seg: "Engaged non-buyers", who: "Open and click but don’t buy", send: "Social proof and product education" },
];

/* -------- campaign types (6) -------- */

const CAMPAIGNS: { icon: ReactNode; title: string; text: string }[] = [
  { icon: ICON_BOLT, title: "Product launches", text: "New arrivals and collections." },
  { icon: ICON_CAL, title: "Seasonal sales", text: "Holidays and key shopping dates." },
  { icon: ICON_DOC, title: "Educational content", text: "Guides, tips, and how-tos." },
  { icon: ICON_STAR, title: "Customer stories", text: "Reviews and user content." },
  { icon: ICON_EYE, title: "Brand updates", text: "News, values, and behind the scenes." },
  { icon: ICON_LIST_TICK, title: "Restocks and bestsellers", text: "Popular items back in focus." },
];

/* -------- problems -------- */

const FIXES = [
  { prob: "Only sending campaigns, no flows", fix: "Core flows built first." },
  { prob: "Same email to the whole list", fix: "Segments based on behavior and value." },
  { prob: "Discount in every email", fix: "Mix of education, proof, and offers." },
  { prob: "Emails landing in spam", fix: "Authentication and list hygiene." },
  { prob: "Broken store connection", fix: "Store data and events synced and tested." },
  { prob: "Designs that break on mobile", fix: "Mobile-first templates." },
];

/* -------- included (9) -------- */

const INCLUDED: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_SEARCH, text: "Email account and list audit" },
  { icon: ICON_BAG, text: "Store integration and event tracking" },
  {
    icon: ICON_REFRESH,
    text: (
      <>
        Core{" "}
        <a className="emf-link" href={AUTOMATION_HREF}>
          flow strategy and build
        </a>
      </>
    ),
  },
  { icon: ICON_CAL, text: "Campaign calendar and planning" },
  { icon: ICON_PEOPLE, text: "Segmentation setup" },
  { icon: ICON_PEN, text: "Email design templates" },
  { icon: ICON_LINES, text: "Copywriting for flows and campaigns" },
  { icon: ICON_SHIELD, text: "Deliverability basics" },
  { icon: ICON_TREND, text: "Monthly reporting on email revenue and engagement" },
];

/* -------- who (4) -------- */

const WHO: { icon: ReactNode; text: ReactNode }[] = [
  { icon: ICON_BAG, text: <><strong>Shopify and WooCommerce stores</strong> with growing email lists.</> },
  { icon: ICON_TREND, text: <><strong>Brands relying on ads</strong> that want more repeat sales.</> },
  { icon: ICON_REFRESH, text: <><strong>Stores with flows set up years ago</strong> that need a refresh.</> },
  { icon: ICON_PLUS, text: <><strong>New stores</strong> setting up email from the start.</> },
];

/* -------- faq -------- */

const FAQS = [
  {
    q: "How much does e-commerce email marketing cost?",
    a: <>It depends on list size, number of flows, and campaign frequency. <strong>Platform fees are paid directly to the provider.</strong> We share our pricing on the free call.</>,
  },
  { q: "Do you use Klaviyo?", a: <>Yes, often. <strong>We also work with Omnisend, Mailchimp, and Shopify Email.</strong></> },
  { q: "Should every email include a discount?", a: <>No. Too many discounts can train customers to wait. <strong>We mix offers with education and proof.</strong></> },
  { q: "Can you write and design the emails?", a: <>Yes. We handle <strong>strategy, copy, and design,</strong> using your brand guidelines.</> },
  { q: "Can you guarantee more sales from email?", a: <>No. Results depend on your products, list, and offers. <strong>We focus on flows, segmentation, and testing.</strong></> },
  {
    q: "Can you add SMS alongside email?",
    a: (
      <>
        Yes. Platforms like <strong>Klaviyo, Attentive, and Postscript</strong> let us run{" "}
        <a className="emf-link" href="/digital-marketing/sms-whatsapp-marketing">
          SMS and email together
        </a>{" "}
        for carts, launches, and restocks.
      </>
    ),
  },
];

/* -------- page -------- */

export default function EcommerceEmailMarketingView() {
  return (
    <>
      <ServiceDetailHero
        compact
        crumb={{ label: "Email Marketing", href: "/digital-marketing/email-marketing" }}
        line1="Email and flows that bring shoppers"
        line2={
          <>
            back and turn buyers into <span className="grad-text">regulars.</span>
          </>
        }
        lead={
          <>
            Automated flows, campaigns, and segmentation for online stores,{" "}
            <strong>built on platforms like Klaviyo and connected to your store.</strong>
          </>
        }
        primary={{ label: "Book an e-commerce email call", href: "/contact" }}
        secondary={{ label: "See the core flows ↓", href: "#flows" }}
      >
        <FlowsCard />
      </ServiceDetailHero>

      <TrustBar items={["Core flows built first", "Campaigns planned ahead", "Smart segmentation", "Store data connected"]} />

      <GlanceBand
        eyebrow="Why email"
        heading="Email is the channel you own."
        sub="Ads rent attention. Email builds a direct line to customers you can reach again and again."
        paragraphs={[
          <>
            Social and ad platforms change their rules often. <strong>Your email list stays yours.</strong>
          </>,
          <>
            For online stores,{" "}
            <a href="/digital-marketing/email-marketing">email</a> brings back browsers, recovers carts, and turns first-time buyers into repeat
            customers.
          </>,
          <>
            The best results come from{" "}
            <strong>
              <a href={AUTOMATION_HREF}>automated flows</a> working in the background, plus well-planned campaigns.
            </strong>
          </>,
        ]}
        items={["Owned audience", "Automated flows run around the clock", "Campaigns for launches and sales", "Personalized by behavior", "Connected to store data"]}
      />

      {/* CORE FLOWS */}
      <section className="band tint" id="flows">
        <div className="wrap">
          <SecHead eyebrow="Core flows" heading="The e-commerce flows every store needs." sub="Flows are automated emails triggered by what a shopper does." />
          <FlowsGrid />
        </div>
      </section>

      {/* CART TIMELINE */}
      <section className="band" id="cart">
        <div className="wrap">
          <SecHead
            eyebrow="Example flow"
            heading="A cart abandonment flow, step by step."
            sub="Each email does a different job, so the series feels helpful, not pushy."
          />
          <Timeline steps={CART_STEPS} whenWidth={86} note="Timing and number of emails are tailored to your products and buying cycle." />
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="band tint" id="segments">
        <div className="wrap">
          <SecHead
            eyebrow="Segments"
            heading="Segments we build."
            sub="Sending the right message to the right group beats sending the same email to everyone."
          />
          <Reveal className="eem-sg-tbl">
            <div className="eem-sg-row head">
              <div>Segment</div>
              <div>Who’s in it</div>
              <div>What we send</div>
            </div>
            {SEGMENTS.map((row) => (
              <div className="eem-sg-row" key={row.seg}>
                <div>{row.seg}</div>
                <div>{row.who}</div>
                <div className="snd">{row.send}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="band" id="campaigns">
        <div className="wrap">
          <SecHead eyebrow="Campaigns" heading="Campaign types we plan." sub="Campaigns are one-off sends planned around your calendar." />
          <Reveal className="eem-ca-grid">
            {CAMPAIGNS.map((card) => (
              <article className="eem-ca" key={card.title}>
                <span className="cai">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <PlatformsBand tint items={["Klaviyo", "Omnisend", "Mailchimp", "Shopify Email", "Attentive", "Postscript"]} />

      {/* PROBLEMS */}
      <section className="band" id="problems">
        <div className="wrap">
          <SecHead eyebrow="Common problems" heading="Common e-commerce email problems." />
          <FixTable rows={FIXES} />
        </div>
      </section>

      {/* INCLUDED */}
      <section className="band tint" id="included">
        <div className="wrap">
          <SecHead eyebrow="What’s included" heading="From list audit to monthly revenue reporting." />
          <IncludedGrid items={INCLUDED} />
        </div>
      </section>

      {/* WHO */}
      <section className="band" id="forwho">
        <div className="wrap">
          <SecHead eyebrow="Who it’s for" heading="Turn your list into repeat customers." />
          <WhoGrid2 items={WHO} />
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} tint eyebrow="Common questions" heading="Asked before every setup." />

      <CtaBand
        id="start"
        eyebrow="E-commerce Email Marketing"
        heading="Turn your list into repeat customers."
        copy={
          <>
            Book a free call to review your email setup:{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>we’ll review your flows, campaigns, and list.</strong>
          </>
        }
        primaryLabel="Book an e-commerce email call"
        primaryHref="/contact"
        secondary={{ label: "See the core flows", href: "#flows", arrow: "↗" }}
      />
    </>
  );
}
