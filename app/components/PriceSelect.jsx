import React, { useState } from "react";

const PRESETS = [
  { label: "Under ₦50K",    range: [4000, 50000] },
  { label: "₦50K – ₦150K", range: [50000, 150000] },
  { label: "₦150K – ₦300K",range: [150000, 300000] },
  { label: "₦300K – ₦500K",range: [300000, 500000] },
  { label: "₦500K+",        range: [500000, 5000000] },
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

  const isPresetActive = (range) =>
    price[0] === range[0] && price[1] === range[1];

  const applyPreset = (range) => {
    setMinInput(range[0]);
    setMaxInput(range[1]);
    handlePrice(range);
    fetchProducts();
  };

  const applyCustom = () => {
    const min = Math.max(0, parseInt(minInput) || 0);
    const max = Math.max(min, parseInt(maxInput) || 5000000);
    handlePrice([min, max]);
    fetchProducts();
  };

  return (
    <div className="w-full space-y-4">
      {/* Active range banner */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <span className="text-xs font-medium text-blue-500 uppercase tracking-wide">Price Range</span>
        <span className="text-sm font-bold text-blue-800">
          {fmt(price[0])} – {fmt(price[1])}
        </span>
      </div>

      {/* Preset chips */}
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.range)}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-150 text-center ${
              isPresetActive(p.range)
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">or enter custom</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Custom min / max inputs — stacked for more room */}
      <div className="space-y-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₦</span>
          <input
            type="number"
            min={0}
            max={5000000}
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            placeholder="Minimum price"
            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 hover:border-gray-300 transition-colors duration-150"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₦</span>
          <input
            type="number"
            min={0}
            max={5000000}
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            placeholder="Maximum price"
            className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 hover:border-gray-300 transition-colors duration-150"
          />
        </div>
        <button
          type="button"
          onClick={applyCustom}
          className="w-full py-3 bg-blue-950 hover:bg-blue-800 active:bg-blue-950 text-white text-sm font-semibold rounded-xl transition-colors duration-150 shadow-sm"
        >
          Apply Price Filter
        </button>
      </div>
    </div>
  );
};

export default PriceSelect;
