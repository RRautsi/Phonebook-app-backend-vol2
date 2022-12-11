const mongoose = require("mongoose")

let Schema = mongoose.Schema({
  name: {
    type: String,
    required: true, 
    index: true
  },
  number: {
    type: String,
    required: true
    //implement custom validation for phonenumbers with this regex: /^([0-9]){2,3}[-]([0-9]){8,16}$/
  },
  userId: {
    type: String,
    required: true
    //userId required to make phonebook "private" to each user
  }
})

module.exports = mongoose.model("Contact", Schema)