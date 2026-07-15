"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, HUB } from "./nav";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return NAV;
    return NAV.map((g) => ({
      ...g,
      items: g.items.filter(
        (it) =>
          it.title.toLowerCase().includes(needle) ||
          it.desc.toLowerCase().includes(needle),
      ),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  const isActive = (slug: string) =>
    slug === "/soporte" ? pathname === "/soporte" : pathname === slug;

  return (
    <div className={`soporte${open ? " menu-open" : ""}`}>
      <header className="sop-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="sop-burger"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
          <Link href="/soporte" className="brand">
            <img src="/icon.png" alt="" />
            <span>Sobres <small>· Soporte</small></span>
          </Link>
        </div>
        <div className="header-actions">
          <Link href="/" className="hide-sm">← Sitio principal</Link>
          <a href="mailto:hola@sobres-app.com">Contacto</a>
        </div>
      </header>

      <div className="sop-layout">
        <aside className="sop-sidebar" onClick={() => setOpen(false)}>
          <input
            className="sop-search"
            type="search"
            placeholder="Buscar en la ayuda…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="sop-nav-group">
            <Link
              href={HUB.slug}
              className={`sop-nav-link${isActive(HUB.slug) ? " active" : ""}`}
            >
              <span className="i" aria-hidden>{HUB.icon}</span>
              {HUB.short}
            </Link>
          </div>

          {groups.map((g) => (
            <div className="sop-nav-group" key={g.label}>
              <h4>{g.label}</h4>
              {g.items.map((it) => (
                <Link
                  key={it.slug}
                  href={it.slug}
                  className={`sop-nav-link${isActive(it.slug) ? " active" : ""}`}
                >
                  <span className="i" aria-hidden>{it.icon}</span>
                  {it.short}
                </Link>
              ))}
            </div>
          ))}
          {groups.length === 0 && (
            <p className="muted" style={{ padding: "0 8px", fontSize: 14 }}>
              Sin resultados para “{q}”.
            </p>
          )}
        </aside>

        <div className="sop-scrim" onClick={() => setOpen(false)} />

        <main className="sop-content">
          <article className="sop-article">{children}</article>
          <footer className="sop-footer">
            ¿No encontraste lo que buscabas? Escríbenos a{" "}
            <a href="mailto:hola@sobres-app.com">hola@sobres-app.com</a>.
            <br />© 2026 Sobres · Hecho con ♥ en México ·{" "}
            <Link href="/privacidad">Privacidad</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
