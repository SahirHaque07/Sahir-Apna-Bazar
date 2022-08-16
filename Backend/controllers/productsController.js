import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export { getProduct, getProducts };
