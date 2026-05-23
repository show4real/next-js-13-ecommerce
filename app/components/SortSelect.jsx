import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

const options = [
  { value: "", label: "All" },
  { value: "availability", label: "Availability" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
  { value: "low-price", label: "Price: Low → High" },
  { value: "high-price", label: "Price: High → Low" },
  { value: "date-asc", label: "Date: Oldest First" },
  { value: "date-desc", label: "Date: Newest First" },
];

const SortSelect = ({ sort, handleSorting }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === sort);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[50px] flex items-center justify-between"
      >
        <span className={selected?.value ? "text-gray-900 font-medium" : "text-gray-500 font-medium"}>
          {selected?.label || "Sort By"}
        </span>
        <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { handleSorting(opt.value); setIsOpen(false); }}
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors duration-100 ${
                sort === opt.value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{opt.label}</span>
              {sort === opt.value && <CheckIcon className="h-4 w-4 text-blue-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortSelect;
