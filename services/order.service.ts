import db from "@/lib/db";

import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import {
  Order,
  OrderItem,
  OrderWithItems,
  OrderWithItemRow,
} from "@/types/order.type";
import { CartItem } from "@/types/order.type";
import { Address } from "@/types/order.type";


export async function createOrder(
  userId: number,
  cart: CartItem[],
  address: Address
) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    let totalPrice = 0;
    let totalDiscount = 0;
    const shippingPrice = 80000;

    const orderItems: {
      product_id: number;
      product_title: string;
      color: string;
      size: string;
      quantity: number;
      price: number;
      subtotal: number;
    }[] = [];

    for (const item of cart) {
      const [rows] = await connection.query<RowDataPacket[]>(
        `
        SELECT
          id,
          title,
          price,
          discount,
          stock
        FROM products
        WHERE id = ?
        FOR UPDATE
        `,
        [item.productId]
      );

      if (rows.length === 0) {
        throw new Error("محصول پیدا نشد");
      }

      const product = rows[0];

      if (product.stock < item.quantity) {
        throw new Error(
          `موجودی محصول ${product.title} کافی نیست`
        );
      }

      const originalPrice = Number(product.price);

      const discountPercent = Number(product.discount);

      const finalPrice = Math.round(
        originalPrice * (100 - discountPercent) / 100
      );

      totalPrice += originalPrice * item.quantity;

      totalDiscount +=
        (originalPrice - finalPrice) * item.quantity;

      orderItems.push({
        product_id: product.id,
        product_title: product.title,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: finalPrice,
        subtotal: finalPrice * item.quantity,
      });

      const [updateResult] =
        await connection.query<ResultSetHeader>(
          `
          UPDATE products
          SET stock = stock - ?
          WHERE id = ?
            AND stock >= ?
          `,
          [
            item.quantity,
            product.id,
            item.quantity,
          ]
        );

      if (updateResult.affectedRows === 0) {
        throw new Error(
          `موجودی محصول ${product.title} کافی نیست`
        );
      }
    }

    const finalPrice =
      totalPrice -
      totalDiscount +
      shippingPrice;

    const orderNumber =
      "BRN-" +
      Date.now();

    const trackingCode =
      "TRK-" +
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    const [orderResult] =
      await connection.query<ResultSetHeader>(
        `
        INSERT INTO orders
        (
          user_id,
          order_number,
          receiver_name,
          receiver_phone,
          province,
          city,
          address,
          postal_code,
          total_price,
          discount,
          shipping_price,
          final_price,
          tracking_code,
          status,
          payment_status
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          orderNumber,
          address.fullName,
          address.phone,
          address.province,
          address.city,
          address.address,
          address.postalCode,
          totalPrice,
          totalDiscount,
          shippingPrice,
          finalPrice,
          trackingCode,
          "pending",
          "paid",
        ]
      );

    const orderId = orderResult.insertId;

    for (const item of orderItems) {
      await connection.query(
        `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          product_title,
          color,
          size,
          quantity,
          price,
          subtotal
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.product_title,
          item.color,
          item.size,
          item.quantity,
          item.price,
          item.subtotal,
        ]
      );
    }

    await connection.commit();

    return {
      success: true,
      orderId,
      orderNumber,
      trackingCode,
      totalPrice,
      discount: totalDiscount,
      shippingPrice,
      finalPrice,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}



export async function getOrdersByUserId(
  userId: number
): Promise<OrderWithItems[]> {
  const [rows] = await db.query<OrderWithItemRow[]>(
    `
    SELECT
      o.*,

      oi.id AS item_id,
      oi.product_id,
      oi.product_title,
      oi.color,
      oi.size,
      oi.quantity,
      oi.price,
      oi.subtotal,
      oi.created_at AS item_created_at,

      p.slug,
      c.slug AS category_slug,
      p.thumbnail

    FROM orders o

    LEFT JOIN order_items oi
      ON oi.order_id = o.id

    LEFT JOIN products p
       ON p.id = oi.product_id

      LEFT JOIN categories c
       ON c.id = p.category_id

    WHERE o.user_id = ?

    ORDER BY
      o.created_at DESC,
      oi.id ASC
    `,
    [userId]
  );

  const ordersMap = new Map<number, OrderWithItems>();

  for (const row of rows) {
    if (!ordersMap.has(row.id)) {
      const order: Order = {
        id: row.id,
        user_id: row.user_id,

        order_number: row.order_number,

        receiver_name: row.receiver_name,
        receiver_phone: row.receiver_phone,

        province: row.province,
        city: row.city,
        address: row.address,
        postal_code: row.postal_code,

        total_price: row.total_price,
        discount: row.discount,
        shipping_price: row.shipping_price,
        final_price: row.final_price,

        tracking_code: row.tracking_code,

        status: row.status,
        payment_status: row.payment_status,

        created_at: row.created_at,
        updated_at: row.updated_at,
      };

      ordersMap.set(row.id, {
        order,
        items: [],
      });
    }

    if (row.item_id !== null) {
      const item: OrderItem = {
        id: row.item_id,
        order_id: row.id,

        product_id: row.product_id!,
        product_title: row.product_title!,

        slug: row.slug!,
        category_slug: row.category_slug!,

        thumbnail: row.thumbnail,

        color: row.color!,
        size: row.size!,

        quantity: row.quantity!,
        price: row.price!,
        subtotal: row.subtotal!,

        created_at: row.item_created_at!,
      };

      ordersMap.get(row.id)!.items.push(item);
    }
  }

  return [...ordersMap.values()];
}