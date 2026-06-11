import { NextResponse } from "next/server";

/**
 * Returns Google Business reviews for the store, normalised to the same shape as
 * the seed testimonials in app/lib/testimonials.js:
 *
 *   { configured, rating, total, reviews: [{ author, rating, text, time, photo }] }
 *
 * Configuration (set in .env.local — see the README note / chat guide):
 *   GOOGLE_PLACES_API_KEY  – a Google Cloud key with the Places API (New) enabled
 *   GOOGLE_PLACE_ID        – the Place ID of the business listing
 *
 * Notes:
 *  - The Places API returns at most 5 reviews per place; that is a Google limit.
 *  - When the env vars are missing we return `configured: false` (HTTP 200) so the
 *    UI can quietly fall back to the curated testimonials instead of erroring.
 */

// Cache the upstream response for 6 hours (reviews change slowly + avoid quota burn).
export const revalidate = 21600;

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ configured: false, reviews: [] });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json(
        { configured: true, error: "Upstream error", reviews: [] },
        { status: 502 }
      );
    }

    const data = await res.json();

    const reviews = (data.reviews || []).map((r) => ({
      author: r.authorAttribution?.displayName || "Google user",
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || "",
      time: r.relativePublishTimeDescription || "",
      photo: r.authorAttribution?.photoUri || null,
    }));

    return NextResponse.json({
      configured: true,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      reviews,
    });
  } catch (e) {
    return NextResponse.json(
      { configured: true, error: "Request failed", reviews: [] },
      { status: 500 }
    );
  }
}
