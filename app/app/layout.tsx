"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { StoreProvider, useStore } from "@/lib/data/store";

const TABS = [
  { href: "/app/budget", label: "Presupuesto", icon: "📊" },
  { href: "/app/accounts", label: "Cuentas", icon: "🏦" },
];

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useStore();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="Sobres" width={28} height={28} className="rounded-[8px]" />
            <span className="text-button text-ink">Sobres</span>
          </Link>
          <nav className="flex items-center gap-1">
            {TABS.map((t) => {
              const active = pathname.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`rounded-pill px-4 py-2 text-sub font-semibold transition ${
                    active
                      ? "bg-blue text-white"
                      : "text-muted hover:bg-field"
                  }`}
                >
                  <span className="mr-1">{t.icon}</span>
                  {t.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="ml-1 rounded-pill px-3 py-2 text-sub font-semibold text-muted hover:bg-field"
              title="Cuenta y sincronización"
            >
              ☁️
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        {loading ? (
          <div className="flex h-64 items-center justify-center text-muted">
            Cargando presupuesto…
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Shell>{children}</Shell>
    </StoreProvider>
  );
}
