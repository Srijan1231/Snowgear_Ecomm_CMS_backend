import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import path from "path";

// middlewares
import morgan from "morgan";
import cors from "cors";
import { mongoConnect } from "./src/config/mongoConfig.js";
mongoConnect();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const __dirname = path.resolve();
const a = path.join(__dirname, "/public");
console.log(a);
//convert static public folder to static serving folder
app.use(express.static(path.join(__dirname, "/public")));
// api
import adminRouter from "./src/router/adminRouter.js";
import categoryRouter from "./src/router/categoryRouter.js";
import paymentOptionRouter from "./src/router/paymentOptionRouter.js";
import productRouter from "./src/router/productRouter.js";
import { auth } from "./src/middleware/authMiddleware.js";
import multer from "multer";
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", auth, categoryRouter);
app.use("/api/v1/paymentoptions", auth, paymentOptionRouter);
app.use("/api/v1/product", auth, productRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is live",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:8000`);
});
