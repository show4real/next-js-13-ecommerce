"use client";
import { getOtherSales } from "../services/productService";
import React, { useState, useEffect } from "react";

// import ProductCard from "../components/ProductCard";
import ProductCard from "app/components/ProductCard";
import CarouselHolder from "./CarouselHolder";

export default function ProductSaleType({ sale_type }) {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await getOtherSales({ sale_type });
      setProducts(res.products);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    products.length > 0 && (
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-2">
        <h2 className="text-2xl font-medium capitalize leading-4 tracking-tight text-gray-900 mt-8 ">
          {sale_type}
        </h2>

        {loading && <CarouselHolder />}

        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!loading &&
            products.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          {!loading && products.length < 1 && (
            <div className="text-gray-200 font-md p-16 justify-center">
              <i className="fa fa-ban" style={{ marginRight: 5 }} />
              No Products found
            </div>
          )}
        </div>
      </div>
    )
  );
}
