import { z } from "zod";
import { configsApp } from "../../configs/configsApp";

export const schemaCreateUser = z.object({
  firstName: z.string().min(1, "Firstname is required").min(3),
  lastName: z.string().min(1, "Lastname is required"),
  email: z.string().email("Email is invalid !"),
  username: z.string().min(5),
  password: z
    .string("Password is required")
    .regex(
      configsApp.rulesPassword,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character"
    ),
  role: z.enum(["admin", "guest", "owner"]),
});
