import { z } from "zod";
import { configsApp } from "../../configs/configsApp";

export const schemaChangePassword = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(
        configsApp.rulesPassword,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character"
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(
        configsApp.rulesPassword,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
