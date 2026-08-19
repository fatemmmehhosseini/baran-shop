import { Phone, Mail, MapPin, Clock } from "lucide-react";

const infoItems = [
  {
    icon: MapPin,
    title: "آدرس فروشگاه",
    content: "تهران، خیابان میرداماد",
    color: "text-blue-500",
  },
  {
    icon: Phone,
    title: "تلفن تماس",
    content: "۰۲۱-۸۸۸۸۱۲۳۴",
    subContent: "پاسخگویی از شنبه تا چهارشنبه ۹ الی ۱۷",
    color: "text-green-500",
  },
  {
    icon: Mail,
    title: "ایمیل پشتیبانی",
    content: "baranshop@gmail.com",
    color: "text-purple-500",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    content: "همه روزه به جز جمعه‌ها",
    subContent: "۹ صبح تا ۹ شب",
    color: "text-orange-500",
  },
];

export default function ContactInfo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {infoItems.map((item, idx) => (
        <div
          key={idx}
          className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-6 transition hover:shadow-md hover:border-primary/30"
        >
          <div className={`rounded-xl bg-surface p-3 ${item.color} transition group-hover:bg-primary group-hover:text-white`}>
            <item.icon size={24} />
          </div>
          <div>
            <h3 className="mb-1 font-bold text-text">{item.title}</h3>
            <p className="text-sm leading-6 text-text-secondary">{item.content}</p>
            {item.subContent && (
              <p className="mt-1 text-xs text-text-secondary">{item.subContent}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}