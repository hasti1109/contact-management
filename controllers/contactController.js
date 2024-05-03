const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const {ObjectId} = require('mongodb');

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res) => {
  const contacts = await Contact.find();
  if (contacts.length == 0){
    res.status(200).json({message:'No contacts exist.'})
    return
  }
  res.status(200).json(contacts);
});

//@desc Create a contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req,res) => {
  //console.log(`the request body is: ${req.body}`);
  const {name,email,phone} = req.body;

  if (!name || !email || !phone){
    res.status(404);
    throw new Error('All fields are necessary.');
  }

  // Check if the phone number already exists
  const existingContact = await Contact.findOne({ phone: phone });
  if (existingContact) {
      res.status(409);
      throw new Error('Contact with this phone number already exists.');
  }

  //if no error
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(`Created contact:${contact}`);
})

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //search by doc id
  if (ObjectId.isValid(id)) {
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }
    res.status(200).json(contact);
  } 
  //search by phone no. or name
  else {
    const contacts = await Contact.find({
      $or: [
        { name: { $regex: id, $options: 'i' } },
        { phone: { $regex: id, $options: 'i' } }
      ]
    });
    if (contacts.length === 0) {
      res.status(404);
      throw new Error('Contact not found');
    }
    res.status(200).json(contacts);
  }
});


//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res) => {
  if (ObjectId.isValid(req.params.id)){
    const contact = await Contact.findById(req.params.id);
    if(!contact){
      res.status(404);
      throw new Error('Contact not found');
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(200).json(`Updated Contact: ${updatedContact}`);
  }
  else{
    res.status(400);
    throw new Error('Invalid Id');
  }
  
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res) => {
  if (ObjectId.isValid(req.params.id)){
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact){
      res.status(404);
      throw new Error('Contact not found');
    }
    res.status(200).json(`contact removed:${contact}`);
  }
  else{
    res.status(400);
    throw new Error('Invalid Id');
  }
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};