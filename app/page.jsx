import { Suspense } from "react";
import Loading from "./loading";
import ProductList from "./products/ProductList";
import ProductSaleType from "./products/ProductSalesType";
import FeaturedServices from "./components/FeaturedServices";
import Category from "./categories/Category";
import CategorySlider from "./categories/CategorySlider";

export const metadata = {
  title: " US used / Uk used Laptop Computers At Affordable Prices - Hayzeeonline",
  description: "We sell affordable US used / Uk used laptops and Iphones",
  keywords: [
    "HP",
    "Dell",
    "lenovo",
    "gaming laptops",
    "convertible laptops",
    "US used / Uk used laptops",
    "fairly used laptops in ibadan",
    "US used / Uk used laptops at affordable price",
    "smart phones",
    "US used / Uk used printers",
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

  other: {
    "google-site-verification": "4Zkz1j8swUUwJUJrRx2wsqs4YwJy6ru1Xb-9WmFnjek",
  },
  applicationName: "Ecommerce Website for Laptops and Mobile phone",
};

export default function Home() {
  return (
  <main className="w-full px-4 sm:px-6 lg:px-8 mt-[70px] lg:mt-[150px]">
    
  <Suspense fallback={<Loading />}>
    <ProductList
      productSection="Trending Products"
      sale_type={null}
      brandslug={""}
      categoryslug={""}
      shop={false}
      flash_sale={true}
    />
    <Category />
    {/* <ProductSaleType sale_type="flash sales" /> */}
    {/* <ProductSaleType sale_type="PRE-ORDER (24Hours)" />
    <ProductSaleType sale_type="PRE-ORDER (21DAYS)" />
    <ProductSaleType sale_type="PRE-ORDER (7DAYS)" /> */}
    <ProductSaleType sale_type="promo sales" />
    <FeaturedServices />
    <ProductSaleType sale_type="black friday" />
    <ProductSaleType sale_type="Mid year sales" />
  </Suspense>
</main>

  );
}
