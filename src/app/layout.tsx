import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://algodonperuano.com"),
  title: {
    default: "Algodón Peruano Premium | Camisas Plus Size de Lujo",
    template: "%s | Algodón Peruano",
  },
  description:
    "Descubre nuestra colección exclusiva de camisas para hombre en tallas 2XL a 6XL. 100% algodón peruano premium. Envío a todo Perú.",
  keywords: [
    "camisas plus size",
    "camisas grandes",
    "algodón peruano",
    "camisas 2XL 3XL 4XL 5XL 6XL",
    "camisas premium hombre",
    "ropa talla grande Perú",
    "camisas Pima",
    "camisas algodón peruano",
  ],
  authors: [{ name: "Algodón Peruano" }],
  icons: {
    icon: "/images/hero-shirt-1.png",
  },
  openGraph: {
    title: "Algodón Peruano Premium | Camisas Plus Size de Lujo",
    description:
      "Colección exclusiva de camisas para hombre en tallas 2XL a 6XL. 100% algodón peruano premium.",
    type: "website",
    locale: "es_PE",
    siteName: "Algodón Peruano",
    images: [
      {
        url: "/images/hero-shirt-1.png",
        width: 1200,
        height: 630,
        alt: "Algodón Peruano - Camisas Premium Plus Size",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algodón Peruano Premium | Camisas Plus Size de Lujo",
    description:
      "Colección exclusiva de camisas para hombre en tallas 2XL a 6XL. 100% algodón peruano premium.",
    images: ["/images/hero-shirt-1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
