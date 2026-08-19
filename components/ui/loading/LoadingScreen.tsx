"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [-4, 4, -4],
            scale: [1, 1.03, 1],
          }}
          transition={{
            opacity: {
              duration: 0.4,
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative h-28 w-28 md:h-36 md:w-36"
        >
          <Image
            src="/logo/logo.svg"
            alt="Baran Shop"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="mt-2 text-sm font-medium tracking-[0.35em] text-text-secondary"
        >
          در حال آماده‌سازی...
        </motion.p>

        
        <div className="mt-6 h-[2px] w-28 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full w-10 bg-primary"
            animate={{
              x: ["-150%", "350%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

      </div>
    </div>
  );
}