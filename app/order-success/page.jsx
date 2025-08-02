import PaymentSuccess from "../components/PaymentSuccess";

export const metadata = {
  title: "US used / Uk used Laptops Mobile Phones at Affordable Prices",
  description:
    "US used / Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
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
    "search your preferred gadgets",
  ],
  openGraph: {
    title: "US used / Uk used Gadgets and Appliances at Affordable prices",
    description:
      "US used / Uk used Laptops Mobile Phone Samsung Iphone Dell HP Lenovo at affordable prices",
  },
};

export default function Payment() {
  return (
    <div className="container mx-auto mt-24">
      <PaymentSuccess />
    </div>
  );
}
