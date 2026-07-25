

export type CartItem = CartItemKey & {
  
  title: string;
  slug: string;
  thumbnail: string;
  price: number;
  discount: number;
  originalPrice: number
  quantity: number;
  stock: number;
  category_slug: string;
};

export type CartItemKey = {
 productId: number;
 color: string;
 size: string;
};