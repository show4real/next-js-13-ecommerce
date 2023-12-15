import ProductDetail from "/app/components/ProductDetail";
import { notFound } from "next/navigation";

export const dynamicParams = true; // default val = true

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
    title: "hello world",
    openGraph: {
      description: product.name,
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
