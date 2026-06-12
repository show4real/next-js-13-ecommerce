"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  Squares2X2Icon as SquaresSolid,
  ComputerDesktopIcon as LaptopSolid,
  ShoppingBagIcon as BagSolid,
} from "@heroicons/react/24/solid";
import useCartStore from "/app/store/zustand";
import useHasMounted from "/app/hooks/useHasMounted";

// Mobile-only bottom tab bar. Mirrors the primary actions from the top navbar
// so the key destinations are always within thumb's reach on small screens.
// The Menu tab opens the navbar's slide-out menu via a custom window event.
const TABS = [
  { name: "Home", href: "/", icon: HomeIcon, activeIcon: HomeSolid },
  { name: "Shop", href: "/products", icon: Squares2X2Icon, activeIcon: SquaresSolid },
  { name: "Laptops", href: "/laptops", icon: ComputerDesktopIcon, activeIcon: LaptopSolid },
  { name: "Cart", icon: ShoppingBagIcon, activeIcon: BagSolid, isCart: true, action: "open-cart" },
  { name: "Menu", icon: Bars3Icon, activeIcon: Bars3Icon, action: "open-mobile-menu" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { cart } = useCartStore();
  const hasMounted = useHasMounted();

  // Gate the cart count behind a mounted check to avoid a hydration mismatch
  // (the server has no localStorage, so it always renders an empty cart).
  const totalQuantity = hasMounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-r from-primary to-primary-700 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(14,27,77,0.35)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map((tab) => {
          const active = tab.href ? isActive(tab.href) : false;
          const Icon = active ? tab.activeIcon : tab.icon;

          const inner = (
            <span className="flex flex-col items-center gap-0.5 py-2">
              <span
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-white/20" : ""
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-colors ${
                    active ? "text-white" : "text-white/75"
                  }`}
                />
                {tab.isCart && totalQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {totalQuantity}
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  active ? "text-white" : "text-white/75"
                }`}
              >
                {tab.name}
              </span>
            </span>
          );

          return (
            <li key={tab.name} className="flex-1">
              {tab.action ? (
                <button
                  type="button"
                  aria-label={tab.name}
                  onClick={() => window.dispatchEvent(new Event(tab.action))}
                  className="flex w-full items-center justify-center active:scale-95"
                >
                  {inner}
                </button>
              ) : (
                <Link
                  href={tab.href}
                  className="flex items-center justify-center active:scale-95"
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
