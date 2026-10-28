
export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  const message =
    isProduction && statusCode >= 500
      ? "Internal server error"
      : err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(!isProduction && { stack: err.stack }),
  });
};
