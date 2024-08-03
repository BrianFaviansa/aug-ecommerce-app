import express from "express";
import { registerUser, loginUser } from "./../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.send("Logout");
});

router.get("/getuser", (req, res) => {
  res.send("Get Current User");
});

export default router;
