import crypto from "crypto";

// ---------------------------------------------------------------------------
// Mailchimp Marketing API utility
//
// Required env vars:
//   MAILCHIMP_API_KEY        — from Mailchimp Account > Extras > API Keys
//   MAILCHIMP_SERVER_PREFIX  — the prefix in your API key (e.g. "us6")
//   MAILCHIMP_AUDIENCE_ID    — the list/audience ID from Mailchimp > Audience > Settings
//
// Single audience strategy: everyone goes into one audience, tagged by role.
// Mailchimp automations trigger based on tags.
// ---------------------------------------------------------------------------

function subscriberHash(email: string) {
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

function getClient() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  if (!apiKey || !server) return null;
  return { apiKey, server, audienceId: process.env.MAILCHIMP_AUDIENCE_ID ?? "" };
}

async function upsertMember(
  email: string,
  mergeFields: Record<string, string>,
  tags: string[],
  status: "subscribed" | "pending" = "subscribed"
) {
  const client = getClient();
  if (!client) {
    console.log("[mailchimp] Not configured — skipping:", email, tags);
    return;
  }

  const hash = subscriberHash(email);
  const url = `https://${client.server}.api.mailchimp.com/3.0/lists/${client.audienceId}/members/${hash}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${client.apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: status,
      merge_fields: mergeFields,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("[mailchimp] upsertMember failed:", err);
    return;
  }

  // Apply tags separately
  if (tags.length > 0) {
    const tagsUrl = `https://${client.server}.api.mailchimp.com/3.0/lists/${client.audienceId}/members/${hash}/tags`;
    await fetch(tagsUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${client.apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: tags.map((name) => ({ name, status: "active" })) }),
    });
  }
}

// ---------------------------------------------------------------------------
// Public helpers — called from API routes
// ---------------------------------------------------------------------------

/** Pet owner submits find-a-sitter form */
export async function addPetOwnerToMailchimp(opts: {
  firstName: string;
  lastName: string;
  email: string;
  zip: string;
  city: string;
  state: string;
  animalTypes: string[];
  marketingConsent: boolean;
}) {
  const tags = ["pet-owner"];
  if (opts.marketingConsent) tags.push("opted-in-reminders");

  await upsertMember(
    opts.email,
    {
      FNAME: opts.firstName,
      LNAME: opts.lastName,
      ZIP: opts.zip,
      CITY: opts.city,
      STATE: opts.state,
      ANIMALS: opts.animalTypes.join(", "),
    },
    tags,
    opts.marketingConsent ? "subscribed" : "pending"
  );
}

/** Founding member / VIP signup */
export async function addFoundingMemberToMailchimp(opts: {
  firstName: string;
  lastName?: string;
  email: string;
  zip: string;
  tier: string;
  source?: string;
}) {
  await upsertMember(
    opts.email,
    {
      FNAME: opts.firstName,
      LNAME: opts.lastName ?? "",
      ZIP: opts.zip,
    },
    ["pet-owner", "founding-member", `tier-${opts.tier.toLowerCase()}`, opts.source ?? "direct"]
  );
}

/** Farm sitter lead — assessment passed, entered email to see programs */
export async function addSitterLeadToMailchimp(opts: {
  firstName: string;
  email: string;
  assessmentResult: "pass" | "experience-needed" | "resource";
  animalTypes?: string[];
}) {
  const tags = ["sitter-lead", `assessment-${opts.assessmentResult}`];
  if (opts.animalTypes?.length) {
    opts.animalTypes.forEach((a) => tags.push(`animals-${a.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`));
  }

  await upsertMember(
    opts.email,
    {
      FNAME: opts.firstName,
      LNAME: "",
      ANIMALS: (opts.animalTypes ?? []).join(", "),
    },
    tags
  );
}

/** Farm sitter notify-me (non-pass paths — email only, no name) */
export async function addSitterNotifyToMailchimp(opts: {
  email: string;
  assessmentResult: "experience-needed" | "resource";
}) {
  await upsertMember(
    opts.email,
    {},
    ["sitter-lead", `assessment-${opts.assessmentResult}`, "notify-when-ready"]
  );
}
