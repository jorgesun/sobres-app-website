import type { Metadata } from "next";
import "../../soporte/soporte.css";
import Shell from "../../soporte/Shell";

export const metadata: Metadata = {
  title: {
    default: "Help center",
    template: "%s — Sobres Support",
  },
  description:
    "Learn to use Sobres step by step and understand how your money moves: unassigned money, envelopes, available, credit cards, goals and more.",
  alternates: { languages: { es: "/soporte" } },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
