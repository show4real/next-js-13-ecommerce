import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

const SearchSuggestion = () => {
  const [search_all, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(12);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([4000, 1000000]);

  const [storages, setStorages] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRams] = useState([]);

  // Function to fetch search suggestions from the API
  const fetchProducts = async () => {
    try {
      // Make an API call to get search suggestions based on the query
      const res = await getProducts({
        page,
        rows,
        price,
        rams,
        storages,
        processors,
        search_all,
      });
      setProducts(res.products.data);
    } catch (error) {
      console.error("Error fetching search suggestions", error);
    }
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    // // Fetch suggestions when the query is not empty
    // if (query.trim() !== "") {
    //   setLoading(true);
    //   fetchProducts();
    // } else {
    //   setProducts([]); // Clear suggestions when the query is empty
    // }
  };

  useEffect(() => {
    // Reset suggestions when the search input is cleared
    if (search_all.trim() === "") {
      setProducts([]);
      setLoading(false);
    }
    fetchProducts();
  }, [search_all]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search_all}
        onChange={handleSearchChange}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
      />
      {loading && <p>Loading suggestions...</p>}
      {!search_all == "" && (
        <div className="flex h-full flex-col overflow-y-scroll">
          <div className="flex-1 overflow-y-auto px-4 py-0 sm:px-6">
            <div className="mt-0">
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
              <p>Subtotal</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestion;
