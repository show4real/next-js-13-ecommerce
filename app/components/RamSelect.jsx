import React from "react";
import { Select, Checkbox } from "antd";
const { Option } = Select;

const RamSelect = ({ rams, handleRam }) => {
  const ramsList = [
    "2GB",
    "4GB",
    "6GB",
    "8GB",
    "12GB",
    "16GB",
    "24GB",
    "32GB",
    "64GB",
    "128GB",
    "256GB",
    "512GB",
    "1TB",
  ];

  return (
    <Select
      mode="multiple"
      placeholder={
        <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>RAM</span>
      }
      value={rams}
      onChange={handleRam}
      style={{
        width: "100%",
        fontWeight: "bold",
        color: "#0E1B4D",
        border: "1px solid #d9d9d9",
        height: 50,
      }}
      dropdownStyle={{ minWidth: 300 }}
    >
      {ramsList.map((option) => (
        <Checkbox value={option}>{option}</Checkbox>
      ))}
    </Select>
  );
};

export default RamSelect;
