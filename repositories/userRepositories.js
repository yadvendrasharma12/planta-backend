
import User from "../model/user.js";

export const findUserById = (userId) => {
  return User.findById(userId)
    .select("-password -refreshTokenHash -__v -role -verifyUser");
};

export const findAllUsers = (filter, skip, limit) => {
  return User.find(filter)
    .select("-password -refreshTokenHash -__v -role -verifyUser")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const countUsers = (filter) => {
  return User.countDocuments(filter);
};


export const findUserDetailsById = (id) => {
  return User.findById(id)
    .select("-password -refreshTokenHash -__v");
};

export const deleteUserDetailsById = (id) => {
  return User.findByIdAndDelete(id);
};

export const deleteMyProfile = (userId) => {
  return User.findByIdAndDelete(userId);
}

export const updateMyProfile = (userId, data) => {
  return User.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true }
  )
};

export const updateAdminProfile = (id, updateData) => {
  return User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
};
