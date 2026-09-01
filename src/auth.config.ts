// Edge-safe auth config — no Prisma, no bcrypt, no Node.js-only modules.
// Used by middleware.ts (runs in Edge runtime).
// src/auth.ts extends this with the full credentials provider.

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" as const },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.roles = (user as any).roles ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.onboardingStatus = (user as any).onboardingStatus ?? "REGISTERED";
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.roles = (token.roles as string[]) ?? [];
      session.user.onboardingStatus = (token.onboardingStatus as string) ?? "REGISTERED";
      return session;
    },
  },
  providers: [], // Providers added in src/auth.ts (Node.js only)
} satisfies NextAuthConfig;
