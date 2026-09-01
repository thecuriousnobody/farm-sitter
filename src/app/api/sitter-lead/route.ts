import { NextRequest, NextResponse } from "next/server";
import { addSitterLeadToMailchimp, addSitterNotifyToMailchimp } from "@/lib/mailchimp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email, assessmentResult } = body;

    if (!email || !assessmentResult) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (assessmentResult === "pass") {
      if (!firstName) {
        return NextResponse.json({ error: "Missing firstName for pass result" }, { status: 400 });
      }
      await addSitterLeadToMailchimp({ firstName, email, assessmentResult: "pass", animalTypes: body.animalTypes ?? [] });
    } else {
      await addSitterNotifyToMailchimp({ email, assessmentResult });
    }

    console.log("[sitter-lead] Captured:", { email, assessmentResult });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[sitter-lead] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
