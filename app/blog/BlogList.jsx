"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { getAllBlogs } from "/app/services/productService";

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const excerpt = (html, len = 140) => {
  const text = stripHtml(html);
  return text.length > len ? `${text.slice(0, len).trim()}…` : text;
};

const BlogCard = ({ blog }) => (
  <Link
    href={`/blog/${blog.slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
  >
    <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
      {blog.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blog.image}
          alt={blog.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-300">
          <CalendarDaysIcon className="h-10 w-10" />
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col p-5">
      {blog.month && (
        <span className="mb-2 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-gray-400">
          <CalendarDaysIcon className="h-4 w-4" />
          {blog.month}
        </span>
      )}
      <h3 className="text-base font-bold leading-snug text-primary transition group-hover:text-accent line-clamp-2">
        {blog.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-3">
        {excerpt(blog.description)}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Read article
        <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </div>
  </Link>
);

export default function BlogList({ initialBlogs = [], initialMeta = null }) {
  const ROWS = 9;
  const [blogs, setBlogs] = useState(initialBlogs);
  const [page, setPage] = useState(initialMeta?.current_page || 1);
  const [total, setTotal] = useState(initialMeta?.total || initialBlogs.length);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce the search box
  useEffect(() => {
    const t = setTimeout(() => setTerm(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Skip the very first fetch when the server already provided page 1.
  const [primed, setPrimed] = useState(initialBlogs.length > 0);

  useEffect(() => {
    if (primed && page === 1 && term === "") {
      setPrimed(false);
      return;
    }
    let active = true;
    setLoading(true);
    getAllBlogs({ page, rows: ROWS, search: term })
      .then((res) => {
        if (!active) return;
        setBlogs(res?.blogs?.data || []);
        setTotal(res?.blogs?.total || 0);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, term]);

  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-end gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
              Blog
            </h1>
            <span className="mb-2 h-1 w-12 rounded-full bg-accent" />
          </div>
          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Buying guides, price lists and tips on US/UK used laptops and phones.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={onSearch}
            placeholder="Search articles…"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="aspect-[16/10] w-full bg-gray-200" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-1/3 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mb-4 text-6xl">📝</div>
          <h3 className="text-xl font-semibold text-gray-900">No articles found</h3>
          <p className="mt-1 text-gray-500">
            {term ? `Nothing matches “${term}”.` : "Check back soon for new posts."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && total > ROWS && (
        <div className="flex justify-center py-10">
          <Pagination
            current={page}
            total={total}
            pageSize={ROWS}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            showSizeChanger={false}
            className="custom-pagination"
          />
        </div>
      )}
    </div>
  );
}
