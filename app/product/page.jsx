import { Suspense } from "react";
import ProductList from "./ProductList";

export const metadata = {
  title: "#1 UK laptop sales",
  description: "We sell affordable uk used laptops and Iphones",
  keywords: [
    "HP",
    "Dell",
    "lenovo",
    "gaming laptops",
    "convertible laptops",
    "uk used laptops",
    "fairly used laptops in ibadan",
    "refurbished laptops",
    "cheap laptops",
    "used laptops",
    "used Iphone",
    "used samsung phones",
  ],
  openGraph: {
    title: "UK used Gadgets and Appliances at Affordable prices",
    description:
      "Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },

  other: {
    "google-site-verification": "4Zkz1j8swUUwJUJrRx2wsqs4YwJy6ru1Xb-9WmFnjek",
  },
  applicationName: "Ecommerce Website for Laptops and Mobile phone",
};

export default function Products() {
  return (
    <div className="container mx-auto pt-0">
      <ProductList
        productSection={""}
        brandslug={""}
        categoryslug={""}
        shop={true}
        flash_sale={true}
        sale_type={""}
      />
    </div>
  );
}
