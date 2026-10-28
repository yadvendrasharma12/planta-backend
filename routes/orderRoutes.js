
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { createOrderController, findOrderController } from "../controllers/orderController.js";


const router = express.Router();

router.post("/", authMiddleware, userMiddleware, createOrderController);
router.get("/", authMiddleware, userMiddleware, findOrderController)
export default router;