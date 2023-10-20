import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { Slider, Select, InputNumber, Button } from "antd";
import Link from "next/link";
const { Option } = Select;

const SearchSuggestion = () => {
  const [search_all, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(12);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([4000, 1000000]);
  const [sort, setSort] = useState(null);

  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getProducts({
        page,
        rows,
        price,
        rams,
        storages,
        processors,
        search_all,
        sort,
      });
      setProducts(res.products.data);
    } catch (error) {
      console.error("Error fetching search suggestions", error);
    }
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleParser = (inputValue) => {
    // Only accept valid numeric values
    const numericValue = parseInt(inputValue, 10);
    return isNaN(numericValue) ? "" : numericValue;
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  useEffect(() => {
    if (search_all.trim() === "") {
      setProducts([]);
      setLoading(false);
    }
    fetchProducts();
  }, [search_all, sort]);

  const handlePrice = (newPrice) => {
    setPrice(newPrice);
  };

  const handleSort = (sort) => {
    setSort(sort);
  };

  const handleLoadMore = () => {
    // setPage(page + 1);
    // setTriggeredLoadMore(true);

    window.location.href = `/search/${search_all}`;
  };

  return (
    <div>
      {search_all && (
        <div className="col-span-2 mb-5">
          <Select
            placeholder={<span style={{ fontWeight: "bold" }}>Sort By</span>}
            placement="bottomLeft"
            style={{ border: "none", boxShadow: "none", height: 35 }}
            value={sort}
            onChange={handleSort}
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
      )}
      <input
        type="text"
        placeholder="Search..."
        value={search_all}
        onChange={handleSearchChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
      />
      {loading && <p>Loading suggestions...</p>}
      {!search_all == "" && products.length > 0 && (
        <div className="flex h-full flex-col overflow-y-scroll">
          <div className="flex-1 overflow-y-auto px-4 py-0 sm:px-6">
            <div className="mt-2">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.image}
                          alt={"Product Image"}
                          className="h-full w-full object-cover object-center"
                        />
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
                href={`${search_all}`}
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
                  All Search
                </span>
                <span class="relative invisible">All Search</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestion;
