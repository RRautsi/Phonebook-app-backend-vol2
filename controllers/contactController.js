const contactModel = require("../models/contact")

const getContacts = (req, res) => {
  contactModel.find((err, contacts) => {
    if(err) {
      return res.status(500).json({message: "Internal Server Error. Server did not get contacts from database."})
    }
    return res.status(200).json(contacts)
  })
}

const addContact = (req, res) => {
  const { name, number } = req.body
  const contact = new contactModel ({
    name: name,
    number: number
  })
  contact.save((err) => {
    if(err) {
      return res.status(500).json({ message: "Internal Server Error. Failed to create new contact. Reason", err})
    }
    return res.status(201).json({ message: "New contact created!"})
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
  contactModel.findOneAndUpdate({_id: id}, editedContact, (err) => {
    if(err) {
      return res.status(500).json({ message: "Internal Server Error. Failed to edit contact. Reason", err})
    }
    return res.status(200).json({ message: "Contact updated succesfully!"})
  })
}

module.exports = {
  getContacts,
  addContact,
  editContact,
  deleteContact
}