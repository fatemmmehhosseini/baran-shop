import CategorySection from "@/components/ui/CategorySection";
import DiscountBanner from "@/components/ui/DiscountBanner";
import HeroBanner from "@/components/ui/HeroBanner";
import BestSellerSection from "@/components/ui/products/BestSellerSection";
import NewArrivalsSection from "@/components/ui/products/NewArrivalsSection";
import Services from "@/components/ui/Services";


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
