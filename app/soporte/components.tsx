import Link from "next/link";
import type { ReactNode } from "react";
import { itemBySlug, neighbors, HUB } from "./nav";

/* ---------- Page scaffolding ---------- */

export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="sop-breadcrumb" aria-label="Ruta de navegación">
      <Link href="/">Inicio</Link>
      <span className="sep">›</span>
      <Link href="/soporte">Soporte</Link>
      <span className="sep">›</span>
      <span aria-current="page">{title}</span>
    </nav>
  );
}

export function PageHeader({
  slug,
  lead,
}: {
  slug: string;
  lead: ReactNode;
}) {
  const item = itemBySlug(slug);
  const title = item?.title ?? "";
  return (
    <header>
      <Breadcrumb title={title} />
      <h1 className="sop-h1">
        {item?.icon} {title}
      </h1>
      <div className="sop-meta">
        <span className="pill">⏱️ {item?.read} de lectura</span>
        <span className="pill">Sobres · Presupuesto Personal</span>
      </div>
      <p className="sop-lead">{lead}</p>
    </header>
  );
}

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <div className="sop-toc">
      <h4>En esta página</h4>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrevNext({ slug }: { slug: string }) {
  const { prev, next } = neighbors(slug);
  return (
    <nav className="sop-prevnext" aria-label="Continuar leyendo">
      {prev ? (
        <Link href={prev.slug}>
          <div className="dir">← Anterior</div>
          <div className="t">{prev.icon} {prev.title}</div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.slug} className="next">
          <div className="dir">Siguiente →</div>
          <div className="t">{next.icon} {next.title}</div>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

/* ---------- Callouts ---------- */

type CalloutType = "tip" | "warn" | "good" | "whatif";
const CALLOUT_META: Record<CalloutType, { icon: string; label: string }> = {
  tip: { icon: "💡", label: "Tip" },
  warn: { icon: "⚠️", label: "Cuidado" },
  good: { icon: "✅", label: "Buena práctica" },
  whatif: { icon: "❓", label: "¿Y si…?" },
};

export function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const meta = CALLOUT_META[type];
  return (
    <div className={`callout ${type}`}>
      <span className="cico" aria-hidden>{meta.icon}</span>
      <div className="cbody">
        <div className="ctitle">{title ?? meta.label}</div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Money example ---------- */

export function Money({ label = "Ejemplo en pesos", children }: { label?: string; children: ReactNode }) {
  return (
    <div className="money">
      <div className="mlabel">💵 {label}</div>
      {children}
    </div>
  );
}

export function MoneyRow({ name, amount, sign }: { name: string; amount: string; sign?: "pos" | "neg" }) {
  return (
    <div className="row">
      <span>{name}</span>
      <span className={`amt ${sign ?? ""}`}>{amount}</span>
    </div>
  );
}

/* ---------- Steps ---------- */

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="sop-steps">{children}</ol>;
}

/* ---------- Accordion (¿Y si…?) ---------- */

export function WhatIf({ children }: { children: ReactNode }) {
  return <div className="sop-accordion">{children}</div>;
}

export function WhatIfItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="acc-body">{children}</div>
    </details>
  );
}

/* ---------- Flow diagram ---------- */

export function Flow({ children }: { children: ReactNode }) {
  return <div className="flow">{children}</div>;
}

export function FlowBox({
  title,
  sub,
  variant,
}: {
  title: string;
  sub?: string;
  variant?: "accent" | "yellow";
}) {
  return (
    <div className={`flow-box ${variant ?? ""}`}>
      <div className="fb-title">{title}</div>
      {sub && <div className="fb-sub">{sub}</div>}
    </div>
  );
}

export function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flow-arrow">
      {label && <span className="lbl">{label}</span>}
      <span aria-hidden>▼</span>
    </div>
  );
}

/* ---------- Cards ---------- */

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="sop-cards">{children}</div>;
}

export function SopCard({
  href,
  icon,
  title,
  desc,
  read,
}: {
  href: string;
  icon: string;
  title: string;
  desc: string;
  read?: string;
}) {
  return (
    <Link href={href} className="sop-card">
      <div className="ci" aria-hidden>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {read && <div className="cread">⏱️ {read}</div>}
    </Link>
  );
}

/* ---------- Misc ---------- */

export function Shot({ label }: { label: string }) {
  return <div className="sop-shot">📸 [captura: {label}]</div>;
}

export function Screenshot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="sop-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function ScreenshotRow({ children }: { children: ReactNode }) {
  return <div className="sop-figrow">{children}</div>;
}

export function BigCta({
  title,
  sub,
  href,
  cta,
}: {
  title: string;
  sub: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="sop-bigcta">
      <div>
        <div className="bc-t">{title}</div>
        <div className="bc-s">{sub}</div>
      </div>
      <Link href={href}>{cta}</Link>
    </div>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="sop-table-wrap"><table className="sop-table">{children}</table></div>;
}

export { HUB };
