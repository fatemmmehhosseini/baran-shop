"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import type { User as UserType } from "@/types/auth.type";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: UserType | null;
  onLogout: () => void;
};

const links = [
  { title: "صفحه اصلی", href: "/" },
  { title: "مانتو و کت", href: "/products/manteau-coat" },
  { title: "کت شلوار", href: "/products/suit" },
  { title: "پالتو و کاپشن", href: "/products/coat" },
  { title: "فرم اداری", href: "/products/office-uniform" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

export default function MobileSidebar({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  onLogout,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]
        transition-opacity duration-300
        ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-60
        h-screen w-2/3 max-w-100
        bg-white shadow-2xl
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border py-5 pr-4">
          <Image
            src="/logo/logo.svg"
            alt="Baran"
            width={130}
            height={45}
          />
          <button
            onClick={onClose}
            className="rounded-full p-4 transition text-primary hover:bg-gray-200"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {links.map((item) => {
              const active = 
                item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("?")[0]);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-all
                    ${active ? "bg-light text-white" : "text-primary hover:bg-light"}`}
                  >
                    {item.title}
                    <ChevronLeft
                      size={18}
                      className={active ? "text-white" : "text-primary"}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Auth Section */}
        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          {isAuthenticated && user ? (
            <>
              {/* User Info Card */}
              <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {user.full_name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-bold text-text">{user.full_name}</p>
                  <p className="truncate text-xs text-text-secondary dir-rtl">{user.phone}</p>
                </div>
              </div>
              
              {/* Profile Link */}
              <Link
                href="/profile"
                onClick={onClose}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-primary text-primary font-medium transition hover:bg-primary hover:text-white"
              >
                <User size={18} />
                پنل کاربری
              </Link>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 font-medium transition hover:bg-red-100"
              >
                <LogOut size={18} />
                خروج از حساب
              </button>
            </>
          ) : (
            <Link
              href="/register"
              onClick={onClose}
              className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-medium text-white transition hover:bg-dark"
            >
              ورود | ثبت‌نام
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}