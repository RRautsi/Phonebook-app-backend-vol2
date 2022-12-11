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
  const id = foundUser.id

  if (!foundUser) {
    return res.sendStatus(403) //Forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403) //Forbidden
    }
    const roles = Object.values(foundUser.roles).filter(
      (role) => role != undefined
    )
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
          id: id
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5s" }
    )
    res.json({ name: foundUser.username, accessToken })
  })
}

module.exports = { handleRefreshToken }
