import { Suspense } from "react";
import ProductList from "./ProductList";

export const metadata = {
  title: "US used / Uk used Laptops Mobile Phones at Affordable Prices",
  openGraph: {
    title: "US used / Uk used Gadgets and Appliances at Affordable prices",
    description:
      "US used / Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
};

export default function Products({ searchParams }) {
  // A category may be passed via ?category=<id> (from search / the navbar).
  // Keying on it forces ProductList to remount — and re-select the category —
  // even when only the query string changes.
  const category = searchParams?.category || "";

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 mt-[70px] lg:mt-[150px]">
      <ProductList
        key={`category-${category}`}
        productSection={""}
        brandslug={""}
        categoryslug={""}
        initialCategory={category}
        shop={true}
        sale_type={""}
      />
    </main>
  );
}
