
import crypto from "crypto";

export const generateOtp = () => {
  return crypto.randomInt(1000, 10000).toString();
};

export const compareOtp = (enteredOtp, savedOtp) => {
  return String(enteredOtp) === String(savedOtp);
};




// const OTP_SECRET = process.env.OTP_SECRET;

// export const generateOtp = () => {
//   return crypto.randomInt(1000, 10000).toString();
// };

// export const hashOtp = (otp) => {
//   if (!OTP_SECRET) {
//     throw new Error("OTP_SECRET is not configured");
//   }

//   return crypto
//     .createHmac("sha256", OTP_SECRET)
//     .update(String(otp))
//     .digest("hex");
// };

// export const compareOtp = (enteredOtp, savedOtpHash) => {
//   const enteredHash = hashOtp(enteredOtp);

//   const saved = Buffer.from(savedOtpHash, "hex");
//   const entered = Buffer.from(enteredHash, "hex");

//   return (
//     saved.length === entered.length &&
//     crypto.timingSafeEqual(saved, entered)
//   );
// };
