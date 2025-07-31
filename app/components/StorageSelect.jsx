import React from "react";
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

const StorageSelect = ({ storages, handleStorage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleStorage = (storage) => {
    const newStorages = storages.includes(storage)
      ? storages.filter(s => s !== storage)
      : [...storages, storage];
    handleStorage(newStorages);
  };

  const removeStorage = (storage) => {
    handleStorage(storages.filter(s => s !== storage));
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
            {storages.length === 0 ? (
              <span className="text-gray-500 font-medium">Storage</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {storages.slice(0, 2).map((storage) => (
                  <span
                    key={storage}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {storage}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStorage(storage);
                      }}
                      className="ml-1 h-3 w-3 text-blue-600 hover:text-blue-800"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {storages.length > 2 && (
                  <span className="text-xs text-gray-500 py-1">
                    +{storages.length - 2} more
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
          {storagesList.map((storage) => (
            <label
              key={storage}
              className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
            >
              <input
                type="checkbox"
                checked={storages.includes(storage)}
                onChange={() => toggleStorage(storage)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-900">{storage}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorageSelect;