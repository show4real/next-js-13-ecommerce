import React from "react";
import { Select } from "antd";
const { Option } = Select;

const CategorySelect = ({ category, categories, handleCategory }) => {
  return (
    <Select
      placeholder={
        <span style={{ fontWeight: "bold", color: "black" }}>Category</span>
      }
      style={{ width: "100%", borderRadius: 20, height: 50 }}
      value={category}
      onChange={handleCategory}
    >
      <Option value="">All Categories</Option>
      {categories.map((category, index) => (
        <Option key={index} value={category.id}>
          {category.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
