import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export const artistDraftSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  username: z
    .string()
    .trim()
    .min(1, "Username is required.")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores.",
    ),
  bio: z.string().optional(),
  location: z.string().optional(),
  specialty: z.array(z.string()).default([]),
  priceRange: z.string().optional(),
  instagramHandle: z.string().optional(),
  profileImageUrl: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        !value ||
        value.startsWith("https://") ||
        value.startsWith("http://"),
      "Profile image URL must start with http:// or https://",
    ),
});

export const artistPublishSchema = artistDraftSchema.superRefine((value, ctx) => {
    if (!value.location?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["location"],
        message: "Location is required before publishing.",
      });
    }

    if (value.specialty.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["specialty"],
        message: "Select at least one specialty before publishing.",
      });
    }
  });

export const portfolioImageSchema = z.object({
  imageUrl: z
    .string()
    .trim()
    .url("Portfolio image URL must be a valid URL.")
    .refine(
      (value) => value.startsWith("https://") || value.startsWith("http://"),
      "Portfolio image URL must start with http:// or https://",
    ),
  caption: z.string().trim().optional(),
  sortOrder: z.coerce
    .number()
    .int("Display order must be a whole number.")
    .min(0, "Display order cannot be negative."),
});
