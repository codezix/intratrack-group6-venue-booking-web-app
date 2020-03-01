const mongoose = require("mongoose");
const { Schema } = mongoose;

const EnquirySchema = new Schema({
  subject: String,

  enquiry: String,

  firstName: {
    type: String,
    trim: true
  },

  lastName: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },

  enquiryDate: {
    type: Date
  }
});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;
