import ProductList from "/app/products/ProductList";

import { notFound } from "next/navigation";

async function getCategory(id) {
  const response = await fetch(
    `https://apiv2.hayzeeonline.com/api/show/category/${id}`
  );

  if (response.ok) {
    const category = await response.json();
    if (category) {
      return category.category;
    }
  } else if (response.status === 404) {
    notFound();
  }

  // Handle other response statuses or errors here
}

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: params.id + " Category",
    openGraph: {
      description: `${params.id} Category Section`,
    },
  };
}

export default async function ProductDetails({ params }) {
  const category = await getCategory(params.id);

  return (
    <main className="mt-[100px] md:mt-[150px] md:px-[150px]">
      {category && (
        <ProductList
          productSection={`${category.name} Category`}
          categoryslug={category.slug}
          brandslug={""}
          category={category}
          brand={""}
        />
      )}
    </main>
  );
}
