/**
 * Device model catalogue, tagged by brand + device type, used to power the
 * intelligent Model filter. `brand` values match the store's brand names so the
 * Model options can be narrowed to the selected brand, and `type` lets us scope
 * them to the current category (laptop / phone / tablet).
 */

const make = (brand, type, names) => names.map((name) => ({ name, brand, type }));

// Prefix every entry in `items` with a series `label` ("Latitude" + 5420 ->
// "Latitude 5420"). Items may be numbers or strings (e.g. "E5470", "5420 2-in-1").
const pre = (label, items) => items.map((x) => `${label} ${x}`);

// Inclusive numeric sequence helper for the few families whose model numbers are
// genuinely contiguous (e.g. iPhone generations, Galaxy S/Note runs).
const seq = (a, b, step = 1) => {
  const out = [];
  for (let n = a; n <= b; n += step) out.push(n);
  return out;
};

// Generation-suffixed SKUs: gx("EliteBook 840", [3,4,5]) -> "EliteBook 840 G3"…
// `gens` lists only the generations that actually shipped for that base.
const gx = (base, gens, word = "G") => gens.map((g) => `${base} ${word}${g}`);

const RAW_MODELS = [
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

  /* ===========================================================================
   * EXPANDED REAL-MODEL CATALOGUE
   * Real series + real model numbers / generations for each brand, so the Model
   * filter is comprehensive. Everything below is de-duplicated against the
   * curated lists above when MODELS is built, so overlaps are harmless.
   * ========================================================================= */

  // ================================ DELL ====================================
  ...make("Dell", "laptop", [
    ...pre("Latitude", [
      3120, 3140, 3150, 3160, 3180, 3189, 3190, 3300, 3301, 3310, 3340, 3380,
      3390, 3400, 3410, 3420, 3430, 3440, 3450, 3460, 3470, 3480, 3490, 3510,
      3520, 3530, 3540, 3550, 3560, 3570, 3580, 3590,
      5280, 5285, 5288, 5289, 5290, 5300, 5310, 5320, 5330, 5340, 5400, 5410,
      5411, 5414, 5420, 5421, 5424, 5430, 5440, 5450, 5480, 5490, 5491, 5495,
      5500, 5510, 5511, 5520, 5530, 5531, 5540, 5550, 5580, 5590, 5591,
      7200, 7210, 7212, 7214, 7220, 7270, 7280, 7285, 7290, 7300, 7310, 7320,
      7330, 7340, 7350, 7370, 7380, 7389, 7390, 7400, 7410, 7414, 7420, 7424,
      7430, 7440, 7450, 7470, 7480, 7490,
      9410, 9420, 9430, 9440, 9510, 9520,
      "E5250", "E5270", "E5400", "E5410", "E5420", "E5430", "E5440", "E5450",
      "E5470", "E5480", "E5490", "E5500", "E5510", "E5520", "E5530", "E5540",
      "E5550", "E5570", "E5580", "E6220", "E6230", "E6320", "E6330", "E6400",
      "E6410", "E6420", "E6430", "E6440", "E6500", "E6510", "E6520", "E6530",
      "E6540", "E7240", "E7250", "E7270", "E7440", "E7450", "E7470", "E7480",
      "3120 2-in-1", "5300 2-in-1", "5310 2-in-1", "7200 2-in-1", "7300 2-in-1",
      "7320 2-in-1", "7390 2-in-1", "9410 2-in-1", "9420 2-in-1", "9430 2-in-1",
    ]),
    ...pre("Inspiron", [
      "13 5300", "13 5310", "13 5320", "13 5390", "13 5391", "13 7300",
      "13 7306", "13 7390", "13 7391",
      "14 3420", "14 3441", "14 3451", "14 3458", "14 3459", "14 3467",
      "14 3473", "14 5400", "14 5402", "14 5406", "14 5408", "14 5410",
      "14 5418", "14 5420", "14 5425", "14 5435", "14 5447", "14 5448",
      "14 5458", "14 5459", "14 5468", "14 5482", "14 5485", "14 5491",
      "14 7400", "14 7405", "14 7415", "14 7420", "14 7425", "14 7430",
      "14 7437", "14 7460", "14 7466", "14 7472",
      "15 3501", "15 3505", "15 3510", "15 3511", "15 3515", "15 3520",
      "15 3521", "15 3525", "15 3530", "15 3531", "15 3537", "15 3541",
      "15 3542", "15 3543", "15 3552", "15 3558", "15 3559", "15 3565",
      "15 3567", "15 3573", "15 3576", "15 3580", "15 3581", "15 3582",
      "15 3583", "15 3584", "15 3585", "15 3590", "15 3593", "15 5501",
      "15 5502", "15 5508", "15 5510", "15 5515", "15 5518", "15 5520",
      "15 5547", "15 5548", "15 5552", "15 5558", "15 5559", "15 5565",
      "15 5566", "15 5567", "15 5568", "15 5570", "15 5575", "15 5577",
      "15 5578", "15 5582", "15 5584", "15 5585", "15 5590", "15 5593",
      "15 5594", "15 5598", "15 7500", "15 7501", "15 7506", "15 7510",
      "15 7558", "15 7559", "15 7560", "15 7566", "15 7567", "15 7570",
      "15 7572", "15 7577", "15 7580", "15 7586", "15 7590", "15 7591",
      "16 5620", "16 5625", "16 5630", "16 7610", "16 7620", "16 7630",
      "16 7640", "17 3737", "17 3750", "17 3780", "17 3781", "17 3782",
      "17 3785", "17 3793", "17 5759", "17 5765", "17 5767", "17 5770",
      "17 7706", "17 7710", "17 7720", "17 7773", "17 7786",
    ]),
    ...pre("XPS", [
      "13 9343", "13 9350", "13 9360", "13 9365", "13 9370", "13 9380",
      "13 9300", "13 9305", "13 9310", "13 9315", "13 9320", "13 9333",
      "13 2-in-1 9310", "13 2-in-1 9315", "13 Plus 9320", "14 9440",
      "15 9550", "15 9560", "15 9570", "15 9575", "15 9500", "15 9510",
      "15 9520", "15 9530", "16 9640", "17 9700", "17 9710", "17 9720",
      "17 9730",
    ]),
    ...pre("Precision", [
      3510, 3520, 3530, 3540, 3541, 3550, 3551, 3560, 3561, 3570, 3571, 3580,
      3581, 5510, 5520, 5530, 5540, 5550, 5560, 5570, 5680, 7510, 7520, 7530,
      7540, 7550, 7560, 7670, 7680, 7710, 7720, 7730, 7740, 7750, 7760, 7770,
      7780,
    ]),
    ...pre("Vostro", [
      3400, 3401, 3405, 3490, 3500, 3501, 3510, 3520, 3525, 3530, 3535, 3550,
      3559, 3568, 3580, 3581, 3583, 3590, 5300, 5301, 5310, 5320, 5390, 5391,
      5402, 5410, 5415, 5471, 5481, 5490, 5502, 5510, 5515, 5568, 5581, 5590,
      5620, 5625, 7500, 7510, 7570, 7580, 7590,
    ]),
    ...pre("G", [
      "3 3500", "3 3579", "3 3590", "5 5500", "5 5505", "5 5587", "5 5590",
      "7 7588", "7 7590", "7 7700", "15 5510", "15 5511", "15 5515", "15 5520",
      "15 5521", "15 5525", "15 5530", "15 5535", "16 7620", "16 7630",
    ]),
    "Alienware m15", "Alienware m15 R2", "Alienware m15 R3", "Alienware m15 R4",
    "Alienware m15 R5", "Alienware m15 R6", "Alienware m15 R7", "Alienware m16",
    "Alienware m16 R2", "Alienware m17", "Alienware m17 R2", "Alienware m17 R3",
    "Alienware m17 R4", "Alienware m17 R5", "Alienware m18", "Alienware m18 R2",
    "Alienware x14", "Alienware x15", "Alienware x15 R2", "Alienware x16",
    "Alienware x17", "Alienware x17 R2", "Alienware Area-51m",
    "Alienware Area-51m R2", "Alienware 13", "Alienware 14", "Alienware 15",
    "Alienware 17", "Alienware 18",
    "Chromebook 11", "Chromebook 11 3100", "Chromebook 11 3110",
    "Chromebook 14", "Chromebook 3120", "Chromebook 3380",
  ]),

  // ================================= HP =====================================
  ...make("HP", "laptop", [
    ...gx("EliteBook 820", [1, 2, 3, 4]),
    ...gx("EliteBook 830", [5, 6, 7, 8, 9, 10, 11]),
    ...gx("EliteBook 835", [7, 8, 9, 10, 11]),
    ...gx("EliteBook 840", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    ...gx("EliteBook 845", [7, 8, 9, 10, 11]),
    ...gx("EliteBook 850", [1, 2, 3, 4, 5, 6, 7, 8]),
    ...gx("EliteBook 855", [7, 8]),
    ...gx("EliteBook 860", [9, 10, 11]),
    ...gx("EliteBook 865", [9, 10, 11]),
    ...gx("EliteBook x360 1030", [2, 3, 4, 7, 8]),
    ...gx("EliteBook x360 1040", [5, 6, 7, 8, 9, 10, 11]),
    ...gx("EliteBook 1040", [3, 4]),
    "EliteBook 1050 G1", "EliteBook Folio 1040 G1", "EliteBook Folio 1040 G2",
    "EliteBook Folio 9470m", "EliteBook Folio 9480m", "EliteBook Folio G1",
    "Elite Dragonfly", "Elite Dragonfly G2", "Elite Dragonfly G3",
    "Elite Dragonfly G4", "Elite x360 1040 G9", "Elite x360 1040 G10",
    ...gx("ProBook 430", [1, 2, 3, 4, 5, 6, 7, 8]),
    ...gx("ProBook 435", [5, 6, 7, 8, 9, 10]),
    ...gx("ProBook 440", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    ...gx("ProBook 445", [6, 7, 8, 9, 10, 11]),
    ...gx("ProBook 450", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    ...gx("ProBook 455", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    ...gx("ProBook 470", [1, 2, 3, 4, 5]),
    ...gx("ProBook 640", [1, 2, 3, 4, 5, 8]),
    ...gx("ProBook 645", [1, 2, 3, 4]),
    ...gx("ProBook 650", [1, 2, 3, 4, 5, 8]),
    "ProBook 4440s", "ProBook 4540s", "ProBook 4740s", "ProBook 11 G1",
    "ProBook 11 G2",
    ...gx("ZBook 14u", [2, 3, 4, 5, 6]),
    ...gx("ZBook 15u", [2, 3, 4, 5, 6]),
    ...gx("ZBook 15", [1, 2, 3, 4, 5, 6]),
    ...gx("ZBook 17", [1, 2, 3, 4, 5, 6]),
    ...gx("ZBook Firefly 14", [7, 8, 9]),
    ...gx("ZBook Firefly 15", [7, 8]),
    ...gx("ZBook Studio", [5, 6, 7, 8]),
    ...gx("ZBook Power", [7, 8, 9]),
    ...gx("ZBook Fury 15", [7, 8]),
    ...gx("ZBook Fury 17", [7, 8]),
    "ZBook Create G7", "ZBook Studio x360 G5", "ZBook x2 G4",
    "Pavilion 13", "Pavilion 14", "Pavilion 15", "Pavilion 17",
    "Pavilion Aero 13", "Pavilion Plus 14", "Pavilion x360 11",
    "Pavilion x360 14", "Pavilion x360 15", "Pavilion Gaming 15",
    "Pavilion Gaming 16", "Pavilion Gaming 17", "Pavilion dm1", "Pavilion dv6",
    "Pavilion dv7", "Pavilion g6", "Pavilion g7",
    "Spectre 13", "Spectre x360 13", "Spectre x360 13.5", "Spectre x360 14",
    "Spectre x360 15", "Spectre x360 16",
    "Envy 13", "Envy 14", "Envy 15", "Envy 16", "Envy 17", "Envy x360 13",
    "Envy x360 14", "Envy x360 15", "Envy x360 16",
    "Omen 15", "Omen 16", "Omen 17", "Omen X", "Omen Transcend 14",
    "Omen Transcend 16", "Victus 15", "Victus 16",
    ...gx("250", [3, 4, 5, 6, 7, 8, 9, 10]),
    ...gx("255", [3, 4, 5, 6, 7, 8, 9, 10]),
    ...gx("240", [5, 6, 7, 8, 9]),
    ...gx("245", [5, 6, 7, 8, 9]),
    "14s", "15s", "17s", "14-dq", "15-dw", "15-eg", "15-fc", "17-by", "17-cn",
    "Stream 11", "Stream 14",
    "Chromebook 11", "Chromebook 14", "Chromebook 15", "Chromebook x360 14",
    "Chromebook x360 14c", "Chromebook Enterprise 14",
  ]),

  // =============================== LENOVO ===================================
  ...make("Lenovo", "laptop", [
    ...gx("ThinkPad X1 Carbon", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "Gen "),
    ...gx("ThinkPad X1 Yoga", [1, 2, 3, 4, 5, 6, 7, 8], "Gen "),
    ...gx("ThinkPad X1 Extreme", [1, 2, 3, 4, 5], "Gen "),
    "ThinkPad X1 Nano Gen 1", "ThinkPad X1 Nano Gen 2", "ThinkPad X1 Nano Gen 3",
    ...pre("ThinkPad", [
      "X240", "X250", "X260", "X270", "X280", "X380 Yoga", "X390", "X390 Yoga",
      "X395", "X13", "X13 Gen 2", "X13 Gen 3", "X13 Gen 4", "X13 Yoga",
      "X13 Yoga Gen 2", "X13 Yoga Gen 3", "X12 Detachable", "X12 Detachable Gen 2",
      "T440", "T440p", "T440s", "T450", "T450s", "T460", "T460p", "T460s",
      "T470", "T470p", "T470s", "T480", "T480s", "T490", "T490s", "T495",
      "T495s", "T14", "T14 Gen 2", "T14 Gen 3", "T14 Gen 4", "T14s",
      "T14s Gen 2", "T14s Gen 3", "T14s Gen 4", "T15", "T15g", "T15p", "T16",
      "T16 Gen 2", "T540p", "T550", "T560", "T570", "T580", "T590",
      "E450", "E460", "E470", "E480", "E490", "E495", "E14", "E14 Gen 2",
      "E14 Gen 3", "E14 Gen 4", "E14 Gen 5", "E15", "E15 Gen 2", "E15 Gen 3",
      "E15 Gen 4", "E16", "E550", "E560", "E570", "E580", "E590",
      "L440", "L450", "L460", "L470", "L480", "L490", "L13", "L13 Gen 2",
      "L13 Yoga", "L14", "L14 Gen 2", "L14 Gen 3", "L15", "L15 Gen 2",
      "L15 Gen 3", "L380", "L380 Yoga", "L390", "L540", "L560", "L570",
      "L580", "L590", "P1", "P1 Gen 2", "P1 Gen 3", "P1 Gen 4", "P1 Gen 5",
      "P14s", "P14s Gen 2", "P14s Gen 3", "P15", "P15 Gen 2", "P15s", "P15v",
      "P16", "P16s", "P16v", "P17", "P50", "P51", "P52", "P52s", "P53",
      "P53s", "P70", "P71", "P72", "P73",
    ]),
    "IdeaPad 1", "IdeaPad 3", "IdeaPad 3i", "IdeaPad 5", "IdeaPad 5i",
    "IdeaPad 5 Pro", "IdeaPad Slim 3", "IdeaPad Slim 3i", "IdeaPad Slim 5",
    "IdeaPad Slim 5i", "IdeaPad Slim 7", "IdeaPad Slim 7i", "IdeaPad Slim 9i",
    "IdeaPad S145", "IdeaPad S340", "IdeaPad S540", "IdeaPad Flex 5",
    "IdeaPad Flex 5i", "IdeaPad Gaming 3", "IdeaPad Gaming 3i", "IdeaPad Duet",
    "IdeaPad Duet 3", "IdeaPad Duet 5",
    "Yoga 6", "Yoga 7", "Yoga 7i", "Yoga 9", "Yoga 9i", "Yoga C630",
    "Yoga C740", "Yoga C930", "Yoga C940", "Yoga Slim 6", "Yoga Slim 7",
    "Yoga Slim 7i", "Yoga Slim 7 Pro", "Yoga Slim 7i Pro", "Yoga Book 9i",
    "Yoga Pro 7", "Yoga Pro 9i",
    "Legion 5", "Legion 5i", "Legion 5 Pro", "Legion 5i Pro", "Legion 7",
    "Legion 7i", "Legion 9i", "Legion Slim 5", "Legion Slim 7", "Legion Pro 5",
    "Legion Pro 5i", "Legion Pro 7", "Legion Pro 7i", "Legion Y530",
    "Legion Y540", "Legion Y545", "Legion Y730", "Legion Y740",
    "ThinkBook 13s", "ThinkBook 14", "ThinkBook 14 Gen 2", "ThinkBook 14 Gen 3",
    "ThinkBook 14 Gen 4", "ThinkBook 14s", "ThinkBook 15", "ThinkBook 15 Gen 2",
    "ThinkBook 15 Gen 3", "ThinkBook 15 Gen 4", "ThinkBook 16",
    "ThinkBook 16 Gen 4", "ThinkBook 16p", "ThinkBook Plus",
    "V14", "V15", "V17", "V330", "V340", "V14 G2", "V15 G2", "V15 G3",
  ]),

  // ================================ ASUS ====================================
  ...make("Asus", "laptop", [
    "ZenBook 13", "ZenBook 14", "ZenBook 14X", "ZenBook 14 OLED", "ZenBook 15",
    "ZenBook 17 Fold OLED", "ZenBook Flip 13", "ZenBook Flip 14",
    "ZenBook Flip 15", "ZenBook Duo 14", "ZenBook Duo", "ZenBook Pro 14",
    "ZenBook Pro 15", "ZenBook Pro 16X", "ZenBook Pro Duo 15", "ZenBook S 13",
    "ZenBook S 13 OLED", "ZenBook S 16",
    "VivoBook 14", "VivoBook 15", "VivoBook 17", "VivoBook S14", "VivoBook S15",
    "VivoBook S16", "VivoBook Pro 14", "VivoBook Pro 15", "VivoBook Pro 16",
    "VivoBook Flip 14", "VivoBook Go 14", "VivoBook Go 15", "VivoBook 14X",
    "VivoBook 15X", "VivoBook 16X",
    "ROG Zephyrus G14", "ROG Zephyrus G15", "ROG Zephyrus G16",
    "ROG Zephyrus M16", "ROG Zephyrus Duo 16", "ROG Strix G15", "ROG Strix G16",
    "ROG Strix G17", "ROG Strix G18", "ROG Strix Scar 15", "ROG Strix Scar 16",
    "ROG Strix Scar 17", "ROG Strix Scar 18", "ROG Flow X13", "ROG Flow X16",
    "ROG Flow Z13", "ROG Zephyrus G16 OLED", "ROG Strix G513", "ROG Strix G713",
    "TUF Gaming F15", "TUF Gaming F16", "TUF Gaming F17", "TUF Gaming A15",
    "TUF Gaming A16", "TUF Gaming A17", "TUF Dash F15", "TUF Gaming A14",
    "ExpertBook B1", "ExpertBook B2", "ExpertBook B3", "ExpertBook B5",
    "ExpertBook B9", "ProArt Studiobook 16", "ProArt P16", "ProArt PX13",
    "Chromebook Flip C434", "Chromebook Flip CX5", "Chromebook CX1",
    "Chromebook CX9", "Chromebook Plus CX34",
  ]),

  // ================================ ACER ====================================
  ...make("Acer", "laptop", [
    "Aspire 1", "Aspire 3", "Aspire 5", "Aspire 5 Spin 14", "Aspire 7",
    "Aspire Go 14", "Aspire Go 15", "Aspire Vero", "Aspire Vero 15",
    "Aspire E15", "Aspire E5", "Aspire ES15", "Aspire R13", "Aspire R14",
    "Swift 1", "Swift 3", "Swift 3 OLED", "Swift 5", "Swift X", "Swift X 14",
    "Swift Go 14", "Swift Go 16", "Swift Edge 16", "Swift 14 AI",
    "Spin 1", "Spin 3", "Spin 5", "Spin 7",
    "Nitro 5", "Nitro 7", "Nitro 16", "Nitro 17", "Nitro V 15",
    "Predator Helios 300", "Predator Helios 16", "Predator Helios 18",
    "Predator Helios Neo 16", "Predator Triton 300", "Predator Triton 500",
    "Predator Triton 500 SE", "Predator Triton 14", "Predator Triton 17 X",
    "TravelMate P2", "TravelMate P4", "TravelMate P6", "TravelMate Spin P4",
    "Extensa 15", "Chromebook 314", "Chromebook 315", "Chromebook Spin 514",
    "Chromebook Plus 515",
  ]),

  // ================================ MSI =====================================
  ...make("MSI", "laptop", [
    "GF63 Thin", "GF65 Thin", "GF66 Katana", "Katana GF66", "Katana 15",
    "Katana 17", "Katana A15", "Cyborg 15", "Cyborg 14", "Sword 15",
    "Sword 17", "Pulse GL66", "Pulse 15", "Pulse 17", "Thin GF63", "Thin 15",
    "GP66 Leopard", "GP76 Leopard", "GE66 Raider", "GE76 Raider", "Raider GE68",
    "Raider GE78", "Raider GE76", "Vector GP66", "Vector GP76", "Vector 16 HX",
    "Vector 17 HX", "GS66 Stealth", "GS65 Stealth", "Stealth 14", "Stealth 15M",
    "Stealth 16", "Stealth 17", "Stealth GS77", "Titan GT77", "GT76 Titan",
    "Titan 18 HX", "Crosshair 15", "Crosshair 16", "Crosshair 17",
    "Creator 15", "Creator 17", "Creator M16", "Creator Z16", "Creator Z17",
    "Creator Z16P", "Modern 14", "Modern 15", "Prestige 13", "Prestige 14",
    "Prestige 15", "Prestige 16", "Summit E13 Flip", "Summit E14",
    "Summit E16 Flip", "Bravo 15", "Bravo 17", "Alpha 15", "Alpha 17",
    "Prestige 16 AI Evo",
  ]),

  // =============================== TOSHIBA ==================================
  ...make("Toshiba", "laptop", [
    "Satellite C40", "Satellite C50", "Satellite C55", "Satellite C660",
    "Satellite C850", "Satellite C855", "Satellite L40", "Satellite L50",
    "Satellite L300", "Satellite L750", "Satellite L850", "Satellite Pro C40",
    "Satellite Pro C50", "Satellite Pro R50", "Satellite Pro A40",
    "Satellite Pro A50", "Satellite Pro L50", "Portege X30", "Portege X30L",
    "Portege X40", "Portege Z30", "Portege Z830", "Portege R30",
    "Tecra A30", "Tecra A40", "Tecra A50", "Tecra X40", "Tecra Z40", "Tecra Z50",
    "Dynabook Tecra A40", "Dynabook Tecra A50", "Dynabook Portege X30",
    "Dynabook Portege X40", "Dynabook Satellite Pro C40",
    "Dynabook Satellite Pro C50", "Dynabook Satellite Pro L50",
  ]),

  // =============================== SAMSUNG ==================================
  ...make("Samsung", "laptop", [
    "Galaxy Book", "Galaxy Book Pro", "Galaxy Book Pro 360", "Galaxy Book2",
    "Galaxy Book2 Pro", "Galaxy Book2 Pro 360", "Galaxy Book3", "Galaxy Book3 Pro",
    "Galaxy Book3 Pro 360", "Galaxy Book3 Ultra", "Galaxy Book4",
    "Galaxy Book4 Pro", "Galaxy Book4 Pro 360", "Galaxy Book4 Ultra",
    "Galaxy Book4 Edge", "Notebook 9", "Notebook 9 Pro", "Notebook Odyssey",
  ]),
  ...make("Samsung", "phone", [
    ...pre("Galaxy S", [
      "3", "4", "5", "6", "6 Edge", "6 Edge+", "7", "7 Edge", "8", "8+", "9",
      "9+", "10e", "10", "10+", "10 Lite", "20", "20+", "20 Ultra", "20 FE",
      "21", "21+", "21 Ultra", "21 FE", "22", "22+", "22 Ultra", "23", "23+",
      "23 Ultra", "23 FE", "24", "24+", "24 Ultra", "24 FE",
    ]),
    ...pre("Galaxy Note", [
      "3", "4", "5", "8", "9", "10", "10+", "10 Lite", "20", "20 Ultra",
    ]),
    ...pre("Galaxy A", [
      "01", "01 Core", "02", "02s", "03", "03s", "03 Core", "04", "04s", "04e",
      "05", "05s", "06", "10", "10s", "11", "12", "13", "14", "15", "16", "20",
      "20s", "21", "21s", "22", "23", "24", "25", "30", "30s", "31", "32", "33",
      "34", "35", "36", "40", "41", "42", "50", "50s", "51", "52", "52s", "53",
      "54", "55", "70", "71", "72", "73",
    ]),
    ...pre("Galaxy M", [
      "01", "02", "02s", "11", "12", "13", "14", "21", "22", "23", "31", "32",
      "33", "34", "51", "52", "53", "54", "55",
    ]),
    ...pre("Galaxy", [
      "Z Flip", "Z Flip 3", "Z Flip 4", "Z Flip 5", "Z Flip 6", "Z Fold",
      "Z Fold 2", "Z Fold 3", "Z Fold 4", "Z Fold 5", "Z Fold 6", "J2", "J3",
      "J4", "J4+", "J5", "J6", "J6+", "J7", "J7 Prime", "J8", "Xcover 5",
      "Xcover 6 Pro",
    ]),
  ]),
  ...make("Samsung", "tablet", [
    "Galaxy Tab S6", "Galaxy Tab S6 Lite", "Galaxy Tab S7", "Galaxy Tab S7+",
    "Galaxy Tab S7 FE", "Galaxy Tab S8", "Galaxy Tab S8+", "Galaxy Tab S8 Ultra",
    "Galaxy Tab S9", "Galaxy Tab S9+", "Galaxy Tab S9 FE", "Galaxy Tab S9 Ultra",
    "Galaxy Tab A7", "Galaxy Tab A7 Lite", "Galaxy Tab A8", "Galaxy Tab A9",
    "Galaxy Tab A9+", "Galaxy Tab Active 4 Pro", "Galaxy Tab Active 5",
  ]),

  // ============================== APPLE iPhone ==============================
  ...make("Apple Phone", "phone", [
    "iPhone 5", "iPhone 5c", "iPhone 5s", "iPhone SE (1st Gen)",
  ]),

  // =========================== ANDROID PHONE (others) =======================
  ...make("Android Phone", "phone", [
    ...pre("Google Pixel", [
      "3", "3 XL", "3a", "3a XL", "4", "4 XL", "4a", "4a 5G", "5", "5a", "6",
      "6 Pro", "6a", "7", "7 Pro", "7a", "8", "8 Pro", "8a", "9", "9 Pro",
      "9 Pro XL",
    ]),
    ...pre("Tecno", [
      "Spark 6", "Spark 7", "Spark 8", "Spark 9", "Spark 10", "Spark 10 Pro",
      "Spark 11", "Spark 20", "Spark 20 Pro", "Spark Go 2023", "Spark Go 2024",
      "Camon 15", "Camon 16", "Camon 17", "Camon 18", "Camon 19", "Camon 20",
      "Camon 20 Pro", "Camon 30", "Camon 30 Pro", "Pova", "Pova 2", "Pova 3",
      "Pova 4", "Pova 5", "Pova 5 Pro", "Pova 6", "Phantom X", "Phantom X2",
      "Phantom X2 Pro", "Phantom V Fold", "Phantom V Flip", "Pop 5", "Pop 6",
      "Pop 7", "Pop 8", "Pouvoir 4", "Pouvoir 6",
    ]),
    ...pre("Infinix", [
      "Hot 10", "Hot 11", "Hot 11S", "Hot 12", "Hot 12i", "Hot 20", "Hot 30",
      "Hot 30i", "Hot 40", "Hot 40i", "Note 8", "Note 10", "Note 11",
      "Note 11 Pro", "Note 12", "Note 12 Pro", "Note 30", "Note 30 Pro",
      "Note 40", "Note 40 Pro", "Zero 8", "Zero 20", "Zero 30", "Smart 5",
      "Smart 6", "Smart 7", "Smart 8", "GT 10 Pro", "GT 20 Pro",
    ]),
    ...pre("Xiaomi", [
      "Redmi 9", "Redmi 9A", "Redmi 9C", "Redmi 10", "Redmi 10C", "Redmi 12",
      "Redmi 12C", "Redmi 13C", "Redmi Note 9", "Redmi Note 9 Pro",
      "Redmi Note 10", "Redmi Note 10 Pro", "Redmi Note 11", "Redmi Note 11 Pro",
      "Redmi Note 12", "Redmi Note 12 Pro", "Redmi Note 13", "Redmi Note 13 Pro",
      "Mi 10", "Mi 11", "Mi 11 Lite", "12", "12 Pro", "13", "13 Pro", "13T",
      "14", "Poco X3", "Poco X4 Pro", "Poco X5", "Poco X6", "Poco F5",
      "Poco M5", "Poco M6",
    ]),
    ...pre("Oppo", [
      "A15", "A16", "A17", "A18", "A38", "A54", "A57", "A58", "A78", "A79",
      "Reno 5", "Reno 6", "Reno 7", "Reno 8", "Reno 10", "Reno 10 Pro",
      "Reno 11", "Find X3 Pro", "Find X5 Pro", "Find X6 Pro", "Find N2 Flip",
    ]),
    ...pre("Vivo", [
      "Y15", "Y16", "Y17", "Y21", "Y22", "Y27", "Y33s", "Y35", "Y36", "Y100",
      "V21", "V23", "V25", "V27", "V29", "V30", "X80", "X90", "X100",
    ]),
    ...pre("Realme", [
      "8", "8 Pro", "9", "9 Pro", "10", "10 Pro", "11", "11 Pro", "C25",
      "C30", "C33", "C35", "C53", "C55", "C67", "Narzo 50", "Narzo 60",
      "GT 2 Pro", "GT Neo 5",
    ]),
    ...pre("OnePlus", [
      "8", "8 Pro", "8T", "9", "9 Pro", "9R", "10 Pro", "10T", "11", "12",
      "Nord", "Nord 2", "Nord 3", "Nord CE 2", "Nord CE 3", "Nord N20",
    ]),
    ...pre("Nokia", [
      "G10", "G11", "G20", "G21", "G22", "G42", "C12", "C21", "C22", "C32",
      "X10", "X20", "X30", "5.4", "6.2", "7.2", "8.3",
    ]),
    ...pre("Motorola", [
      "Moto G13", "Moto G14", "Moto G23", "Moto G32", "Moto G34", "Moto G42",
      "Moto G53", "Moto G54", "Moto G62", "Moto G73", "Moto G84", "Moto E13",
      "Moto E22", "Moto E32", "Moto E40", "Edge 30", "Edge 40", "Edge 40 Neo",
      "Edge 50 Pro", "Razr 40", "Razr 40 Ultra",
    ]),
    ...pre("Itel", [
      "A56", "A58", "A60", "A70", "P40", "P55", "S23", "Vision 3", "Vision 5",
      "RS4",
    ]),
    ...pre("Huawei", [
      "P20", "P20 Pro", "P30", "P30 Pro", "P40", "P40 Pro", "P50", "P50 Pro",
      "P60 Pro", "Mate 20", "Mate 20 Pro", "Mate 30", "Mate 40 Pro", "Mate 50 Pro",
      "Nova 9", "Nova 10", "Nova 11", "Y6", "Y7", "Y9",
    ]),
    ...pre("Honor", [
      "50", "70", "90", "Magic 5 Pro", "Magic 6 Pro", "X6", "X7", "X8", "X9",
      "X9b",
    ]),
  ]),

  // =========================== TABLET (other Android) =======================
  ...make("Tablet", "tablet", [
    "Lenovo Tab M8", "Lenovo Tab M9", "Lenovo Tab M10", "Lenovo Tab M10 Plus",
    "Lenovo Tab P11", "Lenovo Tab P11 Pro", "Lenovo Tab P12", "Lenovo Tab Extreme",
    "Lenovo Yoga Tab 11", "Lenovo Yoga Tab 13", "Huawei MatePad", "Huawei MatePad 11",
    "Huawei MatePad Pro", "Huawei MatePad SE", "Huawei MatePad T10",
    "Amazon Fire 7", "Amazon Fire HD 8", "Amazon Fire HD 10", "Amazon Fire Max 11",
    "Xiaomi Pad 5", "Xiaomi Pad 6", "Xiaomi Redmi Pad", "Xiaomi Redmi Pad SE",
    "Oppo Pad Air", "Oppo Pad 2", "Realme Pad", "Realme Pad 2", "Nokia T10",
    "Nokia T20", "Nokia T21", "TECNO MegaPad 10", "Infinix XPad",
  ]),

  /* ----------------- Additional real laptop brands ----------------- */
  ...make("LG", "laptop", [
    "Gram 14", "Gram 15", "Gram 16", "Gram 17", "Gram 14 2-in-1",
    "Gram 16 2-in-1", "Gram Pro 16", "Gram Pro 17", "Gram Pro 2-in-1 16",
    "Gram Style 14", "Gram Style 16", "Gram SuperSlim 15", "Gram +View",
    "Gram 14Z90", "Gram 15Z90", "Gram 16Z90", "Gram 17Z90", "Ultra PC 14",
    "Ultra PC 16",
  ]),
  ...make("Razer", "laptop", [
    "Blade 14", "Blade 15", "Blade 15 Advanced", "Blade 16", "Blade 17",
    "Blade 18", "Blade Stealth 13", "Book 13",
  ]),
  ...make("Gigabyte", "laptop", [
    "Aero 14", "Aero 15", "Aero 16", "Aero 17", "Aorus 15", "Aorus 16X",
    "Aorus 17", "Aorus 5", "Aorus 7", "G5", "G6", "G6X", "A5", "A7",
  ]),
  ...make("Huawei", "laptop", [
    "MateBook D14", "MateBook D15", "MateBook D16", "MateBook 14", "MateBook 16",
    "MateBook 16s", "MateBook 14s", "MateBook X", "MateBook X Pro", "MateBook E",
    "MateBook 13", "MateBook B3", "MateBook B5",
  ]),
  ...make("Honor", "laptop", [
    "MagicBook 14", "MagicBook 15", "MagicBook 16", "MagicBook X14",
    "MagicBook X16", "MagicBook Pro", "MagicBook Pro 16", "MagicBook Art 14",
    "MagicBook V14",
  ]),
  ...make("Fujitsu", "laptop", [
    "Lifebook A357", "Lifebook A3510", "Lifebook E548", "Lifebook E558",
    "Lifebook E5511", "Lifebook U727", "Lifebook U728", "Lifebook U729",
    "Lifebook U7310", "Lifebook U7411", "Lifebook U9311", "Lifebook S935",
    "Lifebook S936", "Lifebook S937", "Lifebook T937", "Lifebook P728",
  ]),
  ...make("Panasonic", "laptop", [
    "Toughbook CF-19", "Toughbook CF-20", "Toughbook CF-31", "Toughbook CF-33",
    "Toughbook CF-53", "Toughbook CF-54", "Toughbook FZ-40", "Toughbook FZ-55",
    "Let's Note SV", "Let's Note RZ",
  ]),
  ...make("Microsoft Surface", "laptop", [
    "Surface Laptop 2", "Surface Laptop 6", "Surface Laptop Studio",
    "Surface Laptop Studio 2", "Surface Laptop Go 2", "Surface Laptop Go 3",
    "Surface Book", "Surface Laptop 7",
  ]),
  ...make("Microsoft Surface", "tablet", [
    "Surface Pro 4", "Surface Pro 5", "Surface Pro X", "Surface Pro 10",
    "Surface Pro 11", "Surface Go", "Surface Go 4",
  ]),
  ...make("Google", "laptop", ["Pixelbook", "Pixelbook Go"]),

  /* ----------------- Deeper phone catalogues ----------------- */
  ...make("Samsung", "phone", [
    ...pre("Galaxy F", [
      "02s", "04", "12", "13", "14", "15", "22", "23", "34", "41", "42", "52",
      "54", "62",
    ]),
    "Galaxy A2 Core", "Galaxy A10e", "Galaxy A20e", "Galaxy A6", "Galaxy A6+",
    "Galaxy A7 (2018)", "Galaxy A8 (2018)", "Galaxy A8+", "Galaxy A9 (2018)",
    "Galaxy S20 FE 5G", "Galaxy S21 FE 5G", "Galaxy XCover 4s",
  ]),
  ...make("Android Phone", "phone", [
    ...pre("Tecno", [
      "Spark 1", "Spark 2", "Spark 3", "Spark 4", "Spark 5", "Spark 5 Air",
      "Spark 5 Pro", "Spark 6 Air", "Spark 6 Go", "Spark 7P", "Spark 7T",
      "Spark 8C", "Spark 8P", "Spark 8T", "Spark 9T", "Spark 10C",
      "Spark 10 Pro", "Spark 11P", "Spark 11 Pro", "Spark 20C", "Spark 20 Pro+",
      "Camon 11", "Camon 11 Pro", "Camon 12", "Camon 12 Air", "Camon 12 Pro",
      "Camon 15 Air", "Camon 15 Pro", "Camon 16 Pro", "Camon 16 Premier",
      "Camon 17 Pro", "Camon 18i", "Camon 18P", "Camon 18 Premier",
      "Camon 19 Pro", "Camon 20 Premier", "Camon 30 Premier", "Pova Neo",
      "Pova Neo 2", "Pova Neo 3", "Pova 4 Pro", "Pova 6 Pro", "Phantom V Fold 2",
      "Phantom V Flip 2", "Pop 1", "Pop 2", "Pop 4", "Pop 5C", "Pop 6 Pro",
      "Pop 7 Pro", "Pouvoir 1", "Pouvoir 2", "Pouvoir 3", "Pouvoir 4 Pro",
    ]),
    ...pre("Infinix", [
      "Hot 4", "Hot 5", "Hot 6", "Hot 7", "Hot 8", "Hot 9", "Hot 9 Play",
      "Hot 10 Play", "Hot 10S", "Hot 10T", "Hot 11 Play", "Hot 11S", "Hot 12i",
      "Hot 12 Play", "Hot 20S", "Hot 20 Play", "Hot 30 Play", "Hot 40 Pro",
      "Note 3", "Note 4", "Note 5", "Note 6", "Note 7", "Note 10 Pro",
      "Note 11i", "Note 11S", "Note 12i", "Note 12 Pro", "Note 30i",
      "Note 30 VIP", "Note 40 Pro+", "Smart 2", "Smart 3", "Smart 4",
      "Smart 5", "Smart 6 HD", "Smart 7 HD", "Smart 8 Pro", "Zero 4", "Zero 5",
      "Zero 6", "Zero 8i", "Zero 20", "Zero 30 5G", "Zero Ultra", "Zero X Neo",
      "GT 10 Pro", "Note 40", "Note 40 Pro",
    ]),
    ...pre("Itel", [
      "A14", "A16 Plus", "A23 Pro", "A25", "A33", "A37", "A44", "A48", "A49",
      "A56 Lite", "A58 Pro", "A60s", "A70", "P32", "P36 Pro", "P37", "P38",
      "P40", "S15", "S16 Pro", "S17", "S18", "S23 Plus", "Vision 1", "Vision 2",
      "Vision 3 Plus", "Vision 5 Plus", "RS4", "P55 5G",
    ]),
    ...pre("Nokia", [
      "1", "1 Plus", "2", "2.2", "2.3", "3", "3.1", "3.2", "3.4", "5", "5.1",
      "6", "6.1", "7 Plus", "8", "9 PureView", "C1", "C2", "C3", "C10", "C20",
      "C30", "G50", "G60", "XR20", "XR21",
    ]),
    ...pre("Realme", [
      "5", "5i", "5 Pro", "6", "6i", "6 Pro", "7", "7i", "8i", "8 5G", "9i",
      "9 Pro+", "10s", "11x", "C2", "C3", "C11", "C12", "C15", "C21", "C21Y",
      "C25Y", "C31", "C51", "C53", "C61", "C65", "Narzo 30", "Narzo 50i",
      "Narzo 70", "GT Neo 3", "GT 5",
    ]),
    ...pre("Xiaomi", [
      "Redmi 8", "Redmi 8A", "Redmi 9T", "Redmi 10A", "Redmi 10 Prime",
      "Redmi 12C", "Redmi 13", "Redmi A1", "Redmi A2", "Redmi A3",
      "Redmi Note 8", "Redmi Note 8 Pro", "Redmi Note 9S", "Redmi Note 10S",
      "Redmi Note 11S", "Redmi Note 12S", "Redmi Note 12 Pro+",
      "Redmi Note 13 Pro+", "Mi 9", "Mi 9T", "Mi 10T", "Mi 11T", "Mi 11 Ultra",
      "12T", "14 Pro", "Poco C65", "Poco F4", "Poco F6", "Poco M4 Pro",
      "Poco M6 Pro", "Poco X6 Pro",
    ]),
    ...pre("Oppo", [
      "A5", "A5s", "A9", "A12", "A31", "A52", "A53", "A53s", "A55", "A74",
      "A76", "A77", "A95", "A98", "Reno 2", "Reno 3", "Reno 4", "Reno 5 Pro",
      "Reno 6 Pro", "Reno 7 Pro", "Reno 8 Pro", "Reno 8T", "Reno 9",
      "Reno 11 Pro", "Reno 12", "Find X2 Pro", "Find N3", "Find N3 Flip",
    ]),
    ...pre("Vivo", [
      "Y11", "Y12", "Y19", "Y20", "Y20s", "Y21s", "Y31", "Y51", "Y53s", "Y72",
      "Y75", "Y76", "Y91", "Y95", "V19", "V20", "V20 Pro", "V21e", "V23 Pro",
      "V27 Pro", "V29e", "X60 Pro", "X70 Pro", "X90 Pro", "T1", "T2",
    ]),
    ...pre("OnePlus", [
      "6", "6T", "7", "7T", "7T Pro", "10R", "11R", "12R", "Nord 2T",
      "Nord 3 5G", "Nord CE", "Nord CE 2 Lite", "Nord CE 3 Lite", "Nord N10",
      "Nord N30", "Open",
    ]),
    ...pre("Motorola", [
      "Moto G8", "Moto G9", "Moto G10", "Moto G20", "Moto G22", "Moto G30",
      "Moto G31", "Moto G50", "Moto G52", "Moto G60", "Moto G71", "Moto G82",
      "Moto E5", "Moto E6", "Moto E7", "Moto E20", "Moto E30", "Edge 20",
      "Edge 30 Pro", "Edge 40 Pro", "Edge 50 Ultra", "Razr 50", "Razr 50 Ultra",
    ]),
    "Nothing Phone (1)", "Nothing Phone (2)", "Nothing Phone (2a)",
    "Nothing Phone (3a)", "CMF Phone 1", "Asus ROG Phone 5", "Asus ROG Phone 6",
    "Asus ROG Phone 7", "Asus ROG Phone 8 Pro", "Asus Zenfone 9",
    "Asus Zenfone 10", "ZTE Blade A52", "ZTE Blade V40", "Nubia Red Magic 8 Pro",
    "Nubia Red Magic 9 Pro", "TCL 30", "TCL 40 SE", "Gionee Max", "Gionee P15",
    "Lava Agni 2", "Lava Blaze 2", "Sony Xperia 1 II", "Sony Xperia 5 III",
    "Sony Xperia 10 V", "Sony Xperia 1 VI",
  ]),
];

// De-duplicate by brand + type + name so the generated families don't repeat the
// curated entries above, then expose the merged catalogue.
const seenModelKey = new Set();
export const MODELS = RAW_MODELS.filter((m) => {
  const key = `${m.brand}|${m.type}|${m.name}`;
  if (seenModelKey.has(key)) return false;
  seenModelKey.add(key);
  return true;
});

/**
 * Brand display order per device type. The most popular / category-defining
 * brands are listed first so their models surface at the top of the Model
 * filter (e.g. Dell, HP, Lenovo lead the laptop list). Brands not listed here
 * fall back to their original catalogue order, after the prioritised ones.
 */
const BRAND_PRIORITY = {
  laptop: [
    "Dell", "HP", "Lenovo", "MacBook", "Asus", "Acer", "MSI",
    "Microsoft Surface", "Toshiba", "Samsung", "LG", "Huawei", "Honor",
    "Razer", "Gigabyte", "Sony", "Fujitsu", "Panasonic", "Google",
    "Packard Bell",
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
