"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  getAllBrands,
  getAllCats,
  getBrands,
} from "../../services/productService";
import { Button, Drawer } from "antd";
import Logo from "../../public/logo5.png";

import CartQuick from "./CartQuick";

import useCartStore from "../store/zustand";
import Image from "next/image";

const navigation = {
  pages: [
    { name: "Laptops and Ultrabook", href: "/categories/laptop-ultrabook" },
    { name: "Apple", href: "/brands/apple-phone" },
    { name: "Android", href: "/brands/android-phone" },
    { name: "Shop", href: "/products" },
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

  const showDrawer = () => {
    setOpenCart(true);
  };
  const onCloseCart = () => {
    setOpenCart(false);
  };

  const { cart } = useCartStore();
  console.log(cart);

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
    <nav className="fixed top-0 left-0 right-0 z-10">
      <div className="bg-white">
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
              <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        <Tab
                          // key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          Sections
                        </Tab>
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      <Tab.Panel
                        // key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div>
                          <p
                            id={`heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            Categories
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {!loading &&
                              categories.map((category) => (
                                <li className="flow-root">
                                  <a
                                    href={`/categories/${category.slug}`}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {category.name}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <a
                        href="#"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <a
                        href="#"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </a>
                    </div>
                  </div> */}

                  {/* <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://tailwindui.com/img/flags/flag-nigeria.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-base font-medium text-gray-900">
                        NG
                      </span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p> */}

          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-2 flex lg:ml-0">
                  <a href="/">
                    <Image
                      src={Logo}
                      alt="Hayzeeonline Computer resources"
                      width={50}
                      placeholder="blur"
                      quality={100}
                    />
                  </a>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                    <Popover className="flex">
                      {({ open }) => (
                        <>
                          <div key={1} className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              Collections
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid  gap-x-8 gap-y-10 py-16">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
                                      <div>
                                        <p
                                          id={`clothing-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          Categories
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`clothing-heading`}
                                          className="mt-6 sm:mt-4 grid grid-cols-3 gap-4 sm:gap-6"
                                        >
                                          {!loading &&
                                            categories.map((category) => (
                                              <li className="flow-root">
                                                <a
                                                  href={`/categories/${category.slug}`}
                                                  className="-m-2 block p-2 text-gray-500"
                                                >
                                                  {category.name}
                                                </a>
                                              </li>
                                            ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <p
                                          id={`clothing-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          Brands
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`clothing-heading`}
                                          className="mt-6 sm:mt-4 grid grid-cols-3 gap-4 sm:gap-6"
                                        >
                                          {brands.map((brand) => (
                                            <li className="flex">
                                              <a
                                                href={`/brands/${brand.slug}`}
                                                className="hover:text-gray-800"
                                              >
                                                {brand.name}
                                              </a>
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

                <div className="ml-auto flex items-center">
                  {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </a>
                  </div>

                  <div className="hidden lg:ml-8 lg:flex">
                    <a
                      href="#"
                      className="flex items-center text-gray-700 hover:text-gray-800"
                    >
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium">NG</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div> */}

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <a
                      href="#"
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <>
                      <button
                        type="primary"
                        onClick={showDrawer}
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {totalQuantity}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </button>

                      <Drawer
                        title="Shopping Cart"
                        placement="right"
                        onClose={onCloseCart}
                        open={openCart}
                      >
                        <div className="mt-0 mb-2 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={onCloseCart}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                        <CartQuick />
                      </Drawer>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </nav>
  );
}
