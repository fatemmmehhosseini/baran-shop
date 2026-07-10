"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const links = [
  { title: "صفحه اصلی", href: "/" },
  { title: "مانتو و کت", href: "/products?category=manteau-coat" },
  { title: "کت شلوار", href: "/products?category=suit" },
  { title: "پالتو و کاپشن", href: "/products?category=coat" },
  { title: "فرم اداری", href: "/products?category=office-uniform" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
  
];

export default function MobileSidebar({
  isOpen,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]
        transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed right-0 top-0 z-60
        h-screen w-2/3 max-w-100
        bg-white shadow-2xl
        transition-transform duration-300 ease-out
        ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border  py-5 pr-4">

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

        {/* Menu */}

        <nav className="px-4 py-6">

          <ul className="space-y-1">

            {links.map((item) => {

              const active =
                pathname === item.href ||
                pathname.startsWith(item.href.split("?")[0]);

              return (
                <li key={item.href}>

                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-all

                    ${
                      active
                        ? "bg-light text-white"
                        : "text-primary hover:bg-light"
                    }
                    `}
                  >
                    {item.title}

                    <ChevronLeft
                      size={18}
                      className={
                        active
                          ? "text-white"
                          : "text-primary"
                      }
                    />
                  </Link>

                </li>
              );
            })}
          </ul>

        </nav>

        {/* Bottom */}

        <div className="absolute bottom-5 left-5 right-5">

          <Link
            href="/register"
            onClick={onClose}
            className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-medium text-white transition hover:bg-dark"
          >
            ورود | ثبت‌نام
          </Link>

        </div>

      </aside>
    </>
  );
}