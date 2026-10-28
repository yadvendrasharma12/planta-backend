
import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^\+[1-9]\d{7,14}$/, "Enter a valid international mobile number"],
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    mobileVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    verificationAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    otpHash: {
      type: String,
      required: true,
      select: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,  //default __v field create na ho.
  }
);

pendingRegistrationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const PendingRegistration = mongoose.model("PendingRegistration", pendingRegistrationSchema);

export default PendingRegistration;
