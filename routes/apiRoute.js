const express = require("express")
const contactController = require("../controllers/contactController")
const router = express.Router()

router.route("/contacts")
  .get(contactController.getContacts)
  .post(contactController.addContact)

router.route("/contacts/:id")
  .delete(contactController.deleteContact)
  .put(contactController.editContact)

module.exports = router
