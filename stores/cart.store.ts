import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, CartItemKey } from "@/types/cart.type";

type CartStore = {
  cart: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (item: CartItemKey) => void;
  increaseQuantity: (item: CartItemKey) => void;
  decreaseQuantity: (item: CartItemKey) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addItem: (item) =>
        set((state) => {
          const index = state.cart.findIndex(
            (cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.color === item.color &&
              cartItem.size === item.size
          );

        
          if (index !== -1) {
            const updatedCart = [...state.cart];
            const existingItem = updatedCart[index];

            const newQuantity = Math.min(
              existingItem.quantity + item.quantity,
              existingItem.stock
            );

            updatedCart[index] = {
              ...existingItem,
              quantity: newQuantity,
            };

            return { cart: updatedCart };
          }

        
          return {
            cart: [
              ...state.cart,
              {
                ...item,
                quantity: Math.min(item.quantity, item.stock),
              },
            ],
          };
        }),

      removeItem: (item) =>
        set((state) => ({
          cart: state.cart.filter(
            (cartItem) =>
              !(
                cartItem.productId === item.productId &&
                cartItem.color === item.color &&
                cartItem.size === item.size
              )
          ),
        })),

      increaseQuantity: (item) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.color === item.color &&
            cartItem.size === item.size
              ? {
                  ...cartItem,
                  quantity: Math.min(
                    cartItem.quantity + 1,
                    cartItem.stock
                  ),
                }
              : cartItem
          ),
        })),

      decreaseQuantity: (item) =>
        set((state) => ({
          cart: state.cart.reduce<CartItem[]>((acc, cartItem) => {
            const isTarget =
              cartItem.productId === item.productId &&
              cartItem.color === item.color &&
              cartItem.size === item.size;

            if (!isTarget) {
              acc.push(cartItem);
            } else if (cartItem.quantity > 1) {
              acc.push({
                ...cartItem,
                quantity: cartItem.quantity - 1,
              });
            }

            return acc;
          }, []),
        })),

      clearCart: () =>
        set({
          cart: [],
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);