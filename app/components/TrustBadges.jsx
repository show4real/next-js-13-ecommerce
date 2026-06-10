"use client";
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  BanknotesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

/**
 * Site-wide trust badges. Rendered in three styles via `variant`:
 *  - "strip"   (default) — white cards in a responsive grid for content sections
 *  - "compact" — small icon + label row, e.g. the product detail sidebar
 *  - "footer"  — tuned for the dark primary footer background
 */
export const TRUST_BADGES = [
  {
    name: "30-Day Warranty",
    description: "Peace of mind after purchase",
    icon: ShieldCheckIcon,
  },
  {
    name: "Tested Before Sale",
    description: "Every device fully checked",
    icon: CheckBadgeIcon,
  },
  {
    name: "Payment on Delivery",
    description: "Pay only when it arrives",
    icon: BanknotesIcon,
  },
  {
    name: "Nationwide Delivery",
    description: "Delivered to your doorstep",
    icon: TruckIcon,
  },
];

export default function TrustBadges({ variant = "strip", className = "" }) {
  if (variant === "footer") {
    return (
      <div
        className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4 ${className}`}
      >
        {TRUST_BADGES.map((b) => (
          <div key={b.name} className="flex items-center gap-3 bg-primary px-4 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
              <b.icon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-white">{b.name}</p>
              <p className="hidden text-[11px] text-white/60 sm:block">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {TRUST_BADGES.map((b) => (
          <div key={b.name} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
              <b.icon className="h-4 w-4" />
            </span>
            <span className="font-medium">{b.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // default: "strip"
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 ${className}`}
    >
      {TRUST_BADGES.map((b) => (
        <div
          key={b.name}
          className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-4 py-4 shadow-card transition hover:border-primary-200"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <b.icon className="h-6 w-6" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-gray-900">{b.name}</p>
            <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">{b.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
