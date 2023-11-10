import { Suspense } from "react";
import Loading from "./loading";
import ProductList from "./products/ProductList";
import ProductSaleType from "./products/ProductSalesType";
import FeaturedServices from "./components/FeaturedServices";
import Category from "./categories/Category";
import CategorySlider from "./categories/CategorySlider";

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

export default function Home() {
  return (
    <main className="">
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
        <ProductSaleType sale_type="flash sales" />
        <ProductSaleType sale_type="PRE-ORDER (24Hours)" />
        <ProductSaleType sale_type="PRE-ORDER (21DAYS)" />
        <ProductSaleType sale_type="PRE-ORDER (7DAYS)" />

        {/* <CategorySlider brand="brand" /> */}
        <ProductSaleType sale_type="promo sales" />
        <FeaturedServices />
        <ProductSaleType sale_type="black friday" />
        <ProductSaleType sale_type="Mid year sales" />
        {/* <CategorySlider category={"category"} /> */}
      </Suspense>
    </main>
  );
}
