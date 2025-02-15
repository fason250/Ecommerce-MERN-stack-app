// use cart

import userModel from "../models/userModel.js";

const userCart = async (request, response) => {
  try {
    const {
      body: { userId },
    } = request;
    const user = await userModel.findById(userId);
    if (!user) return response.json({ success: false, msg: "no user Found" });

    return response.json({ success: true, cartData: user.cartItems });
  } catch (error) {
    console.log(error);
  }
};

//add to cart

const addToCart = async (request, response) => {
  try {
    const {
      body: { userId, itemId, size },
    } = request;

    const findUser = await userModel.findById(userId);
    console.log("this is from cart controller and this is the user", findUser);
    if (!findUser) {
      return response.json({ success: false, msg: "No User Found " });
    }

    let cartItems = findUser.cartItems;
    //check if cart items is already exist in cart
    const itemIndex = cartItems.findIndex(
      (item) =>
        item.itemId.toString() === itemId.toString() && item.size === size
    );

    // if the item is exist so we update it's quantity right
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      cartItems.push({ itemId, size });
    }

    findUser.cartItems = cartItems;
    await findUser.save();

    response.json({
      success: true,
      msg: "added to cart ",
    });
  } catch (error) {
    console.log(error);
  }
};

// update user cart

const updateCart = async (request, response) => {
  try {
    const {
      body: { userId, itemId, size, quantity },
    } = request;

    if (quantity <= 0) {
      return response.json({
        success: false,
        msg: "quantity must be greater than 0",
      });
    }

    const findUser = await userModel.findById({ _id: userId });
    if (!findUser)
      return response.json({ success: false, msg: "Not Authorized" });

    let cartItems = findUser.cartItems;

    const itemIndex = cartItems.findIndex(
      (item) =>
        item.itemId.toString() === itemId.toString() && item.size === size
    );
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = quantity;
    } else {
      cartItems.push({ itemId, size, quantity });
    }
    findUser.cartItems = cartItems;
    await findUser.save();
    response.json({ success: true, msg: "Updated the cart" });
  } catch (error) {
    console.log(error);
  }
};

export { userCart, addToCart, updateCart };
