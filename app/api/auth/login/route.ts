import { NextResponse } from "next/server";
import { comparePassword } from "@/lib/password";
import { findUserByPhone } from "@/services/user.service";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";



export async function POST(request: Request) {
  try {
    const body = await request.json();

    const clientIp = request.headers.get("x-forwarded-for") || "unknown-ip";
    const limit = checkRateLimit(`login_${clientIp}`);

    if (!limit.success) {
      return NextResponse.json(
        { success: false, message: `تعداد تلاش‌ها بیش از حد مجاز است. لطفاً ${limit.retryAfter} ثانیه دیگر تلاش کنید.` },
        { status: 429 }
      );
    }

    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "شماره موبایل و رمز عبور الزامی هستند.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await findUserByPhone(phone);

     const isPasswordCorrect = user ? await comparePassword(password, user.password) : false;

    if (!user || !isPasswordCorrect) {
     
      return NextResponse.json(
        { success: false, message: "شماره موبایل یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    

    const token = generateToken({
    id: user.id,
    phone: user.phone,
    });

    const cookieStore = await cookies();

        cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        });

    return NextResponse.json(
      {
        success: true,
        message: "ورود با موفقیت انجام شد.",
        user: {
          id: user.id,
          full_name: user.full_name,
          phone: user.phone,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );


  } catch (error) {
    console.error(error);

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