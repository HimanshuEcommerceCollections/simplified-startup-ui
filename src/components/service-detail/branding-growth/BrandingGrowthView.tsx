"use client";

import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";
import {
  FeatureGrid,
  GetGrid,
  NoteCallout,
  PricingTiers,
  ProblemSolve,
  ServiceDetailHero,
  ServiceFaq,
  SignatureCard,
  StepCards,
  TrustBar,
  WhoGrid,
  d,
} from "../ServiceDetailKit";
import "./bg-page.css";

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const ICON_SEARCH = (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_LINES = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ICON_STAR = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 17l-5 3 1-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

/* -------- hero signature: brand-system card -------- */

function BsysCard() {
  return (
    <SignatureCard
      ariaLabel="A sample brand system"
      live="Brand system · v1.0"
      corner="FILES YOU OWN"
      footLeft="One system"
      footRight="consistent everywhere →"
    >
      <div className="bg-bsys-body">
        <div className="bg-bsys-logo">
          <span className="mk">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 15c3-8 11-8 14 0M9 10h.01M15 10h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <div className="lt2">
            <b>Northform</b>
            <small>Logo · lockup</small>
          </div>
        </div>
        <div className="bg-bsys-grid">
          <div className="bg-bcell">
            <span className="k">Palette</span>
            <div className="bg-sw">
              <i className="s1"></i>
              <i className="s2"></i>
              <i className="s3"></i>
              <i className="s4"></i>
              <i className="s5"></i>
            </div>
          </div>
          <div className="bg-bcell bg-type">
            <span className="k">Type</span>
            <div className="ta">Aa Bb Cc</div>
            <div className="tb">Space Grotesk · Instrument Sans</div>
          </div>
        </div>
        <div className="bg-bsys-promise">
          <span className="k">Brand promise</span>
          <p>“The steady hand behind ambitious builds.”</p>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- why branding matters -------- */

const PROBLEMS = [
  { icon: X_ICON, title: "Overlooked in the shortlist", text: "Buyers compare 3–5 options before deciding. If yours looks the least polished, you’re out — before the pitch." },
  { icon: X_ICON, title: "You sound like everyone else", text: "Without clear positioning, your site reads like every competitor’s: “trusted, experienced, results-driven.” Blah.", delay: 70 },
  { icon: X_ICON, title: "Your team says different things", text: "Sales pitches one thing, the website says another, Instagram says a third. Trust erodes with every mismatch." },
  { icon: X_ICON, title: "You compete on price", text: "When you can’t explain why you’re different, price becomes the only thing that matters — and someone’s always cheaper.", delay: 70 },
];

/* -------- included pillars -------- */

const PILLARS = [
  {
    icon: ICON_SEARCH,
    kicker: "01 · Brand discovery",
    title: "What makes you actually different",
    items: [
      <><strong>Audience:</strong> who really buys, why, and what they care about</>,
      <><strong>Competitors:</strong> what everyone says — and where the gaps are</>,
      <><strong>Positioning:</strong> the one space you can own in the buyer’s mind</>,
      <><strong>Voice &amp; findings doc:</strong> captured in one shareable file</>,
    ],
  },
  {
    icon: ICON_LINES,
    kicker: "02 · Messaging framework",
    title: "The words your whole team uses",
    items: [
      <><strong>Brand promise:</strong> one clear sentence — what, and for whom</>,
      <><strong>Value props:</strong> the 3–4 concrete reasons someone chooses you</>,
      <><strong>Elevator pitch</strong> &amp; key messages by audience</>,
      <><strong>Approved language:</strong> exact phrases to use (and avoid)</>,
    ],
    delay: 90,
  },
  {
    icon: ICON_STAR,
    kicker: "03 · Identity & guidelines",
    title: "Every place your brand shows up",
    items: [
      <><strong>Full logo suite:</strong> primary, stacked, horizontal, icon, favicon</>,
      <><strong>All formats:</strong> SVG, PNG, EPS, PDF — source files, forever</>,
      <><strong>Palette &amp; type:</strong> HEX/RGB/CMYK, headline/body/caption</>,
      <><strong>Guidelines PDF:</strong> one file to send any partner or printer</>,
    ],
    delay: 180,
  },
];

/* -------- consistency demo -------- */

const CHANNELS = [
  {
    name: "Google",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bars: [{ g: true }, { g: false, w: "70%" }],
  },
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    bars: [{ g: true, w: "80%" }, { g: false, w: "55%" }],
    delay: 70,
  },
  {
    name: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    bars: [{ g: false, w: "90%" }, { g: true, w: "60%" }],
    delay: 140,
  },
  {
    name: "Proposal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    bars: [{ g: true, w: "75%" }, { g: false, w: "85%" }],
    delay: 210,
  },
];

/* -------- full services -------- */

const GROUPS = [
  {
    icon: ICON_SEARCH,
    title: "Strategy & Research",
    items: ["Brand discovery workshop", "Audience research & buyer profiles", "Competitor analysis", "Market positioning", "Voice & tone definition", "Findings document"],
  },
  {
    icon: ICON_LINES,
    title: "Messaging & Copy",
    items: ["Brand promise (one-liner)", "Value propositions", "Elevator pitch", "Tagline development", "Key messages by segment", "Approved language list"],
    delay: 70,
  },
  {
    icon: ICON_STAR,
    title: "Visual Identity",
    items: ["Primary logo design", "Stacked & horizontal variants", "Icon & favicon", "Full & single-colour versions", "File package (SVG/PNG/EPS/PDF)", "Palette, type & iconography"],
    delay: 140,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M13 3v5h5M10 13h5M10 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Brand Guidelines",
    items: ["Complete guidelines PDF", "Logo usage (dos & don’ts)", "Colour & type rules", "Voice & tone examples", "Photography & imagery style", "Application examples"],
    delay: 210,
  },
];

const ADDONS = ["Brand naming", "Tagline-only", "Business cards & stationery", "Social profile design", "Email signature", "Pitch deck template", "Full brand launch"];

/* -------- what you get / who / steps / pricing / faq -------- */

const GETS = [
  { text: <><strong>One clear message</strong> that sales, marketing, and product all use.</> },
  { text: <><strong>A polished visual system</strong> that looks intentional, not thrown together.</>, delay: 60 },
  { text: <><strong>Files you own</strong> — SVG, PNG, EPS, PDF — handed over on completion.</> },
  { text: <><strong>A guidelines PDF</strong> you can send to anyone who needs to use your brand.</>, delay: 60 },
  { text: <><strong>Faster future work</strong> — every post, ad, and deck now has clear rules to follow.</> },
  { text: <><strong>No decisions at every turn</strong> — the system already answered them.</>, delay: 60 },
];

const WHO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M5 10l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "A new startup",
    text: "Building identity from scratch — start with a real brand, not a Fiverr logo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Outgrown a DIY look",
    text: "The brand you built yourself worked when you were smaller. Now it holds you back.",
    delay: 60,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14-4M4 14a8 8 0 0 0 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Repositioning",
    text: "Changing who you sell to, what you sell, or how you’re priced.",
    delay: 120,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 19V5M5 19h14M9 15l3-4 3 2 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Scaling ad spend",
    text: "Running ads on a weak brand wastes half the budget.",
    delay: 180,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Merging or expanding",
    text: "Bringing two companies together, launching a sub-brand, or entering a new market.",
    delay: 240,
  },
];

