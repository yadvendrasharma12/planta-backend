
export const successResponse = (
  res,
  statusCode = 200,
  message = "Success",
  token = null,
  refreshToken = null,
  data = null
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(token && { token }),
    ...(refreshToken && { refreshToken }),
    ...(data && { data }),
  });
};



