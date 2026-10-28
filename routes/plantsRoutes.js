
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPlantaValidate, updatePlantaValidate } from "../validator/plantaValidators.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { createProduct, deleteProduct, getProduct, getSingleProduct, updatePlanta } from "../controllers/plantaController.js";
import { validate } from "../middleware/validate.js";
import upload from "../middleware/multer.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post('/create', authMiddleware, upload.single("productImage"), validate(createPlantaValidate), adminMiddleware, createProduct);

router.get('/', authMiddleware, userMiddleware, getProduct);
router.get('/:id', authMiddleware, userMiddleware, getSingleProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.patch('/:id', authMiddleware, upload.single("productImage"), validate(updatePlantaValidate), adminMiddleware, updatePlanta)



export default router;