import React from "react";
import { Select } from "antd";
const { Option } = Select;

const StorageSelect = ({ storages, handleStorage }) => {
  const storagesList = [
    "32GB SSD",
    "64GB SSD",
    "128GB SSD",
    "180GB SSD",
    "200GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "60GB HDD",
    "120GB HDD",
    "180GB HDD",
    "200GB HDD",
    "250GB HDD",
    "320GB HDD",
    "500GB HDD",
    "1TB HDD",
    "128GB SSHD",
    "256GB SSHD",
    "512GB SSHD",
    "1TB SSHD",
    "128GB SSD + HDD",
    "256GB SSD + HDD",
    "512GB SSD + HDD",
    "1TB SSD + HDD",
  ];
  return (
    <Select
      mode="multiple"
      placeholder={
        <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>Storage</span>
      }
      value={storages}
      onChange={handleStorage}
      style={{
        width: "100%",
        fontWeight: "bold",
        color: "#0E1B4D",
        height: 50,
      }}
      dropdownStyle={{ minWidth: 300 }}
    >
      {storagesList.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};
export default StorageSelect;
