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

export default function Products() {
  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 mt-[70px] lg:mt-[150px]">
      <ProductList
        productSection={""}
        brandslug={""}
        categoryslug={""}
        shop={true}
        sale_type={""}
      />
    </main>
  );
}
