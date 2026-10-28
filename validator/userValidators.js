
import { z } from "zod";

export const userMyProfileValidate = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must be at least 1 character")
    .max(30, "Name cannot exceed 30 characters")
    .optional(),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .optional(),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .optional(),
});


export const updateAdminUserValidate = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must be at least 1 character")
    .max(30, "Name cannot exceed 30 characters")
    .optional(),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .optional(),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .optional(),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot exceed 20 characters")
    .optional(),
}).strict();


//strict iska mtlb h schema me define n kia gayi feild reject ho jayengi 