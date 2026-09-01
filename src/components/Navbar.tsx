"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/find-a-sitter", label: "Find a Sitter" },
  { href: "/founding-members", label: "Join the Community" },
  { href: "/directory", label: "Rural Services" },
  { href: "/resources", label: "Resources" },
  { href: "/become-a-sitter", label: "Become a Farm Sitter" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-barn-dark text-cream sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Farm Sitter"
              width={140}
              height={56}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-cream/80 hover:text-wheat-light hover:bg-barn-light/30 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <div className="ml-3 flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-rust text-white text-sm font-semibold rounded-lg hover:bg-rust-light transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-2 text-sm text-cream/60 hover:text-wheat-light transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-3 px-4 py-2 bg-rust text-white text-sm font-semibold rounded-lg hover:bg-rust-light transition-colors"
              >
                Sitter Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-barn-light/30"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-barn-dark border-t border-barn-light/20 pb-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm text-cream/80 hover:text-wheat-light hover:bg-barn-light/30"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="block mx-4 mt-2 px-4 py-2 bg-rust text-white text-sm font-semibold rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
