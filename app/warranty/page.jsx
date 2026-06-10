import Link from "next/link";
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Warranty Policy — 30-Day Coverage on Every Device",
  description:
    "Read the Hayzeeonline warranty policy. Every US/UK used laptop and phone comes with a 30-day warranty covering hardware faults, with free repair or replacement and nationwide support.",
  keywords: [
    "Hayzeeonline warranty",
    "laptop warranty Nigeria",
    "phone warranty policy",
    "30-day warranty used laptops",
    "device warranty Ibadan",
  ],
  alternates: { canonical: "/warranty" },
  openGraph: {
    title: "Hayzeeonline Warranty Policy",
    description:
      "Every device comes with a 30-day warranty covering hardware faults — free repair or replacement and nationwide support.",
    url: "/warranty",
    type: "website",
  },
};

const HIGHLIGHTS = [
  {
    icon: ShieldCheckIcon,
    title: "30-Day Coverage",
    text: "Every laptop and phone is covered against hardware faults for 30 days from the date of delivery.",
  },
  {
    icon: CheckBadgeIcon,
    title: "Tested Before Sale",
    text: "Each device is fully inspected and tested before it leaves us, so faults are rare in the first place.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Free Repair or Replace",
    text: "If a covered fault appears within the warranty window, we repair or replace it at no extra cost.",
  },
];

const COVERED = [
  "Battery, charging port and power faults not caused by misuse",
  "Display, keyboard, trackpad and touchscreen hardware faults",
  "Internal storage, memory and motherboard failures",
  "Speakers, microphone, camera and built-in ports",
];

const NOT_COVERED = [
  "Physical or liquid damage, cracked screens and dents from drops",
  "Faults caused by misuse, unauthorised repairs or tampering",
  "Software issues, virus infections or data loss",
  "Consumables and normal wear (e.g. gradual battery health decline)",
  "Devices where the warranty period has elapsed",
];

const STEPS = [
  {
    title: "Contact us",
    text: "Reach out within the 30-day window with your order details and a description of the fault.",
  },
  {
    title: "Quick diagnosis",
    text: "We confirm the issue is covered — share photos, a short video or bring the device to any of our offices.",
  },
  {
    title: "Repair or replacement",
    text: "We fix the fault, or replace the device where a repair isn't possible, and get it back to you.",
  },
];

export default function WarrantyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Warranty Policy",
    description:
      "Hayzeeonline warranty policy — every device comes with a 30-day warranty covering hardware faults.",
    url: "https://hayzeeonline.com/warranty",
  };

  return (
    <main className="mt-[96px] min-h-screen bg-gray-50 pb-16 lg:mt-[148px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/80">
            <ShieldCheckIcon className="h-4 w-4" />
            Warranty Policy
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Buy with confidence — every device is covered
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            We stand behind everything we sell. Each laptop and phone comes with
            a <span className="font-semibold text-white">30-day warranty</span>{" "}
            covering hardware faults, backed by free repair or replacement and
            support across our offices nationwide.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Highlights */}
        <div className="-mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <h.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-base font-bold text-gray-900">{h.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{h.text}</p>
            </div>
          ))}
        </div>

        {/* Coverage period */}
        <section className="mt-10 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-extrabold text-primary">Coverage period</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            The warranty runs for <strong>30 days from the date your order is
            delivered or collected</strong>. It applies to the original buyer and
            covers manufacturing and hardware faults that are not the result of
            damage or misuse. We recommend testing your device thoroughly on
            delivery — you&apos;re welcome to power it on and check it before you pay.
          </p>
        </section>

        {/* What's covered / not covered */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-green-200/70 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <CheckBadgeIcon className="h-6 w-6 text-green-600" />
              <h2 className="text-lg font-extrabold text-primary">What&apos;s covered</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {COVERED.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-amber-200/70 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
              <h2 className="text-lg font-extrabold text-primary">
                What&apos;s not covered
              </h2>
            </div>
            <ul className="mt-4 space-y-3">
              {NOT_COVERED.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* How to claim */}
        <section className="mt-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <WrenchScrewdriverIcon className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-extrabold text-primary">
              How to make a warranty claim
            </h2>
          </div>
          <ol className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact CTA */}
        <section className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Need to make a claim or have a question?
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Our team is ready to help across all our offices nationwide.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:08112946602"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
            >
              <PhoneIcon className="h-4 w-4" />
              Call us
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Continue shopping
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
