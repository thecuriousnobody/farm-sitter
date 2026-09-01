import { NextRequest, NextResponse } from "next/server";
import { addPetOwnerToMailchimp } from "@/lib/mailchimp";

type AnimalEntry = { type: string; tier: number; quantity: string };

interface InquiryBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city: string;
  state: string;
  zip: string;
  animals: AnimalEntry[];
  tripStart?: string;
  tripEnd?: string;
  visitFrequency?: string;
  propertyType?: string;
  specialNotes?: string;
  marketingConsent?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body: InquiryBody = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      zip,
      animals,
      tripStart,
      tripEnd,
      visitFrequency,
      propertyType,
      specialNotes,
      marketingConsent,
    } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !city || !state || !zip || !animals?.length) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Always attempt Mailchimp sync (works independently of DB)
    await addPetOwnerToMailchimp({
      firstName,
      lastName,
      email,
      zip,
      city,
      state,
      animalTypes: animals.map((a: AnimalEntry) => a.type),
      marketingConsent: marketingConsent ?? false,
    }).catch((err) => console.error("[inquiries] Mailchimp sync failed:", err));

    // DB not yet connected — log and return preview success
    // Run `npx prisma generate` + `npx prisma migrate dev` once DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.log("[inquiries] No DATABASE_URL — logging submission preview:", {
        firstName, lastName, email, city, state, zip, animals,
        visitFrequency, propertyType, specialNotes, marketingConsent,
      });
      return NextResponse.json({ success: true, inquiryId: `preview-${Date.now()}` });
    }

    // ── Live DB path ──────────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    try {
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            phone: phone || null,
            city,
            state,
            zip,
            roles: ["ANIMAL_OWNER"],
          },
        });
      }

      await prisma.customerProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          primaryAnimalTypes: animals.map((a: AnimalEntry) => a.type),
          animalCounts: Object.fromEntries(animals.map((a: AnimalEntry) => [a.type, a.quantity])),
          marketingConsent: marketingConsent ?? false,
        },
        update: {
          marketingConsent: marketingConsent ?? false,
        },
      });

      const combinedNotes = [
        visitFrequency ? `Visit frequency: ${visitFrequency}` : null,
        propertyType ? `Property type: ${propertyType}` : null,
        specialNotes || null,
      ]
        .filter(Boolean)
        .join("\n");

      const careRequest = await prisma.careRequest.create({
        data: {
          customerId: user.id,
          tripStart: tripStart ? new Date(tripStart) : null,
          tripEnd: tripEnd ? new Date(tripEnd) : null,
          animalTypes: animals.map((a: AnimalEntry) => a.type),
          animalQuantities: Object.fromEntries(
            animals.map((a: AnimalEntry) => [a.type, a.quantity])
          ),
          serviceNotes: combinedNotes || null,
          city,
          state,
          zip,
        },
      });

      return NextResponse.json({ success: true, inquiryId: careRequest.id });
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error("[POST /api/inquiries]", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
