import { Select, Slider, InputNumber, Button, Checkbox } from "antd";

export const storagesList = [
  "128GB SSD",
  "256GB SSD",
  "512GB SSD",
  "1TB SSD",
  "128GB HDD",
  "256GB HDD",
  "512GB HDD",
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

export const processorsList = [
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
export const ramsList = [
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

export const limitProductName = (str) => {
  const stringWithoutPipe = str.replace(/\|/g, "");
  const words = stringWithoutPipe.trim().split(/\s+/);
  const first10Words = words.slice(0, 25).join(" ");
  return first10Words;
};

export const handleUrl = () => {
  history.push(`/search/${search !== "" ? search : "-"}`);
};

export const renderStorageDropdown = ({ menu, storages }) => {
  return (
    <div>
      <div style={{ padding: "8px", fontWeight: "bold" }}>
        <span>({storages.length}) Storage Selected</span>
      </div>
      {menu}
    </div>
  );
};

export const renderProcessorDropdown = ({ menu, processors }) => {
  return (
    <div>
      <div style={{ padding: "8px", fontWeight: "bold" }}>
        <span>({processors.length}) Processor Selected</span>
      </div>
      {menu}
    </div>
  );
};

export const renderRamDropdown = ({ menu, rams }) => {
  return (
    <div>
      <div style={{ padding: "8px", fontWeight: "bold" }}>
        <span>({rams.length}) RAM Selected</span>
      </div>
      {menu}
    </div>
  );
};

export const searchSelect = ({ handleSearch }) => {
  const buttonStyle = {
    color: "#0E1B4D",
    position: "absolute",
    right: "5px",
    top: "10px",
    margin: "0",
    border: "none",
    background: "none",
    cursor: "pointer",
  };

  const formStyle = {
    position: "relative",
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    margin: "0",
    background: "transparent",
  };

  return (
    <div className="same-style header-search">
      <div className="search-content">
        <form action="#" style={formStyle}>
          <input
            type="text"
            placeholder="Search by other features (generation, Graphics type ..."
            value={search}
            onChange={handleSearch}
            style={inputStyle}
          />
          <button
            className="button-search"
            type="submit"
            onClick={handleUrl}
            style={buttonStyle}
          >
            <i
              style={{ fontSize: 20, fontWeight: "bold" }}
              className="pe-7s-search"
            />
          </button>
        </form>
      </div>
    </div>
  );
};
export const storageSelect = ({ storages, handleStorageChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder={
        <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>Storage</span>
      }
      value={storages}
      onChange={handleStorageChange}
      style={{ width: "100%", fontWeight: "bold", color: "#0E1B4D" }}
      dropdownStyle={{ minWidth: 300 }}
      dropdownRender={renderStorageDropdown}
    >
      {storagesList.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export const processorSelect = ({ processors, handleProcessorChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder={
        <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>Processor</span>
      }
      value={processors}
      onChange={handleProcessorChange}
      style={{ width: "100%", fontWeight: "bold", color: "#0E1B4D" }}
      dropdownRender={renderProcessorDropdown}
      dropdownStyle={{ minWidth: 300 }}
    >
      {processorsList.map((option) => (
        <Checkbox value={option}>{option}</Checkbox>
      ))}
    </Select>
  );
};
export const ramSelect = ({ rams, handleRamChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder={
        <span style={{ color: "#0E1B4D", fontWeight: "bold" }}>RAM</span>
      }
      value={rams}
      onChange={handleRamChange}
      style={{
        width: "100%",
        fontWeight: "bold",
        color: "#0E1B4D",
        border: "1px solid #d9d9d9",
      }}
      dropdownRender={renderRamDropdown}
      dropdownStyle={{ minWidth: 300 }}
    >
      {ramsList.map((option) => (
        <Checkbox value={option}>{option}</Checkbox>
      ))}
    </Select>
  );
};

export const priceSelect = ({ price, handlePrice }) => {
  return (
    <Select
      style={{ width: "100%" }}
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
            onChange={handlePriceChange}
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
              onChange={(v) => handleChange([v, price[1]])}
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
              onChange={(v) => handleChange([price[0], v])}
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
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Select>
  );
};

export const brandSelect = ({ handleBrandChange }) => {
  return (
    <Select
      placeholder={
        <span style={{ fontWeight: "bold", color: "black" }}>BRAND</span>
      }
      style={{ width: "100%", borderRadius: 20 }}
      value={brand}
      onChange={handleBrandChange}
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

export const categorySelect = ({ categories, handleCategoryChange }) => {
  return (
    <Select
      placeholder={
        <span style={{ fontWeight: "bold", color: "black" }}>Category</span>
      }
      style={{ width: "100%", borderRadius: 20 }}
      value={category}
      onChange={handleCategoryChange}
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

export const sortSelect = ({ sort, handleSorting }) => {
  return (
    <Select
      placeholder={
        <>
          <span style={{ fontWeight: "bold", color: "#0E1B4D" }}>Sort By</span>
          <span
            style={{
              fontWeight: "bold",
              paddingLeft: "30%",
              color: "#0E1B4D",
            }}
          >
            Availability
          </span>
        </>
      }
      placement="bottomLeft"
      style={{ width: "100%", border: "none", boxShadow: "none" }}
      value={sort}
      onChange={handleSorting}
      dropdownStyle={{ minWidth: 300, textAlign: "center" }}
    >
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
