"use client";
import React, { useState, useEffect, useRef } from "react";
import { getCategories } from "../services/productService";
import CarouselHolder from "../products/CarouselHolder";
import ProductCard from "app/components/ProductCard";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Category = ({}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [youtube, setYoutube] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const trackRef = useRef(null);

  // Scroll the product slider by roughly one card (plus gap) in either direction.
  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-slide]");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    getCategories({})
      .then((res) => {
        setCategories(res.categories);
        setYoutube(res.youtube);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching categories:", error);
      });
  };

  const YouTubeChannel = () => (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
        <PlayIcon className="h-6 w-6 text-white" />
        <h3 className="text-xl font-semibold text-white">Featured Video</h3>
      </div>
      <div className="relative h-0 pb-[56.25%]">
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtube}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );

  const EmptyState = ({ categoryName }) => (
    <div className="py-16 text-center">
      <div className="mb-4 text-6xl">📦</div>
      <h3 className="mb-2 text-xl font-medium text-gray-900">No Products Available</h3>
      <p className="text-gray-500">
        We are working on adding products to the {categoryName} category
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <CarouselHolder />
          <CarouselHolder />
        </div>
      </div>
    );
  }

  if (!categories.length) return null;

  const active = categories[activeTab] || categories[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
            Shop Smarter, Pay Less
          </h2>
          <p className="mt-1.5 max-w-xl text-gray-600">
            Quality US/UK-used laptops, phones &amp; gadgets — tested, trusted and
            ready to ship. Browse by category and grab a deal today.
          </p>
        </div>

        <Link
          href={`/categories/${active.slug}`}
          className="group inline-flex items-center justify-center gap-1.5 self-start whitespace-nowrap rounded-full border border-primary/30 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          View more {active.name}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {/* Category pills — swipeable on mobile, wraps on desktop */}
      <div className="no-scrollbar -mx-4 mb-6 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((category, key) => {
          const isActive = key === activeTab;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Active category products — single-row slider with side arrows */}
      <div className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-card sm:p-6">
        {active.products.length > 0 ? (
          <>
            {/* Left / right navigation icons */}
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => scrollByCard(-1)}
              className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:border-primary-300 hover:text-primary sm:flex"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => scrollByCard(1)}
              className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition hover:border-primary-300 hover:text-primary sm:flex"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>

            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 scroll-smooth lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {active.products.map((product, productKey) => (
                <div
                  key={productKey}
                  data-slide
                  className="w-[52%] shrink-0 snap-start sm:w-[48%] md:w-[31%] lg:w-[23%]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState categoryName={active.name} />
        )}
      </div>

      {/* YouTube */}
      {/* {youtube && (
        <div className="mt-8">
          <YouTubeChannel />
        </div>
      )} */}
    </div>
  );
};

export default Category;
