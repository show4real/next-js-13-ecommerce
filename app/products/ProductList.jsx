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
import { Button, Drawer, Space, Row, Pagination } from "antd";
import { MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";
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
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faTimes } from "@fortawesome/free-solid-svg-icons";

import CategorySlider from "app/categories/CategorySlider";

const { Option } = Select;

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
  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState(null);
  const [sort, setSorting] = useState(null);
  const [price, setPrice] = useState([4000, 1000000]);
  const [search_all, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [triggeredLoadMore, setTriggeredLoadMore] = useState(false);

  const [mobileFilter, setFilter] = useState(false);
  const [filterPosition, setFilterPosition] = useState("left");
  const [showBadge, setShowBadge] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleCloseBadge = () => {
    setShowBadge(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showFilter = () => {
    setFilter(true);
  };

  const onCloseFilter = () => {
    setFilter(false);
  };

  useEffect(() => {
    fetchProducts();

    fetchBrands();
    fetchCategories();
  }, [brand, rams, sort, storages, processors, category, rows, page]);

  const fetchProducts = async (retryCount = 3) => {
    setLoading(true);

    try {
      if (productSection === "Trending Products") {
        const res = await getProducts({
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
        setProducts(res.products.data);
        setTotal(res.products.total);
      } else if (productSection === "Laptops") {
        const res = await getLaptopProducts({
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
        setProducts(res.products.data);
        setTotal(res.products.total);
      } else {
        const res = await getCategoryProducts({
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
        setProducts(res.products.data);
        setTotal(res.products.total);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (retryCount > 0) {
        // Retry the request
        console.log(`Retrying... attempts left: ${retryCount}`);
        await fetchProducts(retryCount - 1);
      } else {
        setLoading(false);
        // Handle failure here
        console.error("Failed to fetch products after multiple attempts");
      }
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
        // setTimeout(() => {
        //   setLoading(false);
        // }, 3000);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const handlePrice = (newPrice) => {
    setPrice(newPrice);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleStorage = (selectedOptions) => {
    setStorages(selectedOptions);
  };

  const handleBrand = (value) => {
    setBrand(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleProcessor = (selectedOptions) => {
    setProcessors(selectedOptions);
  };

  const handleRam = (selectedOptions) => {
    setRams(selectedOptions);
  };

  const handleSorting = (sort) => {
    setSorting(sort);
  };
  const onPage = async (page, rows) => {
    setPage(page);
    setRows(rows);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    await fetchProducts();
  };

  const AllFilter = () => {
    return (
      <>
        <div>
          {console.log(categoryslug)}
          {categoryslug == "" && (
            <CategorySelect
              categories={categories}
              category={category}
              handleCategory={handleCategory}
            />
          )}
        </div>
        <div>
          {brandslug == "" && (
            <BrandSelect
              brands={brands}
              brand={brand}
              handleBrand={handleBrand}
            />
          )}
        </div>
        <div>
          <StorageSelect storages={storages} handleStorage={handleStorage} />
        </div>
        <div>
          <RamSelect rams={rams} handleRam={handleRam} />
        </div>
        <div>
          <ProcessorSelect
            processors={processors}
            handleProcessor={handleProcessor}
          />
        </div>
      </>
    );
  };

  const addSlug = (str) => {
    return str.toLowerCase().split(" ").join("-");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-7 sm:py-24 lg:max-w-7xl lg:px-8">
        <SocialIconMenu categoryslug="" brandslug="" flash_sale={flash_sale} />

        <h2 className="text-xl font-medium leading-4 tracking-tight text-gray-900 mt-16">
          {productSection}
        </h2>

        {loading && <CarouselHolder />}
        {!loading && (
          <>
            <div>
              <div className="hidden lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 justify-center pt-8 pb-5">
                <div className="col-start-2 col-span-4">
                  <div className="mb-3 pt-4">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                      <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1"
                        value={search_all}
                        onChange={handleSearch}
                      />

                      <Link
                        className="relative z-[2] flex items-center rounded-r bg-primary px-1 md:px-3 lg:px-3 xl:px-3 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        href={`/search/${addSlug(search_all)}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden md:hidden xl:hidden ">
              <>
                <Space>
                  <div className="mobile-off-canvas d-block d-lg-none pt-10">
                    <div>
                      <Button
                        onClick={showFilter}
                        style={{
                          backgroundColor: "",
                          // color: "#0E1B4D",
                          paddingTop: 0,
                          // borderColor: "#0E1B4D",
                        }}
                      >
                        {/* <MenuUnfoldOutlined /> */}
                        <span className="font-medium pt-1 text-small">
                          Show Product Filter
                        </span>
                        <DownOutlined
                          onClick={showFilter}
                          style={{ paddingLeft: 5, bottom: 20 }}
                        />
                      </Button>
                    </div>
                    <div className="pt-5">
                      <Select
                        placeholder={
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            Sort By
                          </span>
                        }
                        placement="bottomLeft"
                        style={{
                          border: "none",
                          boxShadow: "none",
                          height: 35,
                          color: "black",
                        }}
                        value={sort}
                        onChange={handleSorting}
                        dropdownStyle={{ minWidth: 300, textAlign: "center" }}
                        className="w-full"
                      >
                        <option value="">All</option>
                        <option value="availability">Availability</option>
                        <option value="name-asc">Alphabetically, A-Z</option>
                        <option value="name-desc">Alphabetically, Z-A</option>
                        <option value="low-price">Price, low to high</option>
                        <option value="high-price">Price, high to low</option>
                        <option value="date-asc">Date, old to new</option>
                        <option value="date-desc">Date, new to old</option>
                      </Select>
                    </div>
                  </div>
                </Space>
                <Drawer
                  title="Filter Products"
                  placement={filterPosition}
                  width={330}
                  onClose={onCloseFilter}
                  open={mobileFilter}
                >
                  <div className="flex flex-col space-y-11">
                    <div>
                      <PriceSelect
                        price={price}
                        handlePrice={handlePrice}
                        fetchProducts={fetchProducts}
                      />
                    </div>
                    <AllFilter />
                  </div>
                </Drawer>
              </>
            </div>
            <div className="hidden lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 xl:grid xl:grid-cols-3 gap-8 pt-5">
              <div>
                <PriceSelect
                  price={price}
                  handlePrice={handlePrice}
                  fetchProducts={fetchProducts}
                />
              </div>
              <AllFilter />
              <SortSelect sort={sort} handleSorting={handleSorting} />
            </div>
          </>
        )}

        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!loading &&
            products.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
        </div>
        <div>
          {newLoading && (
            <div style={{ textAlign: "center" }}>
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
              </div>
            </div>
          )}
          {!loading &&
            products.length > 0 &&
            productSection == "Trending Products" && (
              <div
                style={{
                  textAlign: "center",

                  alignItems: "center",
                }}
              >
                {/* <button onClick={handleLoadMore} className="load-more-button">
                  Load More
                </button> */}
                <Link href="/products">
                  <button
                    // onClick={handleLoadMore}
                    href="#_"
                    className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 bg-slate-800 rounded-full shadow-md group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-slate-700 group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      Shop More
                    </span>
                    <span className="relative invisible">Shop More</span>
                  </button>
                </Link>
              </div>
            )}

          {products.length > 0 && productSection != "Trending Products" && (
            <Pagination
              total={total}
              showTotal={(total) => `Total ${total} Products`}
              onChange={onPage}
              pageSize={rows}
              current={page}
            />
          )}
          {!loading && products.length < 1 && (
            <div className="text-gray-200 font-md p-16 justify-center">
              <i className="fa fa-ban" style={{ marginRight: 5 }} />
              No Products found
            </div>
          )}
        </div>
        <div>
          {showBadge && (
            <div className="fixed bottom-5 right-5 z-50 bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center">
              <div className="mr-2">
                <FontAwesomeIcon icon={faGift} />
              </div>
              <button className="mr-2" onClick={handleOpenModal}>
                Refer and Earn
              </button>
              <div className="cursor-pointer" onClick={handleCloseBadge}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          )}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg w-11/12 md:max-w-md">
                <div className="text-right">
                  <button onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <p className="text-lg font-semibold my-4">
                  INVITE & GET 5% COMMISSION FROM FRIEND'S ORDERS
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Send your friends a 2% discount off their purchase. Once they
                  make a purchase, you'll earn 5% commission for each order as
                  well! This reward can be redeemed for coupons.
                </p>
                <input
                  className="border-2 border-gray-300 rounded-md p-2 my-4 w-full"
                  type="text"
                  placeholder="Enter your email"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                  onClick={handleCloseModal}
                >
                  Get Invite Link
                </button>
              </div>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
