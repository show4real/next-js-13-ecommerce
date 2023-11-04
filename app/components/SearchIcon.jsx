import React, { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Popover, Space } from "antd";
import SearchSelect from "./SearchSelect";
import SearchSuggestion from "./SearchSuggestion";

const onCloseSearch = () => {
  setOpenSearch(false);
};

const showSearchDrawer = () => {
  setOpenSearch(true);
};
const content = (
  <div className="w-80">
    <SearchSuggestion onCloseSearch={onCloseSearch} />
  </div>
);
const SearchIcon = () => (
  <Space wrap>
    <Popover content={content} trigger="click">
      <button class="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 p-2 rounded-full focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </button>
    </Popover>
  </Space>
);
export default SearchIcon;
