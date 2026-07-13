"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone,Mail,MapPin,ChevronUp} from "lucide-react";
import { useEffect, useState } from "react";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="mt-20 border-t border-border bg-surface">
        <div className="container py-10">
          {/* ================= Top ================= */}

          <div className="flex flex-col items-center">

            <Image
              src="/logo/logo.svg"
              alt="Baran"
              width={170}
              height={70}
            />

            <p className="text-primary pt-4 font-bold text-center">استایل خاص، انتخاب خاص</p>

            <p className="mt-5 max-w-xl text-center leading-8 text-text-secondary">
              باران، فروشگاه تخصصی پوشاک زنانه با تمرکز بر کیفیت، طراحی
              مدرن و تجربه خریدی مطمئن.
            </p>

          </div>

          {/* ================= Links ================= */}

          <div className="mt-10 grid text-center gap-12 md:grid-cols-3">

            {/* Quick Links */}

            <div>

              <h3 className="mb-5 text-lg font-bold text-primary">
                دسترسی سریع
              </h3>

              <ul className="space-y-3 text-sm">

                <li>
                  <Link href="/" className="transition hover:text-primary">
                    صفحه اصلی
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="transition hover:text-primary"
                  >
                    محصولات
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="transition hover:text-primary"
                  >
                    درباره ما
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition hover:text-primary"
                  >
                    تماس با ما
                  </Link>
                </li>

              </ul>

            </div>

            {/* Categories */}

            <div>

              <h3 className="mb-5 text-lg font-bold text-primary">
                دسته‌بندی‌ها
              </h3>

              <ul className="space-y-3 text-sm">

                <li>
                  <Link href="/products/manteau-coat" className="transition hover:text-primary">
                    مانتو و کت
                  </Link>
                </li>

                <li>
                  <Link href="/products/suit" className="transition hover:text-primary">
                    کت  شلوار
                  </Link>
                </li>

                <li>
                  <Link href="/products/coat" className="transition hover:text-primary">
                    پالتو و کاپشن
                  </Link>
                </li>

                <li>
                  <Link href="/products/office-uniform" className="transition hover:text-primary">
                    فرم اداری
                  </Link>
                </li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h3 className="mb-5 text-lg font-bold text-primary">
                ارتباط با ما
              </h3>

              <ul className="space-y-4 text-sm">

                <li className="flex items-center gap-3 justify-center">
                  <Phone size={18} className="text-primary" />
                  <span>  4567 123 0912 </span>
                </li>

                <li className="flex items-center gap-3 justify-center">
                  <Mail size={18} className="text-primary" />
                  <span>baranshop@gmail.com</span>
                </li>

                <li className="flex items-center gap-3 justify-center">
                  <MapPin size={18} className="text-primary" />
                  <span>ایران , مشهد</span>
                </li>

              </ul>

              {/* Social */}

              <div className="mt-6 flex gap-3 justify-center">

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <FaInstagram size={20} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <FaTelegram size={20} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <FaWhatsapp size={20} />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Bottom ================= */}

        <div className="border-t border-border bg-background py-5">

          <div className="container flex flex-col items-center justify-between gap-3 text-sm text-text-secondary md:flex-row">

            <p>
              © 2026 Baran. تمامی حقوق این وب‌سایت محفوظ است.
            </p>

            <p>
              طراحی و توسعه باران
            </p>

          </div>

        </div>

      </footer>

      {/* ================= Back To Top ================= */}

      {showButton && (
        <button
          onClick={scrollTop}
          className="
            
            fixed
            bottom-22
            right-8
            z-50
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-primary
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            hover:bg-dark
          "
        >
          <ChevronUp size={22} />
        </button>
      )}
    </>
  );
}