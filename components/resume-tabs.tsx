"use client";

import { useState } from "react";
import type { ResumeEntry } from "@/lib/wordpress";

interface ResumeTabsProps {
  experience: ResumeEntry[];
  education: ResumeEntry[];
}

export function ResumeTabs({ experience, education }: ResumeTabsProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const entries = activeTab === "experience" ? experience : education;

  return (
    <>
      <div className="resume-tabs" role="tablist" aria-label="Resume">
        <button
          aria-selected={activeTab === "experience"}
          className={activeTab === "experience" ? "active" : ""}
          onClick={() => setActiveTab("experience")}
          role="tab"
          type="button"
        >
          Work experience <span>({experience.length})</span>
        </button>
        <button
          aria-selected={activeTab === "education"}
          className={activeTab === "education" ? "active" : ""}
          onClick={() => setActiveTab("education")}
          role="tab"
          type="button"
        >
          Education <span>({education.length})</span>
        </button>
      </div>
      <div className="resume-list" role="tabpanel">
        {entries.map((entry, index) => (
          <article className="resume-card" key={entry.id}>
            <span className="resume-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{entry.title}</h3>
              <p className="resume-date">{entry.experience}</p>
              <p className="resume-description">{entry.content}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
