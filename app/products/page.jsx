import { Suspense } from "react";
import ProductList from "./ProductList";

export const metadata = {
  title: "Uk Used Laptops Mobile Phones at Affordable Prices",
  openGraph: {
    title: "UK used Gadgets and Appliances at Affordable prices",
    description:
      "Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
};

export default function Products() {
  return (
    <div className="container mx-auto pt-0">
      <ProductList
        productSection={"Trending Products"}
        brandslug={""}
        categoryslug={""}
      />
    </div>
  );
}
