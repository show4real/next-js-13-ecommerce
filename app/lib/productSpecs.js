/**
 * Maps a product's specification columns to an ordered, display-ready list of
 * { label, value } pairs. Shared by the product detail page (for SEO structured
 * data) and the ProductDetail component (for the on-page specifications table),
 * so the fields and ordering stay in sync.
 */

const isPresent = (v) =>
  v !== null &&
  v !== undefined &&
  String(v).trim() !== "" &&
  String(v).trim().toLowerCase() !== "null";

// Normalise boolean-ish exchange values to a readable Yes / No
const formatYesNo = (v) => {
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (v === 1 || v === "1") return "Yes";
  if (v === 0 || v === "0") return "No";
  return v;
};

export function getProductSpecs(product = {}) {
  // Order is interleaved so a 2-column (row-major) grid reads naturally.
  const fields = [
    { label: "Type", value: product.product_type },
    { label: "Brand", value: product.brand?.name },
    { label: "Model", value: product.model },
    { label: "Subtype", value: product.subtype },
    { label: "Condition", value: product.condition },
    { label: "RAM", value: product.ram },
    { label: "Processor", value: product.processor },
    { label: "Number of Cores", value: product.number_of_cores },
    { label: "Storage Capacity", value: product.storage },
    { label: "Storage Type", value: product.storage_type },
    { label: "Display Size", value: product.display_size },
    { label: "Graphics Card", value: product.graphics_card },
    { label: "Graphics Card Memory", value: product.graphics_card_memory },
    { label: "Operating System", value: product.operating_system },
    { label: "Exchange Possible", value: formatYesNo(product.exchange_possible) },
    { label: "Color", value: product.color },
  ];

  return fields.filter((f) => isPresent(f.value));
}
