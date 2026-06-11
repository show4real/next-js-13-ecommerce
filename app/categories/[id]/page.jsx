import ProductList from "/app/products/ProductList";
import { getCategory } from "/app/services/api";

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
