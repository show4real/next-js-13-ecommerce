"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MagnifyingGlassIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getQuickSearch } from "/app/services/productService";

// Same slug rule the navbar/search route use, so a typed query maps cleanly to
// /search/<slug> (e.g. "Core i7 MacBook 16GB RAM" -> core-i7-macbook-16gb-ram).
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const formatNumber = (number) =>
  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

// Example natural-language spec queries shown as one-tap chips.
const EXAMPLES = [
  "Core i7 MacBook 16GB RAM",
  "HP Core i5 512GB SSD",
  "iPhone 13 128GB",
  "Lenovo gaming laptop",
  "Dell 8GB RAM",
  "Samsung Android phone",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  const go = (text) => {
    const slug = slugify(text);
    if (slug) {
      setOpen(false);
      router.push(`/search/${slug}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    go(query);
  };

  const clearSearch = () => {
    setQuery("");
    setProducts([]);
    setOpen(false);
  };

  // Debounced live search — mirrors SearchSuggestion's getQuickSearch usage.
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const debounce = setTimeout(() => {
      getQuickSearch({ search_all: query }).then(
        (res) => {
          setProducts(res.products || []);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          console.error("Search error:", error);
        }
      );
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  // Close the dropdown when clicking outside the search section.
  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const showDropdown = open && query.trim().length > 0;

  return (
    <section className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl p-5 shadow-card sm:p-7">
        {/* Decorative background layer — clipped so it doesn't bleed past the card,
            kept separate so the search dropdown can overflow the card freely. */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-500 to-accent-600">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 text-white/90">
            <SparklesIcon className="h-5 w-5 text-accent-200" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Smart Search
            </span>
          </div>
          <h2 className="mt-2 text-balance text-lg font-extrabold text-white sm:text-2xl">
            Describe what you want — we&apos;ll find it
          </h2>
          <p className="mt-1 text-sm text-white/80">
            Search by Brand, Processor, RAM or Storage in plain words.
          </p>

          <form onSubmit={onSubmit} className="relative mt-4" ref={containerRef}>
            <div className="flex items-stretch overflow-hidden rounded-xl bg-white shadow-lg">
              <span className="pointer-events-none flex items-center pl-4 text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                placeholder="e.g. Core i7 MacBook 16GB RAM"
                aria-label="Search products by description"
                enterKeyHint="search"
                className="w-full bg-transparent px-3 py-3.5 text-base text-gray-800 placeholder-gray-400 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="flex shrink-0 items-center px-4 text-gray-400 transition hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Live results dropdown */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
                {loading ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-gray-500">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
                    Searching…
                  </div>
                ) : products.length > 0 ? (
                  <>
                    <ul className="max-h-80 overflow-y-auto py-2">
                      {products.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setOpen(false)}
                            className="group flex items-start gap-3 px-3 py-3 transition hover:bg-gray-50 active:bg-gray-100"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:h-12 sm:w-12">
                              <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              {/* Full title wraps to 2 lines on mobile instead of truncating */}
                              <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-900 group-hover:text-primary">
                                {product.name}
                              </p>
                              <p className="mt-0.5 truncate text-xs text-gray-500">
                                {product.category || "Electronics"}
                              </p>
                              {/* Price + stock sit under the title so the title gets full width */}
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">
                                  &#8358;{formatNumber(product.price)}
                                </span>
                                {product.old_price &&
                                  product.old_price > product.price && (
                                    <span className="text-xs text-gray-400 line-through">
                                      &#8358;{formatNumber(product.old_price)}
                                    </span>
                                  )}
                                <span
                                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                    product.availability
                                      ? "bg-green-50 text-green-600"
                                      : "bg-red-50 text-red-500"
                                  }`}
                                >
                                  {product.availability ? "In Stock" : "Sold Out"}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/search/${slugify(query)}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-1 border-t border-gray-100 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-gray-50"
                    >
                      View all results for &quot;{query}&quot;
                    </Link>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">
                    No results found for &quot;{query}&quot;.
                  </div>
                )}
              </div>
            )}
          </form>

          <div className="mt-3 flex items-center gap-2">
            <span className="shrink-0 text-xs font-semibold text-white/70">Try:</span>
            <div className="-mr-5 flex gap-2 overflow-x-auto pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => go(ex)}
                  className="shrink-0 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
