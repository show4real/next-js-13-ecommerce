/**
 * Curated customer testimonials shown in the "What Our Customers Say" section.
 *
 * These are used as the default content and as a graceful fallback whenever live
 * Google reviews are unavailable (API key / Place ID not configured, network
 * error, or an empty response). The shape matches the normalised Google review
 * object returned by /api/google-reviews so the UI can render either source.
 */
export const TESTIMONIALS = [
  {
    author: "Adebayo Ogunleye",
    rating: 5,
    text: "Ordered an HP EliteBook and it arrived the next day in Lagos. Exactly as described — clean, fast and well tested. Paid on delivery with no stress. Highly recommended!",
    time: "2 weeks ago",
    location: "Lagos",
  },
  {
    author: "Chinwe Okafor",
    rating: 5,
    text: "I was scared of buying a UK used laptop online but Hayzeeonline proved me wrong. My Dell Latitude is in great condition and the battery is solid. Will definitely buy again.",
    time: "1 month ago",
    location: "Enugu",
  },
  {
    author: "Musa Ibrahim",
    rating: 5,
    text: "Bought an iPhone for my wife. The team was very honest about the condition and it works perfectly. Delivery to Abuja was quick and smooth.",
    time: "3 weeks ago",
    location: "Abuja",
  },
  {
    author: "Funke Adeyemi",
    rating: 4,
    text: "Good prices and genuine devices. My Lenovo ThinkPad came fully tested. Took a little longer to deliver but customer support kept me updated throughout.",
    time: "1 month ago",
    location: "Ibadan",
  },
  {
    author: "Emeka Nwosu",
    rating: 5,
    text: "This is my third laptop from them. Consistent quality every single time. The 30-day warranty gives real peace of mind. Trusted vendor.",
    time: "2 months ago",
    location: "Port Harcourt",
  },
  {
    author: "Aisha Bello",
    rating: 5,
    text: "Excellent service! I visited the Ibadan office, they let me test the MacBook before paying. Very professional and transparent. Five stars.",
    time: "3 weeks ago",
    location: "Ibadan",
  },
];

// Aggregate rating shown next to the section heading when live data isn't present.
export const TESTIMONIALS_SUMMARY = {
  rating: 4.9,
  total: 480,
};
