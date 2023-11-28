import ProductDetail from "/app/components/ProductDetail";
import { notFound } from "next/navigation";

export const dynamicParams = true; // default val = true

async function getProduct(id) {
  const product = await fetch(
    `http://apiv2.hayzeeonline.com/api/singleproduct/${id}`
  ).then((res) => res.json());
  if (!product) {
    notFound();
  }

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
