const mongoose = require("mongoose")

const Schema = mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique:true
  },
  roles: {
    User: {
      type: Number,
      default: 1010
    },
    Admin: Number
  },
  password: {
    type: String, 
    required: true
  },
  refreshtoken: String
})

module.exports = mongoose.model("User", Schema)