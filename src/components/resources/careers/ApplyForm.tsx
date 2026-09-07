"use client";

import { useState, type FormEvent } from "react";
import type { Role } from "./careers-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Application form for the apply page — posts JSON; the CV arrives as a shared Drive link. */
export default function ApplyForm({ role }: { role: Role | null }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const body = JSON.stringify({ ...data, roleId: role?.id ?? "" });

    setState("sending");
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_URL}/api/v1/applications`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) throw new Error(json?.error ?? `request failed (${res.status})`);
      setState("done");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error && err.message !== "Failed to fetch" ? err.message : null);
    }
  }

  if (state === "done") {
    return (
      <div className="cr-apply-done">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12.5l5 5L20 6" />
        </svg>
        <h3>Application received.</h3>
        <p>
          Thanks — a real person reads every application. If it&apos;s a fit, we&apos;ll reach out to book an intro
          call.
        </p>
      </div>
    );
  }

  return (
    <form className="cr-apply-form" onSubmit={onSubmit}>
      <div className="cr-apply-grid">
        <label>
          Your name
          <input name="name" type="text" required autoComplete="name" placeholder="Jane Builder" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="jane@email.com" />
        </label>
      </div>
      <label>
        Phone <span>(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
      </label>
      <label>
        CV / Resume link
        <input name="cvUrl" type="url" required placeholder="https://drive.google.com/…" />
        <small className="cr-apply-hint">
          Share a Google Drive (or similar) link — set it to “anyone with the link can view”.
        </small>
      </label>
      <label>
        Why you? <span>(optional)</span>
        <textarea name="message" rows={4} placeholder="The best thing you've built, shipped, or grown…"></textarea>
      </label>
      <div className="cr-apply-hp" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <button className="btn btn-primary cr-apply-submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send application"} <span className="arw">↗</span>
      </button>
      {state === "error" && (
        <p className="cr-apply-error" role="alert">
          {errorMsg ?? (
            <>
              Something went wrong sending your application. Please try again — or email{" "}
              <a href="mailto:simplifiedstartupllc@gmail.com">simplifiedstartupllc@gmail.com</a>.
            </>
          )}
        </p>
      )}
    </form>
  );
}
