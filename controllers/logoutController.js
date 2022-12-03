const userModel = require("../models/user")

//Remember to delete access token from client on frontend when logout is initiated!
//This only handles resfresh token removal.
const handleLogout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res
    .status(204)
    .json({ message: "No content. User is already signed out." })
  }
  
  const refreshToken = cookies.jwt
  const foundUser = await userModel.findOne({ refreshtoken: refreshToken }).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    return res
      .sendStatus(204)
  }
  await userModel.findOneAndUpdate(foundUser, { refreshtoken: "" }).exec()
  await res.clearCookie('jwt', { httpOnly: true }) //!!!IMPORTANT!!! Add 'secure: true' in production when using https.
  return res.json({message: "User logged out."})
}

module.exports = { handleLogout }
