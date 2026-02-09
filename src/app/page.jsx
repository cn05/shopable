import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide";
import Footer from "@/components/footer";
import { useMemo } from "react";

export default function Home() {
  const categories = [
    {
      icon: "/assets/icons/mobile.svg",
      name: "HP & Aksesoris",
      count: "86 products",
    },
    { icon: "/assets/icons/game.svg", name: "Games", count: "324 products" },
    {
      icon: "/assets/icons/airpods.svg",
      name: "Headset",
      count: "20 products",
    },
    {
      icon: "/assets/icons/box.svg",
      name: "Kebutuhan Pokok",
      count: "102 products",
    },
    {
      icon: "/assets/icons/lamp.svg",
      name: "Penerangan",
      count: "28 products",
    },
    {
      icon: "/assets/icons/watch.svg",
      name: "Jam Tangan",
      count: "47 products",
    },
    {
      icon: "/assets/icons/monitor.svg",
      name: "PC & Laptop",
      count: "98 products",
    },
    { icon: "/assets/icons/cup.svg", name: "Hadiah", count: "53 products" },
  ];

  const products = [
    {
      image:
        "/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png",
      name: "iMac Green Energy",
      category: "Desktops",
      price: "Rp 24.000.000",
    },
    {
      image:
        "/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png",
      name: "Smartwei Pro 18",
      category: "Phones",
      price: "Rp 11.000.000",
    },
    {
      image:
        "/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png",
      name: "MacBook Pro X",
      category: "Laptops",
      price: "Rp 24.000.000",
    },
    {
      image:
        "/assets/thumbnails/airpods-max-select-skyblue-202011-Photoroom 1.png",
      name: "Tuli Nyaman",
      category: "Headsets",
      price: "Rp 3.500.000.000",
    },
    {
      image:
        "/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom 1.png",
      name: "Warna iMac Jadi",
      category: "Desktops",
      price: "Rp 89.000.000",
    },
    {
      image:
        "/assets/thumbnails/pngtree-wristwatch-analog-classic-brown-leather-strap-watch-png-image_10001801.png",
      name: "Jam Tangan Dude of Wars",
      category: "Jam Tangan",
      price: "Rp 2.400.000",
    },
    {
      image: "/assets/thumbnails/ea49dfcfcaa4513d799050c989d2f177.png",
      name: "Stik PS5 nih bos",
      category: "Games",
      price: "Rp 1.200.000",
    },
    {
      image: "/assets/thumbnails/images.jpg",
      name: "Lampu Tidur",
      category: "Penerangan",
      price: "Rp 280.000",
    },
  ];

  const brands = [
    "/assets/logos/microsoft.svg",
    "/assets/logos/apple.svg",
    "/assets/logos/samsung.svg",
    "/assets/logos/huawei.svg",
    "/assets/logos/nokia.svg",
  ];

  const testimonials = [
    {
      photo: "/assets/photos/p1.png",
      text: "Bagus banget barangnya!",
      name: "Si Ica",
    },
    {
      photo: "/assets/photos/p2.png",
      text: "Mantap, murahan di sini",
      name: "Adi Skuter",
    },
    {
      photo: "/assets/photos/p3.png",
      text: "Suka banget, garansinya fair",
      name: "Pacar Bagas",
    },
    {
      photo: "/assets/photos/p4.png",
      text: "Banyak promonya cuy",
      name: "Udin Sarifun",
    },
  ];

  const randomProducts = useMemo(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Duplikasi products sampai cukup 20
    const allProducts = [...products, ...products, ...products, ...products];
    return shuffleArray(allProducts).slice(0, 20);
  }, []);

  return (
    <div className=" bg-white">
      {/* Header */}
      <header className="bg-[#EFF3FA] pt-5 md:pt-7.5 pb-8 md:pb-12.5 px-4 md:px-0">
        {/* Navigation */}
        <nav className="container max-w-282.5 mx-auto flex items-center justify-between bg-[#0D5CD7] p-3 md:p-5 rounded-2xl md:rounded-3xl">
          <div className="flex shrink-0 items-center">
            <span className="font-bold text-5xl text-[#FFC736]">*</span>
            <span className="font-bold text-3xl">Shopable</span>
            {/* <Image
              src="/assets/logos/logo.svg"
              alt="Belanja Logo"
              width={100}
              height={40}
              className="w-20 md:w-auto"
            /> */}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-7.5">
            <li className="font-bold text-[#FFC736] transition-all duration-300">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
              <Link href="/categories">Kategori</Link>
            </li>
            <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
              <Link href="/testimonials">Testimoni</Link>
            </li>
            <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
              <Link href="/rewards">Vouchers</Link>
            </li>
          </ul>

          {/* Mobile & Desktop Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/cart">
              <div className="w-10 h-10 md:w-12 md:h-12 flex shrink-0">
                <Image
                  src="/assets/icons/cart.svg"
                  alt="Cart"
                  width={48}
                  height={48}
                />
              </div>
            </Link>
            <Link
              href="/signin"
              className="hidden md:block p-[12px_20px] bg-white text-black rounded-full font-semibold text-sm"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="p-[8px_16px] md:p-[12px_20px] bg-white text-black rounded-full font-semibold text-sm"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container max-w-282.5 mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-1 mt-8 md:mt-12.5">
          <div className="flex flex-col gap-5 md:gap-7.5 px-4 md:px-0">
            <div className="flex items-center gap-2.5 p-[8px_16px] rounded-full bg-white w-fit outline-2 outline-amber-300">
              <div className="w-5.5 h-5.5 flex shrink-0">
                <Image
                  src="/assets/icons/crown.svg"
                  alt="Popular"
                  width={22}
                  height={22}
                />
              </div>
              <p className="font-semibold text-xs md:text-sm text-black">
                100 Produk Terpopuler di Shopable
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <h1 className="font-bold text-5xl md:text-13.75 leading-tight md:leading-13.75 text-black">
                Macbook Air M4
              </h1>
              <p className="text-base md:text-lg leading-relaxed md:leading-8.5 text-[#6A7789]">
                Introducing the super-power features riches than any other
                platform devices AI integrated.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/cart"
                className="p-[14px_20px] md:p-[18px_24px] rounded-full font-semibold bg-[#0D5CD7] text-white text-sm md:text-base"
              >
                Masukkan Keranjang
              </Link>
              <Link
                href="/details"
                className="p-[14px_20px] md:p-[18px_24px] rounded-full font-semibold bg-white text-sm md:text-base outline-1 text-black"
              >
                Lihat Detail
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-147 h-62.5 md:h-90 flex shrink-0 overflow-hidden relative">
            <Image
              src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
              alt="MacBook"
              fill
              className="object-contain"
            />
            <div className="absolute top-[60%] left-4 md:left-0 bg-white p-[10px_12px] md:p-[14px_16px] rounded-2xl md:rounded-3xl flex items-center gap-2.5">
              <div className="w-10 h-10 md:w-12 md:h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  src="/assets/icons/code-circle.svg"
                  width={24}
                  height={24}
                  alt="Bonus"
                />
              </div>
              <p className="font-semibold text-xs md:text-sm text-black">
                Bonus Mac OS <br /> Capitan Pro
              </p>
            </div>
            <div className="absolute right-4 md:right-0 top-[30%] bg-white p-[10px_12px] md:p-[14px_16px] rounded-2xl md:rounded-3xl flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 md:w-12 md:h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  src="/assets/icons/star-outline.svg"
                  width={24}
                  height={24}
                  alt="Warranty"
                />
              </div>
              <p className="font-semibold text-xs md:text-sm text-center text-black">
                Produk <br /> Bergaransi
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container max-w-282.5 mx-auto flex items-center justify-center gap-4 md:gap-10 mt-8 md:mt-12.5 overflow-x-auto px-4 md:px-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-center gap-2.5 shrink-0">
              <div className="w-10 h-10 md:w-12.5 md:h-12.5 flex shrink-0 rounded-full border-4 md:border-[5px] border-white overflow-hidden">
                <Image
                  src={testimonial.photo}
                  width={50}
                  height={50}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5 text-black">
                <p className="font-semibold text-xs md:text-sm leading-5.5">
                  {testimonial.text}
                </p>
                <p className="text-2.5 md:text-xs leading-4.5">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <section className="container max-w-282.5 mx-auto flex flex-col gap-8 md:gap-12.5 pt-8 md:pt-12.5 pb-16 md:pb-25 px-4 md:px-0">
        {/* Categories */}
        <div className="flex flex-col gap-5 md:gap-7.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl leading-tight md:leading-8.5 text-black">
              Kategori
            </h2>
            <Link
              href="/catalog"
              className="p-[10px_20px] md:p-[12px_24px] border border-black rounded-full font-semibold text-sm text-black"
            >
              Lainnya
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7.5">
            {categories.map((category, index) => (
              <Link href="/category" key={index} className="categories-card">
                <div className="bg-white flex items-center gap-3.5 p-4 md:p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-sm md:text-base leading-5.5 text-black">
                      {category.name}
                    </p>
                    <p className="text-xs md:text-sm text-[#616369]">
                      {category.count}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Picked Products */}
        <div className="flex flex-col gap-5 md:gap-7.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl leading-tight md:leading-8.5 text-black">
              Produk Terpopuler
            </h2>
            <Link
              href="/catalog"
              className="p-[10px_20px] md:p-[12px_24px] border border-black text-black rounded-full font-semibold text-sm"
            >
              Explore All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-7.5">
            {products.map((product, index) => (
              <Link href="/details" key={index} className="product-card">
                <div className="bg-white flex flex-col gap-5 md:gap-6 p-4 md:p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
                  <div className="w-full h-22.5 flex shrink-0 items-center justify-center overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-sm md:text-base leading-5.5 text-black">
                        {product.name}
                      </p>
                      <p className="text-xs md:text-sm text-[#616369]">
                        {product.category}
                      </p>
                    </div>
                    <p className="font-semibold text-[#0D5CD7] text-sm md:text-base leading-5.5">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Brands */}
        <div className="flex flex-col gap-5 md:gap-7.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl leading-tight md:leading-8.5 text-black">
              Brand Populer
            </h2>
            <Link
              href="/catalog"
              className="p-[10px_20px] md:p-[12px_24px] border border-black text-black rounded-full font-semibold text-sm"
            >
              Explore All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-7.5">
            {brands.map((brand, index) => (
              <Link href="/brand" key={index} className="logo-card">
                <div className="bg-white flex items-center justify-center p-[20px_15px] md:p-[30px_20px] rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
                  <div className="w-full h-7.5 flex shrink-0 items-center justify-center overflow-hidden relative">
                    <Image
                      src={brand}
                      alt="Brand"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* New Releases */}
        <div className="flex flex-col gap-5 md:gap-7.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl leading-tight md:leading-8.5 text-black">
              Produk Terbaru dari Official Store
            </h2>
            <Link
              href="/catalog"
              className="p-[10px_20px] md:p-[12px_24px] border border-black text-black rounded-full font-semibold text-sm"
            >
              Explore All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-7.5">
            {randomProducts.map((product, index) => (
              <Link href="/details" key={index} className="product-card">
                <div className="bg-white flex flex-col gap-5 md:gap-6 p-4 md:p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
                  <div className="w-full h-22.5 flex shrink-0 items-center justify-center overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-sm md:text-base leading-5.5 text-black">
                        {product.name}
                      </p>
                      <p className="text-xs md:text-sm text-[#616369]">
                        {product.category}
                      </p>
                    </div>
                    <p className="font-semibold text-[#0D5CD7] text-sm md:text-base leading-5.5">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
