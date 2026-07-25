"use client";

import { useCartStore } from "@/stores/cart.store";
import CartItem from "@/components/ui/cart/CartItem";
import CartSummary from "@/components/ui/cart/CartSummary";
import EmptyCart from "@/components/ui/cart/EmptyCart";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container py-8 pb-24">

      <h1 className="mb-2 text-3xl font-bold">
        سبد خرید
      </h1>

      <p className="mb-8 text-text-secondary">
        {cart.length} محصول داخل سبد خرید شما
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

        <AnimatePresence mode="popLayout">
          <div className="space-y-5">
            {cart.map((item) => (
              <motion.div
                key={`${item.productId}-${item.color}-${item.size}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -100, transition: { duration: 0.5 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        <CartSummary />

      </div>

    </div>
  );
}