
import express from "express";
import { login, refreshAccessToken, register, sendOtp, verifyOtp } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { loginValidate, registerValidate, sentOtpValidate, verifyOtpValidate } from "../validator/authValidators.js";

const router = express.Router();
router.post("/register", validate(registerValidate), register),
  router.post("/login", validate(loginValidate), login),
  router.post("/send-otp", validate(sentOtpValidate), sendOtp),
  router.post("/verify-otp", validate(verifyOtpValidate), verifyOtp),



  router.post("/refresh", refreshAccessToken);


export default router;