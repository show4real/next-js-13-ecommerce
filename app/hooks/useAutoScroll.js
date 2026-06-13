import { useEffect, useRef } from "react";

/**
 * Auto-scrolls a horizontal, overflow-x track one "card" at a time on an
 * interval, looping back to the start once the end is reached. Used by the
 * homepage sliders (brands, reviews, category products, category pills).
 *
 * Behaviour:
 *  - Pauses only while the user is actively touching/dragging the track (not on
 *    mere hover), so a full-width slider still visibly scrolls on desktop.
 *  - Does nothing when the content already fits (e.g. pills that wrap on
 *    desktop) or when the user prefers reduced motion.
 *
 * Pass `deps` (e.g. the item count) so the effect re-attaches once async data
 * has rendered and the ref is finally pointing at a real element.
 *
 * @param {React.RefObject<HTMLElement>} trackRef  the scroll container
 * @param {object}  [opts]
 * @param {number}  [opts.interval=2800]   ms between auto-scroll steps
 * @param {string}  [opts.cardSelector]    selector for one card; defaults to first child
 * @param {number}  [opts.gap=16]          gap (px) added to the card width per step
 * @param {boolean} [opts.enabled=true]    set false to disable entirely
 * @param {Array}   [deps=[]]              extra deps that should re-arm the timer
 */
export default function useAutoScroll(
  trackRef,
  { interval = 2800, cardSelector, gap = 16, enabled = true } = {},
  deps = []
) {
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    // Respect the user's reduced-motion preference.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    // Pause only during an active touch/drag — not on hover — so the rail keeps
    // moving even when the cursor rests over a wide, full-width slider.
    track.addEventListener("pointerdown", pause);
    track.addEventListener("touchstart", pause, { passive: true });
    window.addEventListener("pointerup", resume);
    window.addEventListener("touchend", resume);

    const id = setInterval(() => {
      if (pausedRef.current) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return; // content fits — nothing to scroll

      if (track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const card = cardSelector
        ? track.querySelector(cardSelector)
        : track.firstElementChild;
      const step = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
      track.scrollBy({ left: step, behavior: "smooth" });
    }, interval);

    return () => {
      clearInterval(id);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("touchstart", pause);
      window.removeEventListener("pointerup", resume);
      window.removeEventListener("touchend", resume);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackRef, interval, cardSelector, gap, enabled, ...deps]);
}
