import React from "react";
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

const RamSelect = ({ rams, handleRam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const ramsList = [
    "2GB", "4GB", "6GB", "8GB", "12GB", "16GB", "24GB", "32GB",
    "64GB", "128GB", "256GB", "512GB", "1TB"
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

  const toggleRam = (ram) => {
    handleRam(
      rams.includes(ram) ? rams.filter(r => r !== ram) : [...rams, ram]
    );
  };

  const removeRam = (ram, e) => {
    e.stopPropagation();
    handleRam(rams.filter(r => r !== ram));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    handleRam([]);
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
            {rams.length === 0 ? (
              <span className="text-gray-500 font-medium">RAM</span>
            ) : (
              <>
                {rams.slice(0, 3).map((ram) => (
                  <span key={ram} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-green-600 text-white">
                    {ram}
                    <XMarkIcon className="h-3 w-3 cursor-pointer opacity-80 hover:opacity-100" onClick={(e) => removeRam(ram, e)} />
                  </span>
                ))}
                {rams.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">+{rams.length - 3}</span>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {rams.length > 0 && (
              <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" onClick={clearAll} />
            )}
            <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
          {/* Chip grid — all RAM options visible at once */}
          <div className="p-3">
            <div className="grid grid-cols-3 gap-2">
              {ramsList.map((ram) => {
                const active = rams.includes(ram);
                return (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => toggleRam(ram)}
                    className={`py-2.5 rounded-xl text-xs font-bold border-2 text-center transition-all duration-150 ${
                      active
                        ? "bg-green-600 border-green-600 text-white shadow-sm shadow-green-200"
                        : "bg-white border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50"
                    }`}
                  >
                    {ram}
                  </button>
                );
              })}
            </div>
          </div>
          {rams.length > 0 && (
            <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="text-xs text-gray-500 font-medium">{rams.length} selected</span>
              <button type="button" onClick={() => handleRam([])} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">Clear all</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RamSelect;
