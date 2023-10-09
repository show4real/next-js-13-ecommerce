import ProductList from "/app/products/ProductList";

import { notFound } from "next/navigation";

export const dynamicParams = true; // default val = true

async function getBrand(id) {
  const response = await fetch(
    `https://www.hayzeeonlineapi.hayzeeonline.com/api/show/brand/${id}`
  );

  if (response.ok) {
    const brand = await response.json();
    if (brand) {
      return brand.brand;
    }
  } else if (response.status === 404) {
    notFound();
  }

  // Handle other response statuses or errors here
}

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: params.id + " Brand",
    openGraph: {
      description: `${params.id} Brand Section`,
    },
  };
}

export default async function ProductDetails({ params }) {
  const brand = await getBrand(params.id);

  return (
    <main style={{ marginTop: 20 }}>
      {brand && (
        <ProductList
          productSection={`${brand.name} Brand`}
          brandslug={brand.slug}
          categoryslug={""}
          brand={brand}
          category={""}
        />
      )}
    </main>
  );
}
