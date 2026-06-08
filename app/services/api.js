import axios from "axios";
import settings from "./settings";

/**
 * Centralised API endpoints.
 *
 * Every direct call to the Hayzee backend should live here so the base URL and
 * paths are defined in a single place (instead of being hardcoded across page
 * and component files). These helpers use the Fetch API with `cache: "no-store"`
 * so they are safe to call from React Server Components (no client-only globals).
 */

const BASE_URL = settings.API_URL; // e.g. https://apiv2.hayzeeonline.com/api/

/* ---------------------------------- Products -------------------------------- */

// Single product by id or slug. Returns the product object, or null if missing.
export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}singleproduct/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.product ?? null;
}

// Full label/value specification list for a product (Model, Subtype, Condition,
// Storage Type, Display Size, Graphics Card, etc.). Returns a cleaned, non-empty
// list of { label, value }, or an empty array on any failure.
export async function getProductInfos(id) {
  try {
    const res = await fetch(`${BASE_URL}product/infos/${id}`, {
      method: "POST",
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.product_descriptions || [])
      .map((item) => ({ label: item.label, value: item.values }))
      .filter(
        (i) =>
          i.label &&
          i.value !== null &&
          i.value !== undefined &&
          String(i.value).trim() !== "" &&
          String(i.value).trim().toLowerCase() !== "null"
      );
  } catch {
    return [];
  }
}

/* ----------------------------------- Brands --------------------------------- */

// Single brand by id or slug. Returns the brand object, or null if missing.
export async function getBrand(id) {
  const res = await fetch(`${BASE_URL}show/brand/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.brand ?? null;
}

/* --------------------------------- Categories ------------------------------- */

// Single category by id or slug. Returns the category object, or null if missing.
export async function getCategory(id) {
  const res = await fetch(`${BASE_URL}show/category/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.category ?? null;
}

/* ---------------------------------- Checkout -------------------------------- */

// Kick off a payment. Returns the response body (expects `{ payment_url }`).
export async function initiatePayment(payload) {
  const { data } = await axios.post(`${BASE_URL}initiate-payment`, payload);
  return data;
}

// Persist an order. Accepts a FormData payload (product images, details, etc.)
// and returns the raw axios promise so callers can chain on the response.
export function storeOrder(formData) {
  return axios.post(`${BASE_URL}store/order`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}
