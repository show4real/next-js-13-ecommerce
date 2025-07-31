// hooks/useFilterPersistence.js


// components/CategorySelect.js
import React from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

const CategorySelect = ({ category, categories, handleCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategory = categories.find(cat => cat.id === category);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[50px] flex items-center justify-between"
      >
        <span className={`block truncate ${!selectedCategory ? 'text-gray-500 font-medium' : 'text-gray-900'}`}>
          {selectedCategory ? selectedCategory.name : 'Category'}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-xl border border-gray-200 overflow-auto">
          <div
            className="cursor-pointer px-4 py-3 text-gray-900 hover:bg-blue-50 transition-colors duration-150"
            onClick={() => {
              handleCategory('');
              setIsOpen(false);
            }}
          >
            All Categories
          </div>
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`cursor-pointer px-4 py-3 text-gray-900 hover:bg-blue-50 transition-colors duration-150 ${
                category === cat.id ? 'bg-blue-100 font-medium' : ''
              }`}
              onClick={() => {
                handleCategory(cat.id);
                setIsOpen(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;

// components/BrandSelect.js


// components/StorageSelect.js


// components/RamSelect.js


