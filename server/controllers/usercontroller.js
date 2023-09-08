"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/usermodel");

async function register(req, res) {
  try {
    console.log(req.body);
    const mobile = req.body.mobile;
    const email = req.body.email;
    // check user already exist
    if (mobile) {
      const finduser = await userSchema.findOne({ mobilenumber: mobile });
      if (finduser) {
        return res
          .status(400)
          .json({ message: "user with this mobile number already exist" });
      }
    }
    if (email) {
      const findemail = await userSchema.findOne({ email: email });
      if (findemail) {
        return res
          .status(400)
          .json({ message: "user with this email already exist" });
      }
    }
    let user = await userSchema(req.body);
    const password = req.body.password;
    // password encryption using bcrypt
    if (password) {
      let salt = await bcrypt.genSalt(10);
      const newpassword = bcrypt.hashSync(password, salt);
      user.password = newpassword;
    }
    const saveuser = await userSchema(user).save();
    let payload = {
      uuid: saveuser.uuid,
      role: saveuser.role,
      _id: saveuser._id,
      name: saveuser.name,
    };
    // jwt token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    return res.status(200).json({
      message: "registration completed",
      status: "success",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
}

// login
async function login(req, res) {
  try {
    let data = req.body;
    console.log("data", data);
    const user = await userSchema.findOne({ email: data.email });
    if (!user) {
      return res.status(400).json({
        message: "User not found , please register first",
      });
    }
    if (user) {
      console.log(user);
      // compare password
      let isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        console.log("uuid is", user.uuid);
        // login status
        const userstatus = await userSchema
          .findOneAndUpdate(
            { uuid: user.uuid },
            { loginstatus: true },
            { new: true }
          )
          .exec();
        let payload = {
          uuid: user.uuid,
          role: user.role,
          _id: user._id,
          name: user.name,
          profile: user.profilepic,
        };
        // jwt token
        const jwttoken = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
          status: "success",
          message: "Logged in successfully",
          data: userstatus,
          token: jwttoken,
        });
      } else {
        return res
          .status(400)
          .json({ status: "failure", message: "Incorrect password" });
      }
    } else {
      res.status(400).send("password required");
    }
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
}

// logout
async function logout(req, res) {
  try {
    console.log(req.params.id);
    const result = await userSchema
      .findOneAndUpdate(
        { uuid: req.params.id },
        { loginstatus: false },
        { new: true }
      )
      .exec();
    return res.status(200).json({
      status: "success",
      message: "Logout successfully",
      // result: result,
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
}

// Add User Favorite
async function addFavorite(req, res) {
  try {
    console.log(req.user);
    const result = await userSchema
      .findOneAndUpdate(
        { uuid: req.user.uuid },
        { Interest: req.body.interest },
        { new: true }
      )
      .exec();
    return res.status(200).json({
      status: "success",
      message: "Your Favorites Added Successfully",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
}

// Get User Favorite keywords
async function getFavorite(req, res) {
  try {
    const user = await userSchema.findOne({ uuid: req.user.uuid });
    if (user) {
      return res.status(200).json({
        status: "success",
        result: user.Interest,
      });
    } else {
      return res.status(400).json({
        message: "User not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
}

// update Favorite keywords
async function updateFavorite(req, res) {
  try {
    console.log(req);
    console.log(req.headers);
    const user = await userSchema.find({ uuid: req.user.uuid });
    if (user) {
      const favorites = user.Interest;
      return res.status(200).json({
        status: "success",
        result: favorites,
      });
    } else {
      return res.status(400).json({
        message: "User not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
}
module.exports = {
  register,
  login,
  logout,
  addFavorite,
  getFavorite,
  updateFavorite,
};
