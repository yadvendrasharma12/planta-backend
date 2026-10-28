
import { errorResponse } from "../utils/errorResponse.js";

export const userMiddleware = (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, 401, "Unauthorized user");
  }

  if (req.user.role !== "user") {
    return errorResponse(res, 403, "User access only");
  }

  return next();
};
