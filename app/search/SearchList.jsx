"use client";
import { getBrands, getAllCats, getAllSearchProducts } from "../services/productService";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Drawer, Pagination } from "antd";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowsUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProductCard from "/app/components/ProductCard";
import PriceSelect from "/app/components/PriceSelect";
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
  OS_OPTIONS,
  COLOR_OPTIONS,
  EXCHANGE_OPTIONS,
  SORT_OPTIONS,
} from "/app/lib/filterOptions";
import { sort as fastSort } from "fast-sort";
import "../products/styles.css";

const ROWS_PER_PAGE = 24;

/* ----------------------- client-side matching helpers ---------------------- */

const norm = (v) => (v === null || v === undefined ? "" : String(v).trim().toLowerCase());
const isEmpty = (s) => !s || s === "null" || s === "none" || s === "undefined";
const digitsOf = (v) => norm(v).replace(/[^0-9]/g, "");

// A product passes a multi-select if its field equals one of the selected
// values (case-insensitive). Empty selection = no constraint.
const matchAny = (value, selected) => {
  if (!selected.length) return true;
  const v = norm(value);
  if (isEmpty(v)) return false;
  return selected.some((s) => norm(s) === v);
};

// Cores may be stored as "4" or "4 Cores" — compare on the numeric part.
const matchCores = (value, selected) => {
  if (!selected.length) return true;
  const v = digitsOf(value);
  if (!v) return false;
  return selected.some((s) => digitsOf(s) === v);
};

// Exchange may be a boolean / 1 / 0 / "Yes" — normalise to yes/no.
const toYesNo = (v) => {
  const s = norm(v);
  if (["1", "true", "yes", "y"].includes(s)) return "yes";
  return "no";
};
const matchExchange = (value, selected) =>
  !selected.length || selected.some((s) => norm(s) === toYesNo(value));

// Condition can live on either `condition` or `stock`.
const matchCondition = (product, selected) => {
  if (!selected.length) return true;
  const vals = [norm(product.condition), norm(product.stock)].filter((v) => !isEmpty(v));
  return selected.some((s) => vals.includes(norm(s)));
};

// Subtype can live on either `subtype` or `product_type`.
const matchSubtype = (product, selected) => {
  if (!selected.length) return true;
  const vals = [norm(product.subtype), norm(product.product_type)].filter((v) => !isEmpty(v));
  return selected.some((s) => vals.includes(norm(s)));
};

