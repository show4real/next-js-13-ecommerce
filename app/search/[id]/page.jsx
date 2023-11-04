import SearchList from "/app/search/SearchList";

export const dynamicParams = true; // default val = true

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: params.id,
    openGraph: {
      description: params.id,
    },
    alternates: {
      canonical: `https://hayzeeonline.com`,
      languages: {
        "en-US": "/en-US",
      },
    },
  };
}

const removeSlug = (slug) => {
  return slug.replace(/-/g, " ");
};

export default async function ProductLists({ params }) {
  return (
    <main style={{ marginTop: 20 }}>
      <SearchList search={removeSlug(params.id)} />
    </main>
  );
}