const STEPS = [
  { no: "1", dur: "Week 1", title: "Discovery", text: "Kickoff call, audience & competitor research, a short team workshop, and a findings document." },
  { no: "2", dur: "Week 2", title: "Positioning & messaging", text: "Draft positioning and messaging framework. You review, we refine — ends with an approved doc.", delay: 80 },
  { no: "3", dur: "Weeks 3–4", title: "Identity design", text: "Three logo directions, colour & type exploration, then refinement into the full identity suite.", delay: 160 },
  { no: "4", dur: "Week 5", title: "Guidelines & handover", text: "Final guidelines PDF, complete file package, and a handover call so your team can use it all.", delay: 240 },
];

const TIERS = [
  { name: "Starter Brand", best: "The core identity — discovery, logo suite, and basic guidelines.", price: "Published rate" },
  { name: "Full Brand", best: "The complete package — discovery, positioning, messaging, full identity suite, and detailed guidelines.", price: "Published rate", featured: true, badge: "Most popular", delay: 80 },
  { name: "Brand + Launch", best: "Full brand plus rollout across website, social, email, and collateral.", price: "Published rate", delay: 160 },
];

const FAQS = [
  { q: "How long does the process take?", a: <>Usually <strong>4–6 weeks</strong> from kickoff to handover. Faster for smaller Starter Brand projects; Brand + Launch can run 6–8 weeks.</> },
  { q: "Do I get the source files?", a: <>Yes — all final logo files (SVG, PNG, EPS, PDF), the guidelines PDF, and working files you need. <strong>You own everything.</strong></> },
  { q: "How many logo concepts do you show?", a: <><strong>Three distinct directions</strong> in round one — real choices, not “which shade of blue?” You pick one, we refine it through two rounds into the final identity.</> },
  { q: "Can I keep my logo, just get positioning?", a: "Yes. If the visual identity is fine but the strategy is weak, we do positioning, messaging, and voice without redoing the logo — ask for a scoped quote." },
  { q: "Do you do website design too?", a: <>Yes, but as a separate service. Branding defines the identity; Web Design uses it to build the site. <strong>Some bundle both;</strong> some just want a re-skin.</> },
  { q: "What if I don’t like any direction?", a: <>Rare, because concepts come out of discovery, not thin air. If it happens, <strong>we go back to discovery and present new directions at no extra cost.</strong></> },
  { q: "Can you refresh an existing brand?", a: <>Yes. A refresh <strong>keeps the equity you’ve built</strong> and updates what isn’t working — often the right choice for established businesses.</> },
  { q: "Do you help with naming?", a: "On request, as a separate mini-project — idea generation, shortlisting, and trademark/domain checks. Ask us for pricing." },
];

