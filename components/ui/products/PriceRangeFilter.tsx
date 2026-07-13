// "use client";

// import { useState } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { SlidersHorizontal } from "lucide-react";

// export default function PriceRangeFilter() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [min, setMin] = useState(searchParams.get("minPrice") ?? "");
//   const [max, setMax] = useState(searchParams.get("maxPrice") ?? "");

//   function apply() {
//     const params = new URLSearchParams(searchParams.toString());
//     if (min) params.set("minPrice", min);
//     else params.delete("minPrice");

//     if (max) params.set("maxPrice", max);
//     else params.delete("maxPrice");

//     router.push(`${pathname}?${params.toString()}`);
//   }

//   return (
//     <div className="rounded-2xl border border-border bg-background p-5">
//       <div className="mb-4 flex items-center gap-2">
//         <SlidersHorizontal className="h-4 w-4 text-primary" strokeWidth={1.75} />
//         <h3 className="text-sm font-bold text-text">محدوده قیمت (تومان)</h3>
//       </div>

//       <div className="flex items-center gap-2">
//         <input
//           type="number"
//           inputMode="numeric"
//           placeholder="از"
//           value={min}
//           onChange={(e) => setMin(e.target.value)}
//           className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-light/30"
//         />
//         <span className="shrink-0 text-text-secondary">—</span>
//         <input
//           type="number"
//           inputMode="numeric"
//           placeholder="تا"
//           value={max}
//           onChange={(e) => setMax(e.target.value)}
//           className="w-full rounded-lg border border-border px-3 py-2 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-light/30"
//         />
//       </div>

//       <button
//         type="button"
//         onClick={apply}
//         className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-dark"
//       >
//         اعمال فیلتر
//       </button>
//     </div>
//   );
// }


// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { SlidersHorizontal } from "lucide-react";

// const ABSOLUTE_MIN = 0;
// const ABSOLUTE_MAX = 10_000_000;
// const STEP = 10_000;

// function formatToman(n: number) {
//   return new Intl.NumberFormat("fa-IR").format(n);
// }

// type Props = {
//   min?: number;
//   max?: number;
// };

// export default function PriceRangeFilter({
//   min: absMin = ABSOLUTE_MIN,
//   max: absMax = ABSOLUTE_MAX,
// }: Props) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const initialMin = Number(searchParams.get("minPrice") ?? absMin);
//   const initialMax = Number(searchParams.get("maxPrice") ?? absMax);

//   const [range, setRange] = useState<[number, number]>([initialMin, initialMax]);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const draggingThumb = useRef<"min" | "max" | null>(null);


//   const percentFromValue = useCallback(
//     (value: number) => ((value - absMin) / (absMax - absMin)) * 100,
//     [absMin, absMax]
//   );

//   const valueFromClientX = useCallback(
//     (clientX: number) => {
//       if (!trackRef.current) return absMin;
//       const rect = trackRef.current.getBoundingClientRect();
//       const fraction = Math.min(1, Math.max(0, (rect.right - clientX) / rect.width));
//       const rawValue = absMin + fraction * (absMax - absMin);
//       return Math.round(rawValue / STEP) * STEP;
//     },
//     [absMin, absMax]
//   );

   

//   useEffect(() => {
//   function handlePointerMove(e: PointerEvent) {
//     if (!draggingThumb.current) return;
//     const value = valueFromClientX(e.clientX);

//     setRange(([min, max]) => {
//       if (draggingThumb.current === "min") {
//         return [Math.min(value, max - STEP), max];
//       }
//       return [min, Math.max(value, min + STEP)];
//     });
//   }

//   function handlePointerUp() {
//     draggingThumb.current = null;
//   }

//   window.addEventListener("pointermove", handlePointerMove);
//   window.addEventListener("pointerup", handlePointerUp);

//   return () => {
//     window.removeEventListener("pointermove", handlePointerMove);
//     window.removeEventListener("pointerup", handlePointerUp);
//   };
// }, [valueFromClientX]);

// function startDrag(thumb: "min" | "max") {
//   draggingThumb.current = thumb;
// }

//   function apply() {
//     const params = new URLSearchParams(searchParams.toString());
//     if (range[0] > absMin) {
//     params.set("minPrice", String(range[0]));
//   } else {
//     params.delete("minPrice");
//   }

//   if (range[1] < absMax) {
//     params.set("maxPrice", String(range[1]));
//   } else {
//     params.delete("maxPrice");
//   }
//     router.replace(`${pathname}?${params.toString()}`, {scroll: false});
//   }

//   return (
//     <div className="rounded-2xl border border-border bg-background p-5">
//       <div className="mb-6 flex items-center gap-2">
//         <SlidersHorizontal className="h-4 w-4 text-primary" strokeWidth={1.75} />
//         <h3 className="text-sm font-bold text-text">محدوده قیمت</h3>
//       </div>

      
//       <div
//         ref={trackRef}
//         className="relative h-1.5 w-full touch-none rounded-full bg-surface"
//       >
//         <div
//           className="absolute h-full rounded-full bg-primary"
//           style={{
//             right: `${percentFromValue(range[0])}%`,
//             left: `${100 - percentFromValue(range[1])}%`,
//           }}
//         />

//         <button
//           type="button"
//           onPointerDown={() => startDrag("min")}
//           aria-label="حداقل قیمت"
//           className="absolute top-1/2 h-5 w-5 translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none rounded-full border-2 border-primary bg-white shadow-md transition active:cursor-grabbing active:scale-110"
//           style={{ right: `${percentFromValue(range[0])}%` }}
//         />

//         <button
//           type="button"
//           onPointerDown={() => startDrag("max")}
//           aria-label="حداکثر قیمت"
//           className="absolute top-1/2 h-5 w-5 translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none rounded-full border-2 border-primary bg-white shadow-md transition active:cursor-grabbing active:scale-110"
//           style={{ right: `${percentFromValue(range[1])}%` }}
//         />
//       </div>

//       <div className="mt-5 flex items-center justify-between text-xs text-text-secondary">
//         <span>{formatToman(range[0])} تومان</span>
//         <span>{formatToman(range[1])} تومان</span>
//       </div>

//       <button
//         type="button"
//         onClick={apply}
//         className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-dark"
//       >
//         اعمال فیلتر
//       </button>
//     </div>
//   );
// }


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

  // Sync با URL (برای Back / Forward)
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