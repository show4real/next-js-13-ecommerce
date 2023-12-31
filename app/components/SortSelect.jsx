import React from "react";

import { Select } from "antd";
const { Option } = Select;

const SortSelect = ({ sort, handleSorting }) => {
  return (
    <Select
      placeholder={
        <span style={{ fontWeight: "bold", color: "black" }}>Sort By</span>
      }
      placement="bottomLeft"
      style={{ border: "none", boxShadow: "none", height: 35, color: "black" }}
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
  );
};

export default SortSelect;
