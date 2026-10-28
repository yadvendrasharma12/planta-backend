
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "5d",
    }
  );
};

export const generateRefressToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_REFRESS_SECRET,
    {
      expiresIn: "60d",
    }
  );
}
