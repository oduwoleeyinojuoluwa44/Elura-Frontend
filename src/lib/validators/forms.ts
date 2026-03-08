import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export const artistProfileSchema = z
  .object({
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
    isPublished: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (!value.isPublished) {
      return;
    }

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

