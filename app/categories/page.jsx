"use client";
import CategoryList from "/app/components/CategoryList";

export default function Categories() {
  return (
    <main className="mt-[96px] min-h-screen bg-gray-50 lg:mt-[148px]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
              Shop by Category
            </h1>
            <p className="mt-1.5 text-gray-600">
              Browse our full range of laptops, phones, accessories and more.
            </p>
          </div>
          <span className="mb-1.5 hidden h-1 w-12 flex-shrink-0 rounded-full bg-accent sm:block" />
        </div>

        <CategoryList section={"categories"} />
      </div>
    </main>
  );
}
