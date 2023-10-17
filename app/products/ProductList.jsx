"use client";
import {
  getProducts,
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

export default function ProductList({
  productSection,
  sale_type,
  brandslug,
  categoryslug,
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

  const showFilter = () => {
    setFilter(true);
  };

  const onCloseFilter = () => {
    setFilter(false);
  };

  useEffect(() => {
    // if (
    //   productSection == "Trending Products" &&
    //   products.length > 0 &&
    //   triggeredLoadMore
    // ) {
    //   loadMoreProducts();
    //   setTriggeredLoadMore(false);
    // } else {
    //   fetchProducts();
    // }

    fetchProducts();

    fetchBrands();
    fetchCategories();
  }, [brand, rams, sort, storages, processors, category, rows, page]);

  const fetchProducts = async () => {
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
        //setProducts((prevProducts) => [...prevProducts, ...res.products.data]);
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
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    setNewLoading(true);
    getProducts({
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
    }).then(
      (res) => {
        setProducts((prevProducts) => [...prevProducts, ...res.products.data]);
        setTotal(res.products.total);
        setNewLoading(false);
      },
      (error) => {
        setNewLoading(false);
      }
    );
  };

  const handleLoadMore = () => {
    // setPage(page + 1);
    // setTriggeredLoadMore(true);

    window.location.href = "/shop";
  };

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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <SocialIconMenu />
        <h2 className="text-2xl font-medium leading-4 tracking-tight text-gray-900 mt-16">
          {productSection}
        </h2>

        {loading && <CarouselHolder />}
        {!loading && products.length > 0 && (
          <>
            <div>
              <div className="grid grid-cols-6 justify-center pt-8 pb-5">
                <div className="col-start-2 col-span-4">
                  <SearchSelect
                    search_all={search_all}
                    handleSearch={handleSearch}
                    fetchProducts={fetchProducts}
                  />
                </div>
              </div>
            </div>
            <div className="lg:hidden md:hidden xl:hidden ">
              <>
                <Space>
                  <div className="mobile-off-canvas d-block d-lg-none flex justify-evenly pt-10">
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
                    <div className="pl-10">
                      <SortSelect sort={sort} handleSorting={handleSorting} />
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
                <button
                  onClick={handleLoadMore}
                  href="#_"
                  className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 bg-blue-700 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
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
      </div>
    </div>
  );
}
