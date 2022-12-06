const userModel = require("../models/user");

const getUsers = (req, res) => {
  userModel.find((err, users) => {
    if(err) {
      return res.status(500).json({message: "Internal Server Error. Server did not get users from database."})
    }
    return res.status(200).json(users)
  })
}

const editUser = (req, res) => {
  const id = req.params.id
  const { username, roles } = req.body
  const editedUser = {
    username: username,
    roles: roles ? roles : { User: 1010 }
  }
  userModel.findByIdAndUpdate({_id: id}, editedUser, (err) => {
    if(err) {
      if(err.code === 11000) {
        return res.status(409).json({message: "Username already in use."})
      }
      return res.status(500).json({ message: "Internal Server Error. Failed to edit user. Reason", err})
    }

    return res.status(200).json({ message: "User updated succesfully!"})
  })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  userModel.findByIdAndDelete({_id: id}, (err) => {
    if(err) {
      return res.status(500).json({ message: "Internal Server Error. Failed to delete user. Reason", err})
    }
    return res.status(200).json({ message: "User deleted succesfully!"})
  })
}

module.exports = { getUsers, editUser, deleteUser }