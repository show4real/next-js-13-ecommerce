import React, { useState } from "react";
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

const processorsList = [
  "Intel Atom","Intel Celeron","Intel Pentium","Intel Core i3","Intel Core i5",
  "Intel Core i7","Intel Core i9","Intel Core m3","Intel Core m5","Intel Core m7",
  "Intel Xeon","Apple Chip M1","Apple Chip M2","AMD A4","AMD A6","AMD A8",
  "AMD A10","AMD A12","AMD Ryzen 3","AMD Ryzen 5","AMD Ryzen 7","AMD Ryzen 9",
  "Samsung's Exynos","Qualcomm's snapdragon","Intel Core i3 1st Gen","Intel Core i3 2nd Gen",
  "Intel Core i3 3rd Gen","Intel Core i3 4th Gen","Intel Core i3 5th Gen","Intel Core i3 6th Gen",
  "Intel Core i3 7th Gen","Intel Core i3 8th Gen","Intel Core i3 10th Gen","Intel Core i3 11th Gen",
  "Intel Core i3 12th Gen","Intel Core i3 13th Gen","Intel Core i5 1st Gen","Intel Core i5 2nd Gen",
  "Intel Core i5 3rd Gen","Intel Core i5 4th Gen","Intel Core i5 5th Gen","Intel Core i5 6th Gen",
  "Intel Core i5 7th Gen","Intel Core i5 8th Gen","Intel Core i5 9th Gen","Intel Core i5 10th Gen",
  "Intel Core i5 11th Gen","Intel Core i5 12th Gen","Intel Core i5 13th Gen","Intel Core i7 1st Gen",
  "Intel Core i7 2nd Gen","Intel Core i7 3rd Gen","Intel Core i7 4th Gen","Intel Core i7 5th Gen",
  "Intel Core i7 6th Gen","Intel Core i7 7th Gen","Intel Core i7 8th Gen","Intel Core i7 9th Gen",
  "Intel Core i7 10th Gen","Intel Core i7 11th Gen","Intel Core i7 12th Gen","Intel Core i7 13th Gen",
  "Intel Core i9 8th Gen","Intel Core i9 9th Gen","Intel Core i9 10th Gen","Intel Core i9 13th Gen",
  "Intel Core 2 Duo","Intel Core 2 Quad","Intel Pentium Gold","Intel Pentium Silver",
  "Intel Pentium N-Series","Intel Atom Dual-Core","Intel Atom Quad-Core","Intel Atom Octa-Core",
  "AMD Athlon","AMD Athlon 64","AMD Athlon 64 X2","AMD Athlon Gold 3150U","AMD Athlon Silver 3050U",
  "AMD Ryzen 5 2nd Gen","AMD Ryzen 7","AMD Phenom","AMD FX","AMD A8 Quad-Core",
  "AMD A10 Quad-Core","AMD A6 Dual-Core","AMD A6 Quad-Core","Intel Core M3","Intel Core M5",
  "MediaTek MT8183","Microsoft SQ1","Microsoft SQ2","Not Specified",
];

const ProcessorSelect = ({ processors, handleProcessor }) => {
  const [search, setSearch] = useState("");

  const filtered = processorsList.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (item) =>
    handleProcessor(
      processors.includes(item)
        ? processors.filter((p) => p !== item)
        : [...processors, item]
    );

  return (
    <div className="w-full">
      <div className="relative mb-2">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search processor…"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-primary focus:bg-white"
        />
      </div>

      <ul className="no-scrollbar max-h-56 space-y-0.5 overflow-y-auto">
        {filtered.length === 0 ? (
          <li className="px-3 py-2 text-sm text-gray-400">No results</li>
        ) : (
          filtered.map((item) => {
            const checked = processors.includes(item);
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggle(item)}
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
                  <span className={`truncate ${checked ? "font-semibold" : ""}`}>{item}</span>
                </button>
              </li>
            );
          })
        )}
      </ul>

      {processors.length > 0 && (
        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="text-xs font-medium text-gray-500">{processors.length} selected</span>
          <button
            type="button"
            onClick={() => handleProcessor([])}
            className="text-xs font-semibold text-red-500 transition hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessorSelect;
