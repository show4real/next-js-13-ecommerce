"use client";
import React, { useState, useEffect } from "react";
import { getAllBrands, getAllCategories } from "app/services/productService";
import Link from "next/link";

export default function CategoryList({ section }) {
  const [allcategories, setCategories] = useState([]);
  const [allbrands, setBrands] = useState([]);
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
            <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {console.log(allcategories)}
              {allcategories.map((category, key) => (
                <Link href={`/${category.slug}`}>
                  <div
                    key={key}
                    className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg  border-gray-100 bg-white shadow-md"
                  >
                    <div className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-sm">
                      <Link href={`/${category.slug}`}>
                        {" "}
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="peer absolute top-0 right-0 h-full w-full object-contain"
                        />
                      </Link>
                    </div>
                    <h3 className="mt-6 pb-5 text-sm text-gray-500 pl-4">
                      <span className="absolute inset-0" />
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
