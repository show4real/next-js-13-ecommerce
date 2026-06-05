"use client";
import { getOtherSales } from "../services/productService";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "app/components/ProductCard";
import CarouselHolder from "./CarouselHolder";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const SALE_META = {
  "promo sales": { href: "/promo-sales", emoji: "🏷️", tint: "from-accent-500 to-accent-600" },
  "black friday": { href: "/black-friday", emoji: "🛍️", tint: "from-primary to-primary-500" },
  "mid year sales": { href: "/mid-year-sales", emoji: "☀️", tint: "from-primary-500 to-accent-500" },
  "flash sales": { href: "/flash-sales", emoji: "⚡", tint: "from-accent-600 to-accent-400" },
};

export default function ProductSaleType({ sale_type }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const meta = SALE_META[sale_type?.toLowerCase()] || {
    href: "/products",
    emoji: "✨",
    tint: "from-primary to-primary-500",
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getOtherSales({ sale_type });
      setProducts(res.products);
      setTimeout(() => setLoading(false), 800);
    } catch (error) {
      setLoading(false);
    }
  };

  if (!loading && products.length < 1) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
        {/* Header band */}
        <div
          className={`flex items-center justify-between bg-gradient-to-r ${meta.tint} px-5 py-3.5`}
        >
          <h2 className="flex items-center gap-2 text-lg font-bold capitalize text-white sm:text-xl">
            <span className="text-2xl leading-none">{meta.emoji}</span>
            {sale_type}
          </h2>
          <Link
            href={meta.href}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
          >
            See all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="p-4 sm:p-5">
          {loading ? (
            <CarouselHolder />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.slice(0, 8).map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
