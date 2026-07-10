import localFont from "next/font/local";


export const iranYekan = localFont({
  src: [
    {
      path: "./fonts/IRANYekanX-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IRANYekanX-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
   display: "swap",
});