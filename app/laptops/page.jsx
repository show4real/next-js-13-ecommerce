import { Suspense } from "react";
import ProductList from "/app/products/ProductList";

export const metadata = {
  title: "#1 UK laptop sales",
  description: "We sell affordable US used / Uk used laptops and Iphones",
  keywords: [
    "HP",
    "Dell",
    "lenovo",
    "gaming laptops",
    "convertible laptops",
    "US used / Uk used laptops",
    "fairly used laptops in ibadan",
    "refurbished laptops",
    "cheap laptops",
    "used laptops",
    "used Iphone",
    "used samsung phones",
  ],
  openGraph: {
    title: "US used / Uk used Gadgets and Appliances at Affordable prices",
    description:
      "US used / Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
  alternates: {
    canonical: `https://hayzeeonline.com`,
    languages: {
      "en-US": "/en-US",
    },
  },

  other: {
    "google-site-verification": "4Zkz1j8swUUwJUJrRx2wsqs4YwJy6ru1Xb-9WmFnjek",
  },
  applicationName: "Ecommerce Website for Laptops and Mobile phone",
};

export default function Products() {
  return (
    <main className="mt-[100px] md:mt-[100px] md:px-[100px]">
      <ProductList
        productSection={"Laptops"}
        brandslug={""}
        categoryslug={""}
        shop={true}
        sale_type={""}
      />
    </main>
  );
}
