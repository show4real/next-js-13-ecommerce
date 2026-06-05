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

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    stripHtml(product.description).slice(0, 160) ||
    `Buy ${product.name} at an affordable price on Hayzeeonline — tested, trusted, with nationwide delivery.`;
  const url = `/products/${product.slug}`;
  const image = product.image;

  return {
    title: product.name,
    description,
    keywords: [
      product.name,
      product.product_type,
      product.brand?.name,
      "US used",
      "UK used",
      "affordable",
      "Hayzeeonline",
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url,
      siteName: "Hayzeeonline",
      locale: "en_NG",
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <main className="mt-0 md:mt-[150px] md:px-[150px]">
        <ProductMiss product={product} />
      </main>
    );
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image ? [product.image] : [],
    description: stripHtml(product.description).slice(0, 500),
    sku: String(product.id),
    category: product.product_type || undefined,
    brand: product.brand?.name
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    offers: {
      "@type": "Offer",
      url: `https://hayzeeonline.com/products/${product.slug}`,
      priceCurrency: "NGN",
      price: product.price,
      itemCondition: "https://schema.org/UsedCondition",
      availability: product.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Hayzeeonline" },
    },
  };

  return (
    <main className="mt-[96px] lg:mt-[148px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetail product={product} />
    </main>
  );
}
