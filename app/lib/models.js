/**
 * Device model catalogue, tagged by brand + device type, used to power the
 * intelligent Model filter. `brand` values match the store's brand names so the
 * Model options can be narrowed to the selected brand, and `type` lets us scope
 * them to the current category (laptop / phone / tablet).
 */

const make = (brand, type, names) => names.map((name) => ({ name, brand, type }));

export const MODELS = [
  // ---------------------------- iPhone (Apple Phone) -------------------------
  ...make("Apple Phone", "phone", [
    "iPhone 6", "iPhone 6 Plus", "iPhone 6s", "iPhone 6s Plus", "iPhone SE (2016)",
    "iPhone 7", "iPhone 7 Plus", "iPhone 8", "iPhone 8 Plus", "iPhone X",
    "iPhone XR", "iPhone XS", "iPhone XS Max", "iPhone 11", "iPhone 11 Pro",
    "iPhone 11 Pro Max", "iPhone SE (2020)", "iPhone 12 mini", "iPhone 12",
    "iPhone 12 Pro", "iPhone 12 Pro Max", "iPhone 13 mini", "iPhone 13",
    "iPhone 13 Pro", "iPhone 13 Pro Max", "iPhone SE (2022)", "iPhone 14",
    "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15",
    "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16",
    "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
  ]),

  // ------------------------------- iPad (Apple) -----------------------------
  ...make("Apple iPad", "tablet", [
    "iPad (5th Gen)", "iPad (6th Gen)", "iPad (7th Gen)", "iPad (8th Gen)",
    "iPad (9th Gen)", "iPad (10th Gen)", "iPad Air 2", "iPad Air (3rd Gen)",
    "iPad Air (4th Gen)", "iPad Air (5th Gen)", "iPad mini 4", "iPad mini (5th Gen)",
    "iPad mini (6th Gen)", "iPad Pro 9.7", "iPad Pro 10.5", "iPad Pro 11 (1st Gen)",
    "iPad Pro 11 (2nd Gen)", "iPad Pro 11 (3rd Gen)", "iPad Pro 11 (4th Gen)",
    "iPad Pro 12.9 (2nd Gen)", "iPad Pro 12.9 (3rd Gen)", "iPad Pro 12.9 (4th Gen)",
    "iPad Pro 12.9 (5th Gen)", "iPad Pro 12.9 (6th Gen)",
  ]),

  // ------------------------------- MacBook ----------------------------------
  ...make("MacBook", "laptop", [
    // MacBook Air (Intel)
    "MacBook Air 11 (2014)", "MacBook Air 11 (2015)", "MacBook Air 13 (2014)",
    "MacBook Air 13 (2015)", "MacBook Air 13 (2017)", "MacBook Air 13 (2018)",
    "MacBook Air 13 (2019)", "MacBook Air 13 (2020, Intel)",
    // MacBook Air (Apple Silicon)
    "MacBook Air M1", "MacBook Air 13 (M2)", "MacBook Air 15 (M2)",
    "MacBook Air 13 (M3)", "MacBook Air 15 (M3)",
    // MacBook Pro 13 (Intel)
    "MacBook Pro 13 (2015)", "MacBook Pro 13 (2016)", "MacBook Pro 13 (2017)",
    "MacBook Pro 13 (2018)", "MacBook Pro 13 (2019)", "MacBook Pro 13 (2020, Intel)",
    // MacBook Pro 13 (Apple Silicon)
    "MacBook Pro 13 M1", "MacBook Pro 13 M2",
    // MacBook Pro 14
    "MacBook Pro 14 (M1 Pro)", "MacBook Pro 14 (M1 Max)", "MacBook Pro 14 (M2 Pro)",
    "MacBook Pro 14 (M2 Max)", "MacBook Pro 14 (M3)", "MacBook Pro 14 (M3 Pro)",
    "MacBook Pro 14 (M3 Max)",
    // MacBook Pro 15 / 16
    "MacBook Pro 15 (2017)", "MacBook Pro 15 (2018)", "MacBook Pro 15 (2019)",
    "MacBook Pro 16 (2019)", "MacBook Pro 16 (M1 Pro)", "MacBook Pro 16 (M1 Max)",
    "MacBook Pro 16 (M2 Pro)", "MacBook Pro 16 (M2 Max)", "MacBook Pro 16 (M3 Pro)",
    "MacBook Pro 16 (M3 Max)",
    // MacBook (12-inch)
    "MacBook 12 (Retina)",
  ]),

  // --------------------------------- HP -------------------------------------
  ...make("HP", "laptop", [
    // EliteBook 800 series
    "EliteBook 820 G3", "EliteBook 820 G4", "EliteBook 830 G5", "EliteBook 830 G6",
    "EliteBook 830 G7", "EliteBook 830 G8", "EliteBook 830 G9", "EliteBook 835 G8",
    "EliteBook 840 G1", "EliteBook 840 G2", "EliteBook 840 G3", "EliteBook 840 G4",
    "EliteBook 840 G5", "EliteBook 840 G6", "EliteBook 840 G7", "EliteBook 840 G8",
    "EliteBook 840 G9", "EliteBook 845 G7", "EliteBook 845 G8", "EliteBook 845 G9",
    "EliteBook 850 G3", "EliteBook 850 G4", "EliteBook 850 G5", "EliteBook 850 G6",
    "EliteBook 850 G7", "EliteBook 850 G8", "EliteBook 855 G8",
    // EliteBook x360 / Dragonfly
    "EliteBook x360 1030 G2", "EliteBook x360 1030 G3", "EliteBook x360 1030 G4",
    "EliteBook x360 1030 G7", "EliteBook x360 1030 G8", "EliteBook x360 1040 G5",
    "EliteBook x360 1040 G6", "EliteBook x360 1040 G7", "EliteBook x360 1040 G8",
    "EliteBook x360 1040 G9", "Elite Dragonfly", "Elite Dragonfly G2",
    "Elite Dragonfly G3",
    // ProBook
    "ProBook 430 G6", "ProBook 430 G7", "ProBook 430 G8", "ProBook 440 G5",
    "ProBook 440 G6", "ProBook 440 G7", "ProBook 440 G8", "ProBook 440 G9",
    "ProBook 445 G7", "ProBook 445 G8", "ProBook 445 G9", "ProBook 450 G6",
    "ProBook 450 G7", "ProBook 450 G8", "ProBook 450 G9", "ProBook 455 G7",
    "ProBook 455 G8", "ProBook 455 G9", "ProBook 640 G4", "ProBook 640 G5",
    "ProBook 640 G8", "ProBook 650 G4", "ProBook 650 G5", "ProBook 650 G8",
    // Pavilion
    "Pavilion 13", "Pavilion 14", "Pavilion 15", "Pavilion Aero 13",
    "Pavilion x360 14", "Pavilion x360 15", "Pavilion Gaming 15", "Pavilion Gaming 16",
    // Spectre
    "Spectre x360 13", "Spectre x360 14", "Spectre x360 15", "Spectre x360 16",
    // Envy
    "Envy 13", "Envy 14", "Envy 15", "Envy 16", "Envy 17", "Envy x360 13",
    "Envy x360 15", "Envy x360 16",
    // Gaming
    "Omen 15", "Omen 16", "Omen 17", "Victus 15", "Victus 16",
    // ZBook workstations
    "ZBook 14u G5", "ZBook 14u G6", "ZBook 15 G5", "ZBook 15 G6", "ZBook 15u G5",
    "ZBook 15u G6", "ZBook 17 G5", "ZBook 17 G6", "ZBook Firefly 14 G7",
    "ZBook Firefly 14 G8", "ZBook Firefly 15 G7", "ZBook Studio G5", "ZBook Studio G7",
    "ZBook Studio G8", "ZBook Power G7", "ZBook Power G8", "ZBook Fury 15 G7",
    "ZBook Fury 17 G7", "ZBook Create G7",
    // Consumer / budget
    "14s", "15s", "17s", "Stream 11", "Stream 14", "240 G7", "240 G8", "245 G8",
    "250 G7", "250 G8", "255 G7", "255 G8", "340S G7", "348 G7",
    // Chromebook
    "Chromebook 11", "Chromebook 14", "Chromebook 15", "Chromebook x360 14",
  ]),

  // -------------------------------- Dell ------------------------------------
  ...make("Dell", "laptop", [
    // Latitude 3000
    "Latitude 3300", "Latitude 3310", "Latitude 3400", "Latitude 3410",
    "Latitude 3420", "Latitude 3430", "Latitude 3440", "Latitude 3450",
    "Latitude 3510", "Latitude 3520", "Latitude 3530", "Latitude 3540",
    // Latitude 5000
    "Latitude 5300", "Latitude 5310", "Latitude 5320", "Latitude 5400",
    "Latitude 5410", "Latitude 5420", "Latitude 5430", "Latitude 5440",
    "Latitude 5450", "Latitude 5490", "Latitude 5500", "Latitude 5510",
    "Latitude 5520", "Latitude 5530", "Latitude 5540",
    // Latitude 7000
    "Latitude 7200", "Latitude 7210", "Latitude 7280", "Latitude 7290",
    "Latitude 7300", "Latitude 7310", "Latitude 7320", "Latitude 7330",
    "Latitude 7390", "Latitude 7400", "Latitude 7410", "Latitude 7420",
    "Latitude 7430", "Latitude 7440", "Latitude 7480", "Latitude 7490",
    // Latitude 9000
    "Latitude 9410", "Latitude 9420", "Latitude 9430", "Latitude 9510",
    "Latitude 9520",
    // Latitude E (legacy)
    "Latitude E5440", "Latitude E5450", "Latitude E5470", "Latitude E5550",
    "Latitude E5570", "Latitude E6440", "Latitude E6540", "Latitude E7240",
    "Latitude E7250", "Latitude E7270", "Latitude E7440", "Latitude E7450",
    "Latitude E7470",
    // XPS
    "XPS 13 9343", "XPS 13 9350", "XPS 13 9360", "XPS 13 9370", "XPS 13 9380",
    "XPS 13 9300", "XPS 13 9310", "XPS 13 9315", "XPS 13 9320", "XPS 13 2-in-1 9310",
    "XPS 13 2-in-1 9315", "XPS 13 Plus 9320", "XPS 15 9550", "XPS 15 9560",
    "XPS 15 9570", "XPS 15 9500", "XPS 15 9510", "XPS 15 9520", "XPS 15 9530",
    "XPS 17 9700", "XPS 17 9710", "XPS 17 9720", "XPS 17 9730",
    // Inspiron
    "Inspiron 13 5000", "Inspiron 14 3000", "Inspiron 14 5000", "Inspiron 14 7000",
    "Inspiron 15 3000", "Inspiron 15 5000", "Inspiron 15 7000", "Inspiron 16 5000",
    "Inspiron 16 7000", "Inspiron 17 3000",
    // Vostro
    "Vostro 13 5000", "Vostro 14 3000", "Vostro 14 5000", "Vostro 15 3000",
    "Vostro 15 5000", "Vostro 15 7000",
    // Precision
    "Precision 3540", "Precision 3550", "Precision 3560", "Precision 3570",
    "Precision 5530", "Precision 5540", "Precision 5550", "Precision 5560",
    "Precision 5570", "Precision 7530", "Precision 7540", "Precision 7550",
    "Precision 7560", "Precision 7740", "Precision 7750", "Precision 7760",
    // G series & Alienware
    "G3 15", "G5 15", "G7 15", "G15", "G16", "Alienware m15", "Alienware m15 R2",
    "Alienware m15 R3", "Alienware m17", "Alienware m17 R2", "Alienware m17 R3",
    "Alienware x14", "Alienware x15", "Alienware x17", "Alienware Area-51m",
  ]),

  // ------------------------------- Lenovo -----------------------------------
  ...make("Lenovo", "laptop", [
    // ThinkPad X1 Carbon / Yoga / Extreme / Nano
    "ThinkPad X1 Carbon Gen 5", "ThinkPad X1 Carbon Gen 6", "ThinkPad X1 Carbon Gen 7",
    "ThinkPad X1 Carbon Gen 8", "ThinkPad X1 Carbon Gen 9", "ThinkPad X1 Carbon Gen 10",
    "ThinkPad X1 Carbon Gen 11", "ThinkPad X1 Yoga Gen 3", "ThinkPad X1 Yoga Gen 4",
    "ThinkPad X1 Yoga Gen 5", "ThinkPad X1 Yoga Gen 6", "ThinkPad X1 Yoga Gen 7",
    "ThinkPad X1 Extreme Gen 2", "ThinkPad X1 Extreme Gen 3", "ThinkPad X1 Extreme Gen 4",
    "ThinkPad X1 Nano",
    // ThinkPad X
    "ThinkPad X260", "ThinkPad X270", "ThinkPad X280", "ThinkPad X390",
    "ThinkPad X395", "ThinkPad X13", "ThinkPad X13 Gen 2", "ThinkPad X13 Gen 3",
    "ThinkPad X13 Yoga", "ThinkPad X12 Detachable",
    // ThinkPad T
    "ThinkPad T440", "ThinkPad T450", "ThinkPad T460", "ThinkPad T460s",
    "ThinkPad T470", "ThinkPad T470s", "ThinkPad T480", "ThinkPad T480s",
    "ThinkPad T490", "ThinkPad T490s", "ThinkPad T495", "ThinkPad T14",
    "ThinkPad T14 Gen 2", "ThinkPad T14 Gen 3", "ThinkPad T14s", "ThinkPad T15",
    "ThinkPad T15g", "ThinkPad T16", "ThinkPad T570", "ThinkPad T580", "ThinkPad T590",
    // ThinkPad E
    "ThinkPad E480", "ThinkPad E490", "ThinkPad E495", "ThinkPad E14",
    "ThinkPad E14 Gen 2", "ThinkPad E14 Gen 3", "ThinkPad E15", "ThinkPad E15 Gen 2",
    "ThinkPad E580", "ThinkPad E590",
    // ThinkPad L
    "ThinkPad L380", "ThinkPad L390", "ThinkPad L480", "ThinkPad L490",
    "ThinkPad L13", "ThinkPad L13 Yoga", "ThinkPad L14", "ThinkPad L15",
    "ThinkPad L580", "ThinkPad L590",
    // ThinkPad P (workstation)
    "ThinkPad P1", "ThinkPad P1 Gen 2", "ThinkPad P1 Gen 3", "ThinkPad P14s",
    "ThinkPad P15", "ThinkPad P15s", "ThinkPad P15v", "ThinkPad P17",
    "ThinkPad P52", "ThinkPad P53", "ThinkPad P53s",
    // IdeaPad
    "IdeaPad 1", "IdeaPad 3", "IdeaPad 3i", "IdeaPad 5", "IdeaPad 5i",
    "IdeaPad S145", "IdeaPad S340", "IdeaPad S540", "IdeaPad Flex 5",
    "IdeaPad Flex 5i", "IdeaPad Slim 3", "IdeaPad Slim 5", "IdeaPad Slim 7",
    "IdeaPad Slim 7i", "IdeaPad Slim 9i", "IdeaPad Gaming 3", "IdeaPad Gaming 3i",
    "IdeaPad Duet",
    // Yoga
    "Yoga 6", "Yoga 7", "Yoga 7i", "Yoga 9", "Yoga 9i", "Yoga C740", "Yoga C940",
    "Yoga Slim 7", "Yoga Slim 7i", "Yoga Slim 7 Pro",
    // Legion
    "Legion 5", "Legion 5i", "Legion 5 Pro", "Legion 5i Pro", "Legion 7",
    "Legion 7i", "Legion Slim 7", "Legion Y540", "Legion Y545", "Legion Y740",
    // ThinkBook
    "ThinkBook 13s", "ThinkBook 14", "ThinkBook 14 Gen 2", "ThinkBook 14s",
    "ThinkBook 15", "ThinkBook 15 Gen 2", "ThinkBook 16",
  ]),

  // -------------------------------- Asus ------------------------------------
  ...make("Asus", "laptop", [
    // ZenBook
    "ZenBook 13", "ZenBook 14", "ZenBook 14X", "ZenBook 15", "ZenBook Flip 13",
    "ZenBook Flip 14", "ZenBook Flip 15", "ZenBook Duo 14", "ZenBook Pro 15",
    "ZenBook Pro Duo 15", "ZenBook S 13",
    // VivoBook
    "VivoBook 14", "VivoBook 15", "VivoBook 17", "VivoBook S14", "VivoBook S15",
    "VivoBook Pro 14", "VivoBook Pro 15", "VivoBook Pro 16", "VivoBook Flip 14",
    "VivoBook Go 14", "VivoBook Go 15",
    // ROG (Republic of Gamers)
    "ROG Zephyrus G14", "ROG Zephyrus G15", "ROG Zephyrus G16", "ROG Zephyrus M16",
    "ROG Zephyrus Duo 16", "ROG Strix G15", "ROG Strix G17", "ROG Strix Scar 15",
    "ROG Strix Scar 17", "ROG Strix Scar 18", "ROG Flow X13", "ROG Flow Z13",
    // TUF Gaming
    "TUF Gaming F15", "TUF Gaming F17", "TUF Gaming A15", "TUF Gaming A17",
    "TUF Dash F15", "TUF Gaming A16",
    // Business / Chromebook
    "ExpertBook B9", "ExpertBook B1", "ExpertBook B5", "Chromebook Flip C434",
    "Chromebook CX1", "Chromebook CX9",
  ]),

  // -------------------------------- Acer ------------------------------------
  ...make("Acer", "laptop", [
    // Aspire
    "Aspire 1", "Aspire 3", "Aspire 5", "Aspire 7", "Aspire Vero", "Aspire Go",
    // Swift
    "Swift 1", "Swift 3", "Swift 5", "Swift X", "Swift Go 14", "Swift Edge 16",
    // Spin
    "Spin 1", "Spin 3", "Spin 5", "Spin 7",
    // Nitro / Predator (gaming)
    "Nitro 5", "Nitro 7", "Nitro 16", "Nitro 17", "Predator Helios 300",
    "Predator Helios 16", "Predator Helios 18", "Predator Triton 300",
    "Predator Triton 500", "Predator Triton 500 SE",
    // Business / Chromebook
    "TravelMate P2", "TravelMate P4", "TravelMate P6", "Extensa 15",
    "Chromebook 314", "Chromebook 315", "Chromebook Spin 514",
  ]),

  // --------------------------------- MSI ------------------------------------
  ...make("MSI", "laptop", [
    // Gaming – GF / GL / Katana / Cyborg / Thin
    "GF63 Thin", "GF65 Thin", "GF66 Katana", "Katana GF66", "Katana 15",
    "Katana 17", "Cyborg 15", "Sword 15", "Sword 17", "Pulse GL66", "Pulse 15",
    "Pulse 17",
    // Gaming – GP / GE / GS / Raider / Vector / Stealth / Titan
    "GP66 Leopard", "GP76 Leopard", "GE66 Raider", "GE76 Raider", "Raider GE68",
    "Raider GE78", "Vector GP66", "Vector GP76", "GS66 Stealth", "Stealth 14",
    "Stealth 15M", "Stealth 16", "Stealth 17", "Titan GT77", "GT76 Titan",
    // Creator / Content
    "Creator 15", "Creator 17", "Creator M16", "Creator Z16", "Creator Z17",
    // Business / Thin & light
    "Modern 14", "Modern 15", "Prestige 14", "Prestige 15", "Prestige 16",
    "Summit E13 Flip", "Summit E14", "Summit E16 Flip", "Bravo 15", "Bravo 17",
  ]),

  // ------------------------------- Toshiba ----------------------------------
  ...make("Toshiba", "laptop", [
    "Satellite C40", "Satellite C50", "Satellite C55", "Satellite C660",
    "Satellite L40", "Satellite L50", "Satellite L750", "Satellite Pro C50",
    "Satellite Pro R50", "Satellite Pro A50", "Portege X30", "Portege Z30",
    "Portege Z830", "Tecra A40", "Tecra A50", "Tecra X40", "Tecra Z40",
    "Dynabook Tecra A40", "Dynabook Tecra A50", "Dynabook Portege X30",
    "Dynabook Satellite Pro C50",
  ]),

  // ----------------------------- Packard Bell -------------------------------
  ...make("Packard Bell", "laptop", [
    "EasyNote TE", "EasyNote LE", "EasyNote ENTG",
  ]),

  // --------------------------- Microsoft Surface ----------------------------
  ...make("Microsoft Surface", "laptop", [
    "Surface Laptop 3", "Surface Laptop 4", "Surface Laptop 5",
    "Surface Laptop Go", "Surface Book 2", "Surface Book 3",
  ]),
  ...make("Microsoft Surface", "tablet", [
    "Surface Pro 6", "Surface Pro 7", "Surface Pro 8", "Surface Pro 9",
    "Surface Go 2", "Surface Go 3",
  ]),

  // -------------------------------- Sony ------------------------------------
  ...make("Sony", "laptop", ["VAIO SX14", "VAIO S13", "VAIO Z"]),
  ...make("Sony", "phone", ["Xperia 1 III", "Xperia 5 IV", "Xperia 10 IV", "Xperia 1 V"]),

  // ------------------------------- Samsung ----------------------------------
  ...make("Samsung", "phone", [
    "Galaxy S8", "Galaxy S9", "Galaxy S9+", "Galaxy S10", "Galaxy S10+",
    "Galaxy S20", "Galaxy S20 FE", "Galaxy S21", "Galaxy S21 Ultra", "Galaxy S22",
    "Galaxy S22 Ultra", "Galaxy S23", "Galaxy S23 Ultra", "Galaxy S24",
    "Galaxy S24 Ultra", "Galaxy Note 9", "Galaxy Note 10", "Galaxy Note 20",
    "Galaxy Note 20 Ultra", "Galaxy A12", "Galaxy A13", "Galaxy A14", "Galaxy A23",
    "Galaxy A33", "Galaxy A53", "Galaxy A54", "Galaxy Z Flip 3", "Galaxy Z Flip 4",
    "Galaxy Z Flip 5", "Galaxy Z Fold 3", "Galaxy Z Fold 4", "Galaxy Z Fold 5",
  ]),
  ...make("Samsung", "laptop", ["Galaxy Book", "Galaxy Book2 Pro", "Galaxy Book3 Pro"]),
  ...make("Samsung", "tablet", [
    "Galaxy Tab S6", "Galaxy Tab S7", "Galaxy Tab S8", "Galaxy Tab A7", "Galaxy Tab A8",
  ]),

  // --------------------------- Android Phone (other) ------------------------
  ...make("Android Phone", "phone", [
    "Google Pixel 4", "Google Pixel 5", "Google Pixel 6", "Google Pixel 6 Pro",
    "Google Pixel 7", "Google Pixel 7 Pro", "Google Pixel 8", "Google Pixel 8 Pro",
    "Tecno Camon 19", "Tecno Camon 20", "Tecno Spark 10", "Tecno Phantom X2",
    "Infinix Note 12", "Infinix Note 30", "Infinix Hot 12", "Infinix Zero 20",
    "Xiaomi Redmi Note 11", "Xiaomi Redmi Note 12", "Xiaomi Redmi 10",
    "Xiaomi Mi 11", "Xiaomi Poco X5", "OnePlus 9", "OnePlus 10 Pro",
    "OnePlus Nord 2", "Oppo Reno 7", "Oppo Reno 8", "Oppo A78", "Vivo Y21",
    "Vivo V25", "Nokia G21", "Huawei P30", "Huawei P40", "Huawei Mate 40",
    "Realme 9", "Realme C55",
  ]),

  // ------------------------- Tablet (other Android) -------------------------
  ...make("Tablet", "tablet", [
    "Lenovo Tab M10", "Lenovo Tab P11", "Huawei MatePad", "Huawei MatePad Pro",
    "Amazon Fire HD 10", "Xiaomi Pad 5", "Nokia T20",
  ]),
];

