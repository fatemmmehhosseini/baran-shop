import CategorySection from "@/components/ui/home/CategorySection";
import DiscountBanner from "@/components/ui/home/DiscountBanner";
import HeroBanner from "@/components/ui/home/HeroBanner";
import BestSellerSection from "@/components/ui/home/products/BestSellerSection";
import NewArrivalsSection from "@/components/ui/home/products/NewArrivalsSection";
import Services from "@/components/ui/home/Services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "باران | فروشگاه آنلاین پوشاک زنانه",
  description:
    "خرید آنلاین مانتو، پالتو، کت و شلوار، پیراهن و پوشاک زنانه با طراحی مدرن، کیفیت بالا و ارسال سریع از فروشگاه باران.",

  keywords: [
    "باران",
    "فروشگاه باران",
    "پوشاک زنانه",
    "لباس زنانه",
    "مانتو",
    "پالتو",
    "کت و شلوار زنانه",
    "پیراهن زنانه",
    "خرید لباس زنانه",
    "فروشگاه آنلاین لباس",
  ],

  authors: [{ name: "Baran Shop" }],
  creator: "Baran Shop",
  publisher: "Baran Shop",

  metadataBase: new URL("https://baranshop.ir"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "باران | فروشگاه آنلاین پوشاک زنانه",
    description:
      "جدیدترین کالکشن پوشاک زنانه با طراحی مدرن، کیفیت بالا و ارسال سریع.",
    url: "https://baranshop.ir",
    siteName: "Baran Shop",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/banner/img1.png",
        width: 1200,
        height: 630,
        alt: "Baran Shop",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "باران | فروشگاه آنلاین پوشاک زنانه",
    description:
      "جدیدترین کالکشن پوشاک زنانه با طراحی مدرن و کیفیت بالا.",
    images: ["/images/banner/img1.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  category: "fashion",
};



export default async function Home() {
  
  return (
    <>
    <main>
      <HeroBanner/>
      <Services/>
      <CategorySection/>
      <BestSellerSection/>
      <DiscountBanner/>
      <NewArrivalsSection/>
    </main>
    </>
  );
}
