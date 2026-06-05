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
import { Button, Drawer, Space, Pagination, Select } from "antd";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronUpIcon,
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

const DEFAULT_PRICE = [4000, 5000000];

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
  heading,
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
  const [collapsed, setCollapsed] = useState({ storage: true, ram: true, processor: true });

  const toggleSection = (key) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

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
  }, [brand, rams, sort, storages, processors, category, rows, page, price]);

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

  // ---- Active filter tracking (Amazon/Alibaba-style chips) ----
  const priceActive =
    price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];

  const fmtCompact = (v) =>
    v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${Math.round(v / 1000)}K` : v;

  const activeFilters = [
    ...(priceActive
      ? [{ key: "price", label: `₦${fmtCompact(price[0])} – ₦${fmtCompact(price[1])}`, clear: () => handlePrice(DEFAULT_PRICE) }]
      : []),
    ...(category
      ? [{ key: "category", label: categories.find((c) => c.id === category)?.name || "Category", clear: () => handleCategory(null) }]
      : []),
    ...(brand
      ? [{ key: "brand", label: brands.find((b) => b.id === brand)?.name || "Brand", clear: () => handleBrand("") }]
      : []),
    ...storages.map((s) => ({ key: `storage-${s}`, label: s, clear: () => handleStorage(storages.filter((x) => x !== s)) })),
    ...rams.map((r) => ({ key: `ram-${r}`, label: r, clear: () => handleRam(rams.filter((x) => x !== r)) })),
    ...processors.map((p) => ({ key: `proc-${p}`, label: p, clear: () => handleProcessor(processors.filter((x) => x !== p)) })),
  ];

  const clearAllFilters = () => {
    setPrice(DEFAULT_PRICE);
    setCategory(null);
    setBrand("");
    setStorages([]);
    setRams([]);
    setProcessors([]);
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
    <PriceSelect price={price} handlePrice={handlePrice} />
  );

  const FilterSection = ({ title, name, count, children }) => {
    const open = !collapsed[name];
    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          type="button"
          onClick={() => toggleSection(name)}
          className="group flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 group-hover:text-primary">
            {title}
            {count > 0 && (
              <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </span>
          <ChevronUpIcon
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-primary ${
              open ? "" : "rotate-180"
            }`}
          />
        </button>
        {open && <div className="px-5 pb-5 pt-1">{children}</div>}
      </div>
    );
  };

  const ActiveFilterChips = ({ className = "" }) =>
    activeFilters.length > 0 ? (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {activeFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => { f.clear(); setPage(1); }}
            className="group inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 transition hover:border-accent hover:bg-accent hover:text-white"
          >
            {f.label}
            <XMarkIcon className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
          </button>
        ))}
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs font-semibold text-gray-400 underline-offset-2 transition hover:text-red-500 hover:underline"
        >
          Clear all
        </button>
      </div>
    ) : null;

  const SidebarFilters = () => (
    <div className="overflow-visible rounded-2xl border border-gray-200/80 bg-white shadow-card lg:sticky lg:top-24">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-100 bg-gradient-to-r from-primary-50 to-white px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
            <AdjustmentsHorizontalIcon className="h-[18px] w-[18px]" />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-bold text-gray-900">Filters</h2>
            <p className="text-[11px] text-gray-400">
              {activeFilters.length > 0
                ? `${activeFilters.length} applied`
                : "Refine results"}
            </p>
          </div>
        </div>
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-100"
          >
            <XMarkIcon className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Active chips */}
      {activeFilters.length > 0 && (
        <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-4">
          <ActiveFilterChips />
        </div>
      )}

      <FilterSection title="Price Range" name="price" count={priceActive ? 1 : 0}>
        <SimplePriceSlider />
      </FilterSection>
      {categoryslug === "" && (
        <FilterSection title="Category" name="category" count={category ? 1 : 0}>
          <CategorySelect categories={categories} category={category} handleCategory={handleCategory} />
        </FilterSection>
      )}
      {brandslug === "" && (
        <FilterSection title="Brand" name="brand" count={brand ? 1 : 0}>
          <BrandSelect brands={brands} brand={brand} handleBrand={handleBrand} />
        </FilterSection>
      )}
      <FilterSection title="Storage" name="storage" count={storages.length}>
        <StorageSelect storages={storages} handleStorage={handleStorage} />
      </FilterSection>
      <FilterSection title="RAM" name="ram" count={rams.length}>
        <RamSelect rams={rams} handleRam={handleRam} />
      </FilterSection>
      <FilterSection title="Processor" name="processor" count={processors.length}>
        <ProcessorSelect processors={processors} handleProcessor={handleProcessor} />
      </FilterSection>
    </div>
  );

  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <SocialIconMenu flash_sale={flash_sale} />
        <div className="mb-8">
          <div className="flex items-end gap-3">
            <h3 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{heading || productSection}</h3>
            <span className="mb-1.5 h-1 w-12 rounded-full bg-accent" />
          </div>
          <div className="mt-6 lg:hidden">
            <button onClick={() => setFilter(true)} className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-primary shadow-sm transition hover:border-accent hover:text-accent">
              <FunnelIcon className="mr-2 h-5 w-5" />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                  {activeFilters.length}
                </span>
              )}
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
              <div className="mb-6 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-card sm:px-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-primary">
                      {total === 0 ? 0 : (page - 1) * rows + 1}–{Math.min(page * rows, total)}
                    </span>{" "}
                    of <span className="font-semibold text-primary">{total}</span> products
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="hidden text-sm font-medium text-gray-500 sm:inline">Sort by</span>
                    <div className="w-full sm:w-56">
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
                </div>
                {activeFilters.length > 0 && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <ActiveFilterChips />
                  </div>
                )}
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