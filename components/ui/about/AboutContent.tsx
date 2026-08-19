'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Heart, ShieldCheck, Truck, Users, Award, Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "circOut" as const, }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutContent() {
  return (
    <div className="overflow-hidden bg-surface">
      
      
      <section className=" container relative w-full overflow-hidden aspect-[4/2.3] sm:aspect-[21/10.8] lg:aspect-[3/1.3]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary/20 z-10  aspect-[4/2.3] w-full sm:aspect-[21/10.8] lg:aspect-[3/1.3]" />
        <Image
          src="/images/banner/about1.png" 
          alt="درباره باران"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true}}
            className="mb-4 text-4xl font-black md:text-6xl lg:text-7xl"
          >
            داستانِ باران
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl text-lg font-medium leading-relaxed md:text-xl px-8"
          >
            ما فقط لباس نمی‌فروشیم؛ ما با ترکیب کیفیت، ظرافت و طراحی، استایلی خلق می‌کنیم که اعتماد به نفس و زیبایی را در هر لحظه همراه شما می‌سازد.
          </motion.p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="container py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
            <h2 className="mb-6 text-3xl font-bold text-text md:text-4xl">
              از یک رویا تا واقعیت
            </h2>
            <div className="space-y-6 text-base leading-8 text-text-secondary">
              <p>
                فروشگاه <strong>باران</strong> در سال ۱۴۰۰ با یک هدف ساده اما بزرگ متولد شد: 
                <span className="font-bold text-primary"> ارائه پوشاک زنانه‌ای که هم شیک باشد، هم باکیفیت و هم با قیمت منصفانه.</span>
              </p>
              <p>
                ما معتقدیم هر زنی لایق آن است که بهترین نسخه خود را در آینه ببیند. تیم باران با وسواس فراوان پارچه‌ها را انتخاب می‌کند، طرح‌ها را بررسی می‌کند و دوخت را کنترل می‌کند تا شما با خیالی آسوده خرید کنید.
              </p>
              <p>
                امروز، باران همراه هزاران خانم خوش‌سلیقه در سراسر ایران است و این افتخار را دارد که در لحظات مهم و روزمره زندگی شما، کنارتان باشد.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-text">+۱۰,۰۰۰ مشتری راضی</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-text">تضمین کیفیت</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="order-1 lg:order-2 relative h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl md:h-[500px]"
          >
             <Image
              src="/images/banner/about2.png" 
              alt="تیم باران"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      
      <section className="bg-white py-20 md:py-32">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">چرا باران؟</h2>
            <p className="text-text-secondary">
              ارزش‌هایی که ما را متمایز می‌کنند و تعهد ما به شماست.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: Heart,
                title: "عشق به جزئیات",
                desc: "تک‌تک دوخت‌ها و دکمه‌ها با دقت انتخاب شده‌اند تا بهترین تجربه را داشته باشید."
              },
              {
                icon: ShieldCheck,
                title: "ضمانت اصالت",
                desc: "تمامی محصولات اورجینال بوده و در صورت عدم رضایت، مرجوع می‌شوند."
              },
              {
                icon: Truck,
                title: "ارسال سریع",
                desc: "سفارش شما در کمترین زمان ممکن بسته‌بندی و به سراسر ایران ارسال می‌شود."
              },
              {
                icon: ShoppingBag,
                title: "تنوع بی‌نظیر",
                desc: "کلکسیونی از جدیدترین ترندهای روز دنیا متناسب با سلیقه ایرانی."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group rounded-2xl border border-border bg-surface p-8 text-center transition hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <item.icon size={32} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-text">{item.title}</h3>
                <p className="text-sm leading-7 text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-dark px-6 py-16 text-center text-white md:px-16 md:py-24">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">به خانواده باران بپیوندید</h2>
            <p className="mb-10 text-lg text-gray-300">
              با دنبال کردن ما در شبکه‌های اجتماعی، از جدیدترین کالکشن‌ها و تخفیف‌های ویژه باخبر شوید.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a aria-label="اینستاگرام باران"
              href="#" className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-dark transition hover:bg-primary hover:text-white">
                <FaInstagram size={20} aria-hidden="true"/>
                اینستاگرام ما
              </a>
              <a href="/contact" aria-label="شماره تماس باران" className="flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 font-bold text-white transition hover:bg-white/10">
                <Mail size={20} aria-hidden="true"/>
                تماس با پشتیبانی
              </a>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}