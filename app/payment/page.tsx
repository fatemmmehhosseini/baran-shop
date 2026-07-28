"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Lock, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/stores/cart.store";
import { CartItem } from "@/types/cart.type";


interface CheckoutData {
  cart: CartItem[];
  address: {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
  };
}

export default function PaymentPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv2: "",
    expiry: "",
    password: "",
  });

  // بارگذاری داده‌ها از sessionStorage
  useEffect(() => {
    const data = sessionStorage.getItem("checkout_data");
    if (!data) {
      router.replace("/checkout");
      return;
    }
    try {
      setCheckoutData(JSON.parse(data));
    } catch (error) {
      console.error("Failed to parse checkout data", error);
      router.replace("/checkout");
    }
  }, [router]);

  if (!checkoutData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const { cart, address } = checkoutData;

  
  const totalPrice = (cart ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 80000; 
  const finalPrice = totalPrice + shipping;

  // هندلر تغییرات فرم با فرمت‌دهی شماره کارت
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      // فقط عدد و حداکثر ۱۶ رقم
      const numericValue = value.replace(/\D/g, "").slice(0, 16);
      // فرمت‌دهی ۴ رقم ۴ رقم
      const formatted = numericValue.replace(/(\d{4})(?=\d)/g, "$1-");
      setFormData((prev) => ({ ...prev, cardNumber: formatted }));
    } else if (name === "cvv2") {
      setFormData((prev) => ({ ...prev, cvv2: value.replace(/\D/g, "").slice(0, 4) }));
    } else if (name === "expiry") {
      // فرمت MM/YY
      let cleanVal = value.replace(/\D/g, "").slice(0, 4);
      if (cleanVal.length >= 2) {
        cleanVal = `${cleanVal.slice(0, 2)}/${cleanVal.slice(2)}`;
      }
      setFormData((prev) => ({ ...prev, expiry: cleanVal }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (formData.cardNumber.replace(/\D/g, "").length !== 16) {
      toast.error("شماره کارت باید ۱۶ رقم باشد");
      return false;
    }
    if (formData.cvv2.length !== 3 && formData.cvv2.length !== 4) {
      toast.error("CVV2 نامعتبر است");
      return false;
    }
    if (formData.expiry.length !== 5 || !formData.expiry.includes("/")) {
      toast.error("تاریخ انقضا نامعتبر است (مثال: 08/08)");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("رمز دوم حداقل ۶ رقم است");
      return false;
    }
    return true;
  };

  async function handleSuccess() {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // شبیه‌سازی تاخیر شبکه
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ثبت نهایی سفارش در اینجا انجام می‌شود (فقط پس از کلیک روی پرداخت موفق)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "خطا در ثبت سفارش");
      }

      // پاک کردن داده‌های موقت و سبد خرید
      sessionStorage.removeItem("checkout_data");
      clearCart();
      
      toast.success("سفارش با موفقیت ثبت و پرداخت شد!");
      router.replace(`/payment/success?order=${data.order?.orderNumber}&amount=${finalPrice}`);
      
    } catch (err: unknown) {
    toast.error(
        err instanceof Error ? err.message : "عملیات با خطا مواجه شد"
    );
    }finally {
      setLoading(false);
    }
  }

  function handleFailed() {
    router.replace("/payment/failed");
  }

  return (
    <div className="container max-w-2xl py-8 md:py-12">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm md:p-10">
        
        
        <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text">درگاه پرداخت امن</h1>
            <p className="text-sm pb-1 text-text-secondary">لطفاً اطلاعات کارت خود را وارد کنید</p>
          </div>
        </div>

        {/* Order Summary Mini */}
        <div className="mb-8 rounded-2xl bg-surface p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white">
                 {cart[0]?.thumbnail && (
                   <Image src={cart[0].thumbnail} alt="Product" fill className="object-cover" />
                 )}
              </div>
              <div>
                <p className="text-sm font-bold text-text">
                  {cart.length} محصول در سبد
                </p>
                <p className="text-xs text-text-secondary">
                  گیرنده: {address.fullName}
                </p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs text-text-secondary">مبلغ قابل پرداخت</p>
              <p className="text-lg font-extrabold text-primary">
                {new Intl.NumberFormat("fa-IR").format(finalPrice)}
                <span className="mr-1 text-xs font-normal">تومان</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-text">
              <CreditCard size={16} />
              شماره کارت
            </label>
            <input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-left dir-ltr tracking-wider outline-none transition focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-text-secondary"
              placeholder="6037-9918-0000-0000"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-text">CVV2</label>
              <input
                name="cvv2"
                type="password"
                value={formData.cvv2}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-center outline-none transition focus:border-primary"
                placeholder="1234"
                maxLength={4}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-text">تاریخ انقضا</label>
              <input
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-center dir-ltr outline-none transition focus:border-primary"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text">رمز دوم (پویا)</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-left dir-ltr outline-none transition focus:border-primary"
              placeholder="******"
              maxLength={10}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-3">
          <button
            onClick={handleSuccess}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                در حال پردازش...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                پرداخت موفق
              </>
            )}
          </button>

          <button
            onClick={handleFailed}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-4 font-bold text-red-600 transition hover:bg-red-100"
          >
            <AlertCircle size={20} />
            انصراف / پرداخت ناموفق
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-blue-50 p-4 text-center">
          <p className="text-xs leading-6 text-blue-800">
             این صفحه صرفاً جهت شبیه‌سازی درگاه پرداخت برای پروژه رزومه ایجاد شده است.
            <br />
            هیچ تراکنش مالی واقعی انجام نمی‌شود و اطلاعات کارت ذخیره نمی‌گردد.
          </p>
        </div>
      </div>
    </div>
  );
}