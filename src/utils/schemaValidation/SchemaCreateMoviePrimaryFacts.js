import { z } from "zod";

export const schemaCreateMoviePrimaryFacts = z.object({
  title: z.string().min(1, "Title is required").min(3),
  tagline: z.string().min(1, "Tagline is required").min(10),
  budget: z
    .string()
    .min(1, "Budget is required")
    .transform((value) => parseFloat(value)),
  revenue: z
    .string()
    .min(1, "Revenue is required")
    .transform((value) => parseFloat(value)),
  status: z.string().min(1, "Please select movie status"),
  adult: z
    .string()
    .min(1, "Adult movie is required")
    .refine((value) => {
      return value === "true" || value === "false";
    })
    .transform((value) => {
      return value === "true";
    }),
  runtime: z
    .string()
    .min(1, "Runtime is required")
    .transform((value) => parseFloat(value)),
  release_date: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A release date is required",
    })
    .transform((date) => new Date(date).toISOString().split("T")[0]),
  overview: z.string().min(1, "Overview is required").min(15),
  genre_ids: z.string().array().min(3),
});
