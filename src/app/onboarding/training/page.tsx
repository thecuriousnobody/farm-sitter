"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ANIMAL_TIERS_SITTER, ANIMALS_STORAGE_KEY } from "@/lib/animals";

const MODULES = [
  {
    id: 1,
    title: "Introduction to Professional Farm Sitting",
    desc: "What it means to be a certified Farm Sitter, professional standards, and the operator role.",
    duration: "45 min",
    status: "available",
  },
  {
    id: 2,
    title: "Animal Care Fundamentals — Tier 1 & 2",
    desc: "Care protocols for small animals, poultry, herd animals, and specialty birds.",
    duration: "1.5 hrs",
    status: "available",
  },
  {
    id: 3,
    title: "Equine & Stalled Animal Care — Tier 3",
    desc: "Horse handling, stall cleaning, turnout, blanketing, and routine care.",
    duration: "2 hrs",
    status: "locked",
  },
  {
    id: 4,
    title: "Specialized & Medical Care — Tier 4",
    desc: "Milking procedures, medication administration, rehab animals, and time-sensitive routines.",
    duration: "2 hrs",
    status: "locked",
  },
  {
    id: 5,
    title: "Client Relations & Communication",
    desc: "Meet and greets, client intake, property walkthroughs, and professional communication.",
    duration: "1 hr",
    status: "locked",
  },
  {
    id: 6,
    title: "Safety, Emergency Protocols & Liability",
    desc: "Property safety, animal emergencies, incident documentation, and insurance basics.",
    duration: "1 hr",
    status: "locked",
  },
  {
    id: 7,
    title: "Business Operations & Standards",
    desc: "Pricing, contracts, scheduling, recordkeeping, and professional business conduct.",
    duration: "1 hr",
    status: "locked",
  },
  {
    id: 8,
    title: "Final Assessment",
    desc: "Comprehensive certification exam covering all program material. Must pass to earn credential.",
    duration: "~1 hr",
    status: "locked",
    isExam: true,
  },
];

const STATUS_STYLE = {
  available: "bg-sage-light/30 text-sage-dark",
  locked: "bg-wheat-light text-earth-light",
  complete: "bg-sage text-white",
};

const STATUS_LABEL = {
  available: "Available",
  locked: "Locked",
  complete: "Complete ✓",
};

export default function TrainingPage() {
  const router = useRouter();
  const [completed, setCompleted] = useState<number[]>([]);
  const [animals, setAnimals] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ANIMALS_STORAGE_KEY);
      if (stored) setAnimals(JSON.parse(stored));
    } catch {}
  }, []);

  function toggleAnimal(animal: string) {
    setAnimals((prev) => {
      const updated = prev.includes(animal) ? prev.filter((a) => a !== animal) : [...prev, animal];
      localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function toggleComplete(id: number) {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const allDone = completed.length === MODULES.length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-1">
          Step 4 of 6
        </p>
        <h1 className="text-2xl font-bold text-barn-dark">Training &amp; Coursework</h1>
        <p className="text-earth-dark mt-2 leading-relaxed">
          Complete all modules in order and pass the final assessment to earn your Farm Sitter
          credential. Modules unlock sequentially as you progress.
        </p>
      </div>

      {/* Animal Experience — review & confirm */}
      <div className="bg-white rounded-xl border border-wheat p-5">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-sm font-bold text-barn uppercase tracking-wide">Animal Experience</h2>
          {animals.length > 0 && (
            <span className="text-xs text-sage font-semibold">{animals.length} selected</span>
          )}
        </div>
        <p className="text-xs text-earth-dark mb-4">
          Review and confirm the animals you have experience with. This pre-filled from your
          assessment — update it now if anything is missing. It will appear on your operator profile.
        </p>
        <div className="space-y-3">
          {ANIMAL_TIERS_SITTER.map((tier) => (
            <div key={tier.label}>
              <p className="text-xs font-semibold text-earth uppercase tracking-wide mb-1.5">{tier.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {tier.animals.map((animal) => {
                  const active = animals.includes(animal);
                  return (
                    <button
                      key={animal}
                      type="button"
                      onClick={() => toggleAnimal(animal)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        active
                          ? "bg-sage/20 border-sage text-barn"
                          : "bg-white border-wheat text-earth-dark hover:border-earth-light"
                      }`}
                    >
                      {animal}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-earth-light mt-4 pt-3 border-t border-wheat">
          You can update your animal experience anytime from your dashboard profile as your
          experience grows or as you complete CEU training.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-wheat p-4">
        <div className="flex justify-between text-sm text-earth-dark mb-2">
          <span>Progress</span>
          <span className="font-semibold text-barn">{completed.length} / {MODULES.length} modules</span>
        </div>
        <div className="w-full h-2 bg-wheat rounded-full overflow-hidden">
          <div
            className="h-full bg-sage rounded-full transition-all duration-300"
            style={{ width: `${(completed.length / MODULES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Module list */}
      <div className="space-y-3">
        {MODULES.map((mod) => {
          const done = completed.includes(mod.id);
          const status = done ? "complete" : mod.status as "available" | "locked";
          return (
            <div
              key={mod.id}
              className={`bg-white rounded-xl border p-4 flex items-start gap-4 transition-all ${
                done ? "border-sage" : mod.status === "available" ? "border-wheat" : "border-wheat/50 opacity-60"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-wheat text-earth flex items-center justify-center font-bold text-sm shrink-0">
                {done ? "✓" : mod.id}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className={`font-semibold text-sm ${mod.isExam ? "text-rust" : "text-barn"}`}>
                      {mod.isExam && "⚡ EXAM: "}{mod.title}
                    </h3>
                    <p className="text-xs text-earth-dark mt-0.5">{mod.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-earth-light">{mod.duration}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                </div>
                {mod.status === "available" && !done && (
                  <button
                    onClick={() => toggleComplete(mod.id)}
                    className="mt-2 text-xs font-semibold text-rust hover:underline"
                  >
                    Mark complete (LMS integration pending) →
                  </button>
                )}
                {done && (
                  <button
                    onClick={() => toggleComplete(mod.id)}
                    className="mt-1 text-xs text-earth-light hover:text-earth"
                  >
                    Undo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-wheat-light/40 border border-wheat rounded-xl p-4 text-xs text-earth-dark">
        <strong className="text-barn">Note:</strong> This training interface connects to your
        Learning Management System (LMS). Full module content, video lessons, and assessments
        will be available once the LMS integration is active.
      </div>

      <button
        onClick={() => router.push("/onboarding/credential")}
        disabled={!allDone}
        className="w-full py-3 bg-rust text-white font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {allDone ? "Proceed to Credentialing →" : `Complete all modules to continue (${MODULES.length - completed.length} remaining)`}
      </button>
    </div>
  );
}
