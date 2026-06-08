import React, { useState } from "react";
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

const storagesList = [
  // Phone / tablet flash storage
  "16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB",
  // Laptop / desktop drives
  "32GB SSD", "64GB SSD", "128GB SSD", "180GB SSD", "200GB SSD", "256GB SSD",
  "512GB SSD", "1TB SSD", "60GB HDD", "120GB HDD", "180GB HDD", "200GB HDD",
  "250GB HDD", "320GB HDD", "500GB HDD", "1TB HDD", "128GB SSHD", "256GB SSHD",
  "512GB SSHD", "1TB SSHD", "128GB SSD + HDD", "256GB SSD + HDD", "512GB SSD + HDD", "1TB SSD + HDD",
];

const StorageSelect = ({ storages, handleStorage }) => {
  const [search, setSearch] = useState("");

  const filtered = storagesList.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (storage) =>
    handleStorage(
      storages.includes(storage)
        ? storages.filter((s) => s !== storage)
        : [...storages, storage]
    );

  return (
    <div className="w-full">
      <div className="relative mb-2">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search storage…"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-primary focus:bg-white"
        />
      </div>

      <ul className="no-scrollbar max-h-56 space-y-0.5 overflow-y-auto">
        {filtered.length === 0 ? (
          <li className="px-3 py-2 text-sm text-gray-400">No results</li>
        ) : (
          filtered.map((storage) => {
            const checked = storages.includes(storage);
            return (
              <li key={storage}>
                <button
                  type="button"
                  onClick={() => toggle(storage)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                    checked ? "text-primary" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition ${
                      checked ? "border-primary bg-primary" : "border-gray-300 bg-white"
                    }`}
                  >
                    {checked && <CheckIcon className="h-3 w-3 stroke-[3] text-white" />}
                  </span>
                  <span className={`truncate ${checked ? "font-semibold" : ""}`}>{storage}</span>
                </button>
              </li>
            );
          })
        )}
      </ul>

      {storages.length > 0 && (
        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="text-xs font-medium text-gray-500">{storages.length} selected</span>
          <button
            type="button"
            onClick={() => handleStorage([])}
            className="text-xs font-semibold text-red-500 transition hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default StorageSelect;
