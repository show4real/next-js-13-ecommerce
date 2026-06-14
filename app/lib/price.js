// Pricing helpers shared by product cards, the product detail page and the
// cart store so the "two price" rule is applied consistently everywhere.
//
// Data model:
//   - product.price      -> the normal (regular) price
//   - product.new_price  -> an optional sale price; when set it is what the
//                           customer actually pays and `price` is shown struck.

// Treat empty / "null" / non-positive values as absent.
const isPresent = (v) =>
  v !== null &&
  v !== undefined &&
  String(v).trim() !== "" &&
  String(v).trim().toLowerCase() !== "null" &&
  Number(v) > 0;

// Does this product have a usable sale price?
export const hasNewPrice = (product) => isPresent(product?.new_price);

// The price the customer actually pays / we charge: the new price when present,
// otherwise the normal price. Always returned as a Number.
export const getEffectivePrice = (product) =>
  Number(hasNewPrice(product) ? product.new_price : product?.price) || 0;

// The price to render with a strikethrough (the normal price), or null when
// there is nothing to strike (no sale price set).
export const getStrikePrice = (product) =>
  hasNewPrice(product) ? Number(product?.price) || 0 : null;
