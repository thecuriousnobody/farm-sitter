"use client";

import { useState } from "react";

const COVERED_ZIPS = new Set([
  // Peoria
  "61601", "61602", "61603", "61604", "61605", "61606",
  "61607", "61608", "61610", "61612", "61613", "61614", "61615", "61616",
  // East Peoria
  "61611",
  // Chillicothe
  "61523",
  // Morton
  "61550",
  // Pekin
  "61554", "61555",
  // Washington
  "61571",
]);

const EXPANDING_ZIPS = new Set([
  // Bloomington-Normal
  "61701", "61702", "61703", "61704", "61705", "61761",
  // Galesburg
  "61401",
  // Springfield
  "62701", "62702", "62703", "62704", "62706", "62707", "62711", "62712",
]);

type ZipStatus = "covered" | "expanding" | "none" | null;

export default function ZipChecker() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<ZipStatus>(null);

  function check() {
    const z = zip.trim();
    if (COVERED_ZIPS.has(z)) setStatus("covered");
    else if (EXPANDING_ZIPS.has(z)) setStatus("expanding");
    else setStatus("none");
  }

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-barn mb-3">Check your ZIP code</p>
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="e.g. 61604"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            setStatus(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && zip.length === 5 && check()}
          className="px-4 py-2.5 rounded-lg border border-wheat bg-white text-barn-dark focus:outline-none focus:border-earth focus:ring-1 focus:ring-earth w-40 text-sm"
        />
        <button
          onClick={check}
          disabled={zip.length !== 5}
          className="px-5 py-2.5 bg-rust text-white text-sm font-semibold rounded-lg hover:bg-rust-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check
        </button>
      </div>

      {status === "covered" && (
        <div className="mt-3 flex items-start gap-3 bg-sage/10 border border-sage rounded-lg px-4 py-3 max-w-sm">
          <span className="text-sage font-bold text-lg leading-none mt-0.5">✓</span>
          <div>
            <p className="font-semibold text-barn text-sm">Great news — we cover your area!</p>
            <p className="text-earth-dark text-xs mt-0.5 leading-relaxed">
              Credentialed farm sitters are available near you.
            </p>
            <a
              href="/find-a-sitter"
              className="text-xs text-rust font-semibold hover:underline mt-1.5 inline-block"
            >
              Request a sitter →
            </a>
          </div>
        </div>
      )}

      {status === "expanding" && (
        <div className="mt-3 flex items-start gap-3 bg-wheat-light/70 border border-wheat rounded-lg px-4 py-3 max-w-sm">
          <span className="text-earth font-bold text-lg leading-none mt-0.5">◎</span>
          <div>
            <p className="font-semibold text-barn text-sm">Expanding to your area soon</p>
            <p className="text-earth-dark text-xs mt-0.5 leading-relaxed">
              New operators are in training near you. Leave your info and we'll reach out when coverage opens.
            </p>
            <a
              href="/find-a-sitter"
              className="text-xs text-rust font-semibold hover:underline mt-1.5 inline-block"
            >
              Get notified →
            </a>
          </div>
        </div>
      )}

      {status === "none" && (
        <div className="mt-3 flex items-start gap-3 bg-cream border border-wheat rounded-lg px-4 py-3 max-w-sm">
          <span className="text-earth-light font-bold text-lg leading-none mt-0.5">○</span>
          <div>
            <p className="font-semibold text-barn text-sm">Not yet in your area</p>
            <p className="text-earth-dark text-xs mt-0.5 leading-relaxed">
              Submit your request — we track unmet demand and prioritize those areas for expansion.
            </p>
            <a
              href="/find-a-sitter"
              className="text-xs text-rust font-semibold hover:underline mt-1.5 inline-block"
            >
              Submit your request →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
