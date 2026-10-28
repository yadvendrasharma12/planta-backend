
import { z } from "zod";

export const createPlantaValidate = z.object({
  productTitle: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  productDescription: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters"),

  price: z.coerce.number().positive({
    message: "Price must be a positive number",
  }),
  mass: z
    .string()
    .trim()
    .min(1, "Mass is required"),

  origin: z
    .string()
    .trim()
    .min(1, "Origin is required"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  category: z.enum(
    ["Plants", "Equipments", "Plates", "Cups"],
    { error: "Please select a valid category" }
  ),
});


export const updatePlantaValidate = z.object({
  productTitle: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  productDescription: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .optional(),

  category: z
    .enum(["Plants", "Equipments", "Plates", "Cups"], {
      error: "Please select a valid category",
    })
    .optional(),
  mass: z
    .string()
    .trim()
    .min(1, "Mass is required").optional(),

  origin: z
    .string()
    .trim()
    .min(1, "Origin is required").optional(),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative").optional(),

  productImage: z
    .string()
    .url("Please provide a valid product image URL")
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { error: "At least one field is required for update" }
);


//.refine iska mtlb h ki kam se kam 1 data dena compulsery ha 


