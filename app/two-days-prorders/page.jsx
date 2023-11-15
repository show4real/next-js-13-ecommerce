import { Suspense } from "react";
import ProductList from "/app/products/ProductList";
import ProductSaleType from "../product/ProductSalesType";

export const metadata = {
  title: "Affordable laptop gadgets Flash sales - hayzee computer resources",
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

export default function FlashSales() {
  return (
    <div className="container mx-auto pt-0">
      <ProductSaleType sale_type="PRE-ORDER (24Hours)" />

      {/* <ProductSaleType sale_type="PRE-ORDER (24Hours)" />
      <ProductSaleType sale_type="PRE-ORDER (21DAYS)" />
      <ProductSaleType sale_type="PRE-ORDER (7DAYS)" />

    
      <ProductSaleType sale_type="promo sales" />
      <FeaturedServices />
      <ProductSaleType sale_type="black friday" />
      <ProductSaleType sale_type="Mid year sales" /> */}
    </div>
  );
}
