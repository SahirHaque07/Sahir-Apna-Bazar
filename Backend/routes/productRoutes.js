import express from "express";
import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";
import { getProducts, getProduct } from "../controllers/productsController.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);

// router.get(
//   "/products",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );
// router.get(
//   "/products/:id",
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Product Not Found" });
//     }
//   })
// );

export default router;
