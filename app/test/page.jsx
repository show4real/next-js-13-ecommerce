"use client";
import React, { useState } from "react";
import Link from "next/link";
const suggestions = [
  "dell laptop",
  "dell inspiron",
  "hp 1030 g4",
  "hp 1030 g3",
  "dell latitued",
  "apple m1",
];

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const addSlug = (str) => {
    return str.toLowerCase().split(" ").join("-");
  };

  return (
    <div className="relative text-gray-600 mt-40">
      {/* <input
        type="search"
        name="search"
        placeholder="Search"
        value={searchValue}
        onChange={handleInputChange}
        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-64"
      /> */}

      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
          value={searchValue}
          onChange={handleInputChange}
        />

        <Link
          className="relative z-[2] flex items-center rounded-r bg-primary px-1 md:px-3 lg:px-3 xl:px-3 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          href={`/search/${addSlug(searchValue)}`}
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
      {searchValue && (
        <ul className="absolute z-10 w-64 bg-white rounded-b-lg shadow-lg mt-1">
          {filteredSuggestions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-orange-400"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
