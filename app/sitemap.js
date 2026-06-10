import settings from "./services/settings";

const SITE_URL = "https://hayzeeonline.com";

// Revalidate the sitemap once a day
export const revalidate = 86400;

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/products", priority: 0.9, changeFrequency: "daily" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/warranty", priority: 0.6, changeFrequency: "yearly" },
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

  // Products — paginate the public catalog so every product page is
  // discoverable by search engines and AI crawlers. Capped for safety.
  try {
    const rowsPerPage = 500;
    const maxPages = 60; // hard cap: up to 30k products
    let pageNum = 1;
    let totalPages = 1;
    do {
      const res = await fetch(`${settings.API_URL}user/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // The catalog endpoint reads price[0]/price[1] server-side, so the
        // full default filter payload is required or it 500s.
        body: JSON.stringify({
          page: pageNum,
          rows: rowsPerPage,
          price: [0, 100000000],
          brand: "",
          rams: [],
          sort: "availability",
          storages: [],
          processors: [],
          category: "",
          search_all: "",
        }),
        next: { revalidate: 86400 },
      });
      if (!res.ok) break;
      const data = await res.json();
      const list = data?.products?.data || [];
      list.forEach((p) => {
        if (p?.slug) {
          entries.push({
            url: `${SITE_URL}/products/${p.slug}`,
            lastModified: p.updated_at ? new Date(p.updated_at) : now,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
      const total = Number(data?.products?.total) || list.length;
      totalPages = Math.min(Math.ceil(total / rowsPerPage), maxPages);
      pageNum += 1;
    } while (pageNum <= totalPages);
  } catch {
    // ignore — sitemap still returns static + category/brand routes
  }

  // Blog posts (allblogs is a POST endpoint)
  try {
    const res = await fetch(`${settings.API_URL}user/allblogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ page: 1, rows: 200 }),
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data = await res.json();
      (data?.blogs?.data || []).forEach((blog) => {
        if (blog?.slug) {
          entries.push({
            url: `${SITE_URL}/blog/${blog.slug}`,
            lastModified: blog.updated_at ? new Date(blog.updated_at) : now,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    }
  } catch {
    // ignore — sitemap still returns static + category/brand routes
  }

  return entries;
}
