"use client";

import { SignatureCard } from "../../ServiceDetailKit";
import { ICON_CHAT, ICON_HEART, ICON_LINES, ICON_MUSIC, ICON_REEL, ICON_REPOST, ICON_SEARCH } from "./icons";
import { useCardRun } from "./useCardRun";

/* Each platform's hero signature card. Children start at opacity 0 and are revealed by
   keyframes once `.run` lands; spf-page.css gives every one a reduced-motion end state. */

/* -------- Facebook: an active business Page -------- */

const FB_POSTS = [
  { icon: ICON_LINES, title: "New weekend brunch", meta: "Helpful post · 2h ago", tag: "Posted" },
  { icon: ICON_REEL, title: "Behind the scenes Reel", meta: "Short video · 1.2K views", tag: "Reel" },
  { icon: ICON_CHAT, title: "3 messages answered", meta: "Replied within 1 hour", tag: "Replied" },
];

export function FacebookPageCard() {
  const run = useCardRun();
  return (
    <SignatureCard
      ariaLabel="An active Facebook business Page"
      className={`spf-card spf-fb${run ? " run" : ""}`}
      live="Business Page"
      corner="ACTIVE & TRUSTED"
      footLeft="Active, helpful, responsive"
      footRight="community that returns →"
    >
      <div className="spf-fb-cover"></div>
      <div className="spf-fb-head">
        <span className="av">S</span>
        <span className="nm">
          <b>Sunrise Cafe</b>
          <small>Local business · 4.8 ★ (212)</small>
        </span>
        <span className="cta2">Message</span>
      </div>
      <div className="spf-fb-posts">
        {FB_POSTS.map((post) => (
          <div className="spf-fp" key={post.title}>
            <span className="fpi">{post.icon}</span>
            <span className="fpn">
              <b>{post.title}</b>
              <small>{post.meta}</small>
            </span>
            <span className="fpx">{post.tag}</span>
          </div>
        ))}
      </div>
    </SignatureCard>
  );
}

/* -------- TikTok: a video in the For You feed (phone mock) -------- */

export function TikTokFeedCard() {
  const run = useCardRun();
  return (
    <SignatureCard
      ariaLabel="A TikTok video in the For You feed"
      className={`spf-card spf-tt${run ? " run" : ""}`}
      live="For You feed"
      corner="CONTENT > FOLLOWERS"
      footLeft="Hook, captions, trending sound"
      footRight="reach by content →"
    >
      <div className="spf-tt-stage">
        <div className="spf-tt-phone">
          <div className="spf-tt-screen">
            <div className="spf-tt-sp spf-tt-fyp">• For You •</div>
            <div className="spf-tt-sp spf-tt-hook">
              <b>Wait, you’ve been doing this wrong</b>
            </div>
            <div className="spf-tt-side">
              <i className="heart"></i>
              <i></i>
              <i></i>
            </div>
            <div className="spf-tt-sp spf-tt-cap">
              <span className="hh">@yourbrand</span> · the 3-second fix <span className="hh">#howto</span>
            </div>
            <div className="spf-tt-sp spf-tt-sound">
              {ICON_MUSIC}
              trending sound
            </div>
          </div>
        </div>
      </div>
    </SignatureCard>
  );
}

/* -------- X: a strong thread -------- */

export function XThreadCard() {
  const run = useCardRun();
  return (
    <SignatureCard
      ariaLabel="A strong thread on X"
      className={`spf-card spf-xt${run ? " run" : ""}`}
      live="Thread"
      corner="CLEAR VOICE"
      footLeft="Teaches, engages, starts replies"
      footRight="part of the conversation →"
    >
      <div className="spf-xt-head">
        <span className="av">S</span>
        <span className="nm">
          <b>Your Founder</b>
          <small>@yourhandle</small>
        </span>
        <span className="badge2">On-brand</span>
      </div>
      <div className="spf-xt-thread">
        <div className="spf-xp">
          <span className="xn">1</span>
          <span className="xc">
            <span className="ln hook"></span>
            <span className="ln w1"></span>
          </span>
        </div>
        {[2, 3].map((n) => (
          <div className="spf-xp" key={n}>
            <span className="xn">{n}</span>
            <span className="xc">
              <span className="ln w1"></span>
              <span className="ln w2"></span>
            </span>
          </div>
        ))}
      </div>
      <div className="spf-xt-eng">
        <span>{ICON_CHAT}48 replies</span>
        <span>{ICON_REPOST}120 reposts</span>
        <span>{ICON_HEART}640 likes</span>
      </div>
    </SignatureCard>
  );
}

/* -------- YouTube: a search result + stat tiles -------- */

const YT_STATS = [
  { v: "9.2%", k: "Click rate" },
  { v: "54%", k: "Retention" },
  { v: "2 yrs", k: "Still viewed" },
];

export function YouTubeSearchCard() {
  const run = useCardRun();
  return (
    <SignatureCard
      ariaLabel="A YouTube video found through search"
      className={`spf-card spf-yt${run ? " run" : ""}`}
      live="Search result"
      corner="FOUND LONG AFTER PUBLISH"
      footLeft="Found, watched, remembered"
      footRight="a long-term asset →"
    >
      <div className="spf-yt-search">
        <span className="si">{ICON_SEARCH}</span>
        <span className="st">
          how to choose CRM software<span className="cur"></span>
        </span>
      </div>
      <div className="spf-yt-card">
        <span className="thumb">
          <span className="play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="dur">8:24</span>
        </span>
        <span className="meta">
          <b>How to Choose CRM Software (2026 Guide)</b>
          <small>Your Brand · 48K views</small>
          <small>Ranks in search &amp; suggested</small>
        </span>
      </div>
      <div className="spf-yt-stats">
        {YT_STATS.map((s) => (
          <span className="ys" key={s.k}>
            <span className="v">{s.v}</span>
            <span className="k">{s.k}</span>
          </span>
        ))}
      </div>
    </SignatureCard>
  );
}
