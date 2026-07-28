"use client";
type AddressData = {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
};

type Props = {
  address: AddressData;
  setAddress: React.Dispatch<React.SetStateAction<AddressData>>;
  errors: Record<string, string>;
};

export default function AddressForm({ address, setAddress, errors }: Props) {
  const handleChange = (field: keyof AddressData, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-text">آدرس تحویل سفارش</h2>
      
      <div className="grid gap-5 md:grid-cols-2">
        {/* نام گیرنده */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-text">نام و نام خانوادگی</label>
          <input
            type="text"
            value={address.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary ${
              errors.fullName ? "border-red-500" : "border-border"
            }`}
            
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* شماره موبایل */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text">شماره موبایل</label>
          <input
            type="tel"
            dir="rtl"
            value={address.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary ${
              errors.phone ? "border-red-500" : "border-border"
            }`}
            
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        {/* کد پستی */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text">کد پستی</label>
          <input
            type="text"
            dir="rtl"
            value={address.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary ${
              errors.postalCode ? "border-red-500" : "border-border"
            }`}
            placeholder="1234567890"
          />
          {errors.postalCode && <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>}
        </div>

        {/* استان */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text">استان</label>
          <select
            value={address.province}
            onChange={(e) => handleChange("province", e.target.value)}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary ${
              errors.province ? "border-red-500" : "border-border"
            }`}
          >
            <option value="">انتخاب کنید...</option>
            <option value="تهران">تهران</option>
            <option value="خراسان رضوی">خراسان رضوی</option>
            <option value="اصفهان">اصفهان</option>
            <option value="فارس">فارس</option>
            <option value="تبریز">تبریز</option>
            <option value="اردبیل">اردبیل</option>
            <option value="ایلام">ایلام</option>
            <option value="بوشهر">بوشهر</option>
            <option value="سمنان">سمنان</option>
            <option value="قم">قم</option>
            <option value="گلستان">گلستان</option>
            <option value="مازندران">مازندران</option>
            {/* سایر استان‌ها */}
          </select>
          {errors.province && <p className="mt-1 text-xs text-red-500">{errors.province}</p>}
        </div>

        {/* شهر */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text">شهر</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary ${
              errors.city ? "border-red-500" : "border-border"
            }`}
            placeholder="نام شهر"
          />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>

        {/* آدرس کامل */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-text">آدرس دقیق</label>
          <textarea
            rows={3}
            value={address.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary ${
              errors.address ? "border-red-500" : "border-border"
            }`}
            placeholder="خیابان، کوچه، پلاک، واحد..."
          />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>
      </div>
    </div>
  );
}