import React, { useState, useEffect } from "react";
import { getQuickSearch } from "/app/services/productService";
import { Slider, Select, InputNumber, Button } from "antd";
import Link from "next/link";
import SearchSelect from "/app/components/SearchSelect";
import { sort } from "fast-sort";
const { Option } = Select;

const SearchSuggestion = () => {
  const [search_all, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(query);
    setSearch(query);
  };

  useEffect(() => {
    fetchProducts();
  }, [search_all]);

  // const fetchProducts = () => {
  //   setLoading(true);

  //   try {
  //     const res = getQuickSearch({
  //       search_all,
  //     });
  //     setProducts(res.products);
  //     console.log(res);

  //     setTotal(res.products.length);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const fetchProducts = () => {
    setLoading(true);
    getQuickSearch({ search_all }).then(
      (res) => {
        setProducts(res.products);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    console.log(value);
    setSearch(value);
  };

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search_all}
        onChange={handleSearchChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
      />
      {
        console.log(products)

        /* <div>
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            value={search_all}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchProducts();
              }
            }}
          />

          <button
            className="relative z-[2] flex items-center rounded-r bg-primary px-1 md:px-3 lg:px-3 xl:px-3 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="button"
            id="button-addon1"
            // onClick={fetchProducts()}
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
          </button>
        </div>
      </div> */
      }
      {loading && <p>Loading suggestions...</p>}
      {search_all !== "" && products.length > 0 && (
        <div className="flex h-full flex-col overflow-y-scroll">
          <div className="flex-1 overflow-y-auto px-4 py-0 sm:px-6">
            <div className="mt-2">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {sort(products)
                    .desc((item) => item.availability == 1)
                    .map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                          <img
                            src={product.image}
                            alt={"Product Image"}
                            className="h-full w-full object-cover object-center"
                          />
                          {product.availability && (
                            <div className="absolute top-0 right-0 ">
                              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                Stock
                              </span>
                            </div>
                          )}
                          {!product.availability && (
                            <div className="absolute top-0 right-0 ">
                              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                Sold
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3>
                                <a href={`/products/${product.slug}`}>
                                  {product.name}
                                </a>
                              </h3>
                              <p className="ml-4">
                                {" "}
                                &#8358;{formatNumber(product.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <Link
                href={`../search/${convertToSlug(search_all)}`}
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 bg-blue-700 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
                  <svg
                    class="w-6 h-6"
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
                <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  View all results
                </span>
                <span class="relative invisible">View all results</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestion;
