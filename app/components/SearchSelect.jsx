import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SearchSelect = ({ search_all, handleSearch, fetchProducts, filteredSuggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const convertToSlug = (text) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      fetchProducts();
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    handleSearch({ target: { value: "" } });
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full mb-3 pt-4" ref={containerRef}>
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products…"
          value={search_all}
          onChange={(e) => {
            handleSearch(e);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-20 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {search_all && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => { setShowSuggestions(false); fetchProducts(); }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors duration-150"
          >
            Go
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && search_all && filteredSuggestions?.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-64 overflow-y-auto">
          {filteredSuggestions.map((item) => (
            <li key={item}>
              <Link
                href={`../search/${convertToSlug(item)}`}
                onClick={() => setShowSuggestions(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-100"
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 shrink-0" />
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
