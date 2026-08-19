import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/services/product.service";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const q = searchParams.get("q")?.trim() ?? "";

    if (!q) {
      return NextResponse.json([]);
    }

    const products = await searchProducts(q);

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "خطا در جستجو" },
      { status: 500 }
    );
  }
}