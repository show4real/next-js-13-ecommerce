import ProductDetail from "/app/components/ProductDetail";
import ProductMiss from "/app/components/ProductMiss";
import { getProduct } from "/app/services/api";
import { getProductSpecs } from "/app/lib/productSpecs";

// export const dynamicParams = true; // default val = true

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

  // Map the product condition to a schema.org condition URL
  const conditionRaw = String(product.condition || "").toLowerCase();
  const itemCondition = conditionRaw.includes("new")
    ? "https://schema.org/NewCondition"
    : conditionRaw.includes("refurb")
    ? "https://schema.org/RefurbishedCondition"
    : "https://schema.org/UsedCondition";

  // Explicit, machine-readable specifications for rich product results
  const additionalProperty = getProductSpecs(product).map((s) => ({
    "@type": "PropertyValue",
    name: s.label,
    value: String(s.value),
  }));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image ? [product.image] : [],
    description: stripHtml(product.description).slice(0, 500),
    sku: String(product.id),
    mpn: product.model || undefined,
    model: product.model || undefined,
    color: product.color || undefined,
    category: product.subtype || product.product_type || undefined,
    brand: product.brand?.name
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    ...(additionalProperty.length ? { additionalProperty } : {}),
    offers: {
      "@type": "Offer",
      url: `https://hayzeeonline.com/products/${product.slug}`,
      priceCurrency: "NGN",
      price: product.price,
      // Keep the offer fresh for a year so it isn't flagged as expired.
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      itemCondition,
      availability: product.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": "https://hayzeeonline.com/#organization" },
      warranty: {
        "@type": "WarrantyPromise",
        durationOfWarranty: {
          "@type": "QuantitativeValue",
          value: 30,
          unitCode: "DAY",
        },
        warrantyScope: "https://schema.org/PartsAndLaborWarranty",
      },
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
