"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import TrustBadges from "./TrustBadges";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import { socials } from "./socials";
import { OFFICES as offices } from "/app/lib/business";

const SocialLink = ({ href, label, path }) => (
  <a
    href={href}
    rel="noreferrer"
    target="_blank"
    aria-label={label}
    title={label}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-accent hover:ring-accent"
  >
    <span className="sr-only">{label}</span>
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
  </a>
);

export default function Footer() {
  return (
    <footer className="mt-12 bg-primary text-white">
      {/* Trust badges band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <TrustBadges variant="footer" />
        </div>
      </div>

      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
          <div>
            <h2 className="text-xl font-bold">Get the best deals first</h2>
            <p className="mt-1 text-sm text-white/70">
              Quality laptops, phones, accessories — straight to your inbox.
            </p>
          </div>
          <form
            className="flex w-full max-w-md items-stretch overflow-hidden rounded-lg bg-white shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder-gray-400"
            />
            <button type="submit" className="bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo className="h-12 w-auto" wordmark />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Hayzee Computer Resources — your trusted online store for gadgets,
              mobile phones, laptops, desktops and printers.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-accent-300">
              Follow us
            </p>
            <div className="mt-3 flex items-center gap-3">
              {socials.map((s) => (
                <SocialLink key={s.label} href={s.href} label={s.label} path={s.path} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-300">
              Shop
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link href="/laptops" className="transition hover:text-white">Laptops</Link></li>
              <li><Link href="/brands/apple-phone" className="transition hover:text-white">Apple iPhones</Link></li>
              <li><Link href="/brands/android-phone" className="transition hover:text-white">Android Phones</Link></li>
              <li><Link href="/flash-sales" className="transition hover:text-white">Flash Sales</Link></li>
              <li><Link href="/products" className="transition hover:text-white">All Products</Link></li>
              <li><Link href="/blog" className="transition hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-300">
              Help & Support
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><a href="#" className="transition hover:text-white">Useful Links</a></li>
              <li><a href="#" className="transition hover:text-white">Returns Policy</a></li>
              <li><a href="#" className="transition hover:text-white">Support Policy</a></li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-accent-300" /> 08037586863
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-accent-300" /> info@hayzeeonline.com
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-300">
              Our Offices
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              {offices.map((o) => (
                <li key={o.name} className="flex gap-2">
                  <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-300" />
                  <span>
                    <span className="block font-semibold text-white">{o.name}</span>
                    {o.address}
                    <span className="mt-0.5 block text-white/60">{o.phone}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Hayzeeonline. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4 text-xs text-white/60">
            <li><a href="#" className="transition hover:text-white">Terms &amp; Conditions</a></li>
            <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="transition hover:text-white">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
