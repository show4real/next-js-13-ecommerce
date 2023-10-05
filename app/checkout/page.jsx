import Checkout from "../components/Checkout";

export const metadata = {
  title: "Uk Used Laptops Mobile Phones at Affordable Prices",
  openGraph: {
    title: "UK used Gadgets and Appliances at Affordable prices",
    description:
      "Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
};

export default function OrderSummary() {
  return (
    <div className="container-fluid mx-auto pt-0 mb-10 mt-20">
      <Checkout />
    </div>
  );
}
