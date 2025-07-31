import ProductList from "/app/products/ProductList";

import { notFound } from 'next/navigation'; // Ensure this is imported if you're using Next.js

async function getBrand(id) {
  console.log(id)
  try {
    const response = await fetch(
      `https://apiv2.hayzeeonline.com/api/show/brand/${id}`
    );

    if (response.ok) {
      const brand = await response.json();
      return brand?.brand ?? null;
    } else if (response.status === 404) {
      notFound(); // Next.js 13+ 'app' router 404 handling
    } else {
      console.error(`Error fetching brand: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
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
    <main className="mt-0 md:mt-[150px] md:px-[150px]">
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
