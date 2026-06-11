import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export const DELIVERY_OPTIONS = [
  { value: "3000", title: "Ibadan", desc: "Within Ibadan", price: 3000 },
  { value: "6000", title: "Oyo State", desc: "Other towns across Oyo", price: 6000 },
  {
    value: "8000",
    title: "South-West & Lagos",
    desc: "Ekiti, Kwara, Ogun, Ondo, Osun, Oyo, Lagos",
    price: 8000,
  },
  {
    value: "14000",
    title: "South-East & South-South",
    desc: "Abia, Akwa Ibom, Anambra, Bayelsa, Cross River, Delta, Ebonyi, Edo, Enugu, Imo, Kogi, Rivers, Plateau",
    price: 14000,
  },
  {
    value: "20000",
    title: "Northern States",
    desc: "Adamawa, Bauchi, Benue, Borno, Jigawa, Kaduna, Kano, Katsina, Kebbi, Nassarawa, Niger, Sokoto, Taraba, Zamfara, Gombe, Yobe",
    price: 20000,
  },
];

const fmt = (v) => `₦${v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const DeliverySelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const searchRef = useRef(null);

  const selected = DELIVERY_OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const filtered = DELIVERY_OPTIONS.filter((o) =>
    `${o.title} ${o.desc}`.toLowerCase().includes(search.toLowerCase())
  );

  const choose = (val) => {
    onChange(val);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition ${
          open ? "border-primary" : "border-gray-200 hover:border-primary-300"
        }`}
      >
        <MapPinIcon className="h-5 w-5 flex-shrink-0 text-accent" />
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block truncate text-sm font-semibold text-gray-800">
                {selected.title}
              </span>
              <span className="block truncate text-xs text-gray-400">{selected.desc}</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">Select your delivery location</span>
          )}
        </span>
        {selected && (
          <span className="flex-shrink-0 rounded-md bg-primary-50 px-2 py-1 text-xs font-bold text-primary">
            {fmt(selected.price)}
          </span>
        )}
        <ChevronDownIcon
          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          <div className="border-b border-gray-100 bg-gray-50 p-3">
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your state or city…"
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <ul className="max-h-64 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-gray-400">
                No location matches “{search}”
              </li>
            ) : (
              filtered.map((o) => {
                const active = o.value === value;
                return (
                  <li key={o.value}>
                    <button
                      type="button"
                      onClick={() => choose(o.value)}
                      className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        active ? "bg-primary-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-semibold ${active ? "text-primary" : "text-gray-800"}`}>
                          {o.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-gray-400">
                          {o.desc}
                        </span>
                      </span>
                      <span className="flex flex-shrink-0 items-center gap-1.5">
                        <span className={`text-xs font-bold ${active ? "text-primary" : "text-gray-500"}`}>
                          {fmt(o.price)}
                        </span>
                        {active && <CheckIcon className="h-4 w-4 text-primary" />}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeliverySelect;
