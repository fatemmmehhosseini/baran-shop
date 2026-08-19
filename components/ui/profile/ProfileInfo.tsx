import { User as UserType } from "@/types/user.type";
import { User, Mail, Phone, MapPin, Hash, Calendar, Edit, Package } from "lucide-react";
import Link from 'next/link';

interface ProfileProps {
  user: UserType;
}

export default function ProfileInfo({user}:ProfileProps) {

    
    function toPersianDate(dateString: Date | string | null) {
      if (!dateString) return "-";
      try {
        return new Date(dateString).toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return "-";
      }
    }

  return (
        <main className="space-y-6">
          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text">اطلاعات شخصی</h2>
              <Link
                href="/profile/edit"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
              >
                <Edit size={16} />
                ویرایش اطلاعات
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              
              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <User size={14} />
                  نام و نام خانوادگی
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text transition group-hover:border-primary/20">
                  {user.full_name || "تکمیل نشده"}
                </div>
              </div>

              
              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <Mail size={14} />
                  ایمیل
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text transition group-hover:border-primary/20">
                  {user.email || "تکمیل نشده"}
                </div>
              </div>

              
              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <Phone size={14} />
                  شماره موبایل
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text transition group-hover:border-primary/20">
                  {user.phone}
                </div>
              </div>

              
              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <Calendar size={14} />
                  تاریخ عضویت
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text transition group-hover:border-primary/20">
                  {toPersianDate(user.created_at)}
                </div>
              </div>
            </div>

            <hr className="my-8 border-border" />

           
            <h3 className="mb-4 text-lg font-bold text-text">آدرس تحویل</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <MapPin size={14} />
                  استان
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text">
                  {user.province || "تکمیل نشده"}
                </div>
              </div>

              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <MapPin size={14} />
                  شهر
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text">
                  {user.city || "تکمیل نشده"}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <MapPin size={14} />
                  آدرس دقیق
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text leading-7">
                  {user.address || "آدرسی ثبت نشده است."}
                </div>
              </div>

              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <Hash size={14} />
                  کد پستی
                </label>
                <div className="rounded-xl bg-surface px-4 py-3 text-sm font-medium text-text">
                  {user.postal_code || "تکمیل نشده"}
                </div>
              </div>
            </div>
          </section>

         
          <div className="flex flex-col gap-3 md:hidden">
             <Link
                href="/profile/orders"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 font-medium text-text shadow-sm"
              >
                <Package size={18} />
                مشاهده سفارش‌ها
              </Link>
          </div>

        </main>
  )
}
