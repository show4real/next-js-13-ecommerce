"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllCats } from "/app/services/productService";
import {
  ChevronRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PhoneIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const slides = [
  {
    eyebrow: "US / UK Used Laptops",
    title: "Premium Laptops at Unbeatable Prices",
    subtitle: "HP • Dell • Lenovo • MacBook — fairly used, fully tested.",
    cta: "Shop Laptops",
    href: "/laptops",
    gradient: "from-primary via-primary-500 to-primary-400",
  },
  {
    eyebrow: "Smartphones",
    title: "iPhones & Androids You'll Love",
    subtitle: "Apple, Samsung & more — clean devices, honest prices.",
    cta: "Shop Phones",
    href: "/brands/apple-phone",
    gradient: "from-[#1c1140] via-[#3a1d6e] to-accent-600",
  },
  {
    eyebrow: "Flash Sales",
    title: "Limited-Time Deals, Big Savings",
    subtitle: "Grab weekly flash offers before they're gone.",
    cta: "View Flash Sales",
    href: "/flash-sales",
    gradient: "from-accent-700 via-accent-600 to-accent-400",
  },
];

const trust = [
  { icon: TruckIcon, title: "Nationwide Delivery", desc: "Fast & reliable" },
  { icon: CreditCardIcon, title: "Pay on Delivery", desc: "Within Nigeria" },
  { icon: ShieldCheckIcon, title: "Tested & Trusted", desc: "100% as ordered" },
  { icon: PhoneIcon, title: "Support", desc: "Call us anytime" },
];

export default function HeroSection() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getAllCats()
      .then((res) => setCategories(res.categories || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-4">
        {/* Category rail (desktop) */}
        <aside className="col-span-3 hidden lg:block">
          <div className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
            <div className="bg-primary px-4 py-3 text-sm font-bold text-white">
              Browse Categories
            </div>
            <ul className="max-h-[330px] divide-y divide-gray-50 overflow-y-auto">
              {(categories.length ? categories : Array.from({ length: 8 })).map(
                (cat, i) =>
                  cat ? (
                    <li key={i}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="group flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition hover:bg-primary-50 hover:text-primary"
                      >
                        <span className="truncate">{cat.name}</span>
                        <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                  ) : (
                    <li key={i} className="px-4 py-2.5">
                      <div className="skeleton h-4 w-3/4 rounded" />
                    </li>
                  )
              )}
            </ul>
          </div>
        </aside>

        {/* Main banner carousel */}
        <div className="col-span-12 lg:col-span-6">
          <div className="relative h-[220px] overflow-hidden rounded-2xl shadow-card sm:h-[300px] lg:h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {/* decorative blobs */}
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

                {/* legibility scrim — keeps text readable on any gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

                <div className="relative flex h-full flex-col justify-center p-5 sm:p-8 lg:p-10">
                  <span className="mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur sm:text-xs">
                    <BoltIcon className="h-3.5 w-3.5" /> {slide.eyebrow}
                  </span>
                  <h2 className="max-w-md text-balance text-xl font-extrabold leading-snug text-white drop-shadow-sm sm:text-2xl lg:text-[26px] xl:text-[34px]">
                    {slide.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-balance text-xs font-medium text-white/95 drop-shadow-sm sm:text-sm lg:text-base">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.href}
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-primary shadow-lg transition hover:bg-accent hover:text-white sm:mt-5 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    {slide.cta}
                    <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}

            {/* dots */}
            <div className="absolute bottom-4 left-6 z-10 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Side promo cards */}
        <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1">
          <Link
            href="/black-friday"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-5 text-white shadow-card transition hover:shadow-card-hover"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/30 blur-xl" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-300">
              Mega Event
            </span>
            <p className="mt-1 text-lg font-bold leading-snug">Black Friday Deals</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:text-accent-300">
              Shop now <ChevronRightIcon className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href="/promo-sales"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent-200 bg-accent-50 p-5 text-primary shadow-card transition hover:shadow-card-hover"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/20 blur-xl" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-600">
              Save Big
            </span>
            <p className="mt-1 text-lg font-bold leading-snug">Promo Sales</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
              Grab offers <ChevronRightIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* Category chips (mobile) */}
      {categories.length > 0 && (
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition active:scale-95 hover:border-accent hover:text-accent"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Trust badges */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {trust.map((t) => (
          <div
            key={t.title}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-card"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
              <t.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-primary">{t.title}</p>
              <p className="truncate text-xs text-gray-500">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
