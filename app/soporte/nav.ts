export type NavItem = {
  slug: string; // full path
  title: string;
  short: string; // sidebar label
  desc: string; // for hub cards
  icon: string;
  read: string; // reading time
};

export type NavGroup = { label: string; items: NavItem[] };

/** Idioma de la ayuda: `/soporte/…` es español, `/en/support/…` inglés. */
export type Lang = "es" | "en";

export function langOf(path: string): Lang {
  return path === "/en/support" || path.startsWith("/en/") ? "en" : "es";
}

export const HUB: NavItem = {
  slug: "/soporte",
  title: "Centro de ayuda",
  short: "Inicio de Soporte",
  desc: "El índice de todo. Empieza por aquí.",
  icon: "🏠",
  read: "1 min",
};

export const NAV: NavGroup[] = [
  {
    label: "Primeros pasos",
    items: [
      {
        slug: "/soporte/empieza-aqui",
        title: "Empieza aquí",
        short: "Empieza aquí",
        desc: "El método de sobres y el ciclo de 4 pasos, en 5 minutos.",
        icon: "🚀",
        read: "5 min",
      },
      {
        slug: "/soporte/flujo-del-dinero",
        title: "Cómo se mueve tu dinero",
        short: "Cómo se mueve tu dinero",
        desc: "La página estrella: el modelo mental completo, con diagramas.",
        icon: "🌊",
        read: "8 min",
      },
    ],
  },
  {
    label: "Guías por pantalla",
    items: [
      { slug: "/soporte/resumen", title: "Pestaña Resumen", short: "Resumen", desc: "Tu panorama: disponible, metas y calendario de pagos.", icon: "📋", read: "5 min" },
      { slug: "/soporte/presupuesto", title: "Pestaña Presupuesto", short: "Presupuesto", desc: "Tus sobres: asignar dinero y moverlo entre categorías.", icon: "📊", read: "6 min" },
      { slug: "/soporte/cuentas", title: "Pestaña Cuentas", short: "Cuentas", desc: "Cuentas, transacciones, confirmar y reconciliar.", icon: "💳", read: "6 min" },
      { slug: "/soporte/reportes", title: "Pestaña Reportes", short: "Reportes", desc: "Tendencias de gasto, patrimonio y gráficas.", icon: "📈", read: "3 min" },
      { slug: "/soporte/ajustes", title: "Pestaña Ajustes", short: "Ajustes", desc: "Tema, Face ID, privacidad, multimoneda y tus datos.", icon: "⚙️", read: "4 min" },
    ],
  },
  {
    label: "Temas a fondo",
    items: [
      { slug: "/soporte/metas", title: "Metas de ahorro", short: "Metas de ahorro", desc: "Los 5 tipos de meta y cómo la app planea tu aporte.", icon: "🎯", read: "5 min" },
      { slug: "/soporte/tarjetas-de-credito", title: "Tarjetas de crédito", short: "Tarjetas de crédito", desc: "La reserva de pago y por qué es la parte más contraintuitiva.", icon: "💳", read: "6 min" },
      { slug: "/soporte/pagos-programados", title: "Pagos programados", short: "Pagos programados", desc: "Recurrentes: procesar, omitir y ajustar montos.", icon: "🗓️", read: "5 min" },
      { slug: "/soporte/reconciliacion", title: "Reconciliación", short: "Reconciliación", desc: "Confirmar vs. reconciliar: cuadrar con el banco.", icon: "✅", read: "4 min" },
    ],
  },
  {
    label: "Más ayuda",
    items: [
      { slug: "/soporte/preguntas-frecuentes", title: "Preguntas frecuentes", short: "Preguntas frecuentes", desc: "Respuestas rápidas a las dudas más comunes.", icon: "❓", read: "5 min" },
    ],
  },
];

export const HUB_EN: NavItem = {
  slug: "/en/support",
  title: "Help center",
  short: "Support home",
  desc: "The index of everything. Start here.",
  icon: "🏠",
  read: "1 min",
};

