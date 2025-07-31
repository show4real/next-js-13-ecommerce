import ProductDetail from "/app/components/ProductDetail";
import ProductMiss from "/app/components/ProductMiss";

// export const dynamicParams = true; // default val = true

async function getProduct(id) {
  const response = await fetch(
    `https://apiv2.hayzeeonline.com/api/singleproduct/${id}`,
    { cache: "no-store" }
  );
  if (!response.ok) return null;
  const product = await response.json();

  return product.product;
}

export async function generateMetadata({ params, searchParams }, parent) {
  const product = await getProduct(params.id);

  if (product) {
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
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);
  console.log(product);

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="pt-20 pb-12">
          <ProductMiss product={product} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="pt-8 pb-12">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}