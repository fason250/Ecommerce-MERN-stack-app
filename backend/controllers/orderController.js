import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharge = 10;

//initialize stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing orders using cash on delivery

const placeOrder = async (request, response) => {
  try {
    const {
      body: { userId, items, amount, address },
    } = request;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cash on delivery",
      payment: false,
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartItems: [] });
    response.json({ success: true, msg: "order placed successfully" });
  } catch (error) {
    console.log(error);
    response.json({ success: false });
  }
};

//placing orders using stripe method

const placeOrderStripe = async (request, response) => {
  try {
    const {
      body: { userId, amount, address, items },
    } = request;
    const { origin } = request.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "stripe",
      payment: false,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: lineItems,
      mode: "payment",
    });
    console.log(session);

    response.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    response.json({ success: false });
  }
};

//placing orders using razor pay method

const placeOrderRazorPay = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// getting all orders  for admin panel

const allOrders = async (request, response) => {
  try {
    const orders = await orderModel.find({});
    if (!orders)
      return response.json({ success: false, msg: "No order found" });
    response.json({ success: true, result: orders });
  } catch (error) {
    console.log(error);
    response.json({ success: false });
  }
};

//user Order data for client side

const userOrders = async (request, response) => {
  try {
    const {
      body: { userId },
    } = request;
    const findUser = await userModel.findById(userId);
    if (!findUser)
      return response.json({ success: false, msg: "not authorized" });

    const userOrders = await orderModel.find({ userId: userId });
    if (!userOrders || userOrders.length === 0)
      return response.json({ success: false, msg: "not orders found" });

    response.json({ success: true, orders: userOrders });
  } catch (error) {
    console.log(error);
    response.json({ success: false });
  }
};

// update order status from admin panel
const updateOrderStatus = async (request, response) => {
  try {
    const {
      body: { orderId, status },
    } = request;

    const order = await orderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: status }
    );
    if (!order)
      return response.json({ success: false, msg: "order status not updated" });
    response.json({ success: true, msg: "order status updated successfully" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, msg: "Something went wrong " });
  }
};

export {
  userOrders,
  updateOrderStatus,
  allOrders,
  placeOrderRazorPay,
  placeOrderStripe,
  placeOrder,
};
