import { NextResponse } from "next/server";
import { comparePassword } from "@/lib/password";
import { findUserByPhone } from "@/services/user.service";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";



export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربری با این شماره پیدا نشد.",
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordCorrect = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور اشتباه است.",
        },
        {
          status: 401,
        }
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