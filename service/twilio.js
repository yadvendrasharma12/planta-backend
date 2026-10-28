
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const serviceSID = process.env.TWILIO_VERIFY_SERVICE_SID;


export const sendMobileOtp = async (mobile) => {
  const verification = await client.verify.v2
    .services(serviceSID)
    .verifications.create({
      to: mobile,
      channel: "sms",
    });

  return verification;
};


export const verifyMobileOtp = async (mobile, otp) => {
  const verificationCheck = await client.verify.v2
    .services(serviceSID)
    .verificationChecks.create({
      to: mobile,
      code: otp,
    });

  return verificationCheck;
};