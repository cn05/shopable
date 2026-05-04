import { Poppins } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/cart/cart-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Shopable",
    template: "%s — Shopable",
  },
  description: "Demo e-commerce untuk portfolio front-end.",
  openGraph: {
    type: "website",
    siteName: "Shopable",
    title: "Shopable",
    description: "Demo e-commerce untuk portfolio front-end.",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopable",
    description: "Demo e-commerce untuk portfolio front-end.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} antialiased`}>
      <body className={poppins.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
