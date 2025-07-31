// Updated ProductList component with filter persistence
"use client";
import {
  getProducts,
  getBrands,
  getCategories,
  getAllCats,
  getCategoryProducts,
  getLaptopProducts,
} from "../services/productService";
import React, { useState, useEffect } from "react";
import { Drawer, Pagination } from "antd";
import { 
  Bars3Icon, 
  ChevronDownIcon, 
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon 
} from "@heroicons/react/24/outline";
import ProductCard from "/app/components/ProductCard";
import CarouselHolder from "/app/products/CarouselHolder";
import PriceSelect from "/app/components/PriceSelect";
import CategorySelect from "/app/components/CategorySelect";
import BrandSelect from "/app/components/BrandSelect";
import StorageSelect from "/app/components/StorageSelect";
import RamSelect from "/app/components/RamSelect";
import ProcessorSelect from "/app/components/ProcessorSelect";
import SortSelect from "/app/components/SortSelect";
import SocialIconMenu from "/app/components/SocialIconMenu";
import ReferralBadge from "/app/components/ReferralBadge";
import CategorySlider from "app/categories/CategorySlider";
import Link from "next/link";
import { useFilterPersistence } from "/app/hooks/useFilterPersistence";

export default function ProductList({
  productSection,
  sale_type,
  brandslug,
  categoryslug,
  flash_sale,
}) {
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState(12);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [brands, setBrands] = useState([]);
  const [storages, setStorages] = useFilterPersistence('storages', []);
  const [processors, setProcessors] = useFilterPersistence('processors', []);
  const [rams, setRams] = useFilterPersistence('rams', []);
  const [categories, setCategories] = useState([]);
  const [sort, setSorting] = useFilterPersistence('sort', '');
  const [price, setPrice] = useFilterPersistence('price', [4000, 5000000]);
  const [search_all, setSearch] = useFilterPersistence('search', '');
  const [brand, setBrand] = useFilterPersistence('brand', '');
  const [category, setCategory] = useFilterPersistence('category', '');
  const [loading, setLoading] = useState(false);
  const [mobileFilter, setFilter] = useState(false);
  const [notice, setNotice] = useState(null);

  // ... rest of your existing functions (fetchProducts, fetchBrands, etc.)

  const AllFilter = () => {
    return (
      <div className="space-y-6">
        {categoryslug === "" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <CategorySelect
              categories={categories}
              category={category}
              handleCategory={setCategory}
            />
          </div>
        )}
        {brandslug === "" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <BrandSelect
              brands={brands}
              brand={brand}
              handleBrand={setBrand}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage
          </label>
          <StorageSelect storages={storages} handleStorage={setStorages} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RAM
          </label>
          <RamSelect rams={rams} handleRam={setRams} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Processor
          </label>
          <ProcessorSelect
            processors={processors}
            handleProcessor={setProcessors}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SocialIconMenu
          categoryslug=""
          brandslug=""
          flash_sale={flash_sale}
          notice={notice}
        />

        <div className="mt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {productSection}
          </h1>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  className="w-full px-4 py-3 pl-12 pr-16 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  placeholder="Search products..."
                  value={search_all}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Link
                  href={`/search/${search_all.toLowerCase().split(' ').join('-')}`}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Filter Controls */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setFilter(true)}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
              <div className="flex-1">
                <SortSelect sort={sort} handleSorting={setSorting} />
              </div>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <PriceSelect
                price={price}
                handlePrice={setPrice}
                fetchProducts={fetchProducts}
              />
            </div>
            <AllFilter />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <SortSelect sort={sort} handleSorting={setSorting} />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          <Drawer
            title={
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filter Products
              </div>
            }
            placement="left"
            width={360}
            onClose={() => setFilter(false)}
            open={mobileFilter}
            className="lg:hidden"
            closeIcon={<XMarkIcon className="h-5 w-5" />}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <PriceSelect
                  price={price}
                  handlePrice={setPrice}
                  fetchProducts={fetchProducts}
                />
              </div>
              <AllFilter />
            </div>
          </Drawer>

          {loading && <CarouselHolder />}

          {/* Products Grid */}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
            </div>
          )}

          {/* Pagination & Load More */}
          <div className="mt-12">
            {!loading && products.length > 0 && productSection === "Trending Products" && (
              <div className="text-center">
                <Link href="/products">
                  <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <span>Shop More</span>
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            )}

            {products.length > 0 && productSection !== "Trending Products" && (
              <div className="flex justify-center">
                <Pagination
                  total={total}
                  showTotal={(total) => `Total ${total} Products`}
                  onChange={onPage}
                  pageSize={rows}
                  current={page}
                  showSizeChanger={false}
                  className="custom-pagination"
                />
              </div>
            )}

            {!loading && products.length < 1 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          <div className="mt-16">
            <ReferralBadge />
          </div>
        </div>
      </div>
    </div>
  );
}