import { Suspense } from "react";
import Loading from "./loading";
import ProductList from "./products/ProductList";
import ProductSaleType from "./products/ProductSalesType";

export const metadata = {
  title: "#1 UK laptop sales",
  description: "We sell affordable uk used laptops and Iphones",
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
        />

        <ProductSaleType sale_type="flash sales" />
        <ProductSaleType sale_type="promo sales" />
        <ProductSaleType sale_type="black friday" />
        <ProductSaleType sale_type="Mid year sales" />
      </Suspense>
    </main>
  );
}
