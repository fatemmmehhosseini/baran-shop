import AboutContent from "@/components/ui/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما | فروشگاه پوشاک زنانه باران",
   description:
    "درباره برند باران، فروشگاه تخصصی پوشاک زنانه شامل مانتو، کت، پالتو و لباس‌های شیک با کیفیت بالا و ارسال به سراسر ایران.",
};

export default function AboutPage() {
  
  return <AboutContent />;
}