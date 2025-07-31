"use client";
import {
  getProducts,
  getBrands,
  getCategories,
  getAllCats,
  getCategoryProducts,
  getLaptopProducts,
} from "../services/productService";
import React, { useState, useEffect, useRef } from "react";
import { Button, Drawer, Space, Pagination, Slider, Select } from "antd";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";
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
import ReferralBadge from "/app/components/ReferralBadge";
import CategorySlider from "app/categories/CategorySlider";
import './styles.css';

const { Option } = Select;

// Simple state persistence using a global object (survives navigation)
const globalState = {};

const createStateKey = (productSection, categoryslug, brandslug) => 
  `${productSection || 'default'}_${categoryslug || 'none'}_${brandslug || 'none'}`;

const saveState = (key, value, productSection, categoryslug, brandslug) => {
  const stateKey = createStateKey(productSection, categoryslug, brandslug);
  if (!globalState[stateKey]) {
    globalState[stateKey] = {};
  }
  globalState[stateKey][key] = value;
};

const loadState = (key, defaultValue, productSection, categoryslug, brandslug) => {
  const stateKey = createStateKey(productSection, categoryslug, brandslug);
  if (globalState[stateKey] && globalState[stateKey][key] !== undefined) {
    return globalState[stateKey][key];
  }
  return defaultValue;
};

