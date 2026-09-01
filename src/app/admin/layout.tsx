import Link from "next/link";

const adminNav = [
  { href: "/admin", label: "Overview", icon: "📊", exact: true },
  { href: "/admin/inquiries", label: "Inquiries", icon: "📋", exact: false },
  { href: "/admin/operators", label: "Operators", icon: "👥", exact: false },
  { href: "/admin/background-checks", label: "Background Checks", icon: "🔍", exact: false },
  { href: "/admin/directory", label: "Rural Directory", icon: "📍", exact: false },
  { href: "/admin/coverage", label: "Coverage Map", icon: "🗺️", exact: false },
  { href: "/admin/travel-network", label: "Travel Network", icon: "✈️", exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 bg-barn-dark text-cream flex flex-col">
        <div className="px-4 py-5 border-b border-barn-light/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-earth-light">
            Admin Portal
          </p>
          <p className="text-xs text-cream/40 mt-0.5">Internal Only</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream/70 hover:text-cream hover:bg-barn-light/30 transition-colors"
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-barn-light/20 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/50 hover:text-cream/80 hover:bg-barn-light/20 transition-colors"
          >
            <span>↗</span> Operator Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/50 hover:text-cream/80 hover:bg-barn-light/20 transition-colors"
          >
            <span>←</span> Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden bg-cream-dark">{children}</main>
    </div>
  );
}
