// Single source of truth for the store's name/address/phone (NAP) and physical
// branches. Used by the Footer, product pages and the LocalBusiness structured
// data so the contact details stay consistent everywhere — and so Google and AI
// tools read one canonical set of facts about the business.

export const SITE_URL = "https://hayzeeonline.com";
export const SITE_NAME = "Hayzeeonline";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: "Hayzee Computer Resources",
  url: SITE_URL,
  email: "info@hayzeeonline.com",
  // Primary customer-service line (E.164) and its local display form.
  phone: "+234-916-140-1307",
  supportPhone: "08037586863",
};

// Physical branches. `phone` is the local display number; `tel` is the same
// number in E.164 form for schema.org / click-to-call.
export const OFFICES = [
  {
    name: "Sango (PolyIbadan Road)",
    address: "Bembo Junction, Beside Access Bank, Ibadan, Oyo State.",
    street: "Bembo Junction, Beside Access Bank, Sango",
    locality: "Ibadan",
    region: "Oyo",
    phone: "09121269786",
    tel: "+2349121269786",
  },
  {
    name: "Poly Ibadan",
    address: "Poly Ibadan First Gate, Sango, Ibadan, Oyo State.",
    street: "Poly Ibadan First Gate, Sango",
    locality: "Ibadan",
    region: "Oyo",
    phone: "08112946602",
    tel: "+2348112946602",
  },
  {
    name: "Iwo Road",
    address: "Omoola Travels, Fanawole Street, Behind World Oil, Iwo Road, Ibadan.",
    street: "Omoola Travels, Fanawole Street, Behind World Oil, Iwo Road",
    locality: "Ibadan",
    region: "Oyo",
    phone: "08071024533",
    tel: "+2348071024533",
  },
  {
    name: "Ojoo",
    address: "Govt. Shop, Ojoo Roundabout (Opposite Ladegbuwa Petrol Station), Ibadan.",
    street: "Govt. Shop, Ojoo Roundabout (Opposite Ladegbuwa Petrol Station)",
    locality: "Ibadan",
    region: "Oyo",
    phone: "08076420157",
    tel: "+2348076420157",
  },
];

// LocalBusiness / Store structured data. Each branch is its own Store node that
// links back to the parent Organization (defined in layout.jsx) via `parentOrganization`.
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": OFFICES.map((o, i) => ({
    "@type": "Store",
    "@id": `${SITE_URL}/#store-${i + 1}`,
    name: `${BUSINESS.name} — ${o.name}`,
    image: `${SITE_URL}/logo5.png`,
    url: SITE_URL,
    telephone: o.tel,
    email: BUSINESS.email,
    priceRange: "₦₦",
    currenciesAccepted: "NGN",
    paymentAccepted: "Cash, Card, Bank Transfer, Payment on Delivery",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.locality,
      addressRegion: o.region,
      addressCountry: "NG",
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
  })),
};
