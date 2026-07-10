import { CreateProductDto } from "@/types/product.type";

export const products: CreateProductDto[] = [
  // ===================== مانتو و کت =====================

  {
    product_code: "MT1001",
    title: "مانتو کتی آوینا",
    slug: "manto-kati-avina",
    description:
      "مانتو کتی با پارچه کرپ درجه یک، مناسب استایل رسمی و روزمره با دوخت حرفه‌ای.",
    price: 3690000,
    discount: 10,
    stock: 12,
    thumbnail: "/images/products/manto-1.jpg",
    sizes: ["38", "40", "42", "44"],
    colors: ["مشکی", "کرم", "قهوه ای"],
    status: "active",
    is_best_seller: 1,
    category_id: 1,
  },

  {
    product_code: "MT1002",
    title: "مانتو لینن آترین",
    slug: "manto-linen-atrin",
    description:
      "مانتو لینن سبک و خنک، مناسب استفاده روزمره در فصل بهار و تابستان.",
    price: 2980000,
    discount: 0,
    stock: 18,
    thumbnail: "/images/products/manto-2.jpg",
    sizes: ["38", "40", "42"],
    colors: ["یشمی", "کرم"],
    status: "active",
    is_best_seller: 0,
    category_id: 1,
  },

  {
    product_code: "MT1003",
    title: "کت زنانه رز",
    slug: "kat-roz",
    description:
      "کت زنانه پارچه کرپ با طراحی مدرن، مناسب محیط کار و مهمانی.",
    price: 3350000,
    discount: 15,
    stock: 10,
    thumbnail: "/images/products/manto-3.jpg",
    sizes: ["38", "40", "42"],
    colors: ["مشکی", "سفید", "سرمه ای"],
    status: "active",
    is_best_seller: 1,
    category_id: 1,
  },

  {
    product_code: "MT1004",
    title: "مانتو کژوال نیلا",
    slug: "manto-nila",
    description:
      "مانتو کژوال با پارچه باکیفیت و طراحی راحت، مناسب استفاده روزانه.",
    price: 2750000,
    discount: 5,
    stock: 15,
    thumbnail: "/images/products/manto-4.jpg",
    sizes: ["38", "40", "42", "44"],
    colors: ["سرمه‌ای", "طوسی", "سفید", "مشکی"],
    status: "active",
    is_best_seller: 0,
    category_id: 1,
  },

  {
    product_code: "MT1005",
    title: "کت کوتاه الیزه",
    slug: "kat-elize",
    description:
      "کت کوتاه شیک با برش حرفه‌ای، مناسب استایل نیمه‌رسمی و رسمی.",
    price: 3950000,
    discount: 20,
    stock: 8,
    thumbnail: "/images/products/manto-5.jpg",
    sizes: ["38", "40", "42"],
    colors: ["کرم", "نسکافه‌ای"],
    status: "active",
    is_best_seller: 1,
    category_id: 1,
  },

  {
    product_code: "MT1006",
    title: "شومیز هانیسا",
    slug: "manto-mahoor",
    description:
      "مانتو کمربندی با پارچه مرغوب و ایستایی عالی، مناسب استفاده روزمره.",
    price: 3490000,
    discount: 0,
    stock: 14,
    thumbnail: "/images/products/manto-6.jpg",
    sizes: ["38", "40", "42", "44"],
    colors: ["مشکی", "سبز","کرم","زغالی"],
    status: "active",
    is_best_seller: 0,
    category_id: 1,
  },
  // ===================== کت و شلوار =====================

{
  product_code: "SU1001",
  title: "کت و شلوار النا",
  slug: "suit-elena",
  description:
    "کت و شلوار زنانه با پارچه کرپ، مناسب جلسات رسمی و استایل اداری.",
  price: 5990000,
  discount: 15,
  stock: 8,
  thumbnail: "/images/products/suit-1.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["مشکی", "کرم", "سرمه‌ای", "قهوه‌ای"],
  status: "active",
  is_best_seller: 1,
  category_id: 2,
},

{
  product_code: "SU1002",
  title: "وست و شلوار آدورا",
  slug: "suit-adora",
  description:
    "کت و شلوار رسمی با دوخت حرفه‌ای و ایستایی بسیار زیبا.",
  price: 6490000,
  discount: 10,
  stock: 7,
  thumbnail: "/images/products/suit-2.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["سرمه‌ای", "مشکی", "کرم"],
  status: "active",
  is_best_seller: 1,
  category_id: 2,
},

{
  product_code: "SU1003",
  title: "کراپ و دامن ویدا",
  slug: "suit-vida",
  description:
    "کت و شلوار زنانه مناسب محیط کار و استفاده روزمره.",
  price: 5450000,
  discount: 0,
  stock: 10,
  thumbnail: "/images/products/suit-3.jpg",
  sizes: ["38", "40", "42"],
  colors: ["طوسی", "مشکی", "سرمه‌ای", "قهوه‌ای"],
  status: "active",
  is_best_seller: 0,
  category_id: 2,
},

{
  product_code: "SU1004",
  title: "شومیز و شلوار نیکا",
  slug: "suit-nika",
  description:
    "کت و شلوار با طراحی مدرن و پارچه باکیفیت.",
  price: 6150000,
  discount: 20,
  stock: 6,
  thumbnail: "/images/products/suit-4.jpg",
  sizes: ["40", "42", "44"],
  colors: ["کرم", "مشکی", "سرمه‌ای", "نسکافه‌ای"],
  status: "active",
  is_best_seller: 1,
  category_id: 2,
},

{
  product_code: "SU1005",
  title: "ست سه تیکه آریسا",
  slug: "suit-arisa",
  description:
    "مدل کلاسیک با دوخت تمیز، مناسب استایل رسمی.",
  price: 5850000,
  discount: 5,
  stock: 9,
  thumbnail: "/images/products/suit-5.jpg",
  sizes: ["38", "40", "42"],
  colors: ["مشکی", "سرمه‌ای", "قهوه‌ای"],
  status: "active",
  is_best_seller: 0,
  category_id: 2,
},

{
  product_code: "SU1006",
  title: "کراپ و شلوار فلور",
  slug: "suit-flor",
  description:
    "کت و شلوار زنانه با پارچه کرپ درجه یک و طراحی خاص.",
  price: 6300000,
  discount: 10,
  stock: 6,
  thumbnail: "/images/products/suit-6.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["زغالی", "مشکی", "سرمه‌ای", "کرم"],
  status: "active",
  is_best_seller: 0,
  category_id: 2,
},// ===================== پالتو =====================

{
  product_code: "CO1001",
  title: "پالتو چرم مارال",
  slug: "palto-maral",
  description:
    "پالتو فوتر زنانه با دوخت حرفه‌ای، مناسب فصل پاییز و زمستان.",
  price: 7290000,
  discount: 10,
  stock: 8,
  thumbnail: "/images/products/coat-1.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["مشکی", "کرم", "قهوه‌ای", "نسکافه‌ای"],
  status: "active",
  is_best_seller: 1,
  category_id: 3,
},

{
  product_code: "CO1002",
  title: "کاپشن وینا",
  slug: "palto-vina",
  description:
    "پالتو کمربندی با پارچه فوتر مرغوب و طراحی کلاسیک.",
  price: 6950000,
  discount: 0,
  stock: 10,
  thumbnail: "/images/products/coat-2.jpg",
  sizes: ["38", "40", "42"],
  colors: ["شتری", "مشکی", "قهوه‌ای", "کرم"],
  status: "active",
  is_best_seller: 0,
  category_id: 3,
},

{
  product_code: "CO1003",
  title: "بارانی آرشال",
  slug: "palto-arshal",
  description:
    "پالتو یقه آرشال با ایستایی زیبا و مناسب استایل رسمی.",
  price: 7450000,
  discount: 15,
  stock: 6,
  thumbnail: "/images/products/coat-3.jpg",
  sizes: ["40", "42", "44"],
  colors: ["مشکی", "سرمه‌ای", "زغالی", "قهوه‌ای"],
  status: "active",
  is_best_seller: 1,
  category_id: 3,
},

{
  product_code: "CO1004",
  title: "بامبر جکت آریا",
  slug: "palto-ariya",
  description:
    "پالتو کلاسیک با طراحی مینیمال و پارچه باکیفیت.",
  price: 6890000,
  discount: 5,
  stock: 9,
  thumbnail: "/images/products/coat-4.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["زغالی", "مشکی", "سرمه‌ای", "نسکافه‌ای"],
  status: "active",
  is_best_seller: 0,
  category_id: 3,
},

// ===================== فرم اداری =====================

{
  product_code: "OF1001",
  title: "فرم اداری پرنس",
  slug: "office-prince",
  description:
    "فرم اداری زنانه با دوخت حرفه‌ای، مناسب شرکت‌ها و سازمان‌ها.",
  price: 4990000,
  discount: 10,
  stock: 12,
  thumbnail: "/images/products/uniform-1.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["سرمه‌ای", "مشکی", "طوسی"],
  status: "active",
  is_best_seller: 1,
  category_id: 4,
},

{
  product_code: "OF1002",
  title: "فرم اداری کلاسیک",
  slug: "office-classic",
  description:
    "فرم اداری ساده و شیک، مناسب استفاده روزانه.",
  price: 4750000,
  discount: 0,
  stock: 15,
  thumbnail: "/images/products/uniform-2.jpg",
  sizes: ["38", "40", "42"],
  colors: ["مشکی", "سرمه‌ای", "طوسی"],
  status: "active",
  is_best_seller: 0,
  category_id: 4,
},

{
  product_code: "OF1003",
  title: "فرم اداری آوا",
  slug: "office-ava",
  description:
    "فرم اداری با پارچه کرپ و دوخت دقیق، مناسب محیط‌های رسمی.",
  price: 5150000,
  discount: 5,
  stock: 10,
  thumbnail: "/images/products/uniform-3.jpg",
  sizes: ["38", "40", "42", "44"],
  colors: ["سرمه‌ای", "مشکی", "طوسی"],
  status: "active",
  is_best_seller: 0,
  category_id: 4,
},

{
  product_code: "OF1004",
  title: "فرم اداری الینا",
  slug: "office-elina",
  description:
    "فرم اداری با طراحی مدرن و پارچه باکیفیت، مناسب استایل رسمی.",
  price: 5390000,
  discount: 15,
  stock: 8,
  thumbnail: "/images/products/uniform-4.jpg",
  sizes: ["38", "40", "42"],
  colors: ["سرمه‌ای", "مشکی", "طوسی"],
  status: "active",
  is_best_seller: 1,
  category_id: 4,
}]