"use client";
import React, { useState, useEffect } from "react";
import { getCategories } from "../services/productService";
import CarouselHolder from "../products/CarouselHolder";
import ProductCard from "app/components/ProductCard";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Category = ({}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [youtube, setYoutube] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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

  const CategoryViewAllButton = ({ category }) => (
    <Link
      href={`/categories/${category.slug}`}
      className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-accent hover:shadow-md"
    >
      View all {category.name}
      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
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
            Explore Our Collections
          </h2>
          <p className="mt-1.5 max-w-xl text-gray-600">
            Handpicked gadgets across every category — find your perfect match.
          </p>
        </div>
        <Link
          href="/categories"
          className="group hidden items-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:border-accent hover:text-accent sm:inline-flex"
        >
          View all categories
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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

      {/* Active category products */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-card sm:p-6">
        {active.products.length > 0 ? (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {active.products.map((product, productKey) => (
                <ProductCard product={product} key={productKey} />
              ))}
            </div>
            <div className="border-t border-gray-100 pt-6 text-center">
              <CategoryViewAllButton category={active} />
            </div>
          </>
        ) : (
          <EmptyState categoryName={active.name} />
        )}
      </div>

      {/* YouTube */}
      {youtube && (
        <div className="mt-8">
          <YouTubeChannel />
        </div>
      )}
    </div>
  );
};

export default Category;
