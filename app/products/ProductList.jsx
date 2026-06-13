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
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsUpDownIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProductCard from "/app/components/ProductCard";
import PriceSelect from "/app/components/PriceSelect";
import SearchSelect from "/app/components/SearchSelect";
import StorageSelect from "/app/components/StorageSelect";
import BrandSelect from "/app/components/BrandSelect";
import CategorySelect from "/app/components/CategorySelect";
import RamSelect from "/app/components/RamSelect";
import ProcessorSelect from "/app/components/ProcessorSelect";
import CheckboxFilter from "/app/components/CheckboxFilter";
import { getModelOptions } from "/app/lib/models";
import {
  DEFAULT_PRICE,
  SUBTYPE_OPTIONS,
  CONDITION_OPTIONS,
  CORES_OPTIONS,
  STORAGE_TYPE_OPTIONS,
  DISPLAY_SIZE_OPTIONS,
  GRAPHICS_OPTIONS,
  COMPUTER_OS_OPTIONS,
  PHONE_OS_OPTIONS,
  TABLET_OS_OPTIONS,
  OS_OPTIONS,
  COLOR_OPTIONS,
  EXCHANGE_OPTIONS,
  SORT_OPTIONS,
} from "/app/lib/filterOptions";
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
  heading,
  sale_type,
  brandslug = "",
  categoryslug = "",
  initialCategory = "",
  flash_sale,
  shop = false,
}) {
  // Load initial state from global storage
  const [products, setProducts] = useState([]);
  // Trending "Top Picks" is a teaser row: cap it at 6 (desktop) / 4 (mobile).
  const isTrending = productSection === "Trending Products";
  const [rows, setRows] = useState(() => loadState('rows', isTrending ? 6 : 12, productSection, categoryslug, brandslug));
  const [page, setPage] = useState(() =>
    initialCategory ? 1 : loadState('page', 1, productSection, categoryslug, brandslug)
  );
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
  const [category, setCategory] = useState(() =>
    initialCategory
      ? Number(initialCategory)
      : loadState('category', null, productSection, categoryslug, brandslug)
  );

  // Extended attribute filters
  const [models, setModels] = useState(() => loadState('models', [], productSection, categoryslug, brandslug));
  const [subtypes, setSubtypes] = useState(() => loadState('subtypes', [], productSection, categoryslug, brandslug));
  const [conditions, setConditions] = useState(() => loadState('conditions', [], productSection, categoryslug, brandslug));
  const [cores, setCores] = useState(() => loadState('cores', [], productSection, categoryslug, brandslug));
  const [storageTypes, setStorageTypes] = useState(() => loadState('storageTypes', [], productSection, categoryslug, brandslug));
  const [displaySizes, setDisplaySizes] = useState(() => loadState('displaySizes', [], productSection, categoryslug, brandslug));
  const [graphics, setGraphics] = useState(() => loadState('graphics', [], productSection, categoryslug, brandslug));
  const [operatingSystems, setOperatingSystems] = useState(() => loadState('operatingSystems', [], productSection, categoryslug, brandslug));
  const [colors, setColors] = useState(() => loadState('colors', [], productSection, categoryslug, brandslug));
  const [exchange, setExchange] = useState(() => loadState('exchange', [], productSection, categoryslug, brandslug));

  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [mobileFilter, setFilter] = useState(false);
  const [notice, setNotice] = useState(null);
  // Empty map = every section open by default (open = !collapsed[name])
  const [collapsed, setCollapsed] = useState({});

  const toggleSection = (key) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const isInitialMount = useRef(true);
  const sectionRef = useRef(null);

  // Smoothly scroll back to the top of this section after a filter selection
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      saveState('models', models, productSection, categoryslug, brandslug);
      saveState('subtypes', subtypes, productSection, categoryslug, brandslug);
      saveState('conditions', conditions, productSection, categoryslug, brandslug);
      saveState('cores', cores, productSection, categoryslug, brandslug);
      saveState('storageTypes', storageTypes, productSection, categoryslug, brandslug);
      saveState('displaySizes', displaySizes, productSection, categoryslug, brandslug);
      saveState('graphics', graphics, productSection, categoryslug, brandslug);
      saveState('operatingSystems', operatingSystems, productSection, categoryslug, brandslug);
      saveState('colors', colors, productSection, categoryslug, brandslug);
      saveState('exchange', exchange, productSection, categoryslug, brandslug);
    }
  }, [rows, page, storages, processors, rams, sort, price, search_all, brand, category, models, subtypes, conditions, cores, storageTypes, displaySizes, graphics, operatingSystems, colors, exchange, productSection, categoryslug, brandslug]);

  useEffect(() => {
    isInitialMount.current = false;
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, [brand, rams, sort, storages, processors, category, rows, page, price, models, subtypes, conditions, cores, storageTypes, displaySizes, graphics, operatingSystems, colors, exchange]);


  const fetchProducts = async (retryCount = 3) => {
    setLoading(true);
    try {
      let res;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Extended attribute filters shared across every endpoint
      const extraFilters = {
        models,
        subtypes,
        conditions,
        cores,
        storage_types: storageTypes,
        display_sizes: displaySizes,
        graphics_cards: graphics,
        operating_systems: operatingSystems,
        colors,
        exchange,
      };

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
          ...extraFilters,
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
          ...extraFilters,
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
          ...extraFilters,
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
    scrollToSection();
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStorage = (options) => {
    setStorages(options);
    setPage(1);
    scrollToSection();
  };

  const handleBrand = (value) => {
    setBrand(value);
    setPage(1);
    scrollToSection();
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
    scrollToSection();
  };

  const handleProcessor = (options) => {
    setProcessors(options);
    setPage(1);
    scrollToSection();
  };

  const handleRam = (options) => {
    setRams(options);
    setPage(1);
    scrollToSection();
  };

  const handleSorting = (value) => {
    setSorting(value);
    setPage(1);
    scrollToSection();
  };

  // Generic handler factory for the extended multi-select filters
  const makeMultiHandler = (setter) => (options) => {
    setter(options);
    setPage(1);
    scrollToSection();
  };

  const handleSubtypes = makeMultiHandler(setSubtypes);
  const handleConditions = makeMultiHandler(setConditions);
  const handleCores = makeMultiHandler(setCores);
  const handleStorageTypes = makeMultiHandler(setStorageTypes);
  const handleDisplaySizes = makeMultiHandler(setDisplaySizes);
  const handleGraphics = makeMultiHandler(setGraphics);
  const handleOperatingSystems = makeMultiHandler(setOperatingSystems);
  const handleColors = makeMultiHandler(setColors);
  const handleExchange = makeMultiHandler(setExchange);
  const handleModels = makeMultiHandler(setModels);

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
    ...models.map((m) => ({ key: `model-${m}`, label: m, clear: () => handleModels(models.filter((x) => x !== m)) })),
    ...subtypes.map((s) => ({ key: `subtype-${s}`, label: s, clear: () => handleSubtypes(subtypes.filter((x) => x !== s)) })),
    ...conditions.map((c) => ({ key: `cond-${c}`, label: c, clear: () => handleConditions(conditions.filter((x) => x !== c)) })),
    ...cores.map((c) => ({ key: `cores-${c}`, label: c, clear: () => handleCores(cores.filter((x) => x !== c)) })),
    ...storageTypes.map((s) => ({ key: `stype-${s}`, label: s, clear: () => handleStorageTypes(storageTypes.filter((x) => x !== s)) })),
    ...displaySizes.map((d) => ({ key: `disp-${d}`, label: d, clear: () => handleDisplaySizes(displaySizes.filter((x) => x !== d)) })),
    ...graphics.map((g) => ({ key: `gpu-${g}`, label: g, clear: () => handleGraphics(graphics.filter((x) => x !== g)) })),
    ...operatingSystems.map((o) => ({ key: `os-${o}`, label: o, clear: () => handleOperatingSystems(operatingSystems.filter((x) => x !== o)) })),
    ...colors.map((c) => ({ key: `color-${c}`, label: c, clear: () => handleColors(colors.filter((x) => x !== c)) })),
    ...exchange.map((e) => ({ key: `exchange-${e}`, label: `Exchange: ${e}`, clear: () => handleExchange(exchange.filter((x) => x !== e)) })),
  ];

  const clearAllFilters = () => {
    setPrice(DEFAULT_PRICE);
    setCategory(null);
    setBrand("");
    setStorages([]);
    setRams([]);
    setProcessors([]);
    setModels([]);
    setSubtypes([]);
    setConditions([]);
    setCores([]);
    setStorageTypes([]);
    setDisplaySizes([]);
    setGraphics([]);
    setOperatingSystems([]);
    setColors([]);
    setExchange([]);
    setPage(1);
    scrollToSection();
  };

  const onPage = (newPage, newRows) => {
    setPage(newPage);
    if (newRows && newRows !== rows) {
      setRows(newRows);
    }
    // Scroll back to the top of *this* section (not the whole page), so on the
    // home page paginating one section keeps the user where they were.
    scrollToSection();
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);

  // NOTE: these are render *helpers* called as functions ( {filterSection(...)} ),
  // NOT JSX components ( <FilterSection /> ). Calling them inline keeps the DOM
  // identity stable across re-renders, so the sidebar's scroll position is
  // preserved when a section is toggled (no jump back to the top).
  const filterSection = ({ title, name, count, children }) => {
    const open = !collapsed[name];
    return (
      <div key={name} className="border-b border-gray-100 last:border-b-0">
        <button
          type="button"
          onClick={() => toggleSection(name)}
          className="group flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-primary">
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
        {open && <div className="px-5 pb-5 pt-1 font-semibold text-gray-700">{children}</div>}
      </div>
    );
  };

  const activeFilterChips = (className = "") =>
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

  // Laptop/computer-only filters don't apply to phones, tablets, accessories, etc.
  // Detect the current category context (route slug, selected category, or section).
  const selectedCat = categories.find((c) => c.id === category);
  const categoryContext = `${categoryslug} ${selectedCat?.slug || ""} ${selectedCat?.name || ""} ${productSection || ""} ${heading || ""}`.toLowerCase();
  const isNonComputerCategory =
    /phone|tablet|ipad|accessor|printer|monitor|android|iphone|watch|earbud|airpod|audio/i.test(categoryContext);
  const showLaptopFilters = !isNonComputerCategory;

  // Intelligent Model options: scoped to the current device type + brand so the
  // list only ever offers models that make sense for the current selections.
  const selectedBrandName = brands.find((b) => b.id === brand)?.name || "";
  let deviceType = null;
  if (/tablet|ipad/.test(categoryContext)) deviceType = "tablet";
  else if (/phone|iphone|android/.test(categoryContext)) deviceType = "phone";
  else if (/laptop|desktop|macbook|notebook|ultrabook|computer/.test(categoryContext)) deviceType = "laptop";

  let modelBrandHint = "";
  if (/iphone|apple-phone|apple phone/.test(categoryContext)) modelBrandHint = "Apple Phone";
  else if (/ipad|apple-ipad|apple ipad/.test(categoryContext)) modelBrandHint = "Apple iPad";
  else if (/macbook|laptop-apple|laptop apple/.test(categoryContext)) modelBrandHint = "MacBook";
  else if (/samsung/.test(categoryContext)) modelBrandHint = "Samsung";

  const modelOptions = getModelOptions({
    type: deviceType,
    brand: selectedBrandName || modelBrandHint,
  });

  // Scope the Operating System options to the current device type.
  const osOptions =
    deviceType === "phone"
      ? PHONE_OS_OPTIONS
      : deviceType === "tablet"
      ? TABLET_OS_OPTIONS
      : deviceType === "laptop"
      ? COMPUTER_OS_OPTIONS
      : OS_OPTIONS;

  const filterSections = () => (
    <>
      {filterSection({
        title: "Price Range", name: "price", count: priceActive ? 1 : 0,
        children: <PriceSelect price={price} handlePrice={handlePrice} />,
      })}
      {categoryslug === "" && filterSection({
        title: "Category", name: "category", count: category ? 1 : 0,
        children: <CategorySelect categories={categories} category={category} handleCategory={handleCategory} />,
      })}
      {brandslug === "" && filterSection({
        title: "Brand", name: "brand", count: brand ? 1 : 0,
        children: <BrandSelect brands={brands} brand={brand} handleBrand={handleBrand} />,
      })}
      {filterSection({
        title: "Storage", name: "storage", count: storages.length,
        children: <StorageSelect storages={storages} handleStorage={handleStorage} />,
      })}
      {filterSection({
        title: "RAM", name: "ram", count: rams.length,
        children: <RamSelect rams={rams} handleRam={handleRam} />,
      })}
      {showLaptopFilters && filterSection({
        title: "Processor", name: "processor", count: processors.length,
        children: <ProcessorSelect processors={processors} handleProcessor={handleProcessor} />,
      })}
      {modelOptions.length > 0 && filterSection({
        title: "Model", name: "model", count: models.length,
        children: (
          <CheckboxFilter
            options={modelOptions}
            selected={models}
            onChange={handleModels}
            placeholder="Search model…"
            limit={10}
          />
        ),
      })}
      {showLaptopFilters && filterSection({
        title: "Subtype", name: "subtype", count: subtypes.length,
        children: <CheckboxFilter options={SUBTYPE_OPTIONS} selected={subtypes} onChange={handleSubtypes} placeholder="Search subtype…" />,
      })}
      {filterSection({
        title: "Condition", name: "condition", count: conditions.length,
        children: <CheckboxFilter options={CONDITION_OPTIONS} selected={conditions} onChange={handleConditions} />,
      })}
      {showLaptopFilters && filterSection({
        title: "Number of Cores", name: "cores", count: cores.length,
        children: <CheckboxFilter options={CORES_OPTIONS} selected={cores} onChange={handleCores} grid={2} />,
      })}
      {showLaptopFilters && filterSection({
        title: "Storage Type", name: "storageType", count: storageTypes.length,
        children: <CheckboxFilter options={STORAGE_TYPE_OPTIONS} selected={storageTypes} onChange={handleStorageTypes} grid={2} />,
      })}
      {filterSection({
        title: "Display Size", name: "displaySize", count: displaySizes.length,
        children: <CheckboxFilter options={DISPLAY_SIZE_OPTIONS} selected={displaySizes} onChange={handleDisplaySizes} grid={3} />,
      })}
      {showLaptopFilters && filterSection({
        title: "Graphics Card", name: "graphics", count: graphics.length,
        children: <CheckboxFilter options={GRAPHICS_OPTIONS} selected={graphics} onChange={handleGraphics} placeholder="Search graphics…" />,
      })}
      {filterSection({
        title: "Operating System", name: "os", count: operatingSystems.length,
        children: <CheckboxFilter options={osOptions} selected={operatingSystems} onChange={handleOperatingSystems} />,
      })}
      {filterSection({
        title: "Color", name: "color", count: colors.length,
        children: <CheckboxFilter options={COLOR_OPTIONS} selected={colors} onChange={handleColors} grid={2} />,
      })}
      {filterSection({
        title: "Exchange Possible", name: "exchange", count: exchange.length,
        children: <CheckboxFilter options={EXCHANGE_OPTIONS} selected={exchange} onChange={handleExchange} grid={2} />,
      })}
    </>
  );

  const sidebarFilters = () => (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card lg:sticky lg:top-[160px] lg:max-h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between rounded-t-2xl border-b border-gray-100 bg-gradient-to-r from-primary-50 to-white px-5 py-4">
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
        <div className="flex-shrink-0 border-b border-gray-100 bg-gray-50/70 px-5 py-4">
          {activeFilterChips()}
        </div>
      )}

      {/* Scrollable filter sections — independent from the products list */}
      <div className="filter-scroll flex-1 overflow-y-auto overscroll-contain">
        {filterSections()}
      </div>
    </div>
  );

  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <SocialIconMenu flash_sale={flash_sale} />
        <div className="mb-6">
          <div className="flex items-end gap-3">
            <h3 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">{heading || productSection}</h3>
            <span className="mb-1.5 h-1 w-12 rounded-full bg-accent" />
          </div>
        </div>

        {/* Scroll anchor: lands right on the products area after a filter change */}
        <div ref={sectionRef} className="scroll-mt-[120px] lg:scroll-mt-[170px]" />

        <div className={`lg:grid lg:grid-cols-4 lg:gap-8 ${shop ? "lg:mt-6" : ""}`}>
            <div className="hidden lg:block lg:col-span-1">
              {sidebarFilters()}
            </div>
            <div className="lg:col-span-3">
              <div className="mb-6 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-card sm:px-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-600">
                      Showing{" "}
                      <span className="font-semibold text-primary">
                        {total === 0 ? 0 : (page - 1) * rows + 1}–{Math.min(page * rows, total)}
                      </span>{" "}
                      of <span className="font-semibold text-primary">{total}</span> products
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Previous page"
                        onClick={() => onPage(page - 1, rows)}
                        disabled={page <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next page"
                        onClick={() => onPage(page + 1, rows)}
                        disabled={page >= Math.ceil(total / rows)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden text-sm font-medium text-gray-500 lg:inline">Sort by</span>

                    {/* Desktop: branded native select */}
                    <div className="relative hidden lg:block lg:w-56">
                      <ArrowsUpDownIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                      <select
                        value={sort}
                        onChange={(e) => handleSorting(e.target.value)}
                        aria-label="Sort products"
                        className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm font-semibold text-gray-700 shadow-sm outline-none transition hover:border-primary-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        {SORT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Mobile & tablet: Filters + native sort picker, side by side */}
                    <div className="flex w-full items-center gap-2 lg:hidden">
                      <button
                        type="button"
                        onClick={() => setFilter(true)}
                        className="relative flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-primary transition active:scale-[0.98] hover:border-accent hover:text-accent"
                      >
                        <FunnelIcon className="h-4 w-4" />
                        Filters
                        {activeFilters.length > 0 && (
                          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                            {activeFilters.length}
                          </span>
                        )}
                      </button>

                      <div className="relative flex-1">
                        <ArrowsUpDownIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <select
                          value={sort}
                          onChange={(e) => handleSorting(e.target.value)}
                          aria-label="Sort products"
                          className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-8 text-sm font-semibold text-gray-700 outline-none transition focus:border-primary"
                        >
                          {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                {activeFilters.length > 0 && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    {activeFilterChips()}
                  </div>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6 mb-12">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square w-full rounded-xl bg-gray-200" />
                      <div className="mt-3 h-3 w-3/4 rounded bg-gray-200" />
                      <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              ) : isTrending ? (
                <>
                  {/* Mobile: 2-col grid (4 products) · Desktop: grid (6 products) */}
                  <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {products.slice(0, 6).map((product, key) => (
                      <div
                        key={key}
                        className={key >= 4 ? "hidden sm:block" : ""}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  <div className="mb-12 flex justify-center">
                    <Link
                      href="/products"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:from-accent hover:to-accent-500 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
                    >
                      View all products
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6 mb-12">
                  {products.map((product, key) => (
                    <ProductCard product={product} key={key} />
                  ))}
                </div>
              )}

              {!loading && products.length > 0 && productSection !== "Trending Products" && (
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

              {!loading && products.length < 1 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </div>

        <Drawer
          placement="bottom"
          height="86vh"
          closable={false}
          onClose={() => setFilter(false)}
          open={mobileFilter}
          className="lg:hidden filter-sheet"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex h-full flex-col bg-gray-50">
            {/* Grab handle + header */}
            <div className="flex-shrink-0 bg-white">
              <div className="flex justify-center pt-3">
                <span className="h-1.5 w-11 rounded-full bg-gray-300" />
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                    <AdjustmentsHorizontalIcon className="h-[18px] w-[18px]" />
                  </span>
                  <h2 className="text-base font-bold text-primary">Filters</h2>
                  {activeFilters.length > 0 && (
                    <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                      {activeFilters.length}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setFilter(false)}
                  aria-label="Close filters"
                  className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              {activeFilters.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
                  {activeFilterChips()}
                </div>
              )}
            </div>

            {/* Scrollable filter body */}
            <div className="filter-list-scroll flex-1 overflow-y-auto bg-white">
              {filterSections()}
            </div>

            {/* Sticky action footer */}
            <div className="flex flex-shrink-0 items-center gap-3 border-t border-gray-100 bg-white px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] shadow-[0_-6px_16px_rgba(14,27,77,0.06)]">
              <button
                type="button"
                onClick={clearAllFilters}
                disabled={activeFilters.length === 0}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 disabled:opacity-40"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setFilter(false)}
                className="flex-[1.6] rounded-xl bg-accent py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 active:scale-[0.98]"
              >
                Show {total} {total === 1 ? "result" : "results"}
              </button>
            </div>
          </div>
        </Drawer>

        <div className="mt-16">
          <ReferralBadge />
        </div>
      </div>
    </div>
  );
}