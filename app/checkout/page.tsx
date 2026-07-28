"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user.store";
import { useCartStore } from "@/stores/cart.store";
import AddressForm from "@/components/ui/checkout/AddressForm";
import OrderItems from "@/components/ui/checkout/OrderItems";
import PaymentSummary from "@/components/ui/checkout/PaymentSummary";
import toast from "react-hot-toast";


type AddressData = {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const cart = useCartStore((state) => state.cart);
  
  const [address, setAddress] = useState<AddressData>({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
  });
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});

  
  useEffect(() => {
   
    if (!isAuthenticated) {
      
      router.replace("/login?redirect=/checkout");
    } else if (user) {
      
      setAddress((prev) => ({
        ...prev,
        fullName: user.full_name || prev.fullName,
        phone: user.phone || prev.phone,
        province: user.province || prev.province,
        city: user.city || prev.city,
      }));
    }
  }, [ user, isAuthenticated, router]);

  
  if (!isAuthenticated) return null;

  const validateAddress = () => {
    const newErrors: Partial<Record<keyof AddressData, string>> = {};
    let isValid = true;

    if (!address.fullName.trim()) {
      newErrors.fullName = "نام گیرنده الزامی است";
      isValid = false;
    }
    if (!/^09\d{9}$/.test(address.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
      isValid = false;
    }
    if (!address.province.trim()) {
      newErrors.province = "انتخاب استان الزامی است";
      isValid = false;
    }
    if (!address.city.trim()) {
      newErrors.city = "انتخاب شهر الزامی است";
      isValid = false;
    }
    if (!address.address.trim()) {
      newErrors.address = "آدرس دقیق الزامی است";
      isValid = false;
    }
    if (!/^\d{10}$/.test(address.postalCode.replace(/\s/g, ""))) {
      newErrors.postalCode = "کد پستی ۱۰ رقمی الزامی است";
      isValid = false;
    }

    setErrors(newErrors);
    
    if (!isValid) {
      // اسکرول به بخش خطا
      const errorElement = document.getElementById("address-section");
      errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("لطفاً فیلدهای آدرس را کامل و صحیح وارد کنید");
    }
    
    return isValid;
  };

  const handleContinueToPayment = () => {
    if (!validateAddress()) return;
    if (!agreeTerms) {
      toast.error("باید قوانین و مقررات را مطالعه و تأیید کنید");
      return;
    }
    if (cart.length === 0) {
      toast.error("سبد خرید خالی است");
      return;
    }

    sessionStorage.setItem(
      "checkout_data",
      JSON.stringify({ cart, address })
    );

    router.push("/payment");
  };

  return (
    <div className="container py-8 pb-24">
      <h1 className="mb-8 text-2xl font-bold text-text md:text-3xl">
        تکمیل خرید
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        
        <div className="space-y-8">
          
        
          <section id="address-section">
            <AddressForm
              address={address}
              setAddress={setAddress}
              errors={errors}
            />
          </section>

          
          <section>
            <OrderItems items={cart} />
          </section>

          
          <div className="lg:hidden">
             <PaymentSummary items={cart} />
             <div className="rounded-2xl border border-border p-4 bg-surface">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary leading-6">
                    قوانین و مقررات فروشگاه باران را مطالعه کرده‌ام و با آن موافقم.
                  </span>
                </label>
                
                <button
                  onClick={handleContinueToPayment}
                  disabled={!agreeTerms}
                  className="mt-4 w-full rounded-xl bg-primary py-4 font-bold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  ادامه فرایند پرداخت
                </button>
             </div>
          </div>
        </div>

        
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <PaymentSummary items={cart} />
            
            <div className="rounded-2xl border border-border p-5 bg-white shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary leading-6">
                  قوانین و مقررات فروشگاه باران را مطالعه کرده‌ام و با آن موافقم.
                </span>
              </label>
              
              <button
                onClick={handleContinueToPayment}
                disabled={!agreeTerms}
                className="w-full rounded-xl bg-primary py-4 font-bold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                ادامه فرایند پرداخت
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}