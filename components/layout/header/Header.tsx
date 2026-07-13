"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserPlus } from "lucide-react";
import MobileTabBar from "./MobileTabBar";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { label: "صفحه اصلی", href: "/" },
  { label: "مانتو و کت", href: "/products/manteau-coat" },
  { label: "کت شلوار", href: "/products/suit" },
  { label: "پالتو و کاپشن", href: "/products/coat" },
  { label: "فرم اداری", href: "/products/office-uniform" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

// TODO: replace with real count from CartContext once it's wired up.
const CART_COUNT = 2;



export default function Header() {
  const pathname = usePathname();

  const [isSidebar, setIsSidebar] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* ===== Desktop / tablet header ===== */}
      <header className="sticky top-0  z-40 hidden border-b border-border bg-background md:block">
        {/* top row: logo / search / cart+register */}
        <div className="container flex justify-between gap-5 h-24 items-center">

        <Link href="/" aria-label="بازگشت به صفحه اصلی">
           <Image
            src="/logo/logo.svg"
            alt="Baran Logo"
            loading="eager"
            width={250}
            height={150}
          
            
          />
        </Link>

          <div className="w-full max-w-xl">
            <label className="relative flex items-center">
              <Search
                className="pointer-events-none absolute right-4 h-5 w-5 text-text-secondary"
                strokeWidth={1.75}
              />
              <input
                type="search"
                placeholder="جستجوی محصول، دسته‌بندی یا برند..."
                className="h-12 w-full rounded-full border border-border bg-surface pr-11 pl-4 text-sm text-text placeholder:text-text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-light/30"
              />
            </label>
          </div>

          <div className="flex shrink-0 items-center gap-6">
            <Link
              href="/register"
              className="flex items-center gap-2 text-sm font-medium text-text transition hover:text-primary"
            >
              <UserPlus className="h-5 w-5 text-primary" strokeWidth={1.75} />
              <span className="text-primary">ثبت‌نام | ورود</span>
            </Link>

            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-surface"
            >
              <ShoppingCart
                className="h-6 w-6 text-primary"
                strokeWidth={1.75}
              />
              {CART_COUNT > 0 && (
                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/90 text-[11px] font-bold text-white">
                  {CART_COUNT}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* bottom row: category nav */}
        <nav className="border-t border-border">
          <div className="container flex h-14 items-center gap-8 overflow-x-auto">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("?")[0]);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative shrink-0 whitespace-nowrap py-4 text-sm font-medium transition ${
                    isActive
                      ? "text-light"
                      : "text-text hover:text--primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-light" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ===== Mobile header: logo only ===== */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-center border-b border-border bg-background md:hidden">
        <Link href="/" aria-label="بازگشت به صفحه اصلی">
           <Image
            src="/logo/logo.svg"
            alt="Baran Logo"
            width={200}
            height={150}
            loading="eager"
          />
        </Link>
      </header>

      {/* ===== Mobile bottom tab bar ===== */}
      <MobileTabBar setIsSearchOpen={setIsSearchOpen} setIsSidebar={setIsSidebar} cartCount={CART_COUNT} />

      <MobileSidebar
          isOpen={isSidebar}
          onClose={() => setIsSidebar(false)}/>

      <SearchOverlay
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </>
  );
}

