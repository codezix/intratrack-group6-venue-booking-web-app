const mongoose = require("mongoose");
const { Schema } = mongoose;

const EnquirySchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },

  subject: String,

  enquiry: String,

  enquiryDate: {
    type: Date
  }
});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;
