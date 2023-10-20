"use client";
import React, { useState, useEffect } from "react";
import { getAllBrands, getAllCategories } from "app/services/productService";
import Link from "next/link";

export default function CategoryList({ section }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(100);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [search, rows]);

  const fetchCategories = () => {
    setLoading(true);
    getAllCategories({ search, rows }).then(
      (res) => {
        setCategories(res.categories.data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const fetchBrands = () => {
    setLoading(true);
    getAllBrands({ search, rows }).then(
      (res) => {
        setBrands(res.brands.data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900 capitalize mt-5 md:mt-0 lg:mt-0 xl:mt-0">
            {section}
          </h2>
          {section == "categories" && (
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {categories.map((category) => (
                <div key={category.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-6 pb-5 text-sm text-gray-500">
                    <Link href={`categories/${category.slug}`}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  {/* <p className="text-base font-semibold text-gray-900">
                  {category.description}
                </p> */}
                </div>
              ))}
            </div>
          )}
          {section == "brands" && (
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {brands.map((brand) => (
                <div key={brand.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={brand.image_url}
                      alt={brand.name}
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-6 pb-5 text-sm text-gray-500">
                    <Link href={`categories/${brand.slug}`}>
                      <span className="absolute inset-0" />
                      {brand.name}
                    </Link>
                  </h3>
                  {/* <p className="text-base font-semibold text-gray-900">
                  {brand.description}
                </p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
