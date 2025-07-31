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
    const newRams = rams.includes(ram)
      ? rams.filter(r => r !== ram)
      : [...rams, ram];
    handleRam(newRams);
  };

  const removeRam = (ram) => {
    handleRam(rams.filter(r => r !== ram));
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[50px]"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {rams.length === 0 ? (
              <span className="text-gray-500 font-medium">RAM</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {rams.slice(0, 3).map((ram) => (
                  <span
                    key={ram}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
                  >
                    {ram}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRam(ram);
                      }}
                      className="ml-1 h-3 w-3 text-green-600 hover:text-green-800"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {rams.length > 3 && (
                  <span className="text-xs text-gray-500 py-1">
                    +{rams.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-xl border border-gray-200 overflow-auto">
          {ramsList.map((ram) => (
            <label
              key={ram}
              className="flex items-center px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors duration-150"
            >
              <input
                type="checkbox"
                checked={rams.includes(ram)}
                onChange={() => toggleRam(ram)}
                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <span className="ml-3 text-gray-900">{ram}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RamSelect;