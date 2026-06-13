"use client";
import { useEffect, useRef, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { TESTIMONIALS, TESTIMONIALS_SUMMARY } from "/app/lib/testimonials";
import useAutoScroll from "../hooks/useAutoScroll";

// Public link to the store's Google reviews. Override via env if you have the
// exact "write a review" / profile URL; otherwise we deep-link a Google search.
const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://www.google.com/search?q=Hayzee+Computer+Resources+Ibadan&utm_source=chatgpt.com#lrd=0x103cfce4d889034f:0xed71829771ace1d5,1,,,,";

const Stars = ({ rating = 5, className = "h-4 w-4" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon
        key={i}
        className={`${className} ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
      />
    ))}
  </div>
);

const initials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Testimonials() {
  // Start with curated testimonials; swap in live Google reviews if available.
  const [reviews, setReviews] = useState(TESTIMONIALS);
  const [summary, setSummary] = useState(TESTIMONIALS_SUMMARY);
  const [source, setSource] = useState("seed");
  const trackRef = useRef(null);

  // Scroll the slider by roughly one card (plus gap) in either direction.
  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("figure");
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.9;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Auto-advance the reviews rail; re-arms when live reviews replace the seed.
  useAutoScroll(trackRef, { cardSelector: "figure", interval: 5000 }, [
    reviews.length,
  ]);

  useEffect(() => {
    let active = true;
    fetch("/api/google-reviews")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data?.configured && Array.isArray(data.reviews) && data.reviews.length) {
          setReviews(data.reviews);
          setSource("google");
          if (data.rating && data.total) {
            setSummary({ rating: data.rating, total: data.total });
          }
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-end gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
              What Our Customers Say
            </h2>
            <span className="mb-1.5 h-1 w-12 rounded-full bg-accent" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <Stars rating={summary.rating} className="h-5 w-5" />
            <span className="text-lg font-extrabold text-primary">
              {Number(summary.rating).toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              from {summary.total?.toLocaleString?.() || summary.total}+ happy customers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary-300 hover:text-primary"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary-300 hover:text-primary"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover"
          >
            <GoogleG className="h-7 w-7 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-gray-900">
                  {Number(summary.rating).toFixed(1)}
                </span>
                <Stars rating={summary.rating} className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-medium text-gray-500">
                Read {summary.total?.toLocaleString?.() || summary.total}+ reviews on Google
              </span>
            </span>
            <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-primary" />
          </a>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <figure
            key={`${r.author}-${i}`}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-card transition hover:shadow-card-hover sm:w-[360px]"
          >
            <div className="flex items-center gap-3">
              {r.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.photo}
                  alt={r.author}
                  className="h-11 w-11 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary">
                  {initials(r.author)}
                </span>
              )}
              <div className="min-w-0">
                <figcaption className="truncate text-sm font-bold text-gray-900">
                  {r.author}
                </figcaption>
                <p className="truncate text-xs text-gray-400">
                  {r.location ? `${r.location} • ` : ""}
                  {r.time}
                </p>
              </div>
              <GoogleG className="ml-auto h-5 w-5" />
            </div>

            <Stars rating={r.rating} className="mt-4 h-4 w-4" />

            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
              “{r.text}”
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

// Inline multicolour Google "G" so we don't pull in an icon dependency.
function GoogleG({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 24 44c11 0 20-8 20-20 0-1.3-.1-2.5-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C39.9 35.6 44 30.4 44 24c0-1.3-.1-2.5-.4-3.5z" />
    </svg>
  );
}
