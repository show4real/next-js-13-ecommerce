import PaymentFailed from "../components/PaymentFailed";

export const metadata = {
  title: "Uk Used Laptops Mobile Phones at Affordable Prices",
  description:
    "Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
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
    "search your preferred gadgets",
  ],
  openGraph: {
    title: "UK used Gadgets and Appliances at Affordable prices",
    description:
      "Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
};

export default function Payment() {
  return (
    <div className="container mx-auto mt-24">
      <PaymentFailed />
    </div>
  );
}