export default function ProductList({
  productSection,
  sale_type,
  brandslug = "",
  categoryslug = "",
  flash_sale,
}) {
  // Load initial state from global storage
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState(() => loadState('rows', 12, productSection, categoryslug, brandslug));
  const [page, setPage] = useState(() => loadState('page', 1, productSection, categoryslug, brandslug));
  const [total, setTotal] = useState(1);

  const [brands, setBrands] = useState([]);
  const [storages, setStorages] = useState(() => loadState('storages', [], productSection, categoryslug, brandslug));
  const [processors, setProcessors] = useState(() => loadState('processors', [], productSection, categoryslug, brandslug));
  const [rams, setRams] = useState(() => loadState('rams', [], productSection, categoryslug, brandslug));
  const [categories, setCategories] = useState([]);

  const [sort, setSorting] = useState(() => loadState('sort', 'availability', productSection, categoryslug, brandslug));
  const [price, setPrice] = useState(() => loadState('price', [4000, 5000000], productSection, categoryslug, brandslug));
  const [search_all, setSearch] = useState(() => loadState('search', "", productSection, categoryslug, brandslug));
  const [brand, setBrand] = useState(() => loadState('brand', "", productSection, categoryslug, brandslug));
  const [category, setCategory] = useState(() => loadState('category', null, productSection, categoryslug, brandslug));

  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [mobileFilter, setFilter] = useState(false);
  const [notice, setNotice] = useState(null);

  const isInitialMount = useRef(true);

  // Effect to save state whenever it changes
  useEffect(() => {
    if (!isInitialMount.current) {
      saveState('rows', rows, productSection, categoryslug, brandslug);
      saveState('page', page, productSection, categoryslug, brandslug);
      saveState('storages', storages, productSection, categoryslug, brandslug);
      saveState('processors', processors, productSection, categoryslug, brandslug);
      saveState('rams', rams, productSection, categoryslug, brandslug);
      saveState('sort', sort, productSection, categoryslug, brandslug);
      saveState('price', price, productSection, categoryslug, brandslug);
      saveState('search', search_all, productSection, categoryslug, brandslug);
      saveState('brand', brand, productSection, categoryslug, brandslug);
      saveState('category', category, productSection, categoryslug, brandslug);
    }
  }, [rows, page, storages, processors, rams, sort, price, search_all, brand, category, productSection, categoryslug, brandslug]);

  useEffect(() => {
    isInitialMount.current = false;
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, [brand, rams, sort, storages, processors, category, rows, page]);

  const fetchProducts = async (retryCount = 3) => {
    setLoading(true);
    try {
      let res;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      if (productSection === "Trending Products") {
        res = await getProducts({
          page,
          rows,
          price,
          brand,
          rams,
          sort,
          storages,
          processors,
          category,
          search_all,
        });
      } else if (productSection === "Laptops") {
        res = await getLaptopProducts({
          page,
          rows,
          price,
          brand,
          rams,
          sorting: sort,
          storages,
          processors,
          category,
          search_all,
          categoryslug,
          brandslug,
        });
      } else {
        res = await getCategoryProducts({
          page,
          rows,
          price,
          brand,
          rams,
          sorting: sort,
          storages,
          processors,
          category,
          search_all,
          categoryslug,
          brandslug,
        });
      }

      clearTimeout(timeoutId);

      if (!res || !res.products || !Array.isArray(res.products.data)) {
        throw new Error('Invalid response structure');
      }

      setProducts(res.products.data);
      setNotice(res.notice);
      setTotal(res.products.total || 0);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching products:", error);
      if (retryCount > 0) {
        await new Promise(res => setTimeout(res, 1000));
        await fetchProducts(retryCount - 1);
      } else {
        setLoading(false);
        setProducts([]);
        setTotal(0);
        setNotice({
          type: 'error',
          message: 'Failed to load products. Please try again later.'
        });
      }
    }
  };

  const fetchBrands = () => {
    setLoading(true);
    getBrands().then((res) => {
      setBrands(res.brands);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const fetchCategories = () => {
    setLoading(true);
    getAllCats().then((res) => {
      setCategories(res.categories);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const handlePrice = (newPrice) => {
    setPrice(newPrice);
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStorage = (options) => {
    setStorages(options);
    setPage(1);
  };

  const handleBrand = (value) => {
    setBrand(value);
    setPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleProcessor = (options) => {
    setProcessors(options);
    setPage(1);
  };

  const handleRam = (options) => {
    setRams(options);
    setPage(1);
  };

  const handleSorting = (value) => {
    setSorting(value);
    setPage(1);
  };

  const onPage = (newPage, newRows) => {
    console.log('Pagination changed:', { newPage, newRows, currentPage: page, currentRows: rows });
    setPage(newPage);
    if (newRows && newRows !== rows) {
      setRows(newRows);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);

  const SimplePriceSlider = () => (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatPrice(price[0])}</span>
        <span>{formatPrice(price[1])}</span>
      </div>
      <Slider
        range
        min={4000}
        max={5000000}
        step={10000}
        value={price}
        onChange={handlePrice}
        onAfterChange={() => fetchProducts()}
        className="custom-price-slider"
        trackStyle={[{ backgroundColor: '#3b82f6' }]}
        handleStyle={[
          { borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
          { borderColor: '#3b82f6', backgroundColor: '#3b82f6' }
        ]}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>₦4,000</span>
        <span>₦5,000,000</span>
      </div>
    </div>
  );

  const FilterSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );

  const SidebarFilters = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
      <div className="flex items-center mb-6">
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>
      <FilterSection title="Price Range">
        <SimplePriceSlider />
      </FilterSection>
      {categoryslug === "" && (
        <FilterSection title="Category">
          <CategorySelect categories={categories} category={category} handleCategory={handleCategory} />
        </FilterSection>
      )}
      {brandslug === "" && (
        <FilterSection title="Brand">
          <BrandSelect brands={brands} brand={brand} handleBrand={handleBrand} />
        </FilterSection>
      )}
      <FilterSection title="Storage">
        <StorageSelect storages={storages} handleStorage={handleStorage} />
      </FilterSection>
      <FilterSection title="RAM">
        <RamSelect rams={rams} handleRam={handleRam} />
      </FilterSection>
      <FilterSection title="Processor">
        <ProcessorSelect processors={processors} handleProcessor={handleProcessor} />
      </FilterSection>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SocialIconMenu categoryslug="" brandslug="" flash_sale={flash_sale} notice={notice} />
        <div className="mb-8">
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 pt-5">{productSection}</h3>
          <div className="lg:hidden mb-6">
            <button onClick={() => setFilter(true)} className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 shadow-sm">
              <FunnelIcon className="h-5 w-5 mr-2" />
              Show Filters
            </button>
          </div>
        </div>

        {loading && <CarouselHolder />}

        {!loading && (
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="hidden lg:block lg:col-span-1">
              <SidebarFilters />
            </div>
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <p className="text-gray-600 mb-4 sm:mb-0">
                  Showing {((page - 1) * rows) + 1}-{Math.min(page * rows, total)} of {total} products (Page {page})
                </p>
                <div className="w-full sm:w-64">
                  <Select placeholder="Sort by" className="w-full" value={sort} onChange={handleSorting} size="large">
                    <Option value="">Default</Option>
                    <Option value="availability">Availability</Option>
                    <Option value="name-asc">Name: A-Z</Option>
                    <Option value="name-desc">Name: Z-A</Option>
                    <Option value="low-price">Price: Low to High</Option>
                    <Option value="high-price">Price: High to Low</Option>
                    <Option value="date-asc">Date: Old to New</Option>
                    <Option value="date-desc">Date: New to Old</Option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6 mb-12">
                {products.map((product, key) => (
                  <ProductCard product={product} key={key} />
                ))}
              </div>

              {products.length > 0 && productSection !== "Trending Products" && (
                <div className="flex justify-center py-8">
                  <Pagination
                    total={total}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Products`}
                    onChange={onPage}
                    pageSize={rows}
                    current={page}
                    showSizeChanger={true}
                    showQuickJumper={true}
                    pageSizeOptions={['12', '24', '48', '96']}
                    className="custom-pagination"
                    key={`pagination-${page}-${rows}-${total}`}
                  />
                </div>
              )}

              {products.length < 1 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        <Drawer title="Filter Products" placement="left" width={350} onClose={() => setFilter(false)} open={mobileFilter} className="lg:hidden">
          <div className="space-y-6">
            <SidebarFilters />
          </div>
        </Drawer>

        <div className="mt-16">
          <ReferralBadge />
        </div>
      </div>
    </div>
  );
}