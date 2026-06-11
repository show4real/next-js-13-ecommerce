/**
 * Shared option lists for the product/search filter sidebars.
 *
 * Both the shop/laptop listing (ProductList) and the search results page
 * (SearchList) render the same filter UI, so the available choices live here to
 * guarantee the two stay in sync — adding an option in one place adds it
 * everywhere.
 */

export const DEFAULT_PRICE = [4000, 5000000];

export const SUBTYPE_OPTIONS = [
  "Ultrabook", "Notebook", "Gaming Laptop", "2-in-1 Convertible", "Chromebook",
  "Business Laptop", "Workstation", "Netbook", "MacBook", "All-in-One",
];

export const CONDITION_OPTIONS = [
  "Brand New", "UK Used", "Nigerian Used", "Refurbished", "Open Box", "US Used",
];

export const CORES_OPTIONS = [
  "2 Cores", "4 Cores", "6 Cores", "8 Cores", "10 Cores", "12 Cores", "14 Cores", "16 Cores",
];

export const STORAGE_TYPE_OPTIONS = [
  "SSD", "NVMe SSD", "HDD", "SSHD", "eMMC", "SSD + HDD",
];

export const DISPLAY_SIZE_OPTIONS = [
  // Phones
  '4.7"', '5.0"', '5.4"', '5.5"', '5.8"', '6.1"', '6.3"', '6.5"', '6.7"', '6.8"',
  // Tablets
  '7"', '8"', '8.3"', '9.7"', '10.2"', '10.9"', '11"', '12.4"', '12.9"',
  // Laptops
  '10.1"', '11.6"', '12.5"', '13.3"', '14"', '15.6"', '16"', '17.3"',
];

export const GRAPHICS_OPTIONS = [
  "Intel HD Graphics", "Intel UHD Graphics", "Intel Iris Xe", "AMD Radeon",
  "NVIDIA GeForce MX", "NVIDIA GTX 1050", "NVIDIA GTX 1650", "NVIDIA RTX 3050",
  "NVIDIA RTX 3060", "NVIDIA RTX 4060", "Apple GPU",
];

// OS options are scoped to the current device type so the filter only offers
// systems that make sense (mobile OS versions for phones, desktop OS for laptops).
export const COMPUTER_OS_OPTIONS = [
  "Windows 11", "Windows 10", "Windows 8", "Windows 7",
  "macOS", "Chrome OS", "Linux", "No OS / DOS",
];

export const PHONE_OS_OPTIONS = [
  // iPhone
  "iOS 18", "iOS 17", "iOS 16", "iOS 15", "iOS 14", "iOS 13", "iOS",
  // Android
  "Android 15", "Android 14", "Android 13", "Android 12", "Android 11",
  "Android 10", "Android 9", "Android",
  // Other mobile
  "HarmonyOS",
];

export const TABLET_OS_OPTIONS = [
  "iPadOS 18", "iPadOS 17", "iPadOS 16", "iPadOS 15", "iPadOS",
  "Android 15", "Android 14", "Android 13", "Android 12", "Android",
  "Windows 11", "Windows 10", "HarmonyOS",
];

// Fallback when the device type can't be determined (covers everything).
export const OS_OPTIONS = [
  ...COMPUTER_OS_OPTIONS.filter((o) => o !== "No OS / DOS"),
  ...PHONE_OS_OPTIONS, "iPadOS", "No OS / DOS",
];

export const COLOR_OPTIONS = [
  "Black", "Silver", "Gray", "Space Gray", "White", "Gold", "Rose Gold",
  "Blue", "Red", "Green",
];

export const EXCHANGE_OPTIONS = ["Yes", "No"];

export const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "availability", label: "Availability" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
  { value: "low-price", label: "Price: Low to High" },
  { value: "high-price", label: "Price: High to Low" },
  { value: "date-asc", label: "Date: Old to New" },
  { value: "date-desc", label: "Date: New to Old" },
];
