import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sobres-app.com"),
  title: "Sobres — Presupuesto Personal",
  description:
    "Sobres es la app de presupuesto personal basada en el método de sobres. Asigna cada peso a un propósito y toma el control de tus finanzas.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Sobres — Presupuesto Personal",
    description:
      "Asigna cada peso a un propósito. La app de presupuesto por sobres.",
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
