import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, User, MapPin, Hash, Phone } from "lucide-react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { getUserById, updateUser } from "@/services/user.service";
import { UpdateUserInput } from "@/types/user.type";
import { revalidatePath } from "next/cache";


async function updateProfileAction(formData: FormData) {
  "use server";

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      redirect("/login");
    }

    const userId = payload.id;

    const data: UpdateUserInput = {
      full_name: formData.get("full_name") as string,
      province: formData.get("province") as string,
      city: formData.get("city") as string,
      address: formData.get("address") as string,
      postal_code: formData.get("postal_code") as string,
    };

    
    if (!data.full_name || !data.province || !data.city || !data.address || !data.postal_code) {
      throw new Error("لطفاً تمام فیلدهای الزامی را پر کنید.");
    }

    const success = await updateUser(userId, data);

    if (!success) {
      throw new Error("بروزرسانی اطلاعات انجام نشد. لطفاً مجدد تلاش کنید.");
    }

    revalidatePath("/profile");

    redirect("/profile?updated=true");
  } catch (error) {
    console.error(
        error instanceof Error ? error.message : "Unknown error"
    );

    redirect("/profile?error=update_failed");
}
}

export default async function EditProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.id) {
    redirect("/login");
  }

  const user = await getUserById(payload.id);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container py-8 pb-24">
      
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/profile"
          aria-label="بازگشت به پروفایل"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-secondary transition hover:border-primary hover:text-primary"
        >
          <ArrowLeft size={20} aria-hidden="true"/>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text md:text-3xl">ویرایش اطلاعات</h1>
          <p className="text-sm text-text-secondary">اطلاعات شخصی خود را به‌روز کنید</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <form action={updateProfileAction} className="space-y-6">
          
          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-text">
              <User className="text-primary" size={20} />
              اطلاعات فردی
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              
              <div className="sm:col-span-2">
                <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-text">
                  نام و نام خانوادگی <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  defaultValue={user.full_name || ""}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  
                />
              </div>

              
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text">
                  شماره موبایل
                </label>
                <div className="relative">
                  <Phone className="absolute right-4 top-3.5 h-5 w-5 text-text-secondary" />
                  <input
                    type="text"
                    id="phone"
                    value={user.phone}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-border bg-gray-100 px-10 py-3 text-sm text-text-secondary outline-none"
                  />
                </div>
                <p className="mt-1 text-xs text-text-secondary">تغییر شماره موبایل امکان‌پذیر نیست.</p>
              </div>
            </div>
          </section>

          
          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-text">
              <MapPin className="text-primary" size={20} />
              آدرس تحویل
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              
              <div>
                <label htmlFor="province" className="mb-2 block text-sm font-medium text-text">
                  استان <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  defaultValue={user.province || ""}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="مثال: تهران"
                />
              </div>

              
              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-medium text-text">
                  شهر <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={user.city || ""}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="مثال: تهران"
                />
              </div>

              
              <div className="sm:col-span-2">
                <label htmlFor="postal_code" className="mb-2 block text-sm font-medium text-text">
                  کد پستی <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute right-4 top-3.5 h-5 w-5 text-text-secondary" />
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    defaultValue={user.postal_code || ""}
                    required
                    pattern="\d*"
                    maxLength={10}
                    className="w-full rounded-xl border border-border bg-surface px-10 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-text">
                  آدرس دقیق <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  required
                  defaultValue={user.address || ""}
                  className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="آدرس کامل پستی شامل خیابان، کوچه، پلاک و واحد..."
                />
              </div>
            </div>
          </section>

          
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <Link
              href="/profile"
              className="flex w-full items-center justify-center rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-bold text-text transition hover:bg-surface sm:w-auto"
            >
              انصراف
            </Link>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-dark sm:w-auto"
            >
              <Save size={18} aria-hidden="true"/>
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}