require("dotenv").config()
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const refreshToken = cookies.jwt
  const foundUser = await userModel
    .findOne({ refreshtoken: refreshToken })
    .exec()

  if (!foundUser) {
    return res.sendStatus(403) //Forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403) //Forbidden
    }
    const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    )
    res.json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
