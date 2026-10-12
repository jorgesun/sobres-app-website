"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpart, hubFor, langOf, navFor, type Lang } from "./nav";

const UI = {
  es: {
    abrir: "Abrir menú",
    soporte: "Soporte",
    sitio: "← Sitio principal",
    contacto: "Contacto",
    buscar: "Buscar en la ayuda…",
    sinResultados: (q: string) => `Sin resultados para “${q}”.`,
    noEncontraste: "¿No encontraste lo que buscabas? Escríbenos a",
    hecho: "Hecho con ♥ en México",
    privacidad: "Privacidad",
    urlPrivacidad: "/privacidad",
    urlSitio: "/",
    otroIdioma: "English",
    otroIdiomaLargo: "Read this page in English",
  },
  en: {
    abrir: "Open menu",
    soporte: "Support",
    sitio: "← Main site",
    contacto: "Contact",
    buscar: "Search help…",
    sinResultados: (q: string) => `No results for “${q}”.`,
    noEncontraste: "Didn't find what you were looking for? Write to us at",
    hecho: "Made with ♥ in Mexico",
    privacidad: "Privacy",
    urlPrivacidad: "/en/privacy",
    urlSitio: "/en",
    otroIdioma: "Español",
    otroIdiomaLargo: "Leer esta página en español",
  },
} satisfies Record<Lang, Record<string, unknown>>;

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const lang = langOf(pathname);
  const ui = UI[lang];
  const NAV = navFor(lang);
  const HUB = hubFor(lang);

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
  }, [q, NAV]);

  const isActive = (slug: string) => pathname === slug;

  // `lang` en el contenedor: el `<html>` de la landing es español, y sin esto un
  // lector de pantalla leería la ayuda en inglés con pronunciación española.
  return (
    <div className={`soporte${open ? " menu-open" : ""}`} lang={lang}>
      <header className="sop-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="sop-burger"
            aria-label={ui.abrir}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
          <Link href={HUB.slug} className="brand">
            <img src="/icon.png" alt="" />
            <span>Sobres <small>· {ui.soporte}</small></span>
          </Link>
        </div>
        <div className="header-actions">
          <Link
            href={counterpart(pathname)}
            hrefLang={lang === "es" ? "en" : "es"}
            lang={lang === "es" ? "en" : "es"}
            aria-label={ui.otroIdiomaLargo}
          >
            {ui.otroIdioma}
          </Link>
          <Link href={ui.urlSitio} className="hide-sm">{ui.sitio}</Link>
          <a href="mailto:hola@sobres-app.com">{ui.contacto}</a>
        </div>
      </header>

      <div className="sop-layout">
        <aside className="sop-sidebar" onClick={() => setOpen(false)}>
          <input
            className="sop-search"
            type="search"
            placeholder={ui.buscar}
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
              {ui.sinResultados(q)}
            </p>
          )}
        </aside>

        <div className="sop-scrim" onClick={() => setOpen(false)} />

        <main className="sop-content">
          <article className="sop-article">{children}</article>
          <footer className="sop-footer">
            {ui.noEncontraste}{" "}
            <a href="mailto:hola@sobres-app.com">hola@sobres-app.com</a>.
            <br />© 2026 Sobres · {ui.hecho} ·{" "}
            <Link href={ui.urlPrivacidad}>{ui.privacidad}</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
