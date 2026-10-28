import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getNotificationsController,
} from "../controllers/notificationController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, userMiddleware, getNotificationsController);

export default router;