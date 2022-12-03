const express = require("express")
const loginController = require("../controllers/loginController")
const logoutController = require("../controllers/logoutController")
const registerContoller = require("../controllers/registerController")
const router = express.Router()

router.route("/register")
  .post(registerContoller.handleRegistration)

router.route("/login")
  .post(loginController.handleLogin)

router.route("/logout")
  .get(logoutController.handleLogout)

module.exports = router
