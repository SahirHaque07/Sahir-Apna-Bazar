import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import protect from "../Middleware/authMiddleware.js";
const router = express.Router();

//create new order
router.route("/").post(protect, addOrderItems);

//get order by Id

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
