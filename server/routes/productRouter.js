import express from "express";

import { protectedMiddleware } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  fileUpload,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.post("/file-upload", fileUpload);
router.get("/:id", getSingleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
