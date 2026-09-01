"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "💬", exact: true },
  { href: "/dashboard/inquiries", label: "Inquiries", icon: "📋", exact: false },
  { href: "/dashboard/calculator", label: "Calculator", icon: "🧮", exact: false },
  { href: "/dashboard/pricing", label: "My Pricing", icon: "💲", exact: false },
  { href: "/dashboard/learning", label: "Learning Hub", icon: "📚", exact: false },
  { href: "/dashboard/travel-network", label: "Travel Network", icon: "🗺️", exact: false },
  { href: "/dashboard/profile", label: "My Profile", icon: "👤", exact: false },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 bg-barn-dark text-cream flex flex-col">
      <div className="px-4 py-5 border-b border-barn-light/20">
        <p className="text-xs font-semibold uppercase tracking-widest text-earth-light">
          Operator Portal
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-rust text-white"
                  : "text-cream/70 hover:text-cream hover:bg-barn-light/30"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-barn-light/20">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/50 hover:text-cream/80 hover:bg-barn-light/20 transition-colors"
        >
          <span>←</span> Back to Site
        </Link>
      </div>
    </aside>
  );
}
