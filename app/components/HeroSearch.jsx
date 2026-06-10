"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

// Same slug rule the navbar/search route use, so a typed query maps cleanly to
// /search/<slug> (e.g. "Core i7 MacBook 16GB RAM" -> core-i7-macbook-16gb-ram).
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

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
  const router = useRouter();

  const go = (text) => {
    const slug = slugify(text);
    if (slug) router.push(`/search/${slug}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    go(query);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-500 to-accent-600 p-5 shadow-card sm:p-7">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

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
            Search by brand, processor, RAM or storage in plain words.
          </p>

          <form onSubmit={onSubmit} className="mt-4">
            <div className="flex items-stretch overflow-hidden rounded-xl bg-white shadow-lg">
              <span className="pointer-events-none flex items-center pl-4 text-gray-400">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Core i7 MacBook 16GB RAM"
                aria-label="Search products by description"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none sm:text-base"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent px-5 text-sm font-bold text-white transition hover:bg-accent-600 sm:px-7"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-white/70">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => go(ex)}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
