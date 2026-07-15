import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sobres-app.com"),
  title: {
    default: "Sobres — Presupuesto Personal para iPhone",
    template: "%s — Sobres",
  },
  description:
    "Sobres es la app de presupuesto personal para iPhone basada en el método de sobres. Asigna cada peso a un propósito y toma el control de tus finanzas.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Sobres — Presupuesto Personal",
    description:
      "Asigna cada peso a un propósito. La app de presupuesto por sobres para iPhone.",
    url: "https://sobres-app.com",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
