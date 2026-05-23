import React from "react";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

const BrandSelect = ({ brand, brands, handleBrand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) searchRef.current.focus();
  }, [isOpen]);

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedBrand = brands.find(b => b.id === brand);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[50px] flex items-center justify-between"
      >
        <span className={`block truncate text-sm ${!selectedBrand ? 'text-gray-500 font-medium' : 'text-gray-900 font-medium'}`}>
          {selectedBrand ? selectedBrand.name : 'Brand'}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {brand && (
            <XMarkIcon
              className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors"
              onClick={(e) => { e.stopPropagation(); handleBrand(''); }}
            />
          )}
          <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brand…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto">
            <div
              className={`cursor-pointer px-4 py-2.5 text-sm transition-colors duration-100 ${!brand ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => { handleBrand(''); setIsOpen(false); setSearch(""); }}
            >
              All Brands
            </div>
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400 text-center">No results</p>
            ) : (
              filtered.map((b, index) => (
                <div
                  key={index}
                  className={`cursor-pointer px-4 py-2.5 text-sm transition-colors duration-100 ${brand === b.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-blue-50'}`}
                  onClick={() => { handleBrand(b.id); setIsOpen(false); setSearch(""); }}
                >
                  {b.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandSelect;