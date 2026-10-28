
import { errorResponse } from "../utils/errorResponse.js";

export const adminMiddleware = (req, res, next) => {
  try {

    if (!req.user) {
      return errorResponse(res, 401, "Unauthorized user");
    }


    if (req.user.role !== "admin") {
      return errorResponse(res, 403, "Admin access required");
    }

    return next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return errorResponse(res, 500, "Internal server error");
  }
};
