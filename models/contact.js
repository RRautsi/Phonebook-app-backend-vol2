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
  }
})

module.exports = mongoose.model("Contact", Schema)