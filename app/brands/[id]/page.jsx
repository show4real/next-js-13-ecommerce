import ProductList from "/app/products/ProductList";
import { getBrand } from "/app/services/api";

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
    <main className="mt-[100px] md:mt-[150px] md:px-[150px]">
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
