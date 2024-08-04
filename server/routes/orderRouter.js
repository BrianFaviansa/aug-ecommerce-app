import express from "express";
import {
  protectedMiddleware,
  ownerMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protectedMiddleware, createOrder);
router.get("/", protectedMiddleware, ownerMiddleware, getAllOrders);
router.get("/current-user", protectedMiddleware, getUserOrder);
router.get("/:id", protectedMiddleware, ownerMiddleware, getSingleOrder);

export default router;