// Mismo orden y misma forma que NAV: el selector de idioma empareja cada
// página con su traducción por POSICIÓN (ver `counterpart`).
export const NAV_EN: NavGroup[] = [
  {
    label: "First steps",
    items: [
      {
        slug: "/en/support/getting-started",
        title: "Start here",
        short: "Start here",
        desc: "The envelope method and the 4-step cycle, in 5 minutes.",
        icon: "🚀",
        read: "5 min",
      },
      {
        slug: "/en/support/money-flow",
        title: "How your money moves",
        short: "How your money moves",
        desc: "The key page: the complete mental model, with diagrams.",
        icon: "🌊",
        read: "8 min",
      },
    ],
  },
  {
    label: "Guides by screen",
    items: [
      { slug: "/en/support/summary", title: "Summary tab", short: "Summary", desc: "Your overview: available money, goals and payment calendar.", icon: "📋", read: "5 min" },
      { slug: "/en/support/budget", title: "Budget tab", short: "Budget", desc: "Your envelopes: assigning money and moving it between categories.", icon: "📊", read: "6 min" },
      { slug: "/en/support/accounts", title: "Accounts tab", short: "Accounts", desc: "Accounts, transactions, clearing and reconciling.", icon: "💳", read: "6 min" },
      { slug: "/en/support/reports", title: "Reports tab", short: "Reports", desc: "Spending trends, net worth and charts.", icon: "📈", read: "3 min" },
      { slug: "/en/support/settings", title: "Settings tab", short: "Settings", desc: "Theme, Face ID, privacy, multi-currency and your data.", icon: "⚙️", read: "4 min" },
    ],
  },
  {
    label: "Deep dives",
    items: [
      { slug: "/en/support/goals", title: "Savings goals", short: "Savings goals", desc: "The 5 goal types and how the app plans your contribution.", icon: "🎯", read: "5 min" },
      { slug: "/en/support/credit-cards", title: "Credit cards", short: "Credit cards", desc: "The payment reserve, and why it's the least intuitive part.", icon: "💳", read: "6 min" },
      { slug: "/en/support/scheduled-payments", title: "Scheduled payments", short: "Scheduled payments", desc: "Recurring payments: process, skip and adjust amounts.", icon: "🗓️", read: "5 min" },
      { slug: "/en/support/reconciliation", title: "Reconciliation", short: "Reconciliation", desc: "Clearing vs. reconciling: matching your bank.", icon: "✅", read: "4 min" },
    ],
  },
  {
    label: "More help",
    items: [
      { slug: "/en/support/faq", title: "Frequently asked questions", short: "FAQ", desc: "Quick answers to the most common questions.", icon: "❓", read: "5 min" },
    ],
  },
];

export const navFor = (lang: Lang) => (lang === "en" ? NAV_EN : NAV);
export const hubFor = (lang: Lang) => (lang === "en" ? HUB_EN : HUB);

// Flattened, in reading order, for prev/next navigation.
export const ORDER: NavItem[] = [HUB, ...NAV.flatMap((g) => g.items)];
export const ORDER_EN: NavItem[] = [HUB_EN, ...NAV_EN.flatMap((g) => g.items)];

const orderFor = (slug: string) => (langOf(slug) === "en" ? ORDER_EN : ORDER);

export function neighbors(slug: string): { prev?: NavItem; next?: NavItem } {
  const order = orderFor(slug);
  const i = order.findIndex((n) => n.slug === slug);
  if (i === -1) return {};
  return { prev: order[i - 1], next: order[i + 1] };
}

export function itemBySlug(slug: string): NavItem | undefined {
  return orderFor(slug).find((n) => n.slug === slug);
}

/** La misma página en el otro idioma; el inicio de la ayuda si no hay pareja. */
export function counterpart(slug: string): string {
  const en = langOf(slug) === "en";
  const [desde, hacia] = en ? [ORDER_EN, ORDER] : [ORDER, ORDER_EN];
  const i = desde.findIndex((n) => n.slug === slug);
  return (i === -1 ? hacia[0] : hacia[i]).slug;
}
