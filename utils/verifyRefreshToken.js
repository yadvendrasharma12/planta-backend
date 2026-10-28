import jwt from "jsonwebtoken";

export const verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    if (decoded.type !== "refresh") {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};