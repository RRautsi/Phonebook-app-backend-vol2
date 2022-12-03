const express = require("express")
const refreshTokenController = require("../controllers/refreshTokenController")
const router = express.Router()

router.route("/refresh")
  .get(refreshTokenController.handleRefreshToken)

module.exports = router