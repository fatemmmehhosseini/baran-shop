import db from "@/lib/db";
import { CartItem } from "@/types/order.types";
import { Address } from "@/types/order.types";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";


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