//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = (req,res) => {
  res.status(200).json({message : "Get all contacts"})
}

//@desc Get a contact
//@route GET /api/contacts
//@access public
const getContact = (req,res) => {
  res.status(200).json({message : `Get contact for ${req.params.id}`})
}

//@desc Create a contact
//@route POST /api/contacts
//@access public
const createContact = (req,res) => {
  console.log(`The request body is ${JSON.stringify(req.body)}`)

  const {name,email,phone} = req.body
  if (!name || !email || !phone){
    res.status(400);
    throw new Error("all fields are mandatory")
  }
  res.status(200).json({message : `Create contact.`})
  
}

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req,res) => {
  res.status(200).json({message : `Update contact for ${req.params.id}`})
}

//@desc Delete a contact
//@route DELETE /api/contacts
//@access public
const deleteContact = (req,res) => {
  res.status(200).json({message : `Delete contact for ${req.params.id}`})
}


module.exports = {getContacts, getContact, createContact, updateContact, deleteContact}