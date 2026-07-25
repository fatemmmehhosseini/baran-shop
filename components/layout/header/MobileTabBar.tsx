"use client";

import Link from "next/link";

import { Menu, User, Search, ShoppingCart, Home } from "lucide-react";
import TabItem from "./TabItem";



type Props = {
  cartCount?: number;
  setIsSidebar: (value: boolean) => void;
  setIsSearchOpen: (value: boolean) => void;
};

export default function MobileTabBar({ cartCount = 0, setIsSidebar,setIsSearchOpen }: Props) {

  

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ height: 76 }}
      aria-label="ناوبری پایین صفحه"
    >
      {/* notched bar shape */}
      <svg
        className="absolute inset-0 h-full w-full drop-shadow-[0_-4px_16px_rgba(15,23,42,0.16)]"
        viewBox="0 0 375 76"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,16
             Q0,0 16,0
             L140,0
             C158,0 158,28 187.5,28
             C217,28 217,0 235,0
             L359,0
             Q375,0 375,16
             L375,76
             L0,76
             Z"
          fill="var(--color-background)"
        />
      </svg>
    

      {/* floating home button, popped into the notch */}
      <Link
        href="/"
        aria-label="صفحه اصلی"
        className="absolute left-1/2 -top-5
           flex h-16 w-16
           -translate-x-1/2
           -translate-y-[55%]
           items-center
           justify-center
           rounded-full
           bg-primary
           shadow-lg
           shadow-primary/60
           transition-all
           duration-300
           hover:scale-105
           active:scale-95"
      >
        <Home className="h-6 w-6 text-white" strokeWidth={1.75} />
      </Link>

      {/* nav items */}
      <div className="relative grid h-full grid-cols-5 items-center pt-2">
      
        <button onClick={()=> setIsSidebar(true)}
         className="flex flex-col items-center text-text-secondary hover:text-primary">
          <span>
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          </span>
         <span className="text-[11px] font-medium">منو</span>
        </button>

        <TabItem href="/account" label="حساب کاربری" icon={User} />

        <span aria-hidden="true" />

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-text-secondary transition hover:text-primary"
        >
          <Search className="h-6 w-6" />
          <span className="text-[11px]">جستجو</span>
        </button>

        <TabItem href="/cart" label="سبد خرید" icon={ShoppingCart} badge={cartCount} />
        
        
        
        
      </div>
    </nav>
  );
}

