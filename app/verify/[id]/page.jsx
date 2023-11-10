import VerifyReferrer from "/app/components/VerifyReferrer";

export const dynamicParams = true;

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Refer your family and friends and earn on our platform",
    openGraph: {
      description: "Refer your family and earn 5% of what they bought",
    },
  };
}

export default async function VerifyEmail({ params }) {
  return (
    <main className="text-center">
      <div className="grid mt-28 px-4 bg-white place-content-center" key={1}>
        <div className="text-center">
          <h1 className="font-black text-black-200 text-4xl">
            Welcome Aboard to Our Afiliate Market!
          </h1>

          <VerifyReferrer referrer_code={params.id} />
        </div>
      </div>
    </main>
  );
}
