const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String, 
      required: [true,'Please add the contact name'],
    },
    email : {
      type: String, 
      required: [true,'Please add the contact email address'],
    },
    phones : {
      type: [String], 
      required: [true,'Please add the contact phone number'],
    },
    image : {
      type: String
    }
  },
  {
      timestamps: true
  }
);

module.exports = mongoose.model('Contact',contactSchema);