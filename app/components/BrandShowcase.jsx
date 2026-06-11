import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

/**
 * "Shop by Brand" — a logo wall on the homepage. Uses official brand logos
 * served from the SimpleIcons CDN (brand-coloured SVGs), each linking to the
 * matching brand page on the store.
 *
 * Sony's brand colour is white, so it's overridden to a dark shade to stay
 * visible on the white cards.
 */
const BRANDS = [
  { name: "Apple", href: "/brands/apple-phone", logo: "https://cdn.simpleicons.org/apple" },
  { name: "Samsung", href: "/brands/samsung", logo: "https://cdn.simpleicons.org/samsung" },
  { name: "HP", href: "/brands/hp", logo: "https://cdn.simpleicons.org/hp" },
  { name: "Dell", href: "/brands/dell", logo: "https://cdn.simpleicons.org/dell" },
  { name: "Lenovo", href: "/brands/lenovo", logo: "https://cdn.simpleicons.org/lenovo" },
  { name: "Asus", href: "/brands/asus", logo: "https://cdn.simpleicons.org/asus" },
  { name: "Acer", href: "/brands/acer", logo: "https://cdn.simpleicons.org/acer" },
  { name: "MSI", href: "/brands/msi", logo: "https://cdn.simpleicons.org/msi" },
  { name: "Sony", href: "/brands/sony", logo: "https://cdn.simpleicons.org/sony/0A0A0A" },
  { name: "Toshiba", href: "/brands/toshiba", logo: "https://cdn.simpleicons.org/toshiba" },
];

export default function BrandShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mb-5 flex items-end justify-between">
        <div className="flex items-end gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
            Brands
          </h2>
          <span className="mb-1.5 h-1 w-12 rounded-full bg-accent" />
        </div>
        <Link
          href="/brands"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-accent transition hover:text-accent-700"
        >
          View all
          <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Logo grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            title={`Shop ${brand.name}`}
            className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card-hover sm:p-5"
          >
            <div className="flex h-10 w-full items-center justify-center sm:h-12">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                loading="lazy"
                className="max-h-9 w-auto max-w-[78%] object-contain opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-11"
              />
            </div>
            <span className="truncate text-center text-xs font-semibold text-gray-500 transition group-hover:text-primary">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
