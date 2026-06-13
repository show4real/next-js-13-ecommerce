"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useAutoScroll from "../hooks/useAutoScroll";

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
  const trackRef = useRef(null);

  // Scroll the slider by roughly one logo card (plus gap) in either direction.
  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("a");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Auto-advance the logo wall; pauses on hover/touch.
  useAutoScroll(trackRef, { cardSelector: "a", interval: 5000 });

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
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous brands"
              onClick={() => scrollByCard(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-accent-200 hover:text-accent"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next brands"
              onClick={() => scrollByCard(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-accent-200 hover:text-accent"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
          <Link
            href="/brands"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-accent transition hover:text-accent-700"
          >
            View all
            <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Single-row logo slider */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scroll-smooth sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            title={`Shop ${brand.name}`}
            className="group flex w-[33%] shrink-0 snap-start flex-col items-center justify-center gap-2.5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-card-hover sm:w-[18%] sm:p-5"
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
