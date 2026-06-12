"use client";
import { useState, useEffect } from "react";

/**
 * Returns false during server render and the first client render, then true
 * after the component has mounted on the client.
 *
 * Use this to gate any UI that depends on client-only state (e.g. the persisted
 * cart in localStorage). Rendering the same SSR-safe fallback on the server and
 * the first client paint keeps the two in sync and avoids hydration mismatches,
 * which in a production build surface as the generic
 * "Application error: a client-side exception has occurred".
 */
export default function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
