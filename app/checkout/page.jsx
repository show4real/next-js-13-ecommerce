import Checkout from "/app/components/Checkout";

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

export default function OrderSummary() {
  return (
    <div className="container-fluid mx-auto pt-0 mb-10 mt-20">
      <Checkout />
    </div>
  );
}
