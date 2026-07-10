import { NextResponse } from "next/server";
import { getProducts } from "@/services/product.service";

export async function GET() {
   const products = await getProducts({
    bestSeller: true,
    limit: 8,
  });

  return NextResponse.json(products);
}