export default function BrandingGrowthView() {
  return (
    <>
      <ServiceDetailHero
        compact
        className="bg-hero"
        eyebrow="Brand identity & positioning"
        line1="A brand that looks established"
        line2={
          <>
            — and says <span className="grad-text">one clear thing.</span>
          </>
        }
        lead={
          <>
            Identity systems and the positioning behind them — the message, the look, and the reasoning that{" "}
            <strong>make the shortlist decision go your way,</strong> whether the buyer sees you on Google, on
            Instagram, in an email, or on a proposal.
          </>
        }
        primary={{ label: "Book a free branding call", href: "/growth-plan" }}
        secondary={{ label: "See what’s included ↓", href: "#included" }}
      >
        <BsysCard />
      </ServiceDetailHero>

      <TrustBar items={["Positioning-led", "Full identity system", "Guidelines in a shareable PDF", "Files you own"]} />

      {/* WHY */}
      <section className="band tint" id="why">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why branding actually matters</span>
            <h2>Most treat branding as “the logo.” That’s not why brands win.</h2>
            <p>Here’s what actually breaks without a real brand — and what a positioning-led system fixes.</p>
          </Reveal>
          <ProblemSolve
            items={PROBLEMS}
            solve={
              <>
                And every asset takes forever without a system.{" "}
                <span className="gt">A real brand fixes all of that — one clear promise, consistent everywhere.</span>
              </>
            }
          />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="band" id="included">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What’s included</span>
            <h2>Strategy, words, and a system — not just a logo.</h2>
          </Reveal>
          <div className="bg-inc3">
            <FeatureGrid cards={PILLARS} columns={3} />
          </div>
        </div>
      </section>

      {/* CONSISTENCY DEMO */}
      <section className="band tint" id="consist">
        <div className="wrap">
          <Reveal className="sec-head" style={{ maxWidth: 760 }}>
            <span className="eyebrow">One message, everywhere</span>
            <h2>The same clear thing — on every surface.</h2>
            <p>Google, Instagram, email, a proposal — a real system means the buyer sees one consistent brand, not four versions of you.</p>
          </Reveal>
          <div className="bg-consist">
            {CHANNELS.map((channel) => (
              <Reveal className="bg-cchan" key={channel.name} style={d(channel.delay ?? 0)}>
                <div className="ch-top">
                  <span className="ci">{channel.icon}</span> {channel.name}
                </div>
                <div className="bg-ch-body">
                  <div className="bg-ch-logo">
                    <span className="m"></span>
                    <b>Northform</b>
                  </div>
                  <div className="bg-ch-promise">
                    <span className="hl">The steady hand</span> behind ambitious builds.
                  </div>
                  {channel.bars.map((bar, i) => (
                    <div className={`bg-ch-bar${bar.g ? " g" : ""}`} style={bar.w ? { width: bar.w } : undefined} key={i}></div>
                  ))}
                  <div className="bg-ch-swatch">
                    <i className="a"></i>
                    <i className="b"></i>
                    <i className="c"></i>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="bg-consist-note">
            Same mark, same promise, same palette — <strong>that repetition is what makes a brand feel established.</strong>
          </Reveal>
        </div>
      </section>

      {/* FULL SERVICES */}
      <section className="band" id="services">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Full list of services</span>
            <h2>Everything under Branding &amp; Growth.</h2>
            <p>Grouped by area — the full set in the Full Brand package. Starter covers the essentials; Brand + Launch adds rollout.</p>
          </Reveal>
          <div className="bg-grp-grid">
            {GROUPS.map((group) => (
              <Reveal className="bg-grp" key={group.title} style={d(group.delay ?? 0)}>
                <div className="gh">
                  <span className="gi">{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="bg-addons">
            <span className="al">Optional add-ons — on request</span>
            <div className="chips">
              {ADDONS.map((addon) => (
                <span key={addon}>{addon}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="band tint" id="getyou">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What you get</span>
            <h2>A brand that does the selling for you.</h2>
          </Reveal>
          <GetGrid items={GETS} />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band dark" id="forwho">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who this is for</span>
            <h2>You’ll get the most out of this if you’re…</h2>
          </Reveal>
          <WhoGrid items={WHO} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>A structured 4–6 week process.</h2>
            <p>Every step ends with a clear deliverable and your sign-off before we move on.</p>
          </Reveal>
          <StepCards steps={STEPS} />
          <NoteCallout style={{ marginTop: 22 }}>
            Optional — <strong>Launch support:</strong> if you want, we roll the new brand out across your website,
            social profiles, email templates, and collateral. Priced separately.
          </NoteCallout>
        </div>
      </section>

      {/* PRICING */}
      <section className="band tint" id="pricing">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Pricing</span>
            <h2>One clear price, published up front.</h2>
            <p>No “book a call to hear our pricing.” One-time projects — no monthly retainer required.</p>
          </Reveal>
          <PricingTiers tiers={TIERS} />
          <NoteCallout>
            One-time projects, paid in two installments — <strong>50% at kickoff, 50% at handover.</strong> Every exact
            number is on the <a href="/pricing">pricing page</a>; any two services bundle at 10% off, three or more at 15%.
          </NoteCallout>
        </div>
      </section>

      <ServiceFaq items={FAQS} columns={2} numbered={false} eyebrow="Common questions" heading="Asked before every brand project." />

      <CtaBand
        eyebrow="Branding & Growth"
        heading="Ready for a brand that does the selling?"
        copy={
          <>
            Book a free branding call. We’ll walk through where your brand is today, where it needs to go, and what
            it’d take to get there —{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>with a clear price at the end. No obligation.</strong>
          </>
        }
        primaryLabel="Book a free branding call"
        primaryHref="/growth-plan"
        secondary={{ label: "See full pricing", href: "/pricing", arrow: "↗" }}
        id="start"
      />
    </>
  );
}
