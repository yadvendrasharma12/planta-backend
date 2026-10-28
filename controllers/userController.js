
import { asyncHandler } from "../utils/asyncHandler.js";
import { findUserById, findAllUsers, countUsers, findUserDetailsById, deleteUserDetailsById, deleteMyProfile, updateMyProfile, updateAdminProfile, } from "../repositories/userRepositories.js";
import { errorResponse } from "../utils/errorResponse.js";
import { successResponse } from "../utils/successResponse.js";
import mongoose from "mongoose";
import { hashPassword } from "../utils/hashPassword.js";

export const getMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await findUserById(userId);

  if (!user) {
    return errorResponse(res, 404, "User profile not found");
  }

  return successResponse(
    res, 200, "Profile fetched successfully", null, null, user
  );
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit) || 10)
  );

  const filter = {
    role: { $nin: ["admin", "info"] },
  };

  const skip = (page - 1) * limit;

  const [users, totalUsers] = await Promise.all([
    findAllUsers(filter, skip, limit),
    countUsers(filter),
  ]);

  if (users.length === 0 && page === 1) {
    return errorResponse(res, 404, "Users not found");
  }

  const totalPages = Math.ceil(totalUsers / limit);

  return successResponse(
    res,
    200,
    "Users fetched successfully",
    null,
    null,
    {
      users,
      pagination: {
        totalUsers,
        currentPage: page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }
  );
});

export const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, "Invalid id")
  };

  const user = await findUserDetailsById(id);
  if (!user) {
    return errorResponse(res, 404, "User not found")
  }

  return successResponse(res, 200, "Users fetch successfully",
    null,
    null,
    user)
});


export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, "Invalid id")
  };

  const user = await deleteUserDetailsById(id);
  if (!user) {
    return errorResponse(res, 404, "User not found")
  }

  return successResponse(res, 200, "Users deleted successfully",
    null,
    null,
  )
});



export const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return errorResponse(res, 400, "User ID is required");
  }

  const user = await deleteMyProfile(userId);

  if (!user) {
    return errorResponse(res, 404, "Profile not found");
  }

  return successResponse(res, 200, "Profile deleted successfully");
});


export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, mobile, } = req.body;
  const updateData = { name, email, mobile, }
  const userId = req.user.id

  // const updateData = req.body; Jab data 20/30 ho 

  const user = await updateMyProfile(userId, updateData);
  if (!user) {
    return errorResponse(res, 404, "Profile not found")
  }

  return successResponse(res, 200, "Profile updated successfully")
});


export const updateAdminUserProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, "Invalid id");
  }

  const user = await updateAdminProfile(id, updateData);

  if (!user) {
    return errorResponse(res, 404, "User not found");
  }

  return successResponse(res, 200, "User updated successfully",);
});









