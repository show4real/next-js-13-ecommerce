import Link from "next/link";
import BrandList from "/app/components/BrandList";

export const metadata = {
  title: "Uk Used Laptops Mobile Phones Categories at Affordable Prices",
  openGraph: {
    title: "UK used Gadgets and Appliances at Affordable prices",
    description:
      "Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
};

export default function Brands() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-7 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 capitalize mt-5 md:mt-0 lg:mt-0 xl:mt-0">
        Brands
      </h2>
      <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <BrandList />
      </div>
    </main>
  );
}
