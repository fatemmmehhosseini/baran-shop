import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts } from "@/services/product.service";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const id = await createProduct(body);

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ثبت محصول",
      },
      {
        status: 500,
      }
    );
  }
}