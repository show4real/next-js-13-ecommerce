import React, { useState } from "react";
import { EyeOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import {
  CpuChipIcon,
  Square3Stack3DIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import ProductGlance from "./ProductGlance";
import Link from "next/link";
import { hasNewPrice, getEffectivePrice, getStrikePrice } from "/app/lib/price";

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

  // Treat empty / "null" string values as absent
  const isPresent = (v) =>
    v !== null &&
    v !== undefined &&
    String(v).trim() !== "" &&
    String(v).trim().toLowerCase() !== "null";

  const inStock = product.availability == 1;
  // Two-price model: when a new (sale) price is set, it's the price shown and
  // the normal price is struck through; otherwise only the normal price shows.
  const effectivePrice = getEffectivePrice(product);
  const strikePrice = getStrikePrice(product);
  const hasDiscount = hasNewPrice(product);
  const discountPct = hasDiscount
    ? Math.round(((strikePrice - effectivePrice) / strikePrice) * 100)
    : 0;

  // Headline label above the title (brand · type) — adds context without clutter
  const brandName = product.brand?.name;
  const eyebrow = [brandName, product.product_type].filter(isPresent).join(" · ");

  // Key specs shown as calm chips, each with a matching icon. They live in a
  // single horizontally-scrollable row so they never wrap into long rows.
  const specChips = [
    { icon: CpuChipIcon, value: product.processor },
    { icon: Square3Stack3DIcon, value: product.ram && `${product.ram} RAM` },
    { icon: CircleStackIcon, value: product.storage },
    { icon: ComputerDesktopIcon, value: product.display_size && `${product.display_size}"` },
  ].filter((chip) => isPresent(chip.value));

  return (
    <>
      {productView && (
        <ProductGlance product={productView} toggle={toggle} show={true} />
      )}

      <Link
        href={`/products/${product.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1.5 hover:border-primary-100 hover:shadow-card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="pointer-events-none absolute left-3.5 top-3.5 z-10 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent to-accent-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm shadow-accent/30">
              -{discountPct}%
            </span>
          )}
          {isPresent(product.condition) && (
            <span className="inline-flex w-fit items-center rounded-full border border-primary-100 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary backdrop-blur-sm">
              {product.condition}
            </span>
          )}
        </div>

        <span
          className={`absolute right-3.5 top-3.5 z-10 hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm sm:inline-flex ${
            inStock
              ? "bg-emerald-50/90 text-emerald-700"
              : "bg-red-50/90 text-red-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              inStock ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          {inStock ? "In Stock" : "Sold Out"}
        </span>

        {/* Image */}
        <div className="relative mx-2 mt-2 aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-b from-slate-100/80 to-slate-200/60">
          <img
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          {product.image_hover && (
            <img
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              src={product.image_hover}
              alt={product.name}
              loading="lazy"
            />
          )}

          {/* Hover quick actions */}
          <div className="absolute right-3.5 top-14 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                setProduct(product);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-white"
              title="Quick view"
            >
              <EyeOutlined />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWished((w) => !w);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition ${
                wished
                  ? "bg-accent text-white"
                  : "bg-white/95 text-primary hover:bg-accent hover:text-white"
              }`}
              title="Add to wishlist"
            >
              {wished ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2 p-4 sm:p-4">
            {/* Mobile: product type + stock status on a single row */}
            <div className="flex items-center justify-between gap-2 sm:hidden">
              <span className="truncate text-[11px] font-bold uppercase tracking-wider text-accent">
                {eyebrow || product.product_type}
              </span>
              <span
                className={`inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold ${
                  inStock ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    inStock ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {inStock ? "In Stock" : "Sold Out"}
              </span>
            </div>

            {/* Desktop: brand · type eyebrow */}
            {eyebrow && (
              <span className="hidden text-[11px] font-bold uppercase tracking-wider text-accent sm:inline-block">
                {eyebrow}
              </span>
            )}

            <h3 className="line-clamp-3 min-h-[2.5rem] text-[13px] font-semibold leading-snug text-gray-800 transition-colors group-hover:text-primary group-hover:underline group-hover:underline-offset-2 sm:line-clamp-2 sm:text-sm">
              {limitProductName(product.name)}
            </h3>

            {/* Spec chips — single scrollable row, no wrapping into long rows */}
            {specChips.length > 0 && (
              <div className="-mx-1 mt-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-0">
                {specChips.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md bg-primary-50/70 px-2 py-1 text-[11px] font-semibold text-primary-500 sm:text-[10px]"
                  >
                    <spec.icon className="h-3.5 w-3.5 shrink-0 text-primary/60 sm:h-3 sm:w-3" />
                    <span>{spec.value}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-1">
              <div className="flex flex-wrap items-end gap-x-2 gap-y-0.5">
                <span className="text-base font-extrabold text-primary sm:text-lg">
                  &#8358;{formatNumber(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="pb-0.5 text-sm text-gray-400 line-through sm:text-xs">
                    &#8358;{formatNumber(strikePrice)}
                  </span>
                )}
              </div>

              {/* <button
                className="group/btn mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-500 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-300 hover:from-accent hover:to-accent-500 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:bg-none disabled:text-gray-400 disabled:shadow-none sm:py-3 sm:text-sm"
                disabled={!inStock}
              >
                <span>{inStock ? "View Details" : "Sold Out"}</span>
                {inStock && (
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 sm:h-4 sm:w-4" />
                )}
              </button> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
