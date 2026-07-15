import type { Metadata } from "next";
import "./soporte.css";
import Shell from "./Shell";

export const metadata: Metadata = {
  title: {
    default: "Centro de ayuda",
    template: "%s — Soporte de Sobres",
  },
  description:
    "Aprende a usar Sobres paso a paso y entiende cómo se mueve tu dinero: sin asignar, sobres, disponible, tarjetas de crédito, metas y más.",
};

export default function SoporteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
