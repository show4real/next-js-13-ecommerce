import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center mt-40">
      <h2 className="text-3xl">We Hit a Brick Wall.</h2>
      <p>We could not find the brand you were looking for.</p>
      <p>
        Go back to Home <Link href="/brands">Brands</Link>.
      </p>
    </main>
  );
}
