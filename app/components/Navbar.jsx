"use client";
import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  TruckIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { getAllCats, getBrands, getQuickSearch } from "/app/services/productService";
import { socials } from "./socials";
import { Drawer } from "antd";
import Logo from "./Logo";
import CartQuick from "./CartQuick";
import useCartStore from "/app/store/zustand";
import "./social.css";

const navigation = {
  pages: [
    { name: "Laptops", href: "/laptops" },
    { name: "Apple", href: "/brands/apple-phone" },
    { name: "Android", href: "/brands/android-phone" },
    { name: "Shop All", href: "/products" },
    { name: "Flash Sales", href: "/flash-sales", hot: true },
    { name: "Black Friday", href: "/black-friday" },
    { name: "Mid Sales", href: "/mid-year-sales" },
    { name: "Promo Sales", href: "/promo-sales" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const formatNumber = (number) =>
  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  // Inline live search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const searchRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCartStore();
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const t = setTimeout(() => {
      setSearching(true);
      getQuickSearch({ search_all: query })
        .then((res) => {
          setResults(res.products || []);
          setSearching(false);
        })
        .catch(() => setSearching(false));
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

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

  const submitSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setShowResults(false);
    setMobileSearch(false);
    router.push(`/search/${slugify(query)}`);
  };

  const SearchDropdown = () => (
    <Transition
      show={showResults && query.trim().length > 0}
      as={Fragment}
      enter="transition ease-out duration-150"
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-2xl">
        {searching ? (
          <div className="flex items-center gap-3 px-5 py-6 text-sm text-gray-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            Searching for “{query}”…
          </div>
        ) : results.length > 0 ? (
          <>
            <ul className="divide-y divide-gray-50 p-2">
              {results.slice(0, 6).map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setShowResults(false)}
                    className="group flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-primary-50"
                  >
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800 group-hover:text-primary">
                        {product.name}
                      </p>
                      <span
                        className={classNames(
                          "mt-1 inline-block text-[11px] font-semibold",
                          product.availability ? "text-green-600" : "text-red-500"
                        )}
                      >
                        {product.availability ? "In stock" : "Sold out"}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-sm font-bold text-primary">
                      &#8358;{formatNumber(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={submitSearch}
              className="flex w-full items-center justify-center gap-2 border-t border-gray-100 bg-primary-50 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary-100"
            >
              See all results for “{query}”
              <span aria-hidden>→</span>
            </button>
          </>
        ) : (
          <div className="px-5 py-6 text-sm text-gray-500">
            No products match “{query}”. Press enter to search anyway.
          </div>
        )}
      </div>
    </Transition>
  );

  const SearchBar = ({ id }) => (
    <form onSubmit={submitSearch} className="relative w-full">
      <div className="flex w-full items-stretch overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-accent">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          placeholder="Search laptops, phones, brands…"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex items-center gap-2 bg-accent px-4 text-white transition hover:bg-accent-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span className="hidden text-sm font-semibold sm:inline">Search</span>
        </button>
      </div>
      {SearchDropdown()}
    </form>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement marquee */}
      <div className="overflow-hidden bg-primary py-2 text-white">
        <div className="flex w-max animate-marquee whitespace-nowrap text-xs font-medium sm:text-sm">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex items-center">
              <span className="mx-6 inline-flex items-center gap-2">
                ⚡ Quality US/UK used Laptops & Smartphones
              </span>
              <span className="mx-6 inline-flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-accent" /> Payment on Delivery nationwide
              </span>
              <span className="mx-6 inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-accent" /> Free delivery within Ibadan (T&amp;C apply)
              </span>
              <span className="mx-6 inline-flex items-center gap-2">
                🔥 Flash deals every week
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="bg-primary-700 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-lg p-1.5 text-white/90 hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" aria-label="Hayzee Computer Resources — Home" className="flex-shrink-0 transition hover:opacity-90">
            <Logo className="h-11 w-11" />
          </Link>

          {/* Desktop search */}
          <div ref={searchRef} className="hidden flex-1 md:block">
            {SearchBar({ id: "desktop-search" })}
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Mobile search toggle */}
            <button
              type="button"
              onClick={() => setMobileSearch((v) => !v)}
              className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Account */}
            <Link
              href="https://hayzeeonline-referral.hayzeeonline.com"
              className="group hidden items-center gap-2 rounded-lg px-2.5 py-1.5 text-white transition hover:bg-white/10 sm:flex"
            >
              <UserIcon className="h-6 w-6" />
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[11px] text-white/70">Account</span>
                <span className="block text-sm font-semibold">Sign in</span>
              </span>
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setOpenCart(true)}
              className="group relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-white transition hover:bg-white/10"
            >
              <span className="relative">
                <ShoppingBagIcon className="h-6 w-6" />
                {totalQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white ring-2 ring-primary-700">
                    {totalQuantity}
                  </span>
                )}
              </span>
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[11px] text-white/70">Your</span>
                <span className="block text-sm font-semibold">Cart</span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <Transition
          show={mobileSearch}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="px-4 pb-3 md:hidden" ref={searchRef}>
            {SearchBar({ id: "mobile-search" })}
          </div>
        </Transition>
      </div>

      {/* Category strip */}
      <div className="hidden border-b border-gray-200 bg-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {/* All categories popover */}
          <Popover className="relative">
            {({ open: pop }) => (
              <>
                <Popover.Button
                  className={classNames(
                    "flex items-center gap-2 px-4 py-3 text-sm font-semibold transition",
                    pop ? "text-accent" : "text-primary hover:text-accent"
                  )}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                  All Categories
                  <ChevronDownIcon
                    className={classNames(
                      "h-4 w-4 transition-transform",
                      pop && "rotate-180"
                    )}
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 top-full z-50 mt-0 w-[640px] rounded-b-2xl border border-gray-100 bg-white p-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
                          Categories
                        </p>
                        <ul className="grid grid-cols-2 gap-1">
                          {categories.map((category, key) => (
                            <li key={key}>
                              <Popover.Button
                                as={Link}
                                href={`/categories/${category.slug}`}
                                className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-primary-50 hover:text-primary"
                              >
                                {category.name}
                              </Popover.Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
                          Top Brands
                        </p>
                        <ul className="grid grid-cols-2 gap-1">
                          {brands.map((brand, key) => (
                            <li key={key}>
                              <Popover.Button
                                as={Link}
                                href={`/brands/${brand.slug}`}
                                className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-primary-50 hover:text-primary"
                              >
                                {brand.name}
                              </Popover.Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <span className="mx-1 h-5 w-px bg-gray-200" />

          {/* Page links */}
          <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {navigation.pages.map((page) => {
              const active = isActive(page.href);
              return (
                <Link
                  key={page.name}
                  href={page.href}
                  aria-current={active ? "page" : undefined}
                  className={classNames(
                    "relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-3 text-sm transition",
                    active
                      ? page.hot
                        ? "font-semibold text-accent-600"
                        : "font-semibold text-primary"
                      : page.hot
                      ? "font-medium text-accent-600 hover:bg-accent-50"
                      : "font-medium text-gray-700 hover:bg-primary-50 hover:text-primary",
                    active &&
                      "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-accent"
                  )}
                >
                  {page.hot && <span className="text-base leading-none">🔥</span>}
                  {page.name}
                </Link>
              );
            })}
          </div>

          {/* Social links */}
          <div className="ml-3 hidden flex-shrink-0 items-center gap-1 border-l border-gray-200 pl-3 xl:flex">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-primary-50 hover:text-primary"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Mobile menu drawer ---------- */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[60] lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[60] flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-2xl">
                <div className="flex items-center justify-between bg-primary px-4 py-4">
                  <Logo className="h-10 w-auto" wordmark />
                  <button
                    type="button"
                    className="rounded-full p-2 text-white hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-1 px-4 py-4">
                  {navigation.pages.map((page) => {
                    const active = isActive(page.href);
                    return (
                      <Link
                        key={page.name}
                        href={page.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={classNames(
                          "flex items-center gap-2 rounded-lg px-3 py-2.5 font-medium transition",
                          active
                            ? "border-l-4 border-accent bg-primary-50 text-primary"
                            : "text-gray-800 hover:bg-primary-50 hover:text-primary"
                        )}
                      >
                        {page.hot && <span>🔥</span>}
                        {page.name}
                      </Link>
                    );
                  })}
                </div>

                <Tab.Group as="div" className="mt-2">
                  <Tab.List className="flex border-y border-gray-100 bg-gray-50 px-4">
                    {["Categories", "Brands"].map((label) => (
                      <Tab
                        key={label}
                        className={({ selected }) =>
                          classNames(
                            "flex-1 border-b-2 px-3 py-3 text-sm font-semibold outline-none transition",
                            selected
                              ? "border-accent text-primary"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          )
                        }
                      >
                        {label}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className="px-4 py-4">
                      <ul className="space-y-1">
                        {categories.map((category, key) => (
                          <li key={key}>
                            <Link
                              href={`/categories/${category.slug}`}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-gray-600 transition hover:bg-primary-50 hover:text-primary"
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Tab.Panel>
                    <Tab.Panel className="px-4 py-4">
                      <ul className="space-y-1">
                        {brands.map((brand, key) => (
                          <li key={key}>
                            <Link
                              href={`/brands/${brand.slug}`}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-gray-600 transition hover:bg-primary-50 hover:text-primary"
                            >
                              {brand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ---------- Cart Drawer ---------- */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">Shopping Cart</span>
            {totalQuantity > 0 && (
              <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700">
                {totalQuantity} items
              </span>
            )}
          </div>
        }
        placement="right"
        onClose={() => setOpenCart(false)}
        open={openCart}
        className="cart-drawer"
        rootClassName="cart-drawer-root"
        width={400}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
          <button
            type="button"
            className="text-sm font-medium text-primary transition hover:text-accent"
            onClick={() => setOpenCart(false)}
          >
            ← Continue Shopping
          </button>
          {totalQuantity > 0 && (
            <Link
              onClick={() => setOpenCart(false)}
              href="/checkout"
              className="text-sm font-semibold text-green-600 transition hover:text-green-700"
            >
              Checkout →
            </Link>
          )}
        </div>

        <CartQuick />

        {totalQuantity > 0 && (
          <div className="mt-6 border-t border-gray-100 pt-4">
            <Link
              onClick={() => setOpenCart(false)}
              href="/checkout"
              className="btn-accent w-full"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </Drawer>
    </nav>
  );
}