export default function SearchList({ search }) {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileFilter, setFilter] = useState(false);
  const [page, setPage] = useState(1);

  const search_all = search.trim();

  // ---- Filter state (mirrors the shop/laptop sidebar) ----
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState("");
  const [storages, setStorages] = useState([]);
  const [rams, setRams] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [models, setModels] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [cores, setCores] = useState([]);
  const [storageTypes, setStorageTypes] = useState([]);
  const [displaySizes, setDisplaySizes] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [colors, setColors] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [sortValue, setSorting] = useState("");

  // Empty map = every section open by default (open = !collapsed[name])
  const [collapsed, setCollapsed] = useState({});
  const toggleSection = (key) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const sectionRef = useRef(null);
  const scrollToSection = () =>
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search_all]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllSearchProducts({ search_all });
      setProducts(res.products || []);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = () => {
    getBrands().then(
      (res) => setBrands(res.brands || []),
      () => {}
    );
  };

  const fetchCategories = () => {
    getAllCats().then(
      (res) => setCategories(res.categories || []),
      () => {}
    );
  };

  // brand_id -> brand name, so the single-select Brand filter (which works on
  // ids) can be matched against products that only carry a brand_id.
  const brandNameById = useMemo(() => {
    const map = new Map();
    brands.forEach((b) => map.set(b.id, b.name));
    return map;
  }, [brands]);

  // ---- Client-side filtering + sorting over the search results ----
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const productPrice = Number(p.price);
      if (Number.isFinite(productPrice) && (productPrice < price[0] || productPrice > price[1]))
        return false;
      if (category && p.category_id !== category) return false;
      if (brand && p.brand_id !== brand) return false;
      if (!matchAny(p.storage, storages)) return false;
      if (!matchAny(p.ram, rams)) return false;
      if (!matchAny(p.processor, processors)) return false;
      if (!matchAny(p.model, models)) return false;
      if (!matchSubtype(p, subtypes)) return false;
      if (!matchCondition(p, conditions)) return false;
      if (!matchCores(p.number_of_cores, cores)) return false;
      if (!matchAny(p.storage_type, storageTypes)) return false;
      if (!matchAny(p.display_size, displaySizes)) return false;
      if (!matchAny(p.graphics_card, graphics)) return false;
      if (!matchAny(p.operating_system, operatingSystems)) return false;
      if (!matchAny(p.color, colors)) return false;
      if (!matchExchange(p.exchange_possible, exchange)) return false;
      return true;
    });

    switch (sortValue) {
      case "availability":
        result = fastSort(result).desc((p) => Number(p.availability) || 0);
        break;
      case "name-asc":
        result = fastSort(result).asc((p) => p.name);
        break;
      case "name-desc":
        result = fastSort(result).desc((p) => p.name);
        break;
      case "low-price":
        result = fastSort(result).asc((p) => Number(p.price));
        break;
      case "high-price":
        result = fastSort(result).desc((p) => Number(p.price));
        break;
      case "date-asc":
        result = fastSort(result).asc((p) => new Date(p.created_at));
        break;
      case "date-desc":
        result = fastSort(result).desc((p) => new Date(p.created_at));
        break;
      default:
        break;
    }
    return result;
  }, [
    products, price, category, brand, storages, rams, processors, models,
    subtypes, conditions, cores, storageTypes, displaySizes, graphics,
    operatingSystems, colors, exchange, sortValue,
  ]);

  const total = filteredProducts.length;
  const pageItems = filteredProducts.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  // Any change to a filter brings the user back to the first page of results.
  const resetPage = () => setPage(1);

  // ---- Handlers (set state, reset paging, keep the results in view) ----
  const makeHandler = (setter) => (value) => {
    setter(value);
    resetPage();
    scrollToSection();
  };
  const handlePrice = makeHandler(setPrice);
  const handleCategory = makeHandler(setCategory);
  const handleBrand = makeHandler(setBrand);
  const handleStorage = makeHandler(setStorages);
  const handleRam = makeHandler(setRams);
  const handleProcessor = makeHandler(setProcessors);
  const handleModels = makeHandler(setModels);
  const handleSubtypes = makeHandler(setSubtypes);
  const handleConditions = makeHandler(setConditions);
  const handleCores = makeHandler(setCores);
  const handleStorageTypes = makeHandler(setStorageTypes);
  const handleDisplaySizes = makeHandler(setDisplaySizes);
  const handleGraphics = makeHandler(setGraphics);
  const handleOperatingSystems = makeHandler(setOperatingSystems);
  const handleColors = makeHandler(setColors);
  const handleExchange = makeHandler(setExchange);
  const handleSorting = (value) => {
    setSorting(value);
    resetPage();
    scrollToSection();
  };

  // ---- Active filter chips ----
  const priceActive = price[0] !== DEFAULT_PRICE[0] || price[1] !== DEFAULT_PRICE[1];
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
      ? [{ key: "brand", label: brandNameById.get(brand) || "Brand", clear: () => handleBrand("") }]
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
    resetPage();
    scrollToSection();
  };

  const onPage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Model options scoped to the selected brand (full catalogue otherwise).
  const selectedBrandName = brandNameById.get(brand) || "";
  const modelOptions = getModelOptions({ brand: selectedBrandName });

  // ---- Render helpers (called inline to keep DOM identity stable) ----
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
            onClick={() => { f.clear(); resetPage(); }}
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

  const filterSections = () => (
    <>
      {filterSection({
        title: "Price Range", name: "price", count: priceActive ? 1 : 0,
        children: <PriceSelect price={price} handlePrice={handlePrice} />,
      })}
      {filterSection({
        title: "Category", name: "category", count: category ? 1 : 0,
        children: <CategorySelect categories={categories} category={category} handleCategory={handleCategory} />,
      })}
      {filterSection({
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
      {filterSection({
        title: "Processor", name: "processor", count: processors.length,
        children: <ProcessorSelect processors={processors} handleProcessor={handleProcessor} />,
      })}
      {modelOptions.length > 0 && filterSection({
        title: "Model", name: "model", count: models.length,
        children: (
          <CheckboxFilter options={modelOptions} selected={models} onChange={handleModels} placeholder="Search model…" limit={10} />
        ),
      })}
      {filterSection({
        title: "Subtype", name: "subtype", count: subtypes.length,
        children: <CheckboxFilter options={SUBTYPE_OPTIONS} selected={subtypes} onChange={handleSubtypes} placeholder="Search subtype…" />,
      })}
      {filterSection({
        title: "Condition", name: "condition", count: conditions.length,
        children: <CheckboxFilter options={CONDITION_OPTIONS} selected={conditions} onChange={handleConditions} />,
      })}
      {filterSection({
        title: "Number of Cores", name: "cores", count: cores.length,
        children: <CheckboxFilter options={CORES_OPTIONS} selected={cores} onChange={handleCores} grid={2} />,
      })}
      {filterSection({
        title: "Storage Type", name: "storageType", count: storageTypes.length,
        children: <CheckboxFilter options={STORAGE_TYPE_OPTIONS} selected={storageTypes} onChange={handleStorageTypes} grid={2} />,
      })}
      {filterSection({
        title: "Display Size", name: "displaySize", count: displaySizes.length,
        children: <CheckboxFilter options={DISPLAY_SIZE_OPTIONS} selected={displaySizes} onChange={handleDisplaySizes} grid={3} />,
      })}
      {filterSection({
        title: "Graphics Card", name: "graphics", count: graphics.length,
        children: <CheckboxFilter options={GRAPHICS_OPTIONS} selected={graphics} onChange={handleGraphics} placeholder="Search graphics…" />,
      })}
      {filterSection({
        title: "Operating System", name: "os", count: operatingSystems.length,
        children: <CheckboxFilter options={OS_OPTIONS} selected={operatingSystems} onChange={handleOperatingSystems} />,
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
              {activeFilters.length > 0 ? `${activeFilters.length} applied` : "Refine results"}
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
    <div className="mt-[96px] min-h-screen bg-gray-50 lg:mt-[148px]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <MagnifyingGlassIcon className="h-3.5 w-3.5" />
            Search Results
          </p>
          <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
            Results for <span className="text-accent">&ldquo;{search}&rdquo;</span>
          </h1>
        </div>

        {/* Scroll anchor: lands right on the products area after a filter change */}
        <div ref={sectionRef} className="scroll-mt-[120px] lg:scroll-mt-[170px]" />

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:col-span-1 lg:block">{sidebarFilters()}</div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Toolbar: result count + sort (and mobile Filters button) */}
            <div className="mb-6 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-card sm:px-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-gray-600">
                  {loading
                    ? "Searching for the best matches…"
                    : (
                      <>
                        <span className="font-semibold text-primary">{total}</span>{" "}
                        product{total === 1 ? "" : "s"} found
                      </>
                    )}
                </p>
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm font-medium text-gray-500 lg:inline">Sort by</span>

                  {/* Desktop sort */}
                  <div className="relative hidden lg:block lg:w-56">
                    <ArrowsUpDownIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <select
                      value={sortValue}
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

                  {/* Mobile & tablet: Filters + sort */}
                  <div className="flex w-full items-center gap-2 lg:hidden">
                    <button
                      type="button"
                      onClick={() => setFilter(true)}
                      className="relative flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-primary transition hover:border-accent hover:text-accent active:scale-[0.98]"
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
                        value={sortValue}
                        onChange={(e) => handleSorting(e.target.value)}
                        aria-label="Sort products"
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-8 text-sm font-semibold text-gray-700 outline-none transition focus:border-primary"
                      >
                        {SORT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              {activeFilters.length > 0 && (
                <div className="mt-3 border-t border-gray-100 pt-3">{activeFilterChips()}</div>
              )}
            </div>

            {/* Products grid */}
            {loading ? (
              <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square w-full rounded-xl bg-gray-200" />
                    <div className="mt-3 h-3 w-3/4 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3">
                {pageItems.map((product, key) => (
                  <ProductCard product={product} key={key} />
                ))}
              </div>
            )}

            {!loading && total > ROWS_PER_PAGE && (
              <div className="flex justify-center py-8">
                <Pagination
                  total={total}
                  showTotal={(t, range) => `${range[0]}-${range[1]} of ${t} Products`}
                  onChange={onPage}
                  pageSize={ROWS_PER_PAGE}
                  current={page}
                  className="custom-pagination"
                />
              </div>
            )}

            {!loading && total < 1 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl text-gray-400">🔍</div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">No Products Found</h3>
                <p className="mb-4 text-gray-500">Try adjusting your search terms or filters</p>
                {activeFilters.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filter bottom sheet */}
        <Drawer
          placement="bottom"
          height="86vh"
          closable={false}
          onClose={() => setFilter(false)}
          open={mobileFilter}
          className="filter-sheet lg:hidden"
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
      </div>
    </div>
  );
}
