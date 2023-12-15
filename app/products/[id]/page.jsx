import ProductDetail from "/app/components/ProductDetail";
import { notFound } from "next/navigation";

// export const dynamicParams = true; // default val = true

async function getProduct(id) {
  const response = await fetch(
    `https://apiv2.hayzeeonline.com/api/singleproduct/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    notFound(); // using notFound function from next/router
  }
  const product = await response.json();
  console.log(product);
  return product.product;
}

export async function generateMetadata({ params, searchParams }, parent) {
  const product = await getProduct(params.id);
  console.log(product);

  return {
    title: product.name,
    description: product.description,
    generator: "Hayzeeonline",
    applicationName: "Hayzee Computer Resources",
    referrer: "origin-when-cross-origin",
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
      title: product.name,
      description: product.description,
      url: `https://hayzeeonline.com/products/${product.slug}`,
      images: `https://hayzeeonline.com/products/${product.image}`,
      siteName: "Hayzeeonline",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://hayzeeonline.com/products/${product.slug}`,
      languages: {
        "en-US": "/en-US",
      },
    },
  };
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);

  return (
    <main style={{ marginTop: 50 }}>
      <ProductDetail product={product} />
    </main>
  );
}
