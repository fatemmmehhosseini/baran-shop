import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from "@/services/user.service";
import { CreateUserDto } from "@/types/user.type";



export async function POST(request: Request) {
  try {
    const body: CreateUserDto = await request.json();

    const { full_name, email, phone, password } = body;

         if (!full_name || !phone || !password) {
        return NextResponse.json(
            {
            success: false,
            message: "تمام فیلدها الزامی هستند.",
            },
            {
            status: 400,
            }
        );
        }

        if (password.length < 6) {
        return NextResponse.json(
            {
            success: false,
            message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
            },
            {
            status: 400,
            }
        );
        }

        if (email) {
            const existingEmail = await findUserByEmail(email);

            if (existingEmail) {
            return NextResponse.json(
                {
                success: false,
                message: "این ایمیل قبلاً ثبت شده است.",
                },
                {
                status: 409,
                }
            );
            }
        }

        const existingPhone = await findUserByPhone(phone);

        if (existingPhone) {
        return NextResponse.json(
            {
            success: false,
            message: "این شماره موبایل قبلاً ثبت شده است.",
            },
            {
            status: 409,
            }
        );
        }

    const hashedPassword = await hashPassword(password);

    const userId = await createUser({
    full_name,
    email,
    phone,
    password: hashedPassword,
    });

    return NextResponse.json(
    {
        success: true,
        message: "ثبت نام با موفقیت انجام شد.",
        user: {
            id: userId,
            full_name,
            phone,
            email: email ?? null,
        },
    },
    {
        status: 201,
    }
    );


  }catch (error) {
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