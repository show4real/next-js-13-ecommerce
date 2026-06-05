import React, { useState } from "react";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import ProductGlance from "./ProductGlance";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [productView, setProduct] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wished, setWished] = useState(false);

  const formatNumber = (number) =>
    number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

  const limitProductName = (str) => {
    const stringWithoutPipe = str.replace(/\|/g, "");
    const words = stringWithoutPipe.trim().split(/\s+/);
    const first12 = words.slice(0, 12).join(" ");
    return first12 + (words.length > 12 ? "..." : "");
  };

  const toggle = () => setProduct(!productView);

  const inStock = product.availability == 1;
  const hasDiscount = product.old_price && product.old_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;
  const vat = Math.round(product.price * 0.075);

  return (
    <>
      {productView && (
        <ProductGlance product={productView} toggle={toggle} show={true} />
      )}

      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-white shadow-sm">
              -{discountPct}%
            </span>
          )}
        </div>
        <span
          className={`absolute right-3 top-3 z-10 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Sold Out"}
        </span>

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          {product.image_hover && (
            <img
              className={`absolute inset-0 h-full w-full object-contain p-3 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              src={product.image_hover}
              alt={product.name}
              loading="lazy"
            />
          )}

          {/* Hover quick actions */}
          <div className="absolute right-3 top-12 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                setProduct(product);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-md transition hover:bg-primary hover:text-white"
              title="Quick view"
            >
              <EyeOutlined />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWished((w) => !w);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition ${
                wished
                  ? "bg-accent text-white"
                  : "bg-white text-primary hover:bg-accent hover:text-white"
              }`}
              title="Add to wishlist"
            >
              <HeartOutlined />
            </button>
          </div>
        </div>

        {/* Info */}
        <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-gray-800 transition-colors group-hover:text-primary">
              {limitProductName(product.name)}
            </h3>

            <div className="mt-auto">
              <div className="flex items-end gap-2">
                <span className="text-lg font-extrabold text-primary">
                  &#8358;{formatNumber(product.price)}
                </span>
                {hasDiscount && (
                  <span className="pb-0.5 text-xs text-gray-400 line-through">
                    &#8358;{formatNumber(product.old_price)}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[11px] text-gray-500">
                +VAT &#8358;{formatNumber(vat)} · Total &#8358;
                {formatNumber(product.price + vat)}
              </p>

              <button
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary-100 bg-primary-50 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-100 disabled:text-gray-400 sm:gap-2 sm:py-2.5 sm:text-sm"
                disabled={!inStock}
              >
                <EyeOutlined className="text-[13px] sm:text-sm" />
                {inStock ? "View Details" : "Sold Out"}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
