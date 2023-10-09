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

  const [rows, setRows] = useState(10);
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

  const [mobileFilter, setFilter] = useState(false);
  const [filterPosition, setFilterPosition] = useState("left");

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
        //setProducts(res.products.data);
        setProducts((prevProducts) => [...prevProducts, ...res.products.data]);
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

  const handleLoadMore = () => {
    setPage(page + 1);
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
        <div>
          <div class="grid grid-cols-6 justify-center pt-8 pb-5">
            <div className="col-start-2 col-span-4">
              <SearchSelect
                search_all={search_all}
                handleSearch={handleSearch}
                fetchProducts={fetchProducts}
              />
            </div>
          </div>
        </div>
        <div className="lg:hidden md:hidden xl:hidden pt-5">
          <>
            <Space>
              <div
                className="same-style mobile-off-canvas d-block d-lg-none"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={showFilter}
                  style={{
                    backgroundColor: "",
                    color: "#0E1B4D",
                    paddingTop: 0,
                    borderColor: "#0E1B4D",
                  }}
                >
                  {/* <MenuUnfoldOutlined /> */}
                  <span className="font-bold pt-1 text-base">Filter</span>
                  <DownOutlined
                    onClick={showFilter}
                    style={{ paddingLeft: 10, bottom: 30 }}
                  />
                </Button>
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
        <div className="hidden  lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 xl:grid xl:grid-cols-3 gap-8 pt-5">
          <div>
            <PriceSelect
              price={price}
              handlePrice={handlePrice}
              fetchProducts={fetchProducts}
            />
          </div>
          <AllFilter />
        </div>
        <div className="flex pt-10 justify-end">
          <div className="order-last">
            <SortSelect sort={sort} handleSorting={handleSorting} />
          </div>
        </div>
        {loading && <CarouselHolder />}

        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!loading &&
            products.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          {productSection === "Trending Products" &&
            !loading &&
            products.length > 0 && (
              <button onClick={handleLoadMore}>More Products</button>
            )}
          {products.length > 0 && (
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
