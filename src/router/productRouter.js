import express from "express";
import {
  deleteProductbyId,
  getProducts,
  insertProduct,
  updateProductById,
} from "../model/product/ProductModel.js";
import slugify from "slugify";
import { newProductValidation } from "../middleware/joiValidation.js";
import multer from "multer";

const router = express.Router();
const imgPath = "public/img/product";
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    let error = null;
    cb(error, imgPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    const fullFileName = Date.now() + "-" + file.originalname;
    console.log(file.mimetype);
    cb(error);
  },
});
const upload = multer({ dest: imgPath });

router.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();

    res.json({
      status: "success",
      message: " New Product has been added",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      req.body.slug = slugify(req.body.name, { trim: true, lower: true });
      if (req.files.length) {
        req.body.images = files.map((item) => item.path);
      }
      const result = await insertProduct(req.body);

      result?._id
        ? res.json({
            status: "success",
            message: " New category has been added",
          })
        : res.json({
            status: "error",
            message: "Error, Unable to add new category.",
          });
    } catch (error) {
      if (error.message.includes("E11000 duplicate key error")) {
        error.statusCode = 200;
        error.message =
          "The slug for the category already exist, please change the product name ans try again.";
      }
      next(error);
    }
  }
);

// router.put("/", updateCatValidation, async (req, res, next) => {
//   try {
//     const result = await updateCategoryById(req.body);

//     result?._id
//       ? res.json({
//           status: "success",
//           message: "The category has been updated",
//         })
//       : res.json({
//           status: "error",
//           message: "Error, Unable to udpate new category.",
//         });
//   } catch (error) {
//     next(error);
//   }
// });
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deleteProductbyId(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The Product has been deleted",
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
