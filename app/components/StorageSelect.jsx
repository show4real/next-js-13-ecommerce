import React from "react";
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

const StorageSelect = ({ storages, handleStorage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const storagesList = [
    "32GB SSD", "64GB SSD", "128GB SSD", "180GB SSD", "200GB SSD", "256GB SSD",
    "512GB SSD", "1TB SSD", "60GB HDD", "120GB HDD", "180GB HDD", "200GB HDD",
    "250GB HDD", "320GB HDD", "500GB HDD", "1TB HDD", "128GB SSHD", "256GB SSHD",
    "512GB SSHD", "1TB SSHD", "128GB SSD + HDD", "256GB SSD + HDD", "512GB SSD + HDD", "1TB SSD + HDD"
  ];

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

  const filtered = storagesList.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStorage = (storage) => {
    handleStorage(
      storages.includes(storage)
        ? storages.filter(s => s !== storage)
        : [...storages, storage]
    );
  };

  const removeStorage = (storage, e) => {
    e.stopPropagation();
    handleStorage(storages.filter(s => s !== storage));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    handleStorage([]);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[50px]"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex flex-wrap gap-1">
            {storages.length === 0 ? (
              <span className="text-gray-500 font-medium">Storage</span>
            ) : (
              <>
                {storages.slice(0, 2).map((storage) => (
                  <span key={storage} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white">
                    {storage}
                    <XMarkIcon className="h-3 w-3 cursor-pointer opacity-80 hover:opacity-100" onClick={(e) => removeStorage(storage, e)} />
                  </span>
                ))}
                {storages.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">+{storages.length - 2}</span>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {storages.length > 0 && (
              <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" onClick={clearAll} />
            )}
            <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search storage…"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-400 text-center">No results found</p>
            ) : (
              filtered.map((storage) => {
                const checked = storages.includes(storage);
                return (
                  <div
                    key={storage}
                    onClick={() => toggleStorage(storage)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-100 ${checked ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}>
                      {checked && <CheckIcon className="h-3 w-3 text-white stroke-[3]" />}
                    </div>
                    <span className={`text-sm select-none ${checked ? "font-semibold text-blue-800" : "text-gray-700"}`}>{storage}</span>
                  </div>
                );
              })
            )}
          </div>
          {storages.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="text-xs text-gray-500 font-medium">{storages.length} selected</span>
              <button type="button" onClick={() => handleStorage([])} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">Clear all</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StorageSelect;
