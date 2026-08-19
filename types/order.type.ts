import { RowDataPacket } from "mysql2";

export type Address = {
 fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
};

export type CartItem = {
  productId: number;
  quantity: number;
  color: string;
  size: string;
};




export interface Order {
  id: number;
  user_id: number;

  order_number: string;

  receiver_name: string;
  receiver_phone: string;

  province: string;
  city: string;
  address: string;
  postal_code: string;

  total_price: number;
  discount: number;
  shipping_price: number;
  final_price: number;

  tracking_code: string | null;

  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  payment_status:
    | "pending"
    | "paid"
    | "failed";

  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_title: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
  created_at: Date;
  thumbnail: string | null;
  slug: string;
  category_slug: string;
}

export interface OrderWithItems {
  order: Order;
  items: OrderItem[];
}

export interface OrderWithItemRow extends RowDataPacket, Order {
  item_id: number | null;

  product_id: number | null;
  product_title: string | null;

  thumbnail: string | null;

  slug: string | null;
  category_slug: string | null;

  color: string | null;
  size: string | null;

  quantity: number | null;
  price: number | null;
  subtotal: number | null;

  item_created_at: Date | null;
}