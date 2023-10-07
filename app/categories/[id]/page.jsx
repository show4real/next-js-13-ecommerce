import ProductList from "../../products/ProductList";

import { notFound } from "next/navigation";

async function getCategory(id) {
  const response = await fetch(
    `https://www.hayzeeonlineapi.hayzeeonline.com/api/show/category/${id}`
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
    <main style={{ marginTop: 20 }}>
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
