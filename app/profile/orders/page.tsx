import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { getOrdersByUserId } from "@/services/order.service"; 
import { Package, Calendar, MapPin, Phone, CheckCircle, Clock, XCircle, Clock3, LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { OrderWithItems } from "@/types/order.type";



function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; icon: LucideIcon }> = {
    pending: { label: "در انتظار بررسی", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
    processing: { label: "در حال پردازش", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Clock },
    shipped: { label: "ارسال شده", color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: Package },
    delivered: { label: "تحویل داده شده", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
    cancelled: { label: "لغو شده", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  };

  const current = config[status] || config.pending;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${current.color}`}>
      <Icon size={14} />
      {current.label}
    </span>
  );
}



function PaymentBadge({
  status,
}: {
  status: "pending" | "paid" | "failed";
}) {
  switch (status) {
    case "paid":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          <CheckCircle size={14} />
          پرداخت شده
        </span>
      );

    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700">
          <Clock3 size={14} />
          در انتظار پرداخت
        </span>
      );

    case "failed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
          <XCircle size={14} />
          پرداخت ناموفق
        </span>
      );

    default:
      return null;
  }
}


function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}


function toPersianDate(dateString: Date | string) {
  return new Date(dateString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function OrdersPage() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.id) {
    redirect("/login");
  }

  
  const ordersData = await getOrdersByUserId(payload.id);

  return (
    <div className="container py-8 pb-24">
      
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text md:text-3xl">سفارش‌های من</h1>
        <Link
          href="/profile"
          className="text-sm font-medium text-text-secondary hover:text-primary transition"
        >
          بازگشت به پروفایل
        </Link>
      </div>

      {ordersData.length === 0 ? (
        
        <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-white py-20 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface">
            <Package className="h-12 w-12 text-text-secondary" />
          </div>
          <h2 className="text-xl font-bold text-text">هیچ سفارشی ثبت نشده است</h2>
          <p className="mt-2 text-sm text-text-secondary">
            پس از ثبت اولین سفارش، اینجا نمایش داده می‌شود.
          </p>
          <Link
            href="/products"
            className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-dark"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        
        <div className="space-y-6">
          {ordersData.map((data: OrderWithItems) => {
            const order = data.order;
            const items = data.items;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:shadow-md"
              >
                
                <div className="border-b border-border bg-surface/30 p-5 md:flex md:items-center md:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-text-secondary">شماره سفارش:</span>
                      <span className="font-mono text-base font-bold text-text dir-ltr">{order.order_number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Calendar size={14} />
                      <span>{toPersianDate(order.created_at)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 md:mt-0">
                    <StatusBadge status={order.status} />
                    <PaymentBadge status={order.payment_status} />
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[1fr_350px]">
                  
                  <div className="p-5 md:p-8">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-text">
                      <Package size={18} />
                      محصولات ({items.length})
                    </h3>
                    
                    <div className="divide-y divide-border">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">

                          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                             
                            <Link href={`/products/${item.category_slug}/${item.slug}`}
                            aria-label={`مشاهده محصول ${item.product_title}`}>
                              {item.thumbnail ? (
                                <Image src={item.thumbnail} alt="" fill className="object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-text-secondary">
                                  <Package size={24} aria-hidden="true"/>
                                </div>
                              )}
                            </Link>
                          </div>

                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-text">{item.product_title}</h4>
                              <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-secondary">
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">رنگ:</span> {item.color}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">سایز:</span> {item.size}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="font-medium">تعداد:</span> {item.quantity}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-end justify-between">
                              <span className="text-xs text-text-secondary">قیمت </span>
                              <div className="text-left">
                                <span className="block text-sm font-bold text-text">
                                  {formatPrice(item.price)} تومان
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-xs text-text-secondary">
                                    جمع: {formatPrice(item.subtotal)} تومان
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                 
                  <div className="border-t border-border bg-surface/30 p-5 md:p-8 lg:border-l lg:border-t-0">
                    
                    
                    <div className="mb-6">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-text">
                        <MapPin size={18} />
                        آدرس تحویل
                      </h3>
                      <div className="rounded-xl bg-white p-4 text-sm leading-6 text-text-secondary shadow-sm">
                        <p className="font-medium text-text">{order.receiver_name}</p>
                        <p className="mt-1 flex items-center gap-2 dir-ltr text-left">
                          <Phone size={14} /> {order.receiver_phone}
                        </p>
                        <p className="mt-2">
                          {order.province}، {order.city}
                        </p>
                        <p className="mt-1">{order.address}</p>
                        <p className="mt-1 font-mono text-xs dir-ltr text-left">کد پستی: {order.postal_code}</p>
                      </div>
                    </div>

                    <hr className="my-6 border-border/50" />

                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-text-secondary">
                        <span>جمع کالاها</span>
                        <span>{formatPrice(order.total_price)} تومان</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>تخفیف</span>
                          <span>-{formatPrice(order.discount)} تومان</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-text-secondary">
                        <span>هزینه ارسال</span>
                        <span>{order.shipping_price === 0 ? "رایگان" : formatPrice(order.shipping_price) + " تومان"}</span>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <span className="font-bold text-text">مبلغ نهایی</span>
                        <span className="text-xl font-extrabold text-primary">
                          {formatPrice(order.final_price)} <span className="text-xs font-medium">تومان</span>
                        </span>
                      </div>
                    </div>

                   

                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}