import React from "react";
import { Select, Checkbox } from "antd";
const { Option } = Select;

const ProcessorSelect = ({ processors, handleProcessor }) => {
  const processorsList = [
    "Intel Atom",
    "Intel Celeron",
    "Intel Pentium",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "Apple Chip M1",
    "Apple Chip M2",
    "AMD A4",
    "AMD A6",
    "AMD A8",
    "AMD A10",
    "AMD A12",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "Samsung’s Exynos",
    "Qualcomm’s snapdragon",
  ];

  return (
    <Select
      mode="multiple"
      placeholder={
        <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>Processor</span>
      }
      value={processors}
      onChange={handleProcessor}
      style={{
        width: "100%",
        fontWeight: "bold",
        color: "#0E1B4D",
        height: 50,
      }}
      //   dropdownRender={renderProcessorDropdown}
      dropdownStyle={{ minWidth: 300 }}
    >
      {processorsList.map((option) => (
        <Checkbox value={option}>{option}</Checkbox>
      ))}
    </Select>
  );
};

export default ProcessorSelect;
