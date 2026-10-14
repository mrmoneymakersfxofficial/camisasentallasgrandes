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
  metadataBase: new URL("https://camisasentallasgrandes.com"),
  title: {
    default: "CTG | Camisas en Tallas Grandes para Hombre en Perú (2XL a 6XL)",
    template: "%s | CTG - Camisas en Tallas Grandes",
  },
  description:
    "Especialistas en camisas de vestir y sport en tallas grandes para hombre en Lima, Perú (18.5\" a 22.5\" de cuello / 2XL a 6XL). 100% algodón peruano. Showroom en Miraflores y envíos a todo el Perú.",
  keywords: [
    "camisas en tallas grandes",
    "camisas tallas grandes lima",
    "camisas tallas extras lima",
    "camisas 2xl 3xl 4xl 5xl 6xl peru",
    "camisas cuello 18.5 a 22.5",
    "camisas para hombres gordos lima",
    "camisas hombre contextura gruesa",
    "camisas miraflores tallas grandes",
    "camisas algodon peruano tallas grandes",
    "ctg camisas tallas grandes",
    "camisas antobelly tallas grandes",
  ],
  authors: [{ name: "CTG - Camisas en Tallas Grandes" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CTG | Camisas en Tallas Grandes para Hombre en Perú",
    description:
      "Especialistas en camisas de vestir y sport para hombres de contextura grande. 100% algodón peruano, cuello cómodo y calce perfecto.",
    type: "website",
    locale: "es_PE",
    siteName: "CTG | Camisas en Tallas Grandes",
    images: [
      {
        url: "/images/ctg-blanca-1.png",
        width: 1200,
        height: 630,
        alt: "CTG - Camisas en Tallas Grandes Lima Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTG | Camisas en Tallas Grandes para Hombre en Perú",
    description:
      "Especialistas en camisas de vestir en tallas grandes. 100% algodón peruano, tallas 18.5\" a 22.5\" (2XL a 6XL).",
    images: ["/images/ctg-blanca-1.png"],
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
        className={`${playfair.variable} ${inter.variable} font-sans antialiased overflow-hidden`}
      >
        <div className="h-[100dvh] w-screen flex flex-col overflow-hidden bg-background">
          {/* HEADER: Completely static, un-scrollable */}
          <Header />

          {/* MAIN CONTENT: The ONLY area allowed to scroll */}
          <main
            id="app-main"
            className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth"
            data-scroll-container
          >
            {children}
            <Footer />
          </main>

          {/* BOTTOM NAVIGATION BAR: Completely static, un-scrollable */}
          <MobileBottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
