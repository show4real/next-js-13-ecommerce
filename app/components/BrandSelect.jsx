import React from "react";
import { Select } from "antd";
const { Option } = Select;

const BrandSelect = ({ brand, brands, handleBrand }) => {
  return (
    <Select
      placeholder={
        <span style={{ fontWeight: "bold", color: "black" }}>BRAND</span>
      }
      style={{
        width: "100%",
        borderRadius: 20,
        height: 50,
        borderColor: "#0E1B4D",
      }}
      value={brand}
      onChange={handleBrand}
    >
      <Option value="">All Brands</Option>
      {brands.map((brand, index) => (
        <Option key={index} value={brand.id}>
          {brand.name}
        </Option>
      ))}
    </Select>
  );
};
export default BrandSelect;
