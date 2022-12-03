const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({message: "Unauthorized"})
    }
    const allowedArray = [...allowedRoles]
    const isAllowed = req.roles.map(role => allowedArray.includes(role)).find(bool => bool === true)
    if (!isAllowed) {
      return res.status(401).json({message: "Unauthorized"})
    }
    next()
  }
}

module.exports = verifyRoles