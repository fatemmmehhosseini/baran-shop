'use client'

import { motion } from "framer-motion";
import { CloudLightning, RefreshCw, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  
  reset,
}: {
  reset: () => void;
}) {


  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-white p-8 text-center shadow-xl"
      >
       
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={{ 
              y: [0, -6, 0],
             
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500"
          >
            <CloudLightning size={48} strokeWidth={1.5} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute -right-2 -top-2 rounded-full bg-white p-1.5 shadow-sm"
            >
              <AlertTriangle size={16} className="text-orange-500" />
            </motion.div>
          </motion.div>
        </div>

        
        <h1 className="mb-2 text-2xl font-bold text-text">اوه! مشکلی پیش آمد</h1>
        <p className="mb-8 text-sm leading-7 text-text-secondary">
          متأسفانه هنگام بارگذاری این صفحه مشکلی رخ داد.<br/>
            لطفاً چند لحظه دیگر دوباره تلاش کنید.
        </p>

       
        <div className="space-y-3">
          <button
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-dark active:scale-95"
          >
            <RefreshCw size={18} aria-hidden="true"/>
            تلاش مجدد
          </button>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-3.5 font-bold text-text transition hover:bg-surface active:scale-95 hover:border-primary hover:text-primary"
          >
            <Home size={18} />
            بازگشت به صفحه اصلی
          </Link>
        </div>

       
      </motion.div>
    </div>
  );
}