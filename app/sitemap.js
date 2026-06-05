import settings from "./services/settings";

const SITE_URL = "https://hayzeeonline.com";

// Revalidate the sitemap once a day
export const revalidate = 86400;

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/products", priority: 0.9, changeFrequency: "daily" },
  { path: "/laptops", priority: 0.9, changeFrequency: "weekly" },
  { path: "/categories", priority: 0.8, changeFrequency: "weekly" },
  { path: "/flash-sales", priority: 0.8, changeFrequency: "weekly" },
  { path: "/black-friday", priority: 0.7, changeFrequency: "weekly" },
  { path: "/promo-sales", priority: 0.7, changeFrequency: "weekly" },
  { path: "/mid-year-sales", priority: 0.7, changeFrequency: "weekly" },
  { path: "/brands/apple-phone", priority: 0.8, changeFrequency: "weekly" },
  { path: "/brands/android-phone", priority: 0.8, changeFrequency: "weekly" },
];

async function fetchJson(endpoint) {
  try {
    const res = await fetch(`${settings.API_URL}${endpoint}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function sitemap() {
  const now = new Date();

  const entries = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Categories
  const catsRes = await fetchJson("user/allcats");
  (catsRes?.categories || []).forEach((cat) => {
    if (cat?.slug) {
      entries.push({
        url: `${SITE_URL}/categories/${cat.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  });

  // Brands
  const brandsRes = await fetchJson("user/brands");
  (brandsRes?.brands || []).forEach((brand) => {
    if (brand?.slug) {
      entries.push({
        url: `${SITE_URL}/brands/${brand.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  });

  return entries;
}
