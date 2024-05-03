const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const {ObjectId} = require('mongodb');
const { upload } = require('../middleware/imageUpload');

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
  const {name,email,phones} = req.body;

  if (!name || !email || !phones || phones.length===0){
    res.status(404);
    throw new Error('All fields are necessary.');
  }

  // Check if the phone number already exists
  const existingContact = await Contact.find({ phones: { $in: phones } });
  if (existingContact.length > 0) {
      res.status(409);
      throw new Error('Contact with this phone number already exists.');
  }

  //if no error
  const contact = await Contact.create({
    name,
    email,
    phones,
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
        { phones: { $in: [id] } }
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

//@desc Upload an image
//@route POST /api/contacts/:id/upload-image
//@access public
const uploadImage = asyncHandler(async (req,res) => {
  const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    upload.single('image')(req, res, async (err) => {
      if (err){
        res.status(500).json(err);
        //throw new Error(err);
        return
      }

      contact.image = req.file.path;

      await contact.save();

      res.status(200).json({ message: 'Image uploaded successfully' });
  });
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact, uploadImage};