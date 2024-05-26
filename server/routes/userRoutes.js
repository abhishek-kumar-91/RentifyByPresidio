const express = require("express");
const { Register, Login, Logout } = require("../controller/userController");

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(Logout);

module.exports = router