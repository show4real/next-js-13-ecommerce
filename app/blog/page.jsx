import BlogList from "./BlogList";
import { getBlogs } from "/app/services/api";

export const metadata = {
  title: "Blog — Buying Guides, Price Lists & Tips",
  description:
    "Read the Hayzeeonline blog for buying guides, price lists and practical tips on affordable US/UK used laptops, iPhones and Android phones in Nigeria.",
  keywords: [
    "laptop buying guide",
    "UK used laptops price list",
    "US used laptops Nigeria",
    "phone buying tips",
    "Hayzeeonline blog",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Hayzeeonline Blog",
    description:
      "Buying guides, price lists and tips on affordable US/UK used laptops and phones in Nigeria.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs({ page: 1, rows: 9 });

  return (
    <main className="mt-[96px] min-h-screen bg-gray-50 py-10 lg:mt-[148px]">
      <BlogList initialBlogs={blogs?.data || []} initialMeta={blogs} />
    </main>
  );
}
