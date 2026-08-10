"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, Mail, Users } from "lucide-react";

const items = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/leads", label: "Leads", icon: Mail },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/lab", label: "Lab", icon: Boxes },
];

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1" aria-label="Admin navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center justify-center gap-2 border px-3 text-sm font-semibold transition lg:justify-start ${
              active
                ? "border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--foreground)]"
                : "border-transparent text-[var(--muted-strong)] hover:border-[var(--border)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Icon size={16} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
