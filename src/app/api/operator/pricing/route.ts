import { NextRequest, NextResponse } from "next/server";

// GET  /api/operator/pricing — returns the current operator's pricing overrides
// POST /api/operator/pricing — saves the operator's base price overrides

export async function GET() {
  // TODO: auth — get operatorId from session
  // For now returns system defaults flag
  return NextResponse.json({ success: true, pricing: null, usingDefaults: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier1Base, tier2Base, tier3Base, tier4Base, dogsBase, plantsBase } = body;

    // Validate — all must be positive integers (cents)
    const fields = { tier1Base, tier2Base, tier3Base, tier4Base, dogsBase, plantsBase };
    for (const [key, val] of Object.entries(fields)) {
      if (typeof val !== "number" || val < 0 || !Number.isInteger(val)) {
        return NextResponse.json(
          { success: false, error: `Invalid value for ${key}` },
          { status: 400 }
        );
      }
    }

    if (!process.env.DATABASE_URL) {
      // Dev mode — log and return success
      console.log("[operator/pricing] Dev mode — pricing would save:", fields);
      return NextResponse.json({ success: true, dev: true });
    }

    // TODO: replace hardcoded operatorId with session user ID once auth is in place
    // const session = await getServerSession();
    // const operatorId = session.user.id;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    try {
      // Placeholder operatorId — replace with auth session
      const operatorId = "placeholder-operator-id";

      await prisma.operatorPricing.upsert({
        where: { operatorId },
        create: { operatorId, ...fields },
        update: { ...fields },
      });

      return NextResponse.json({ success: true });
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error("[POST /api/operator/pricing]", error);
    return NextResponse.json(
      { success: false, error: "Failed to save pricing." },
      { status: 500 }
    );
  }
}
