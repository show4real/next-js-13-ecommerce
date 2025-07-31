"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getAllCats, getBrands } from "/app/services/productService";
import { Button, Drawer } from "antd";
import Logo from "/public/logo5.png";
import CartQuick from "./CartQuick";
import SearchSuggestion from "/app/components/SearchSuggestion";
import useCartStore from "/app/store/zustand";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "./social.css";

const navigation = {
  pages: [
    { name: "Laptops", href: "/laptops" },
    { name: "Apple", href: "/brands/apple-phone" },
    { name: "Android", href: "/brands/android-phone" },
    { name: "Shop", href: "/products" },
    { name: "Flash Sales", href: "/flash-sales" },
    { name: "Black Friday", href: "/black-friday" },
    { name: "Mid Sales", href: "/mid-year-sales" },
    { name: "Promo Sales", href: "/promo-sales" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const showDrawer = () => {
    setOpenCart(true);
  };

  const hideNav = () => {
    setOpen(false);
  };

  const onCloseCart = () => {
    setOpenCart(false);
  };

  const onCloseSearch = () => {
    setOpenSearch(false);
  };

  const showSearchDrawer = () => {
    setOpenSearch(true);
  };

  const { cart } = useCartStore();
  console.log(cart);

  const clearCart = useCartStore((state) => state.clearCart);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchBrands = () => {
    setLoading(true);
    getBrands().then(
      (res) => {
        setBrands(res.brands);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
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
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'shadow-lg' : ''}`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
        <p className="text-center px-4 py-3 text-sm sm:text-sm lg:text-base font-medium text-white">
          <span className="text-blue-100 animate-pulse">
            ⚡ Quality Gadgets | Laptops | Smartphones | Payment on Delivery within Nigeria 
            <span className="hidden sm:inline"> | Free Delivery Within Ibadan (T&C Apply)</span>
          </span>
        </p>
      </div>

      <div className="bg-white shadow-md border-b border-gray-100">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
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
                  <div className="flex px-4 pb-2 pt-5 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-gray-700 hover:bg-white transition-colors duration-200"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2 border-t border-gray-100 px-4 py-6" style={{marginTop:100}}>
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link
                          href={page.href}
                          onClick={() => setOpen(false)}
                          className="-m-2 block p-3 font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Tabs */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-100 bg-gray-50">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        <Tab
                          key="categories"
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-blue-500 text-blue-600 bg-white"
                                : "border-transparent text-gray-600 hover:text-gray-800",
                              "flex-1 whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold rounded-t-lg transition-all duration-200"
                            )
                          }
                        >
                          Categories
                        </Tab>
                        <Tab
                          key="brands"
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-blue-500 text-blue-600 bg-white"
                                : "border-transparent text-gray-600 hover:text-gray-800",
                              "flex-1 whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold rounded-t-lg transition-all duration-200"
                            )
                          }
                        >
                          Brands
                        </Tab>
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      <Tab.Panel
                        key="categories"
                        className="space-y-10 px-4 pb-8 pt-6"
                      >
                        <div>
                          <ul
                            role="list"
                            aria-labelledby={`heading-mobile`}
                            className="mt-0 flex flex-col space-y-3"
                          >
                            {!loading &&
                              categories.map((category, key) => (
                                <li className="flow-root" key={key}>
                                  <Link
                                    href={`/categories/${category.slug}`}
                                    className="-m-2 block p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    onClick={() => setOpen(false)}
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel
                        key="brands"
                        className="space-y-10 px-4 pb-8 pt-6"
                      >
                        <div>
                          <ul
                            role="list"
                            aria-labelledby={`heading-mobile`}
                            className="mt-0 flex flex-col space-y-3"
                          >
                            {!loading &&
                              brands.map((brand, key) => (
                                <li className="flow-root" key={key}>
                                  <Link
                                    href={`/brands/${brand.slug}`}
                                    className="-m-2 block p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    onClick={() => setOpen(false)}
                                  >
                                    {brand.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative rounded-lg bg-white p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 lg:hidden transition-colors duration-200"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="flex lg:ml-0">
                <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                  <Image
                    src={Logo}
                    alt="Hayzeeonline Computer resources"
                    width={50}
                    height={50}
                    placeholder="blur"
                    quality={100}
                    className="rounded-lg"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch lg:flex-1">
                <div className="flex h-full ">
                  {navigation.pages.map((page, key) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    >
                      {page.name}
                    </Link>
                  ))}
                  
                  {/* Collections Dropdown */}
                  <Popover className="flex">
                    {({ open }) => (
                      <>
                        <div key={1} className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? "border-blue-500 text-blue-600 bg-blue-50"
                                : "border-transparent text-gray-700 hover:text-blue-600 hover:bg-blue-50",
                              "relative z-10 -mb-px flex items-center border-b-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg"
                            )}
                          >
                            Collections
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-50">
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow-xl rounded-lg"
                              aria-hidden="true"
                            />

                            <div className="relative bg-white rounded-lg shadow-xl border border-gray-100">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid gap-x-8 gap-y-10 py-16">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
                                    <div>
                                      <p
                                        id={`clothing-heading`}
                                        className="font-semibold text-gray-900 text-base mb-6"
                                      >
                                        Categories
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`clothing-heading`}
                                        className="mt-6 sm:mt-4 grid grid-cols-3 gap-4 sm:gap-6"
                                      >
                                        {!loading &&
                                          categories.map((category, key) => (
                                            <li
                                              className="flow-root"
                                              key={key}
                                            >
                                              <Link
                                                href={`/categories/${category.slug}`}
                                                className="-m-2 block p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                onClose={() => {
                                                  hideNav();
                                                }}
                                              >
                                                {category.name}
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <p
                                        id={`brands-heading`}
                                        className="font-semibold text-gray-900 text-base mb-6"
                                      >
                                        Brands
                                      </p>
                                      <ul
                                        key={1}
                                        role="list"
                                        aria-labelledby={`brands-heading`}
                                        className="mt-6 sm:mt-4 grid grid-cols-3 gap-4 sm:gap-6"
                                      >
                                        {brands.map((brand, key) => (
                                          <li className="flex" key={key}>
                                            <Link
                                              href={`/brands/${brand.slug}`}
                                              className="block p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                            >
                                              {brand.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </Popover.Group>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-2">
                {/* Search Button */}
                <button
                  type="button"
                  onClick={showSearchDrawer}
                  className="group flex items-center p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-blue-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="text-xs font-semibold text-blue-500 ml-2 hidden sm:block">
                    Search
                  </span>
                </button>

                {/* Cart Button */}
                <button
                  type="button"
                  onClick={showDrawer}
                  className="group relative flex items-center p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-blue-500 group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {totalQuantity}
                    </span>
                  )}
                  <span className="ml-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 hidden sm:block">
                    Cart
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </button>

                {/* User/Account Button */}
                <Link
                  href="https://hayzeeonline-referral.hayzeeonline.com"
                  className="group flex items-center p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  <UserIcon
                    className="h-6 w-6 flex-shrink-0 text-blue-500 group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-xs font-semibold text-blue-500 hidden sm:block">
                    Account
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Search Drawer */}
        <Drawer
          title={
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faSearch} className="text-blue-500" />
              <span>Quick Search</span>
            </div>
          }
          placement="right"
          onClose={onCloseSearch}
          open={openSearch}
          className="search-drawer"
          width={400}
        >
          <div className="mt-0 mb-4 flex justify-center text-center text-sm text-gray-500">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              onClick={onCloseSearch}
            >
              ← Back to Menu
            </button>
          </div>
          <SearchSuggestion onCloseSearch={onCloseSearch} />
        </Drawer>

        {/* Cart Drawer */}
        <Drawer
          title={
            <div className="flex items-center space-x-2">
              <ShoppingBagIcon className="h-5 w-5 text-blue-500" />
              <span>Shopping Cart</span>
              {totalQuantity > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {totalQuantity} items
                </span>
              )}
            </div>
          }
          placement="right"
          onClose={onCloseCart}
          open={openCart}
          className="cart-drawer"
          width={400}
        >
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              onClick={onCloseCart}
            >
              ← Continue Shopping
            </button>
            {totalQuantity > 0 && (
              <Link
                onClick={onCloseCart}
                href="/checkout"
                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                Checkout →
              </Link>
            )}
          </div>
          
          <CartQuick />
          
          {totalQuantity > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                onClick={onCloseCart}
                href="/checkout"
                className="flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </Drawer>
      </div>
    </nav>
  );
}