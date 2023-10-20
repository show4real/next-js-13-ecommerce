import Link from "next/link";
import CategoryList from "/app/categories/CategoryList";

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
    <main>
      <CategoryList section={"brands"} />
    </main>
  );
}
