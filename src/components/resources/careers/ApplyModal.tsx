"use client";

import { useEffect } from "react";
import type { Role } from "./careers-data";
import ApplyForm from "./ApplyForm";

/** Wide application dialog — the rich JD on the left (70%), the form on the right (30%). */
export default function ApplyModal({ role, onClose }: { role: Role | null; onClose: () => void }) {
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

  return (
    <div className="cr-apply-overlay" role="dialog" aria-modal="true" aria-label={role ? `Apply for ${role.title}` : "General application"} onClick={onClose}>
      <div className="cr-apply-card" onClick={(e) => e.stopPropagation()}>
        <button className="cr-apply-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        {/* Left: the job description */}
        <div className="cr-apply-jd">
          <span className="eyebrow">{role ? "Apply for" : "General application"}</span>
          <h3 className="cr-apply-title">{role ? role.title : "Tell us what you're great at"}</h3>
          <p className="cr-apply-sub">{role ? `${role.location || "Remote"} · ${role.type}` : "Remote"}</p>
          <p className="cr-apply-desc">
            {role
              ? role.desc
              : "Don't see your exact role on the openings list? Send us the best thing you've built, shipped, or grown — we read every application and make room for great people."}
          </p>
          {/* rich description authored in the dashboard; sanitized server-side */}
          {role?.body && <div className="cr-apply-body" dangerouslySetInnerHTML={{ __html: role.body }} />}
        </div>

        {/* Right: the application form */}
        <aside className="cr-apply-side">
          <h4 className="cr-apply-side-title">Apply for this role</h4>
          <ApplyForm role={role} />
        </aside>
      </div>
    </div>
  );
}
