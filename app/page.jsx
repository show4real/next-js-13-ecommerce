import { Suspense } from "react";
import Loading from "./loading";
import ProductList from "./products/ProductList";
import ProductSaleType from "./products/ProductSalesType";
import FeaturedServices from "./components/FeaturedServices";
import HeroSection from "./components/HeroSection";
import HeroSearch from "./components/HeroSearch";
import TrustBadges from "./components/TrustBadges";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Category from "./categories/Category";
import { localBusinessJsonLd } from "./lib/business";

export const metadata = {
  title: {
    absolute: "Hayzeeonline — US/UK Used Laptops & Phones at Affordable Prices in Nigeria",
  },
  description:
    "Shop affordable US/UK used laptops, iPhones, Samsung & Android phones at Hayzeeonline. Tested & trusted gadgets — HP, Dell, Lenovo, MacBook — with nationwide delivery and pay on delivery.",
  alternates: { canonical: "/" },
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
    title: "US/UK Used Gadgets & Appliances at Affordable Prices",
    description:
      "US/UK used laptops, mobile phones — Samsung, iPhone, Dell, HP, Lenovo — at affordable prices.",
  },
};

export default function Home() {
  return (
  <main className="w-full mt-[96px] pb-10 lg:mt-[148px]">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
    />
    <Suspense fallback={<Loading />}>
      <div className="pt-5 sm:pt-6">
        <HeroSearch />
      </div>

      <div className="pt-4 sm:pt-5">
        <HeroSection />
      </div>

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <TrustBadges />
      </section>

      <ProductList
        productSection="Trending Products"
        heading="Top Picks For You"
        sale_type={null}
        brandslug={""}
        categoryslug={""}
        shop={false}
        flash_sale={true}
      />
      <Category />
      <ProductSaleType sale_type="promo sales" />
      <FeaturedServices />
      <ProductSaleType sale_type="black friday" />
      <ProductSaleType sale_type="Mid year sales" />
      <Testimonials />
      <Faq />
    </Suspense>
  </main>

  );
}
