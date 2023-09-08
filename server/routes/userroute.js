const multer = require("multer");
const express = require("express");
const { verify } = require("../middleware/auth");
const router = express.Router();
const {
  register,
  login,
  logout,
  addFavorite,
  getFavorite,
} = require("../controllers/usercontroller.js");
// const storage = multer.diskStorage({
//     destination(req, file, callback){
//         callback(null, 'v1/uploads/logo')
//     },
//     filename(req,file,callback){
//         callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// })

router.route("/").post(register);
router.route("/login").post(login);
router.route("/logout/:id").put(logout);
router.route("/addFavorite").put(verify, addFavorite);
router.route("/getFavorite").get(verify, getFavorite);
module.exports = router;
