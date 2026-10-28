
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 254,
    },

    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      trim: true,
      unique: true,
      match: [/^\+[1-9]\d{7,14}$/, "Enter a valid international mobile number"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      immutable: true, //ak bar role create ho gaya to chnage ni mongodb me
    },

    mobileVerified: {
      type: Boolean,
      default: false,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Date of birth cannot be in the future",
      },
    },

    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true, // kab create hua date aayegi db me recoerd 
    versionKey: false,  // __v banata h use ni banne. deta 
  }
);

const User = mongoose.model("User", userSchema);

export default User;
