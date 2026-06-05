import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
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
    default: "Algodon Peruano Premium | Camisas Plus Size de Lujo",
    template: "%s | Algodon Peruano",
  },
  description:
    "Descubre nuestra coleccion exclusiva de camisas para hombre en tallas 2XL a 6XL. 100% algodon peruano premium. Envio a todo Peru.",
  keywords: [
    "camisas plus size",
    "camisas grandes",
    "algodon peruano",
    "camisas 2XL 3XL 4XL 5XL 6XL",
    "camisas premium hombre",
    "ropa talla grande Peru",
    "camisas Pima",
    "camisas algodon peruano",
  ],
  authors: [{ name: "Algodon Peruano" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Algodon Peruano Premium | Camisas Plus Size de Lujo",
    description:
      "Coleccion exclusiva de camisas para hombre en tallas 2XL a 6XL. 100% algodon peruano premium.",
    type: "website",
    locale: "es_PE",
    siteName: "Algodon Peruano",
    images: [
      {
        url: "/images/hero-shirt-1.png",
        width: 1200,
        height: 630,
        alt: "Algodon Peruano - Camisas Premium Plus Size",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algodon Peruano Premium | Camisas Plus Size de Lujo",
    description:
      "Coleccion exclusiva de camisas para hombre en tallas 2XL a 6XL. 100% algodon peruano premium.",
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
          {/* pb-20 on mobile to account for fixed bottom nav (h ~80px) */}
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
        </div>
        <MobileBottomNav />
        <Toaster />
      </body>
    </html>
  );
}
