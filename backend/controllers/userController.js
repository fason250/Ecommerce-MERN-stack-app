import userModel from "../models/userModel.js";
import validator from "validator";
import { hashPassword, verifyPassword } from "../utils/hashingPassword.js";
import { createToken } from "../utils/createUserToken.js";
import dotenv from "dotenv";

dotenv.config();

// login user controller

const signInUser = async (request, response) => {
  try {
    const {
      body: { email, password },
    } = request;

    const userExist = await userModel.findOne({ email });
    if (!userExist)
      return response.json({ success: false, msg: "user not found " });

    const isPasswordMatch = await verifyPassword(password, userExist.password);
    if (!isPasswordMatch)
      return response.json({
        success: false,
        msg: "Oops! invalid credentials try again!",
      });

    const token = createToken(userExist._id);
    return response.json({ success: true, userToken: token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, msg: error });
  }
};

// create account controller

const signUpUser = async (request, response) => {
  try {
    const {
      body: { name, email, password },
    } = request;
    // verify user account id is exist by email
    const userExist = await userModel.findOne({ email });
    if (userExist)
      return response.json({ success: false, msg: "user is Already exist" });

    //validating email and password
    if (!validator.isEmail(email))
      return response.json({
        success: "false",
        msg: "please enter valid email",
      });
    if (password.length < 8)
      return response.json({
        success: false,
        msg: "please enter a strong password",
      });

    const hashedPassword = await hashPassword(password);

    //creating a use and store
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // user token
    const token = createToken(user._id);

    response.json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, msg: error.msg });
  }
};

// admin login controller

const loginAdmin = async (request, response) => {
  try {
    const {
      body: { email, password },
    } = request;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken(email + password);
      response.json({ success: true, token });
    } else {
      response.json({ success: false, msg: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, msg: error.message });
  }
};

export { signInUser, signUpUser, loginAdmin };
