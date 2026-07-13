import {
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "ارسال رایگان",
    desc: "برای خریدهای بالای ۲ میلیون",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت کالا",
    desc: "تضمین کیفیت تمامی محصولات",
  },
  {
    icon: RotateCcw,
    title: "۷ روز ضمانت بازگشت",
    desc: "در صورت وجود مشکل",
  },
  {
    icon: CreditCard,
    title: "پرداخت امن",
    desc: "درگاه بانکی معتبر",
  },
];

export default function Services() {
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
        {services.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <item.icon
              className="h-10 w-10 text-primary"
              strokeWidth={1.6}
            />

            <div>
              <h3 className="text-sm font-bold">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-text-secondary">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}