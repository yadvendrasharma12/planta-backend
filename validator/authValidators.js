
import { z } from "zod";



export const loginValidate = z.object({
  email: z.string().trim().toLowerCase().min(1, "Email is required").email("Please enter valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters").max(15, "Password must not exceed 15 characters")
});


export const sentOtpValidate = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must not exceed 15 characters"),

  mobile: z
    .string()
    .trim()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^[0-9]{10}$/, "Mobile number must contain only digits"),
});


export const verifyOtpValidate = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  otp: z
    .string()
    .regex(/^\d{4}$/, "OTP must be exactly 4 digits"),
});


export const registerValidate = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must not exceed 15 characters"),

  mobile: z
    .string()
    .trim()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^[0-9]{10}$/, "Mobile number must contain only digits"),

  gender: z.enum(["male", "female", "others"], {
    error: "Please select a valid gender",
  }),

  dateOfBirth: z
    .string()
    .date("Please enter a valid date in YYYY-MM-DD format")
    .refine(
      (date) => date <= new Date().toISOString().slice(0, 10),
      "Date of birth cannot be in the future"
    ),
})



