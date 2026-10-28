
import { createHash } from "node:crypto";

const hashOtp = (otp) => {
  return createHash("sha256")
    .update(otp)
    .digest("hex");
};

export default hashOtp;
