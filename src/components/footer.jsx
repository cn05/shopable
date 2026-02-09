import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Tentang Kami", href: "/about" },
    { name: "Kontak", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ];

  const categories = [
    { name: "HP & Aksesoris", href: "/category/phones" },
    { name: "PC & Laptop", href: "/category/laptops" },
    { name: "Headset", href: "/category/headsets" },
    { name: "Jam Tangan", href: "/category/watches" },
  ];

  const support = [
    { name: "Help Center", href: "/help" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Garansi", href: "/warranty" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-[#0D5CD7] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#0B4DB5] py-8 md:py-12">
        <div className="container max-w-282.5 mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl md:text-2xl mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm md:text-base text-white/80">
                Dapatkan update promo dan produk terbaru dari kami
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex gap-2 max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full text-gray-800 bg-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#FFC736]"
                />
                <button
                  type="submit"
                  className="bg-[#FFC736] text-[#0D5CD7] p-3 rounded-full hover:bg-yellow-400 transition-colors flex items-center justify-center min-w-12"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container max-w-282.5 mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              {/* <Image
                src="/assets/logos/logo.svg"
                alt="Belanja Logo"
                width={120}
                height={40}
                className="brightness-0 invert"
              /> */}
              <span className="font-bold text-5xl text-[#FFC736]">*</span>
              <span className="font-bold text-3xl">Shopable</span>
            </Link>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              Platform e-commerce terpercaya dengan produk berkualitas. Setiap
              pembelian kami jamin kepuasannya, didukung garansi resmi dan
              layanan pelanggan terbaik.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#FFC736] shrink-0" />
                <span className="text-sm">
                  Jl. Raya No. 123, Jakarta, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#FFC736] shrink-0" />
                <span className="text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#FFC736] shrink-0" />
                <span className="text-sm">support@shopable.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#FFC736] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.href}
                    className="text-sm text-white/80 hover:text-[#FFC736] transition-colors inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-[#FFC736] transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">Follow Us:</span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFC736] flex items-center justify-center transition-colors group"
                >
                  <Facebook size={20} className="group-hover:text-[#0D5CD7]" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFC736] flex items-center justify-center transition-colors group"
                >
                  <Instagram size={20} className="group-hover:text-[#0D5CD7]" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFC736] flex items-center justify-center transition-colors group"
                >
                  <Twitter size={20} className="group-hover:text-[#0D5CD7]" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFC736] flex items-center justify-center transition-colors group"
                >
                  <Youtube size={20} className="group-hover:text-[#0D5CD7]" />
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">We Accept:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  BCA
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  BRI
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  Mandiri
                </div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-800">
                  BNI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0A3F8F] py-6">
        <div className="container max-w-282.5 mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Belanja. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-[#FFC736] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
