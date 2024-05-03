const express = require('express');
const router = express.Router();

const {getContacts, createContact, getContact, updateContact, deleteContact, uploadImage} = require('../controllers/contactController');

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

router.route('/:id/upload-image').put(uploadImage);

module.exports = router;