"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, UserPlus, User, LogOut, ChevronDown } from "lucide-react";
import MobileTabBar from "./MobileTabBar";
import MobileSidebar from "./MobileSidebar";
import SearchOverlay from "./SearchOverlay";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/stores/cart.store";
import { useUserStore } from "@/stores/user.store";
import { authService } from "@/services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import SearchBox from "@/components/ui/search/SearchBox";

const NAV_LINKS = [
  { label: "صفحه اصلی", href: "/" },
  { label: "مانتو و کت", href: "/products/manteau-coat" },
  { label: "کت شلوار", href: "/products/suit" },
  { label: "پالتو و کاپشن", href: "/products/coat" },
  { label: "فرم اداری", href: "/products/office-uniform" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  
  const [isSidebar, setIsSidebar] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useUserStore();

  
  const profileRef = useRef<HTMLDivElement>(null);


  
  useEffect(() => {
    
      checkAuth();
    
  }, [ checkAuth]);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success("با موفقیت خارج شدید");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("خطا در خروج");
    }
    setIsProfileOpen(false);
  };

  return (
    <>
     
      <header className="sticky top-0 z-40 hidden border-b border-border bg-background md:block">
        
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

          
          <SearchBox mode="desktop" />

          <div className="flex shrink-0 items-center gap-6">
            {/* Authentication Section */}
            {isLoading ? (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-surface" />
            ) : isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 transition hover:border-primary hover:bg-white"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {user.full_name.charAt(0) || "?"}
                  </div>
                  <span className="text-sm font-medium text-text hidden lg:block">
                    {user.full_name}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-text-secondary transition ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true}}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-border bg-white shadow-xl z-[999]"
                    >
                      <div className="border-b border-border px-4 py-3 bg-surface ">
                        <p className="text-sm font-bold text-text">{user.full_name}</p>
                        <p className="text-xs text-text-secondary dir-ltr text-left">{user.phone}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary transition hover:bg-surface hover:text-primary"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User size={18} />
                          پنل کاربری
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                        >
                          <LogOut size={18} aria-hidden="true"/>
                          خروج از حساب
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/register"
                className="flex items-center gap-2 text-sm font-medium text-text transition hover:text-primary"
              >
                <UserPlus className="h-5 w-5 text-primary" strokeWidth={1.75} />
                <span className="text-primary">ثبت‌نام | ورود</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-surface"
            >
              <ShoppingCart
                className="h-6 w-6 text-primary"
                strokeWidth={1.75}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/90 text-[11px] font-bold text-white">
                  {cartCount}
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
                      : "text-text hover:text-primary/80"
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
      <MobileTabBar setIsSearchOpen={setIsSearchOpen} setIsSidebar={setIsSidebar} cartCount={cartCount} />

      <MobileSidebar
        isOpen={isSidebar}
        onClose={() => setIsSidebar(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      <SearchOverlay
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}