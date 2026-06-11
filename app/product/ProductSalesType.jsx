"use client";
import { getOtherSales } from "../services/productService";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ProductCard from "app/components/ProductCard";
import CarouselHolder from "./CarouselHolder";

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const SaleProductCard = ({ product }) => {
  const formatNumber = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const limitName = (str) => {
    const words = str.replace(/\|/g, "").trim().split(/\s+/);
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };
  const discount = product.old_price && product.old_price > product.price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : null;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
        {/* Flash badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
            <FireIcon />
            FLASH
          </span>
        </div>

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-amber-400 text-gray-900 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold">
              -{discount}%
            </span>
          </div>
        )}

        {/* Image */}
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {limitName(product.name)}
          </h3>

          <div className="mt-auto space-y-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-gray-900">
                &#8358;{formatNumber(product.price)}
              </span>
              {product.old_price && product.old_price > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  &#8358;{formatNumber(product.old_price)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500">
              VAT: &#8358;{formatNumber(Math.round(product.price * 0.075))} &nbsp;|&nbsp; Total: &#8358;{formatNumber(Math.round(product.price * 1.075))}
            </p>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.availability ? "bg-green-500" : "bg-red-400"}`} />
              <span className={`text-[10px] font-medium ${product.availability ? "text-green-600" : "text-red-500"}`}>
                {product.availability ? "In Stock" : "Sold Out"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function ProductSaleType({ sale_type }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getOtherSales({ sale_type });
      setProducts(res.products);
    } catch (error) {}
    setLoading(false);
  };

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const isFlashSale = sale_type?.toLowerCase().includes("flash");

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-[112px] lg:mt-[172px]">
      {/* Header */}
      <div className={`rounded-2xl p-4 sm:p-6 mb-6 ${isFlashSale ? "bg-gradient-to-r from-red-600 via-rose-500 to-pink-500" : "bg-gradient-to-r from-blue-600 to-indigo-600"}`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <span className="text-white">
                <FireIcon />
              </span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white capitalize tracking-tight">
                {sale_type}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                {isFlashSale ? "⚡ Limited time deals — grab them before they're gone!" : "Exclusive offers just for you"}
              </p>
            </div>
          </div>

          {isFlashSale && (
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              <ClockIcon />
              <span>Ends Soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-2xl" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products — mobile scroll snap, desktop grid */}
      {!loading && products.length > 0 && (
        <>
          {/* Mobile: horizontal scroll */}
          <div className="relative sm:hidden">
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-3 scroll-smooth"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {products.map((product, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[72vw] max-w-[260px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <SaleProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Scroll hint fade */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-white/80 to-transparent rounded-r-2xl" />

            {/* Scroll buttons */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => scroll("left")}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shadow hover:shadow-md text-gray-600 hover:text-gray-900 transition-all"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shadow hover:shadow-md text-gray-600 hover:text-gray-900 transition-all"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <SaleProductCard key={i} product={product} />
            ))}
          </div>
        </>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FireIcon />
          <p className="mt-3 text-sm">No products available right now. Check back soon!</p>
        </div>
      )}
    </section>
  );
}
