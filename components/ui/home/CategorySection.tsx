
import Image from "next/image";
import Link from "next/link";


const categories = [
  {
    title: "مانتو و کت",
    image: "/images/categories/manteau-coat.webp",
    href: "/products/manteau-coat",
  },
  {
    title: "کت شلوار",
    image: "/images/categories/suit.webp",
    href: "/products/suit",
  },
  {
    title:  "پالتو و کاپشن",
    image: "/images/categories/coat.webp",
    href: "/products/coat",
  },
  {
    title: "فرم اداری",
    image: "/images/categories/office-uniform.webp",
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
                  group-hover:border-light/20
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
                    rounded-full
                  "
                >
                  <Image
                    src={item.image}
                    alt=""
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

