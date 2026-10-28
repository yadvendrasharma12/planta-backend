

import dotenv from "dotenv";
import { connectDb } from "../config/db.js";
import User from "../model/user.js";
import { hashPassword } from "../utils/hashPassword.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDb();

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASS;
    const mobile = process.env.ADMIN_MOBILE;

    if (!name || !email || !password || !mobile) {
      throw new Error(
        "ADMIN_EMAIL, ADMIN_PASS or ADMIN_MOBILE is missing"
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      if (existingUser.role === "admin") {
        console.log("Admin already exists");
        process.exit(0);
      }

      console.log("User with this email or mobile already exists");
      process.exit(1);
    }

    const hashedPassword = await hashPassword(password);

    const admin = await User.create({
      name: "Info",
      email,
      mobile,
      password: hashedPassword,
      role: "admin",
      isActive: true,
      isVerified: true,
    });

    console.log("Admin created successfully");
    console.log("Admin ID:", admin._id);

    process.exit(0);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exit(1);
  }
};

createAdmin();