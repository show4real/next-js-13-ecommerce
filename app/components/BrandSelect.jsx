import React, { useState } from "react";
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

const BrandSelect = ({ brand, brands, handleBrand }) => {
  const [search, setSearch] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const Row = ({ active, label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
        active
          ? "bg-primary-50 font-semibold text-primary"
          : "text-gray-600 hover:bg-gray-50 hover:text-primary"
      }`}
    >
      <span className="truncate">{label}</span>
      {active && <CheckIcon className="h-4 w-4 shrink-0 text-primary" />}
    </button>
  );

  return (
    <div className="w-full">
      {brands.length > 6 && (
        <div className="relative mb-2">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand…"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-primary focus:bg-white"
          />
        </div>
      )}
      <ul className="no-scrollbar max-h-56 space-y-0.5 overflow-y-auto">
        <li>
          <Row active={!brand} label="All Brands" onClick={() => handleBrand("")} />
        </li>
        {filtered.length === 0 ? (
          <li className="px-3 py-2 text-sm text-gray-400">No results</li>
        ) : (
          filtered.map((b) => (
            <li key={b.id}>
              <Row
                active={brand === b.id}
                label={b.name}
                onClick={() => handleBrand(brand === b.id ? "" : b.id)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BrandSelect;
