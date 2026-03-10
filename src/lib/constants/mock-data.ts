import type {
  ArtistProfile,
  ConsultationPackResponse,
  PortfolioImage,
} from "~types/api";

export const mockArtists: ArtistProfile[] = [
  {
    id: "artist-1",
    username: "jadeglow",
    fullName: "Jade Glow",
    bio: "Soft-glam specialist known for bridal skin finishes that read clean on camera and in person.",
    location: "Lagos",
    specialty: ["Bridal", "Soft Glam"],
    priceRange: "50000-100000",
    instagramHandle: "@jadeglowbeauty",
    profileImageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    isPublished: true,
    createdAt: "2026-03-08T10:00:00.000Z",
    updatedAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "artist-2",
    username: "velvetbyria",
    fullName: "Velvet by Ria",
    bio: "Editorial looks with polished complexion work, modern contour, and premium prep routines.",
    location: "Abuja",
    specialty: ["Editorial", "Photoshoot"],
    priceRange: "100000-150000",
    instagramHandle: "@velvetbyria",
    profileImageUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    isPublished: true,
    createdAt: "2026-03-07T09:20:00.000Z",
    updatedAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "artist-3",
    username: "nnekaartistry",
    fullName: "Nneka Artistry",
    bio: "Warm-toned bridal and occasion makeup built around skin confidence and low-stress booking.",
    location: "Port Harcourt",
    specialty: ["Traditional", "Bridal"],
    priceRange: "30000-50000",
    instagramHandle: "@nnekaartistry",
    profileImageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    isPublished: true,
    createdAt: "2026-03-06T08:10:00.000Z",
    updatedAt: "2026-03-08T10:00:00.000Z",
  },
];

export const mockPortfolio: PortfolioImage[] = [
  {
    id: "portfolio-1",
    artistId: "artist-1",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    storagePath: "artist-1/look-1.jpg",
    caption: "Clean bridal glow with soft rose accents.",
    sortOrder: 0,
    createdAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "portfolio-2",
    artistId: "artist-1",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    storagePath: "artist-1/look-2.jpg",
    caption: "Warm skin prep, diffused contour, and glossy lip balance.",
    sortOrder: 1,
    createdAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "portfolio-3",
    artistId: "artist-1",
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    storagePath: "artist-1/look-3.jpg",
    caption: "Reception-ready glam that still reads natural in daylight.",
    sortOrder: 2,
    createdAt: "2026-03-08T10:00:00.000Z",
  },
];

export const mockConsultationPack: ConsultationPackResponse = {
  questionnaire: [
    "What is your ceremony start time and when do you need to be fully ready?",
    "Which parts of your makeup routine usually break down first in heat or humidity?",
    "Do you prefer a matte, satin, or luminous skin finish in photos?",
  ],
  prepMessage:
    "Please arrive with a clean, moisturized face. Avoid trying new exfoliants 48 hours before your appointment and keep your brows tidy but untouched on the day.",
  kitChecklist: [
    "Long-wear complexion base",
    "Hydrating prep trio",
    "Setting powder and setting spray",
    "Lip liner, lipstick, and backup gloss",
  ],
  timeline: [
    "T-45 min: skin prep and complexion mapping",
    "T-25 min: eyes, brows, and blush placement",
    "T-10 min: lips, finishing powder, and touch-up kit review",
  ],
  artistTips: [
    "Match the skin finish to the venue lighting before choosing highlight intensity.",
    "Keep a lightweight touch-up card ready for the client to reduce post-service anxiety.",
  ],
};

export function findMockArtist(username: string): ArtistProfile | undefined {
  return mockArtists.find((artist) => artist.username === username.toLowerCase());
}
