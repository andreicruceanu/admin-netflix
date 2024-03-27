import { z } from "zod";

export const schemaEditAdmin = z.object({
  firstName: z.string().min(1, "FirstName is required").min(3),
  lastName: z.string().min(1, "LastName is required"),
  email: z.string().email("Email is invalid !"),
});
