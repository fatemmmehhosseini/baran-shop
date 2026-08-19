import type { Metadata } from "next";
import "./globals.css";
import { iranYekan } from "./fonts";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Baran | فروشگاه پوشاک زنانه",
    template: "%s | Baran",
  },
  description:
    "باران، فروشگاه آنلاین پوشاک زنانه با مجموعه‌ای از کت، کت و شلوار، پالتو و فرم اداری. خرید آسان، ارسال سریع و تضمین کیفیت.",

  keywords: [
    "باران",
    "فروشگاه پوشاک زنانه",
    "خرید لباس زنانه",
    "کت زنانه",
    "کت و شلوار زنانه",
    "پالتو زنانه",
    "فرم اداری زنانه",
    "Baran Fashion",
    "Women's Clothing",
  ],

  authors: [{ name: "Fatemeh Hosseini" }],
  creator: "Fatemeh Hosseini",

  openGraph: {
    title: "Baran | فروشگاه پوشاک زنانه",
    description:
      "خرید آنلاین پوشاک زنانه با طراحی مدرن، کیفیت بالا و ارسال سریع.",
    siteName: "Baran",
    locale: "fa_IR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },

  manifest: "/favicon/site.webmanifest",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" dir="rtl"
    >
      <body className={iranYekan.className}>
        <Header/>
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}/>
        <Footer/>
      </body>
    </html>
  );
}
