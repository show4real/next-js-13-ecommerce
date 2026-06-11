import React, { useState, useEffect } from "react";

const PRESETS = [
  { label: "Under ₦50K",     range: [4000, 50000] },
  { label: "₦50K – ₦150K",   range: [50000, 150000] },
  { label: "₦150K – ₦300K",  range: [150000, 300000] },
  { label: "₦300K – ₦500K",  range: [300000, 500000] },
  { label: "₦500K+",          range: [500000, 5000000] },
];

const fmt = (v) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(v);

const PriceSelect = ({ price, handlePrice, fetchProducts }) => {
  const [minInput, setMinInput] = useState(price[0]);
  const [maxInput, setMaxInput] = useState(price[1]);

  // Keep inputs in sync when price is changed elsewhere (e.g. a preset or reset)
  useEffect(() => {
    setMinInput(price[0]);
    setMaxInput(price[1]);
  }, [price]);

  const isPresetActive = (range) =>
    price[0] === range[0] && price[1] === range[1];

  const applyPreset = (range) => {
    handlePrice(range);
    // Optional: parents that don't refetch on price change can pass fetchProducts
    fetchProducts?.();
  };

  const applyCustom = () => {
    const min = Math.max(0, parseInt(minInput) || 0);
    const max = Math.max(min, parseInt(maxInput) || 5000000);
    handlePrice([min, max]);
    fetchProducts?.();
  };

  return (
    <div className="w-full space-y-4">
      {/* Current selection */}
      <div className="flex items-center justify-between rounded-lg bg-primary-50 px-3 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-400">
          Selected
        </span>
        <span className="text-xs font-bold text-primary">
          {fmt(price[0])} – {fmt(price[1])}
        </span>
      </div>

      {/* Preset list — quick-select price ranges, low to high */}
      <div className="flex flex-col gap-2">
        {PRESETS.map((p) => {
          const active = isPresetActive(p.range);
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p.range)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm font-bold transition-all duration-150 ${
                active
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-800 hover:border-primary hover:text-primary"
              }`}
            >
              <span>{p.label}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  active ? "bg-white" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-[11px] font-medium text-gray-400">custom range</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Min / Max inputs side by side */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">₦</span>
          <input
            type="number"
            min={0}
            max={5000000}
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            placeholder="Min"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-6 pr-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <span className="text-gray-300">—</span>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">₦</span>
          <input
            type="number"
            min={0}
            max={5000000}
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            placeholder="Max"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-6 pr-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={applyCustom}
        className="w-full rounded-lg bg-accent py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 active:scale-[0.98]"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceSelect;
