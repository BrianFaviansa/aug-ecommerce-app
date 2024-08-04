import express from "express";

import {
  protectedMiddleware,
  ownerMiddleware,
} from "../middlewares/authMiddleware.js";
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
router.post("/", protectedMiddleware, ownerMiddleware, createProduct);
router.post("/file-upload", fileUpload);
router.get("/:id", getSingleProduct);
router.put("/:id", protectedMiddleware, ownerMiddleware, updateProduct);
router.delete("/:id", protectedMiddleware, ownerMiddleware, deleteProduct);

export default router;
