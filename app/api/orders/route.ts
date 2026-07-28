import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyToken } from "@/lib/jwt";
import { createOrder } from "@/services/order.service";

export async function POST(request: NextRequest) {
  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "ابتدا وارد حساب کاربری شوید.",
        },
        {
          status: 401,
        }
      );
    }


    let payload;

    try {
      payload = verifyToken(token);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "توکن معتبر نیست.",
        },
        {
          status: 401,
        }
      );
    }

    
    const body = await request.json();

    const { cart, address } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "سبد خرید خالی است.",
        },
        {
          status: 400,
        }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات آدرس ارسال نشده است.",
        },
        {
          status: 400,
        }
      );
    }


    const order = await createOrder(
      payload.id,
      cart,
      address
    );

    return NextResponse.json(
      {
        success: true,
        message: "سفارش با موفقیت ثبت شد.",
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create Order Error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}