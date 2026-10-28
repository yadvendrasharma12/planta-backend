import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../model/user.js"
import { errorResponse } from "../utils/errorResponse.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import { successResponse } from "../utils/successResponse.js";
import { hashToken } from "../utils/hashToken.js";
import { verifyRefreshToken } from "../utils/verifyRefreshToken.js";
import PendingRegistration from "../model/pendingRegistration.js";
import { generateOtp } from "../utils/generateOtp.js";
import hashOtp from "../utils/otpHash.js";
import { sendEmail } from "../service/sendEmail.js";

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return errorResponse(res, 401, "Refresh token is required");
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    return errorResponse(res, 401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded._id).select("+refreshTokenHash");

  if (!user || user.refreshTokenHash !== hashToken(refreshToken)) {
    return errorResponse(res, 401, "Refresh token is invalid or revoked");
  }

  const newToken = generateToken(user);

  return successResponse(
    res,
    200,
    "Access token refreshed successfully",
    newToken
  );
});




export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    return errorResponse(res, 401, "Invalid credentials")
  }

  const isValidPassord = await comparePassword(password, existingUser.password);
  if (!isValidPassord) {
    return errorResponse(res, 401, "Invalid Password")
  }

  const token = generateToken(existingUser);

  return successResponse(
    res,
    200,
    "User login successfully",
    token
  )
});



export const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, gender, dateOfBirth } = req.body;

  const existingUser = await User.findOne({
    $or: [
      { email: email },
      { mobile: mobile },
    ],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return errorResponse(res, 409, "Email already registered");
    }

    if (existingUser.mobile === mobile) {
      return errorResponse(res, 409, "Mobile already registered");
    }
  }

  const pending = await PendingRegistration.findOne({
    email: email,
    mobile: mobile,
    emailVerified: true,
  }).select("+passwordHash");

  if (!pending) {
    return errorResponse(
      res,
      400,
      "Please verify your email with OTP first"
    );
  }

  // if (pending.expiresAt < new Date()) {
  //   await PendingRegistration.deleteOne({ _id: pending._id });
  //   return errorResponse(res, 400, "Registration expired. Please register again");
  // }

  const user = await User.create({
    name: name,
    email: email,
    mobile: mobile,
    password: pending.passwordHash,
    gender,
    dateOfBirth: new Date(dateOfBirth),
  });

  await PendingRegistration.deleteOne({ _id: pending._id });

  return successResponse(
    res,
    201,
    "User registered successfully",
  );
});


export const sendOtp = asyncHandler(async (req, res) => {
  const { password, email, mobile } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { mobile }],
  }).select("email mobile");

  if (existingUser) {
    if (existingUser.email === email) {
      return errorResponse(res, 409, "Email already registered");
    }

    if (existingUser.mobile === mobile) {
      return errorResponse(res, 409, "Mobile already registered");
    }
  }

  const passwordHash = await hashPassword(password);
  const otp = generateOtp();
  const otpHash = hashOtp(otp);


  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await PendingRegistration.findOneAndUpdate(
    { mobile },
    {
      $set: {
        email,
        mobile,
        passwordHash,
        otpHash,
        otpExpiresAt,
        emailVerified: false,
        verificationAttempts: 0,
        expiresAt,
      },
    },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  try {
    await sendEmail({
      to: email,
      subject: "Your Email Verification OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
  } catch (error) {
    console.error("Email sending failed:", error.message);
    console.log("Email error code:", error.code);
    console.log("Email error message:", error.message);
    console.log("Email response:", error.response);

    return errorResponse(res, 502, "Unable to send OTP email");
  }

  return successResponse(res, 200, "OTP sent successfully");
});


export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const pending = await PendingRegistration.findOne({ email }).select("+otpHash");

  if (!pending) {
    return errorResponse(res, 404, "Registration not found. Please request OTP again.");
  }

  if (pending.expiresAt < new Date()) {
    await PendingRegistration.deleteOne({ _id: pending._id });
    return errorResponse(res, 400, "Registration expired. Please register again.");
  }

  if (pending.emailVerified) {
    return successResponse(res, 200, "Email already verified");
  }


  if (hashOtp(String(otp)) !== pending.otpHash) {
    return errorResponse(res, 400, "Invalid OTP");
  }

  pending.emailVerified = true;

  await pending.save();

  await PendingRegistration.updateOne(
    { _id: pending._id },
    {
      $unset: {
        otpHash: 1,
      },
    },
    { runValidators: false }
  );

  return successResponse(res, 200, "Email verified successfully");


});