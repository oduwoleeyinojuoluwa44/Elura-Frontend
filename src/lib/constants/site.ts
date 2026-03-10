export const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/onboarding", label: "Profile Studio" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export const artistSpecialties = [
  "Bridal",
  "Soft Glam",
  "Editorial",
  "Traditional",
  "Photoshoot",
] as const;

export const priceRanges = [
  "30000-50000",
  "50000-100000",
  "100000-150000",
  "150000+",
] as const;

export const eventTypes = [
  "Wedding",
  "Birthday",
  "Photoshoot",
  "Bridal Shower",
  "Editorial Session",
] as const;

export const aiFormOptions = {
  skinTypes: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
  finishes: ["Soft Glam", "Natural Dewy", "Matte Bridal", "Editorial Glow"],
} as const;
