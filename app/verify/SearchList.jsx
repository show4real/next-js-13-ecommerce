"use client";
import {
  getSearchProducts,
  getBrands,
  getCategories,
  getAllCats,
  getCategoryProducts,
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
import { sort } from "fast-sort";

import { Select } from "antd";

const suggestions = [
  "dell laptop",
  "dell inspiron",
  "hp 1030 g4",
  "hp 1030 g3",
  "dell latitued",
  "apple m1",
];

export default function SearchList({ search }) {
  const [products, setProducts] = useState([]);

  const [rows, setRows] = useState(100);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(products.length);

  const [brands, setBrands] = useState([]);
  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort_value, setSorting] = useState("availability");
  const [price, setPrice] = useState([4000, 5000000]);
  const [search_all, setSearch] = useState(search.trim());
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);

  const [mobileFilter, setFilter] = useState(false);
  const [filterPosition, setFilterPosition] = useState("left");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

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
  }, [brand, rams, storages, processors, category, rows, page]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await getSearchProducts({
        page,
        rows,
        price,
        brand,
        rams,

        storages,
        processors,
        category,
        search_all,
      });
      setProducts(res.products.data);
      //setProducts((prevProducts) => [...prevProducts, ...res.products.data]);
      setTotal(products.length);
      setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 3000);
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
        // setTimeout(() => {
        //   setLoading(false);
        // }, 3000);
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

  // const handleSearch = (event) => {
  //   const value = event.target.value;
  //   setSearch(value);
  // };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
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

  const handleSorting = (sort_value) => {
    setSorting(sort_value);
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
          <CategorySelect
            categories={categories}
            category={category}
            handleCategory={handleCategory}
          />
        </div>
        <div>
          <BrandSelect
            brands={brands}
            brand={brand}
            handleBrand={handleBrand}
          />
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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <SocialIconMenu />

        {loading && <CarouselHolder />}
        {!loading && (
          <>
            {console.log(
              sort(products).asc((item) => new Date(item.created_at))
            )}
            <div>
              <div className="grid grid-cols-6 justify-center pt-8 pb-5">
                <div className="col-start-2 col-span-4">
                  <SearchSelect
                    search_all={search_all}
                    handleSearch={handleSearch}
                    fetchProducts={fetchProducts}
                    filteredSuggestions={filteredSuggestions}
                  />
                </div>
              </div>
            </div>
            <div className="lg:hidden md:hidden xl:hidden ">
              <div>
                <h2 className="text-sm font-medium tracking-tight text-gray-700 pt-3 pb-4 text-center">
                  Search Result for{" "}
                  <span className="text-orange-400 capitalize">
                    {search_all} {products.length}
                  </span>{" "}
                  products
                </h2>
              </div>
              <div>
                <Select
                  placeholder={
                    <span style={{ fontWeight: "bold" }}>Sort By</span>
                  }
                  placement="bottomLeft"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    height: 35,
                  }}
                  value={sort_value}
                  onChange={handleSorting}
                  dropdownStyle={{ minWidth: 300, textAlign: "center" }}
                >
                  <option value="availability">Availability</option>
                  <option value="name-asc">Alphabetically, A-Z</option>
                  <option value="name-desc">Alphabetically, Z-A</option>
                  <option value="low-price">Price, low to high</option>
                  <option value="high-price">Price, high to low</option>
                </Select>
              </div>
              <>
                <Space>
                  <div className="mobile-off-canvas d-block d-lg-none pt-10 ">
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

              <Select
                placeholder={
                  <span style={{ fontWeight: "bold" }}>Sort By</span>
                }
                placement="bottomLeft"
                style={{ border: "none", boxShadow: "none", height: 35 }}
                value={sort_value}
                onChange={handleSorting}
                dropdownStyle={{ minWidth: 300, textAlign: "center" }}
                className="w-full"
              >
                <option value="availability">Availability</option>
                <option value="name-asc">Alphabetically, A-Z</option>
                <option value="name-desc">Alphabetically, Z-A</option>
                <option value="low-price">Price, low to high</option>
                <option value="high-price">Price, high to low</option>
                {/* <option value="date-asc">Date, old to new</option>
                <option value="date-desc">Date, new to old</option> */}
              </Select>
              <div>
                <h2 className="text-sm md:text-lg font-medium tracking-tight text-gray-500 mt-16">
                  Search Result for {search_all} {products.length} products
                </h2>
              </div>
            </div>
          </>
        )}

        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!loading &&
            sort_value == "availability" &&
            sort(products)
              .desc((item) => item.availability == 1)
              .map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
          {!loading &&
            sort_value == "name-asc" &&
            sort(products)
              .asc((item) => item.name)
              .map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
          {!loading &&
            sort_value == "name-desc" &&
            sort(products)
              .desc((item) => item.name)
              .map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
          {!loading &&
            sort_value == "low-price" &&
            sort(products)
              .asc((item) => item.price)
              .map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
          {!loading &&
            sort_value == "high-price" &&
            sort(products)
              .desc((item) => item.price)
              .map((product, key) => (
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
          {!loading && products.length > 0 && (
            <div
              style={{
                textAlign: "center",

                alignItems: "center",
              }}
            >
              {/* <button onClick={handleLoadMore} className="load-more-button">
                  Load More
                </button> */}
            </div>
          )}

          {/* {products.length > 0 && (
            <Pagination
              total={total}
              showTotal={(total) => `Total ${total} Products`}
              onChange={onPage}
              pageSize={rows}
              current={page}
            />
          )} */}
          {!loading && products.length < 1 && (
            <div className="text-gray-200 font-md p-16 justify-center">
              <i className="fa fa-ban" style={{ marginRight: 5 }} />
              No Products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
