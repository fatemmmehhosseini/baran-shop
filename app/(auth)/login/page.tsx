"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Smartphone, Lock, ArrowLeft } from "lucide-react";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/stores/user.store";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست (مثال: 09123456789)";
    }
    if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await authService.login(formData);
      const user = await authService.getMe();
      setUser(user);
      toast.success("ورود موفقیت‌آمیز بود");
      router.replace("/");
      router.refresh();
    } catch (error) {
        const message =
            error instanceof Error
            ? error.message
            : "خطا در ورود";

        toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-screen items-center justify-center bg-surface px-4 py-18">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text">ورود به حساب کاربری</h1>
          <p className="mt-2 text-sm text-text-secondary">
            خوش آمدید! لطفاً وارد شوید.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              شماره موبایل
            </label>
            <div className="relative">
              <Smartphone className="absolute right-3 top-3.5 h-5 w-5 text-text-secondary" />
              <input
                type="tel"
                dir="rtl"
                placeholder="09123456789"
                className={`w-full rounded-xl border bg-surface px-10 py-3 text-sm outline-none transition focus:border-primary ${
                  errors.phone ? "border-red-500" : "border-border focus:border-primary"
                }`}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* رمز عبور */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              رمز عبور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 h-5 w-5 text-text-secondary" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-surface px-10 py-3 text-sm outline-none transition focus:border-primary ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3.5 text-text-secondary hover:text-text"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-dark disabled:opacity-70"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                ورود به حساب
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="font-bold text-primary hover:underline">
            ثبت‌نام کنید
          </Link>
        </div>
      </motion.div>
    </div>
  );
}