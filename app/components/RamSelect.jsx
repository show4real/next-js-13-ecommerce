import React from "react";

const ramsList = [
  "1GB", "2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB", "24GB", "32GB",
  "64GB", "128GB", "256GB", "512GB", "1TB",
];

const RamSelect = ({ rams, handleRam }) => {
  const toggle = (ram) =>
    handleRam(rams.includes(ram) ? rams.filter((r) => r !== ram) : [...rams, ram]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2">
        {ramsList.map((ram) => {
          const active = rams.includes(ram);
          return (
            <button
              key={ram}
              type="button"
              onClick={() => toggle(ram)}
              className={`rounded-lg border px-2 py-2 text-center text-xs font-semibold transition ${
                active
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {ram}
            </button>
          );
        })}
      </div>

      {rams.length > 0 && (
        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="text-xs font-medium text-gray-500">{rams.length} selected</span>
          <button
            type="button"
            onClick={() => handleRam([])}
            className="text-xs font-semibold text-red-500 transition hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default RamSelect;
