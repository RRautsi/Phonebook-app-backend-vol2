require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const handleLogin = async (req, res) => {
  const { name, password } = req.body
  const foundUser = await userModel.findOne({ username: name }).exec()
  const id = foundUser.id

  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Login failed. Name and password required." })
  }

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized. User not found." })
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password)

  if (!passwordMatch) {
    return res.status(401).json({ message: "Unauthorized. Wrong password." })
  } else {
    const roles = Object.values(foundUser.roles).filter(
      (role) => role != undefined
    )
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
          id: id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5s" }
    )
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    )

    foundUser.refreshtoken = refreshToken
    await foundUser.save()

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  }
}

module.exports = { handleLogin }
