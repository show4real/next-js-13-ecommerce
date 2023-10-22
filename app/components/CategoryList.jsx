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

  const fetchCategories = async () => {
    setLoading(true);
    await getAllCategories({ search, rows }).then(
      (res) => {
        setCategories(res.categories.data);
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
    <>
      {allcategories.map((category) => (
        <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg  border-gray-100 bg-white shadow-md mt-20">
          <div className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-sm">
            <Link href={`/categories/${category.slug}`}>
              <img
                className="peer absolute top-0 right-0 h-full w-full object-contain"
                src={category.image_url}
                alt="category image"
              />
            </Link>
          </div>
          <Link href={`/categories/${category.slug}`}>
            <div className="mt-4 px-5 pb-2">
              <h5 className="text-sm tracking-tight text-slate-900">
                {category.name}
              </h5>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
