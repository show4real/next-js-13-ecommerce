import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getBlog, getBlogs } from "/app/services/api";

const SITE_URL = "https://hayzeeonline.com";

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }

  const description = stripHtml(blog.description).slice(0, 160);
  const url = `/blog/${blog.slug}`;

  return {
    title: blog.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: blog.name,
      description,
      url,
      siteName: "Hayzeeonline",
      locale: "en_NG",
      images: blog.image ? [{ url: blog.image, alt: blog.name }] : undefined,
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.name,
      description,
      images: blog.image ? [blog.image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetail({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) notFound();

  // A few other recent posts (excluding the current one).
  const list = await getBlogs({ page: 1, rows: 4 });
  const related = (list?.data || []).filter((b) => b.slug !== blog.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.name,
    image: blog.image ? [blog.image] : [],
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    description: stripHtml(blog.description).slice(0, 300),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${blog.slug}` },
    author: { "@type": "Organization", name: "Hayzeeonline" },
    publisher: {
      "@type": "Organization",
      name: "Hayzeeonline",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo5.png` },
    },
  };

  return (
    <main className="mt-[96px] min-h-screen bg-gray-50 pb-16 lg:mt-[148px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Breadcrumb / back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Title */}
        <header className="mt-5">
          {blog.month && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              <CalendarDaysIcon className="h-4 w-4" />
              {blog.month}
            </span>
          )}
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
            {blog.name}
          </h1>
        </header>

        {/* Hero image */}
        {blog.image && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.image}
              alt={blog.name}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="blog-content mt-8 max-w-none rounded-2xl border border-gray-100 bg-white p-6 leading-8 text-gray-700 shadow-card sm:p-8"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </article>

      {/* More articles */}
      {related.length > 0 && (
        <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-primary">
              More Articles
            </h2>
            <span className="mb-1.5 h-1 w-12 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => (
              <Link
                key={b.id}
                href={`/blog/${b.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  {b.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.image}
                      alt={b.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {b.month && (
                    <span className="mb-2 text-xs font-medium text-gray-400">{b.month}</span>
                  )}
                  <h3 className="text-base font-bold leading-snug text-primary transition group-hover:text-accent line-clamp-2">
                    {b.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                    {stripHtml(b.description).slice(0, 120)}…
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
