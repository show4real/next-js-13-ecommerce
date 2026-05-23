import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) searchRef.current.focus();
  }, [isOpen]);

  const filtered = processorsList.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (item) => {
    handleProcessor(
      processors.includes(item)
        ? processors.filter((p) => p !== item)
        : [...processors, item]
    );
  };

  const remove = (item, e) => {
    e.stopPropagation();
    handleProcessor(processors.filter((p) => p !== item));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    handleProcessor([]);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[50px]"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex flex-wrap gap-1">
            {processors.length === 0 ? (
              <span className="text-gray-500 font-medium">Processor</span>
            ) : (
              <>
                {processors.slice(0, 2).map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                    {p}
                    <XMarkIcon className="h-3 w-3 cursor-pointer hover:text-purple-900" onClick={(e) => remove(p, e)} />
                  </span>
                ))}
                {processors.length > 2 && (
                  <span className="text-xs text-gray-500 py-1">+{processors.length - 2} more</span>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {processors.length > 0 && (
              <XMarkIcon
                className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={clearAll}
              />
            )}
            <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search processor…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          {/* Options */}
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400 text-center">No results</p>
            ) : (
              filtered.map((item) => {
                const checked = processors.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => toggle(item)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-100 ${checked ? "bg-purple-50" : "hover:bg-gray-50"}`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${checked ? "bg-purple-600 border-purple-600" : "bg-white border-gray-300"}`}>
                      {checked && <CheckIcon className="h-3 w-3 text-white stroke-[3]" />}
                    </div>
                    <span className={`text-sm select-none ${checked ? "font-semibold text-purple-800" : "text-gray-700"}`}>{item}</span>
                  </div>
                );
              })
            )}
          </div>
          {/* Footer */}
          {processors.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="text-xs text-gray-500">{processors.length} selected</span>
              <button type="button" onClick={() => handleProcessor([])} className="text-xs text-red-500 hover:text-red-700 font-medium">Clear all</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessorSelect;
