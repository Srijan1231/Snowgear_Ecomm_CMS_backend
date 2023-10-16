import express from "express";
import { getOrder } from "../model/order/OrderModel.js";
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const result = await getOrder();

    res.json({
      status: "success",
      message: "All Ordered items",
      result,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
