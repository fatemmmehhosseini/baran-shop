"use client";

import Image from "next/image";
import Link from "next/link";


const categories = [
  {
    title: "مانتو و کت",
    image: "/images/categories/coat.png",
    href: "/products/manteau-coat",
  },
  {
    title: "کت شلوار",
    image: "/images/categories/outfit.png",
    href: "/products/suit",
  },
  {
    title:  "پالتو و کاپشن",
    image: "/images/categories/raincoat.png",
    href: "/products/coat",
  },
  {
    title: "فرم اداری",
    image: "/images/categories/official-set.png",
    href: "/products/office-uniform",
  },
];



export default function CategorySection() {
  return (
    <section className="py-16">

      <div className="mx-auto max-w-5xl">

        <div className="grid grid-cols-2 gap-y-10 gap-x-8 lg:grid-cols-4 lg:gap-x-10 px-10">

          {categories.map((item) => (

            <Link
              href={item.href}
              key={item.title}
              className="group flex flex-col items-center"
            >

              <div
                className="
                  flex
                  flex-col
                  h-full
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  py-6
                  transition-colors
                  duration-300
                  bg-light/5
                  group-hover:border
                  group-hover:border-light/30
                  group-hover:bg-light/20
                  group-hover:shadow-lg
                "
              >

                <div
                  className="
                    relative
                    h-25
                    w-25
                    overflow-hidden
                    rounded-xl
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                      object-cover
        
                    "
                  />
                </div>

                  <h3
                className="
                  mt-5
                  text-lg
                  font-medium
                  transition-colors
                  duration-300
                  group-hover:text-primary
                "
              >
                {item.title}
              </h3>


              </div>

            
            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

// import Image from "next/image";
// import Link from "next/link";

// const CATEGORIES = [
//   { name: "کت", href: "/products?category=manteau", image: "/images/coat.png" },
//   { name: "فرم اداری", href: "/products?category=uniform", image: "/images/official-set.png" },
//   { name: "کاپشن", href: "/products?category=coat", image: "/images/raincoat.png" },
//   { name: "کت و شلوار", href: "/products?category=accessories", image: "/images/outfit.png" },
// ];

// export default function CategoryCircles() {
//   return (
//     <section className="py-10">
//       {/* narrower than the other full-width sections */}
//       <div className="mx-auto max-w-5xl px-4">
//         <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-5">
//           {CATEGORIES.map((cat) => (
//             <Link
//               key={cat.href}
//               href={cat.href}
//               className="group flex flex-col items-center gap-3"
//             >
//               {/* outer circle: background turns green on hover */}
//               <div className="flex flex-col h-full w-full items-center justify-center rounded-xl bg-surface transition-colors duration-300 group-hover:bg-light/30 sm:h-28 sm:w-28">
//                 {/* inner circle: the actual photo, clipped round */}
//                 <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full ring-1 ring-black/5 sm:h-20 sm:w-20">
//                   <Image
//                     src={cat.image}
//                     alt={cat.name}
//                     fill
//                     sizes="112px"
//                     className="object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-[var(--color-text)] transition-colors group-hover:text-emerald-600">
//                     {cat.name}
//                 </span>
//               </div>

              
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }