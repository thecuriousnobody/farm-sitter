import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Onboarding status → the URL they should be at
const ONBOARDING_ROUTES: Record<string, string> = {
  REGISTERED:              "/onboarding/background-check",
  BG_CHECK_INITIATED:      "/onboarding/background-check",
  BG_CHECK_PENDING:        "/onboarding/background-check",
  BG_CHECK_FAILED:         "/onboarding/background-check",
  BG_CHECK_PASSED:         "/onboarding/program",
  PROGRAM_SELECTED:        "/onboarding/payment",
  PAYMENT_PENDING:         "/onboarding/payment",
  ENROLLED:                "/onboarding/training",
  TRAINING_IN_PROGRESS:    "/onboarding/training",
  TRAINING_COMPLETE:       "/onboarding/credential",
  CREDENTIAL_ISSUED:       "/onboarding/compliance",
  INSURANCE_PENDING:       "/onboarding/compliance",
  INSURANCE_VERIFIED:      "/onboarding/compliance",
  SUBSCRIPTION_ACTIVE:     "/dashboard",
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // ── Unauthenticated access ─────────────────────────────────────────────────
  if (!session) {
    // Protect dashboard and onboarding from guests
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const status = session.user.onboardingStatus ?? "REGISTERED";
  const isActive = status === "SUBSCRIPTION_ACTIVE";

  // ── Redirect logged-in users away from login/register ─────────────────────
  if (pathname === "/login" || pathname === "/register") {
    const dest = isActive ? "/dashboard" : (ONBOARDING_ROUTES[status] ?? "/onboarding/background-check");
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // ── Dashboard: require active subscription ─────────────────────────────────
  if (pathname.startsWith("/dashboard") && !isActive) {
    const dest = ONBOARDING_ROUTES[status] ?? "/onboarding/background-check";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // ── Onboarding: redirect to correct step if trying to skip ahead ──────────
  if (pathname.startsWith("/onboarding")) {
    if (isActive) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Allow access to the correct step and any prior step (don't lock backwards)
    // Just let them navigate freely within onboarding — server pages re-validate
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/login",
    "/register",
  ],
};
