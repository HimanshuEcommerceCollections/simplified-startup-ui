"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Role } from "./careers-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Application dialog — posts multipart (fields + optional CV) to the careers API. */
export default function ApplyModal({ role, onClose }: { role: Role | null; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const cvInput = form.elements.namedItem("cv") as HTMLInputElement;
    const cvFile = cvInput.files?.[0];
    if (cvFile && cvFile.size > 5 * 1024 * 1024) {
      setState("error");
      setErrorMsg("The CV file is larger than 5MB — please attach a smaller file.");
      return;
    }

    const body = new FormData(form);
    if (role?.id) body.set("roleId", role.id);
    if (!cvFile) body.delete("cv");

    setState("sending");
    setErrorMsg(null);
    try {
      const res = await fetch(`${API_URL}/api/v1/applications`, { method: "POST", body });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) throw new Error(data?.error ?? `request failed (${res.status})`);
      setState("done");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error && err.message !== "Failed to fetch" ? err.message : null);
    }
  }

  return (
    <div className="cr-apply-overlay" role="dialog" aria-modal="true" aria-label={role ? `Apply for ${role.title}` : "General application"} onClick={onClose}>
      <div className="cr-apply-card" onClick={(e) => e.stopPropagation()}>
        <button className="cr-apply-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        {state === "done" ? (
          <div className="cr-apply-done">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12.5l5 5L20 6" />
            </svg>
            <h3>Application received.</h3>
            <p>
              Thanks — a real person reads every application. If it&apos;s a fit, we&apos;ll reach out to book an intro
              call.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">{role ? "Apply for" : "General application"}</span>
            <h3 className="cr-apply-title">{role ? role.title : "Tell us what you're great at"}</h3>
            {role && (
              <p className="cr-apply-sub">
                {role.location || "Remote"} · {role.type}
              </p>
            )}
            {/* rich description authored in the dashboard; sanitized server-side */}
            {role?.body && <div className="cr-apply-body" dangerouslySetInnerHTML={{ __html: role.body }} />}
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
                <label>
                  Phone <span>(optional)</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
                </label>
                <label>
                  Portfolio / LinkedIn <span>(optional)</span>
                  <input name="portfolioUrl" type="url" placeholder="https://…" />
                </label>
              </div>
              <label>
                Why you? <span>(optional)</span>
                <textarea name="message" rows={3} placeholder="The best thing you've built, shipped, or grown…"></textarea>
              </label>
              <label>
                CV / Resume <span>(optional — PDF or Word, max 5MB)</span>
                <input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
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
                      <a href="mailto:hello@simplifiedstartup.com">hello@simplifiedstartup.com</a>.
                    </>
                  )}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
