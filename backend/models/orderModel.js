import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    default: [],
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order placed",
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash on delivery", "stripe", "razorpay"],
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

const orderModel =
  mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default orderModel;
