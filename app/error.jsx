"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Next.js renders this (inside the root layout, so
 * the Navbar/Footer stay) whenever a runtime error is thrown while rendering a
 * route segment. Without it, such errors bubble to the root and the whole page
 * is replaced by the generic "Application error" screen.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Surface the real error in the console / monitoring instead of swallowing it.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-gray-500">
          We hit an unexpected error loading this page. Please try again — if it
          keeps happening, refresh or head back to the homepage.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 hover:shadow-md"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
