"use client";
import React, { useState, useEffect } from "react";
import { getAllCategories } from "app/services/productService";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllCategories({ search: "", rows: 100 })
      .then((res) => {
        if (!mounted) return;
        setCategories(res?.categories?.data || []);
        setLoading(false);
      })
      .catch(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card"
          >
            <div className="skeleton aspect-square w-full" />
            <div className="p-4">
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="py-16 text-center">
        <div className="mb-3 text-5xl">📦</div>
        <h3 className="text-lg font-semibold text-gray-900">No categories yet</h3>
        <p className="text-gray-500">Please check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {categories.map((category, key) => (
        <Link
          key={key}
          href={`/categories/${category.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-card-hover"
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <img
              src={category.image_url}
              alt={category.name}
              loading="lazy"
              className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Label */}
          <div className="flex items-center justify-between gap-2 border-t border-gray-50 px-4 py-3.5">
            <h3 className="line-clamp-1 text-sm font-semibold text-gray-800 transition-colors group-hover:text-primary">
              {category.name}
            </h3>
            <ArrowRightIcon className="h-4 w-4 flex-shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
        </Link>
      ))}
    </div>
  );
}
