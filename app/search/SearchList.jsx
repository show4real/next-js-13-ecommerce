"use client";
import {
  getSearchProducts,
  getBrands,
  getCategories,
  getAllCats,
  getCategoryProducts,
  getAllSearchProducts,
} from "../services/productService";
import React, { useState, useEffect, useMemo } from "react";
import { Button, Drawer, Space, Row, Pagination, Slider, Checkbox, Radio, Card } from "antd";
import { MenuUnfoldOutlined, DownOutlined, FilterOutlined, CloseOutlined } from "@ant-design/icons";
import ProductCard from "/app/components/ProductCard";
import CarouselHolder from "/app/products/CarouselHolder";
import PriceSelect from "/app/components/PriceSelect";
import SearchSelect from "/app/components/SearchSelect";
import StorageSelect from "/app/components/StorageSelect";
import BrandSelect from "/app/components/BrandSelect";
import CategorySelect from "/app/components/CategorySelect";
import RamSelect from "/app/components/RamSelect";
import ProcessorSelect from "/app/components/ProcessorSelect";
import SortSelect from "/app/components/SortSelect";
import SocialIconMenu from "/app/components/SocialIconMenu";
import Link from "next/link";
import { sort } from "fast-sort";
import { Select } from "antd";

const { Option } = Select;

export default function SearchList({ search }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [rows, setRows] = useState(100);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [brands, setBrands] = useState([]);
  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort_value, setSorting] = useState("availability");
  const [price, setPrice] = useState([4000, 5000000]);
  const [search_all, setSearch] = useState(search.trim());

  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [priceRange, setPriceRange] = useState([4000, 5000000]);
  const [sortBy, setSortBy] = useState(null);

  // Mock data for filters (since we're not connecting to backend)
  const mockCategories = [
    { id: 1, name: "Laptop UltraBook", count: 45 },
    { id: 2, name: "Laptop GAMING", count: 23 },
    { id: 3, name: "Laptop Convertible / Detachable", count: 18 },
    { id: 4, name: "Desktop", count: 67 },
    { id: 5, name: "Phone Iphone", count: 67 },
    { id: 6, name: "Phone Global", count: 67 },
    { id: 7, name: "Phone Samsung", count: 67 },
    { id: 8, name: "Accessories", count: 34 }
  ];

  const mockRamOptions = [
    { value: "4GB", count: 12 },
    { value: "8GB", count: 28 },
    { value: "16GB", count: 35 },
    { value: "32GB", count: 18 },
    { value: "64GB", count: 7 }
  ];

  const mockProcessors = [
    { value: "Intel Core i3", count: 15 },
    { value: "Intel Core i5", count: 32 },
    { value: "Intel Core i7", count: 28 },
    { value: "Intel Core i9", count: 12 },
    { value: "AMD Ryzen 5", count: 22 },
    { value: "AMD Ryzen 7", count: 18 },
    { value: "AMD Ryzen 9", count: 8 },
    { value:"Apple Chip M1", count:0},
    { value:"Apple Chip M2", count:0},
  ];

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories, selectedRam, selectedProcessors, priceRange, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllSearchProducts({
        search_all,
      });
      setProducts(res.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchBrands = () => {
    setLoading(true);
    getBrands().then(
      (res) => {
        setBrands(res.brands);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const fetchCategories = () => {
    setLoading(true);
    getAllCats().then(
      (res) => {
        setCategories(res.categories);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Apply RAM filter
    if (selectedRam.length > 0) {
      filtered = filtered.filter(product => 
        selectedRam.includes(product.ram)
      );
    }

    // Apply processor filter
    if (selectedProcessors.length > 0) {
      filtered = filtered.filter(product => 
        selectedProcessors.includes(product.processor)
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered = sort(filtered).asc(p => p.price);
        break;
      case "price-high":
        filtered = sort(filtered).desc(p => p.price);
        break;
      case "name":
        filtered = sort(filtered).asc(p => p.name);
        break;
      case "newest":
        filtered = sort(filtered).desc(p => new Date(p.created_at));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setTotal(filtered.length);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRam([]);
    setSelectedProcessors([]);
    setPriceRange([4000, 5000000]);
    setSortBy("name");
  };

  const FilterSidebar = () => (
    <div className="w-full">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button 
          type="text" 
          size="small" 
          onClick={clearAllFilters}
          className="text-blue-600 hover:text-blue-800"
        >
          Clear All
        </Button>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category.name]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category.name));
                  }
                }}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 flex-1">{category.name}</span>
              {/* <span className="text-xs text-gray-500">({category.count})</span> */}
            </label>
          ))}
        </div>
      </div>

      {/* RAM Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">RAM</h4>
        <div className="space-y-2">
          {mockRamOptions.map((ram) => (
            <label key={ram.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox
                checked={selectedRam.includes(ram.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRam([...selectedRam, ram.value]);
                  } else {
                    setSelectedRam(selectedRam.filter(r => r !== ram.value));
                  }
                }}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 flex-1">{ram.value}</span>
              {/* <span className="text-xs text-gray-500">({ram.count})</span> */}
            </label>
          ))}
        </div>
      </div>

      {/* Processor Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Processor</h4>
        <div className="space-y-2">
          {mockProcessors.map((processor) => (
            <label key={processor.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <Checkbox
                checked={selectedProcessors.includes(processor.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProcessors([...selectedProcessors, processor.value]);
                  } else {
                    setSelectedProcessors(selectedProcessors.filter(p => p !== processor.value));
                  }
                }}
                className="mr-3"
              />
              <span className="text-sm text-gray-700 flex-1">{processor.value}</span>
              {/* <span className="text-xs text-gray-500">({processor.count})</span> */}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={10000000}
            step={1000}
            value={priceRange}
            onChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen" style={{marginTop:100}}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for {search}
          </h1>
          <p className="text-gray-600">
            {loading ? "Loading..." : `${total} products found`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6 shadow-sm">
              <FilterSidebar />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6 lg:justify-end">
              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden"
              >
                Filters
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-40"
                  size="large"
                >
                  <Option value="newest">Newest First</Option>
                  <Option value="name">Name A-Z</Option>
                  <Option value="price-low">Price: Low to High</Option>
                  <Option value="price-high">Price: High to Low</Option>
                  
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategories.length > 0 || selectedRam.length > 0 || selectedProcessors.length > 0) && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">Active filters:</span>
                  
                  {selectedCategories.map(category => (
                    <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {category}
                      <CloseOutlined 
                        className="ml-1 cursor-pointer" 
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                      />
                    </span>
                  ))}
                  
                  {selectedRam.map(ram => (
                    <span key={ram} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {ram}
                      <CloseOutlined 
                        className="ml-1 cursor-pointer" 
                        onClick={() => setSelectedRam(selectedRam.filter(r => r !== ram))}
                      />
                    </span>
                  ))}
                  
                  {selectedProcessors.map(processor => (
                    <span key={processor} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {processor}
                      <CloseOutlined 
                        className="ml-1 cursor-pointer" 
                        onClick={() => setSelectedProcessors(selectedProcessors.filter(p => p !== processor))}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid - Updated for mobile two columns */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {!loading &&
                filteredProducts.map((product, key) => (
                  <div key={key} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">
                  <i className="fa fa-search" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button type="primary" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

           
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          title="Filters"
          placement="left"
          onClose={() => setMobileFiltersOpen(false)}
          open={mobileFiltersOpen}
          width={300}
          className="lg:hidden"
        >
          <FilterSidebar />
        </Drawer>
      </div>
    </div>
  );
}