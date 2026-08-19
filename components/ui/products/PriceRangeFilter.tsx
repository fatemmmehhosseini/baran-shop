"use client";

import * as Slider from "@radix-ui/react-slider";
import { SlidersHorizontal } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

const ABSOLUTE_MIN = 0;
const ABSOLUTE_MAX = 10_000_000;
const STEP = 10_000;

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

type Props = {
  min?: number;
  max?: number;
};

export default function PriceRangeFilter({
  min = ABSOLUTE_MIN,
  max = ABSOLUTE_MAX,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [range, setRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice") ?? min),
    Number(searchParams.get("maxPrice") ?? max),
  ]);

  
  useEffect(() => {
    setRange([
      Number(searchParams.get("minPrice") ?? min),
      Number(searchParams.get("maxPrice") ?? max),
    ]);
  }, [searchParams, min, max]);

  function applyFilter(value: number[]) {
    const params = new URLSearchParams(searchParams.toString());

    if (value[0] > min)
      params.set("minPrice", String(value[0]));
    else
      params.delete("minPrice");

    if (value[1] < max)
      params.set("maxPrice", String(value[1]));
    else
      params.delete("maxPrice");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-5">

      <div className="mb-6 flex items-center gap-2">
        <SlidersHorizontal
          className="h-4 w-4 text-primary"
          strokeWidth={1.75}
        />
        <h3 className="text-sm font-bold text-text">
          محدوده قیمت
        </h3>
      </div>

      <Slider.Root
        className="relative flex h-6 w-full touch-none items-center"
        dir="rtl"
        min={min}
        max={max}
        step={STEP}
        minStepsBetweenThumbs={1}
        value={range}
        onValueChange={(value) =>
          setRange(value as [number, number])
        }
        onValueCommit={applyFilter}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-surface">

          <Slider.Range className="absolute h-full rounded-full bg-primary" />

        </Slider.Track>

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-white shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="حداقل قیمت"
        />

        <Slider.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-white shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="حداکثر قیمت"
        />
      </Slider.Root>

      <div className="mt-5 flex items-center justify-between text-xs text-text-secondary">

        <span>
          {formatPrice(range[0])} تومان
        </span>

        <span>
          {formatPrice(range[1])} تومان
        </span>

      </div>

    </div>
  );
}