import { z } from "zod";
import { configsApp } from "../../configs/configsApp";

export const schemaResetPassword = z
  .object({
    newPassword: z
      .string()
      .nonempty("Password is required")
      .regex(
        configsApp.rulesPassword,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character"
      ),
    confirmPassword: z
      .string()
      .regex(
        configsApp.rulesPassword,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
