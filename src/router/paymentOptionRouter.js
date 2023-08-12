import express from "express";
import {
  deletePaymentOptionbyId,
  getPaymentsOption,
  insertPaymentOption,
  updatePaymentOptionById,
} from "../model/paymentOption/PaymentOptionModel.js";
import slugify from "slugify";
import { updatePaymentValidation } from "../middleware/joiValidation.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPaymentsOption();

    res.json({
      status: "success",
      message: " New payment method has been added",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    !title &&
      res.json({
        status: "error",
        message: "Payment option title  is required",
      });

    const obj = {
      title,
      slug: slugify(title, { trim: true, lower: true }),
    };

    const result = await insertPaymentOption(obj);

    result?._id
      ? res.json({
          status: "success",
          message: " New Payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to add new payment method.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 409;
      error.message =
        "The slug for the category already exist, please change the payment name and try again.";
    }
    next(error);
  }
});

router.put("/", updatePaymentValidation, async (req, res, next) => {
  try {
    const { _id, title, status } = req.body;
    const obj = {
      _id,
      title,
      status,

      slug: slugify(title, { trim: true, lower: true }),
    };
    const result = await updatePaymentOptionById(obj);

    result?._id
      ? res.json({
          status: "success",
          message: "The payment has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to update  payment methods.",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deletePaymentOptionbyId(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The category has been deleted",
        });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to process your request.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
