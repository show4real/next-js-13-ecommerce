"use client";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ProductGallery = ({ images = [] }) => {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    const track = trackRef.current;
    if (track) {
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    }
    setActive(clamped);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== active) setActive(i);
  };

  if (!images.length) {
    return <div className="skeleton aspect-square w-full rounded-2xl" />;
  }

  return (
    <div className="w-full">
      {/* Main image track (swipeable) */}
      <div className="group relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl bg-gray-50"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex aspect-square w-full flex-shrink-0 snap-center items-center justify-center p-4 sm:p-6"
            >
              <img
                src={img}
                alt={`Product image ${i + 1}`}
                className="max-h-full max-w-full object-contain"
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Arrows (desktop / hover) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-primary shadow-md backdrop-blur transition hover:bg-white disabled:opacity-0 sm:flex"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Next image"
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-primary shadow-md backdrop-blur transition hover:bg-white disabled:opacity-0 sm:flex"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter pill */}
        {images.length > 1 && (
          <div className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {active + 1} / {images.length}
          </div>
        )}

        {/* Dots (mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 sm:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-5 bg-primary" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail rail */}
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-gray-50 p-1 transition ${
                i === active
                  ? "border-primary ring-2 ring-primary/15"
                  : "border-gray-200 hover:border-primary-300"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
