import express from "express";
import {
  userOrders,
  updateOrderStatus,
  allOrders,
  placeOrderStripe,
  placeOrder,
  verifyStripePayment,
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

//verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripePayment);

// user features

orderRouter.get("/userOrders", authUser, userOrders);

export default orderRouter;
