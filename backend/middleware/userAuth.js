import jwt from "jsonwebtoken";

const authUser = async (request, response, next) => {
  try {
    const { token } = request.headers;
    if (!token)
      return response.json({ success: false, msg: "Not Authorized Try again" });
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode Token from user AUTH: ", decodedToken.userId);
    request.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    response.json({ success: false });
  }
};

export default authUser;
