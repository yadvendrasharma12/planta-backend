
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/errorResponse.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["secure-token"];

    if (!token) {
      return errorResponse(res, 401, "Unauthorized: Token is required")

    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
      return errorResponse(res, 401, "Invalid or Expire Token")
    }

    console.error("Auth middleware error:", err);

    return errorResponse(res, 500, "Internal server error")


  }
};
