"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Frequently asked questions surfaced on the homepage. Also emitted as
// FAQPage structured data below so the answers can appear in Google results.
export const FAQS = [
  {
    question: "Do your products come with a warranty?",
    answer:
      "Yes. Every laptop and phone comes with a 30-day warranty covering hardware faults. If a device develops a covered fault within that period, we repair or replace it at no extra cost — just reach out to us with your order details.",
  },
  {
    question: "How does delivery work and how long does it take?",
    answer:
      "We deliver nationwide, right to your doorstep. Orders within Ibadan are typically delivered same-day or next-day, while deliveries to other states usually arrive within 1–3 working days through our trusted dispatch partners.",
  },
  {
    question: "Can I pay on delivery?",
    answer:
      "Yes. Payment on delivery is available — you only pay once your order arrives and you've confirmed it's what you ordered. For some locations a small delivery deposit may be required before dispatch; our team will let you know at checkout.",
  },
  {
    question: "Can I test the product before paying?",
    answer:
      "Absolutely. Every device is fully tested before it leaves us, and you're welcome to inspect and test your item on delivery before completing payment. Power it on, check the screen, keyboard, ports and battery — pay only when you're satisfied.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card transition hover:border-primary-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="text-sm font-bold text-gray-900 sm:text-base">
          {faq.question}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />

      <div className="mb-8">
        <div className="flex items-end gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
            Frequently Asked Questions
          </h2>
          <span className="mb-1.5 h-1 w-12 rounded-full bg-accent" />
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Warranty, delivery, payment and testing — everything you need to know
          before you buy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {FAQS.map((faq, i) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
