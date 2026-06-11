"use client";
import Link from "next/link";
import {
  TruckIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const callouts = [
  {
    name: "Fast & Easy Delivery",
    description: "Nationwide doorstep delivery on every order.",
    icon: TruckIcon,
  },
  {
    name: "Pay on Delivery",
    description: "Seamless payment — pay when your gadget arrives.",
    icon: CreditCardIcon,
  },
  {
    name: "Visit Our Stores",
    description: "Walk into any of our offices across Ibadan.",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "100% As Ordered",
    description: "Every device is tested. You get exactly what you order.",
    icon: ShieldCheckIcon,
  },
];

export default function FeaturedServices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-10 shadow-card sm:px-10">
        {/* decorative */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Why Shop With Hayzeeonline?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">
              Trusted by thousands across Nigeria for quality gadgets at honest
              prices.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {callouts.map((c) => (
              <div
                key={c.name}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white transition group-hover:scale-110">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-white/70">{c.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/products" className="btn-accent w-full sm:w-auto">
              Start Shopping
            </Link>
            <a
              href="https://wa.me/2349161401307"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-5 py-2.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
