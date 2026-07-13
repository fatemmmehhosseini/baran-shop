import CategorySection from "@/components/ui/home/CategorySection";
import DiscountBanner from "@/components/ui/home/DiscountBanner";
import HeroBanner from "@/components/ui/home/HeroBanner";
import BestSellerSection from "@/components/ui/home/products/BestSellerSection";
import NewArrivalsSection from "@/components/ui/home/products/NewArrivalsSection";
import Services from "@/components/ui/home/Services";


export default function Home() {
  return (
    <>
    <HeroBanner/>
    <Services/>
    <CategorySection/>
    <BestSellerSection/>
    <DiscountBanner/>
    <NewArrivalsSection/>
    </>
  );
}
