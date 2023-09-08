const jwt = require("jsonwebtoken");
const userSchema = require("../models/usermodel");
const asyncHandler = require("express-async-handler");

const verify = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //Bearer (token)
      //decode token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = await userSchema.findById(decode._id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  }
});

module.exports = {
  verify,
};
