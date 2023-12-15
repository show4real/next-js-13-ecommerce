import Link from "next/link";
import ProductList from "./products/ProductList";
import SearchList from "/app/search/SearchList";
export default function NotFound() {
  return (
    <main className="text-center">
      <div className="grid mt-28 px-4 bg-white place-content-center" key={1}>
        <div className="text-center">
          <h1 className="font-black text-gray-200 text-4xl">Page Not Found</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Oops!!
          </p>

          <p className="mt-4 text-gray-500">Page Not found</p>

          <Link
            href="/"
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go to Products
          </Link>
        </div>
      </div>
    </main>
  );
}
