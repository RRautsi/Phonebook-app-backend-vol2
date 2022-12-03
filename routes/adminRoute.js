const express = require("express")
const ROLES_LIST = require("../config/roles")
const userController = require("../controllers/userController")
const verifyRoles = require("../middleware/verifyRoles")
const router = express.Router()

router.route("/users")
  .get(verifyRoles(ROLES_LIST.Admin), userController.getUsers)

router.route("/users/:id")
  .put(verifyRoles(ROLES_LIST.Admin), userController.editUser)
  .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser)

module.exports = router