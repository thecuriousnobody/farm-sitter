import { NextRequest, NextResponse } from "next/server";
import { addFoundingMemberToMailchimp } from "@/lib/mailchimp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, zip, city, state, animalTypes, tier, source, careRequestId } = body;

    if (!firstName || !email || !zip) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Replace with Prisma insert when DATABASE_URL is configured
    // await prisma.foundingMemberLead.upsert({
    //   where: { email },
    //   update: { tier, zip, city, state, animalTypes, source, careRequestId },
    //   create: { firstName, lastName, email, zip, city, state, animalTypes, tier, source, careRequestId },
    // });

    await addFoundingMemberToMailchimp({ firstName, lastName, email, zip, tier: tier ?? "FOUNDING", source }).catch(
      (err) => console.error("[founding-member] Mailchimp sync failed:", err)
    );

    console.log("[founding-member] New signup:", { email, tier, zip, source: source ?? "direct" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[founding-member] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
