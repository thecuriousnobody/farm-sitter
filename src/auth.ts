// Full auth config — Node.js only (Prisma + bcrypt).
// Do NOT import this in middleware.ts — use src/auth.config.ts there instead.

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { PrismaClient } = require("@prisma/client");
          const prisma = new PrismaClient();

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            include: { operatorProfile: true },
          });

          await prisma.$disconnect();

          if (!user || !user.passwordHash) return null;

          const valid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            onboardingStatus: user.operatorProfile?.onboardingStatus ?? "REGISTERED",
          };
        } catch {
          return null;
        }
      },
    }),
  ],
});
