"use client";
import CategoryList from "/app/components/CategoryList";

export default function Categories() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-7 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 capitalize mt-5 md:mt-0 lg:mt-0 xl:mt-0">
        Categories
      </h2>
      <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <CategoryList section={"categories"} />
      </div>
    </main>
  );
}
