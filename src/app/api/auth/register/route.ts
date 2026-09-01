import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, city, state, zip, password } =
      await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      // Dev preview — no DB connected
      console.log("[register] Dev mode — would create operator:", { firstName, lastName, email });
      return NextResponse.json({ success: true, dev: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists." },
          { status: 409 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
          city: city || null,
          state: state || null,
          zip: zip || null,
          passwordHash,
          roles: ["OPERATOR_PROSPECT"],
          operatorProfile: {
            create: {
              onboardingStatus: "REGISTERED",
            },
          },
        },
      });

      return NextResponse.json({ success: true, userId: user.id });
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
