
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { deleteProfile, deleteUser, getAllUsers, getMyProfile, getSingleUser, updateAdminUserProfile, updateProfile } from "../controllers/userController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const router = express.Router();

//users

router.get("/profile", authMiddleware, userMiddleware, getMyProfile);
router.delete('/profile/delete', authMiddleware, userMiddleware, deleteProfile);
router.patch("/profile/update", authMiddleware, userMiddleware, updateProfile);

//admin
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, getSingleUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.patch('/users/:id', authMiddleware, adminMiddleware, updateAdminUserProfile)


export default router;