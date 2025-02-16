import express from "express";
import {
  userOrders,
  updateOrderStatus,
  allOrders,
  placeOrderRazorPay,
  placeOrderStripe,
  placeOrder,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/userAuth.js";
const orderRouter = express.Router();

// order Routes
orderRouter.get("/orderLists", adminAuth, allOrders);
orderRouter.patch("/status", adminAuth, updateOrderStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);

// user features

orderRouter.get("/userOrders", authUser, userOrders);

export default orderRouter;
