import express from "express";
import {
  deletePO,
  getPOs,
  insertPO,
  updatePOById,
} from "../model/payment-option/PaymentOptionModel.js";
import {
  newPOValidation,
  updatePOValidation,
} from "../middleware/joiValidation.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPOs();

    res.json({
      status: "success",
      message: " New category has been added",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newPOValidation, async (req, res, next) => {
  try {
    const result = await insertPO(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: " New Payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to add new Payment method.",
        });
  } catch (error) {
    next(error);
  }
});

router.put("/", updatePOValidation, async (req, res, next) => {
  try {
    const result = await updatePOById(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "The Payment option has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to udpate Payment option.",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deletePO(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The Payment options has been deleted",
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
