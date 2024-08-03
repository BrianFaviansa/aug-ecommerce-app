//* Dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

//* Utilities
import authRouter from "./routes/authRouter.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

//* Express App Init
const app = express();
const port = process.env.PORT || 3000;

//* Connect to DB using mongoose
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//* Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//* Routes
app.use("/api/v1/auth", authRouter);

//* Error Handler
app.use(notFound);
app.use(errorHandler);

//* Run Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
