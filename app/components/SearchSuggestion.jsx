import React, { useState, useEffect } from "react";
import { getQuickSearch } from "/app/services/productService";
import { Slider, Select, InputNumber, Button } from "antd";
import Link from "next/link";
import SearchSelect from "/app/components/SearchSelect";
import { sort } from "fast-sort";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
const { Option } = Select;

const SearchSuggestion = ({ onCloseSearch }) => {
  const [search_all, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const formatNumber = (number) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return 0;
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(query);
    setSearch(query);
  };

  const clearSearch = () => {
    setSearch("");
    setProducts([]);
  };

  useEffect(() => {
    if (search_all.trim()) {
      const debounceTimer = setTimeout(() => {
        fetchProducts();
      }, 300); // Debounce search by 300ms
      
      return () => clearTimeout(debounceTimer);
    } else {
      setProducts([]);
    }
  }, [search_all]);

  const fetchProducts = () => {
    setLoading(true);
    getQuickSearch({ search_all }).then(
      (res) => {
        setProducts(res.products);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.error("Search error:", error);
      }
    );
  };

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
      {/* Search Input Section - Fixed at top */}
      <div className="flex-shrink-0 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={search_all}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500"
            autoFocus
          />
          {search_all && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Search Stats */}
        {search_all && (
          <div className="mt-3 text-xs text-gray-500">
            {loading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500 mr-2"></div>
                Searching...
              </span>
            ) : (
              <span>
                {products.length > 0 ? `${products.length} results found` : search_all.trim() ? 'No results found' : ''}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Section - Scrollable */}
      <div className="flex-1 overflow-hidden">
        {search_all.trim() === "" ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Type in the search box above to find products, brands, and categories
            </p>
          </div>
        ) : loading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-500 text-sm">Searching for {search_all}...</p>
          </div>
        ) : products.length > 0 ? (
          // Results list
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="px-1 py-4">
                <ul role="list" className="space-y-3">
                  {sort(products)
                    .desc((item) => item.availability == 1)
                    .map((product, index) => (
                      <li key={product.id} className="group">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={onCloseSearch}
                          className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                        >
                          {/* Product Image */}
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                              loading="lazy"
                            />
                            {/* Stock Badge */}
                            <div className="absolute -top-1 -right-1">
                              <span className={`
                                text-white text-xs font-medium px-1.5 py-0.5 rounded-full text-center min-w-[3rem]
                                ${product.availability 
                                  ? 'bg-green-500' 
                                  : 'bg-red-500'
                                }
                              `}>
                                {product.availability ? 'In Stock' : 'Sold Out'}
                              </span>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="ml-4 flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  {product.category || 'Electronics'}
                                </p>
                              </div>
                              <div className="ml-4 flex-shrink-0 text-right">
                                <p className="text-sm font-semibold text-gray-900">
                                  &#8358;{formatNumber(product.price)}
                                </p>
                                {product.old_price && product.old_price > product.price && (
                                  <p className="text-xs text-gray-400 line-through">
                                    &#8358;{formatNumber(product.old_price)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* View All Results Button - Fixed at bottom */}
            <div className="flex-shrink-0 sticky bottom-0 bg-white border-t border-gray-100 p-4">
              <Link
                href={`/search/${convertToSlug(search_all)}`}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                onClick={onCloseSearch}
              >
                <span>View All Results</span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          // No results state
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-4">
              We could not find any products matching {search_all}. Try adjusting your search terms.
            </p>
            <button
              onClick={clearSearch}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSuggestion;