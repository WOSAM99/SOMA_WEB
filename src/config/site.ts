export const siteConfig = {
  brandName: "SOMA",
  tagline: "Sip Your Daily Ritual",
  description:
    "Cold-pressed juices, vegan smoothies, and dairy-free ice cream made for bright days and daily rituals.",
  heroBlurb:
    "Fresh juices, blended smoothies, rich milkshakes, and vegan ice cream designed to feel clean, colorful, and deeply satisfying.",
  whatsAppUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/911234567890",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/drinksoma",
  locationText:
    process.env.NEXT_PUBLIC_LOCATION_TEXT ?? "Location coming soon",
  hoursText: process.env.NEXT_PUBLIC_HOURS_TEXT ?? "Hours coming soon",
  logoPath: "/brand/soma-logo.jpeg"
} as const;

export const categoryMeta = {
  juices: {
    id: "juices",
    label: "Juices",
    accent: "from-soma-lime to-soma-green",
    chip: "Cold pressed goodness"
  },
  smoothies: {
    id: "smoothies",
    label: "Smoothies",
    accent: "from-soma-mango to-[#ffcf7d]",
    chip: "Blended, creamy, satisfying"
  },
  milkshakes: {
    id: "milkshakes",
    label: "Milkshakes",
    accent: "from-[#f7dbc8] to-[#fff0d8]",
    chip: "Thick, chilled, indulgent"
  },
  iceCream: {
    id: "iceCream",
    label: "Ice Cream",
    accent: "from-[#fff4d8] to-[#f7d6ae]",
    chip: "Plant-based creamy indulgence"
  },
  addOns: {
    id: "addOns",
    label: "Add-ons",
    accent: "from-[#ffd7df] to-[#fff1d8]",
    chip: "Little extras, big difference"
  }
} as const;
