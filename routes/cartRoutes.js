
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { addCartValidate } from "../validator/cartValidators.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { addToCart, deleteAllCart, getCart, removeCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, validate(addCartValidate), userMiddleware, addToCart);
router.get('/', authMiddleware, userMiddleware, getCart);
router.delete('/:productId', authMiddleware, userMiddleware, removeCart);
router.delete("/clear", authMiddleware, userMiddleware, deleteAllCart)

export default router;