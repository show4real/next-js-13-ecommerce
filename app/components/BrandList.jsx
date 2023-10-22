"use client";
import React, { useState, useEffect } from "react";
import { getAllBrands } from "app/services/productService";
import Link from "next/link";

export default function CategoryList({}) {
  const [allbrands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(100);

  useEffect(() => {
    fetchBrands();
  }, [search, rows]);

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
      <>
        {allbrands.map((brand, key) => (
          <div
            key={key}
            className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg  border-gray-100 bg-white shadow-md mt-20"
          >
            <div className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-sm">
              <Link href={`/categories/${brand.slug}`}>
                <img
                  className="peer absolute top-0 right-0 h-full w-full object-contain"
                  src={brand.image_url}
                  alt="brand image"
                />
              </Link>
            </div>
            <Link href={`/categories/${brand.slug}`}>
              <div className="mt-4 px-5 pb-2">
                <h5 className="text-sm tracking-tight text-slate-900">
                  {brand.name}
                </h5>
              </div>
            </Link>
          </div>
        ))}
      </>
    </>
  );
}
