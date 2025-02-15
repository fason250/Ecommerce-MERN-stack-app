import express from "express";
import {
  addToCart,
  updateCart,
  userCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.get("/userCart", authUser, userCart);
cartRouter.post("/addToCart", authUser, addToCart);
cartRouter.put("/updateCart", authUser, updateCart);

export default cartRouter;
