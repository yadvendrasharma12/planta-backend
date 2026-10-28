import { z } from "zod";

export const addCartValidate = z.object({
  productId: z
    .string()
    .trim()
    .min(1, "Product ID is required")
    .refine(
      (id) => /^[0-9a-fA-F]{24}$/.test(id),
      "Invalid product ID"
    ),
});