import { create } from "zustand";
import { CartItem, CartItemKey } from "@/types/cart.type";
import { persist } from "zustand/middleware";

type CartStore = {
  cart: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (item: CartItemKey) => void;
  increaseQuantity: (item: CartItemKey) => void;
  decreaseQuantity: (item: CartItemKey) => void;
  clearCart: () => void
};

export const useCartStore = create<CartStore>()(persist((set) => ({
  cart: [],

  addItem: (item) =>
    set((state) => {
      const cart = [...state.cart];

      const index = cart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (index !== -1) {
        cart[index] = {
          ...cart[index],
          quantity: cart[index].quantity + item.quantity,
        };
      } else {
        cart.push(item);
      }

      return { cart };
    }),

    removeItem: (item) =>
      set((state) => ({
        cart: state.cart.filter((cartItem) => 
        !(cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
        ))
      })),

      increaseQuantity: (item) =>
        set((state) => ({
          cart: state .cart.map((cartItem) => 
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
           ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, cartItem.stock)}
           : cartItem
          )
        })),

         decreaseQuantity: (item) =>
        set((state) => ({
          cart: state .cart.flatMap((cartItem) => {
          const isTarget = 
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size;

          if(!isTarget) return cartItem;
          if(cartItem.quantity === 1) {return []}
          return{
            ...cartItem, quantity:cartItem.quantity - 1 }
        })
        })),

        clearCart: () => set({
          cart: [],
        }),
}),
  {
    name: "cart-storage"
  }
));