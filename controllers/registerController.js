const bcrypt = require("bcrypt")
const userModel = require("../models/user")

const handleRegistration = async (req, res) => {
  const { name, password } = req.body

  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Registering failed. Name and password required." })
  }
  
  if (name.length < 4 || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Registering failed. Name or password too short." })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new userModel({
      username: name,
      password: hashedPassword,
      refreshtoken: ""
    })
    await user.save((err, user) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(409).json({ message: "Username is already in use" })
        }
        return res.status(500).json({ message: "Internal server error. Reason: " + err.message})
      }
      if (!user) {
        return res.status(500).json({ message: "Internal server error" })
      }
      return res.status(201).json({ message: "User registered" })
    })
  } catch (err) {
    return res.status(500).json({ message: "Registering failed. Reason: " + err.message })
  }
}

module.exports = { handleRegistration }