/**
 * Brand display order per device type. The most popular / category-defining
 * brands are listed first so their models surface at the top of the Model
 * filter (e.g. Dell, HP, Lenovo lead the laptop list). Brands not listed here
 * fall back to their original catalogue order, after the prioritised ones.
 */
const BRAND_PRIORITY = {
  laptop: [
    "Dell", "HP", "Lenovo", "MacBook", "Asus", "Acer", "MSI",
    "Microsoft Surface", "Toshiba", "Samsung", "Sony", "Packard Bell",
  ],
  phone: ["Apple Phone", "Samsung", "Android Phone", "Sony"],
  tablet: ["Apple iPad", "Samsung", "Microsoft Surface", "Tablet"],
};

/**
 * Returns a de-duplicated list of model names, narrowed by device `type`
 * (laptop / phone / tablet) and/or `brand` when provided. When no single brand
 * is selected, results are ordered by `BRAND_PRIORITY` so the most relevant
 * brands for the category come first.
 */
export function getModelOptions({ type, brand } = {}) {
  let pool = MODELS;
  if (type) pool = pool.filter((m) => m.type === type);
  if (brand) {
    const b = brand.toLowerCase();
    pool = pool.filter((m) => m.brand.toLowerCase() === b);
  }

  const priority = BRAND_PRIORITY[type] || [];
  if (priority.length) {
    const rank = (name) => {
      const i = priority.indexOf(name);
      return i === -1 ? priority.length : i;
    };
    // Stable sort: order by brand priority, keeping catalogue order within a brand.
    pool = pool
      .map((m, i) => ({ m, i }))
      .sort((a, b) => rank(a.m.brand) - rank(b.m.brand) || a.i - b.i)
      .map((x) => x.m);
  }

  return Array.from(new Set(pool.map((m) => m.name)));
}
