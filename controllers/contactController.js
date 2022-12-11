const contactModel = require("../models/contact")
const userModel = require("../models/user")

const getContacts = async (req, res) => {
  const user = await userModel.findOne({username: req.user})
  const contacts = await contactModel.find()
  const filteredContacts = contacts.filter(contact => contact.userId === user.id)
  if(!filteredContacts) return res.status(204).json({message: "No contacts found"})
  res.json(filteredContacts)
}

const addContact = (req, res) => {
  const { name, number, userId } = req.body
  const contact = new contactModel ({
    name: name,
    number: number,
    userId
  })
  contact.save((err, result) => {
    if(err) {
      return res.status(500).json({ message: "Internal Server Error. Failed to create new contact. Reason", err})
    }
    return res.status(201).json({ result, message: "New contact created!"})
  })
}

const deleteContact = (req, res) => {
  const id = req.params.id
  contactModel.findByIdAndDelete({_id: id}, (err) => {
    if(err) {
      return res.status(500).json({ message: "Internal Server Error. Failed to delete contact. Reason", err})
    }
    return res.status(200).json({ message: "Contact deleted succesfully!"})
  })
  
}

const editContact = (req, res) => {
  const id = req.params.id
  const { name, number } = req.body
  const editedContact = {
    name: name,
    number:number
  }
  contactModel.findOneAndUpdate({_id: id}, editedContact, {new: true}, (err, result) => {
    if(err) {
      return res.status(500).json({ message: "Internal Server Error. Failed to edit contact. Reason", err})
    }
    return res.status(200).json({ result, message: "Contact updated succesfully!" })
  }
)}

module.exports = {
  getContacts,
  addContact,
  editContact,
  deleteContact
}