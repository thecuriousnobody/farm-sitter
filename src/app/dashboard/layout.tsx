export const dynamic = "force-dynamic";

import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardNav />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
