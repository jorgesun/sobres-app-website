export type NavItem = {
  slug: string; // full path
  title: string;
  short: string; // sidebar label
  desc: string; // for hub cards
  icon: string;
  read: string; // reading time
};

export type NavGroup = { label: string; items: NavItem[] };

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
      { slug: "/soporte/diagnostico", title: "Pestaña Diagnóstico", short: "Diagnóstico", desc: "La salud de tu presupuesto y sus señales de alerta.", icon: "🩺", read: "3 min" },
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

// Flattened, in reading order, for prev/next navigation.
export const ORDER: NavItem[] = [HUB, ...NAV.flatMap((g) => g.items)];

export function neighbors(slug: string): { prev?: NavItem; next?: NavItem } {
  const i = ORDER.findIndex((n) => n.slug === slug);
  if (i === -1) return {};
  return { prev: ORDER[i - 1], next: ORDER[i + 1] };
}

export function itemBySlug(slug: string): NavItem | undefined {
  return ORDER.find((n) => n.slug === slug);
}
