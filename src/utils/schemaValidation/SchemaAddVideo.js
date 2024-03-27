import { z } from "zod";

export const schemaAddVideo = z.object({
  key: z.string().min(1, "Source Key is required"),
  siteMovie: z.string(),
  typeVideo: z.string(),
});
