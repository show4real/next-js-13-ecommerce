import React from "react";
import { Slider, Select, InputNumber, Button } from "antd";
const { Option } = Select;

const PriceSelect = ({ price, handlePrice, fetchProducts }) => {
  const handleParser = (inputValue) => {
    // Only accept valid numeric values
    const numericValue = parseInt(inputValue, 10);
    return isNaN(numericValue) ? "" : numericValue;
  };
  return (
    <Select
      style={{ width: "100%", height: 50 }}
      placeholder={
        <>
          <span style={{ fontWeight: "bold", color: "black" }}>PRICE</span>
          <span
            style={{
              fontWeight: "bold",
              paddingLeft: "50%",
              color: "black",
            }}
          >
            &#8358;{price[0]} - &#8358;{price[1]}
          </span>
        </>
      }
      dropdownRender={(menu) => (
        <div style={{ padding: 20 }}>
          {menu}
          <Slider
            min={0}
            max={8000000}
            range
            value={price}
            onChange={handlePrice}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingRight: 5,
              }}
            >
              &#8358;{" "}
            </span>
            <InputNumber
              min={0}
              max={8000000}
              value={price[0]}
              onChange={(v) => handlePrice([v, price[1]])}
              formatter={(v) => `${v}`}
              parser={handleParser}
              style={{ width: "45%" }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <span
              style={{
                fontSize: 23,
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              -
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingRight: 5,
              }}
            >
              &#8358;{" "}
            </span>
            <InputNumber
              min={0}
              max={8000000}
              value={price[1]}
              onChange={(v) => handlePrice([price[0], v])}
              formatter={(v) => `${v}`}
              parser={handleParser}
              style={{ width: "45%" }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <div className="flex justify-end pt-5">
            <button
              class="bg-blue-950 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={fetchProducts}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    >
      <Option value="range">
        {" "}
        <span
          style={{
            fontWeight: "bold",

            color: "black",
          }}
        >
          &#8358;{price[0] && price[0].toLocaleString()} - &#8358;
          {price[1] && price[1].toLocaleString()}
        </span>
      </Option>
    </Select>
  );
};

export default PriceSelect;
