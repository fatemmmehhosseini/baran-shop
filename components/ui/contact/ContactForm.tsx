"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess(true);
    toast.success("پیام شما با موفقیت ارسال شد.");
    
   
    setTimeout(() => {
      setSuccess(false);
      e.currentTarget.reset();
    }, 3000);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-xl md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text">ارسال پیام</h2>
        <p className="mt-2 text-sm text-text-secondary">
          فرم زیر را پر کنید، کارشناسان ما در سریع‌ترین زمان ممکن با شما تماس می‌گیرند.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
            <CheckCircle size={48} />
          </div>
          <h3 className="text-xl font-bold text-text">پیام دریافت شد!</h3>
          <p className="mt-2 text-text-secondary">به زودی با شما تماس می‌گیریم.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">نام و نام خانوادگی</label>
              <input
                required
                type="text"
            
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">شماره موبایل</label>
              <input
                required
                type="tel"
                dir="rtl"
                placeholder="09123456758"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text">موضوع پیام</label>
            <select className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10">
              <option value="">انتخاب کنید...</option>
              <option value="support">پشتیبانی سفارش</option>
              <option value="collab">همکاری و فروش عمده</option>
              <option value="bug">گزارش مشکل سایت</option>
              <option value="other">سایر موارد</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text">متن پیام</label>
            <textarea
              required
              rows={5}
              placeholder="پیام خود را بنویسید..."
              className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send size={18} aria-hidden="true"/>
                ارسال پیام
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}