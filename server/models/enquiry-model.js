const mongoose = require("mongoose");
const { Schema } = mongoose;

const EnquirySchema = new Schema({
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: Number,
    trim: true
  },
  enquiryDate: {
    type: Date
  },
  subject: String,
  enquiry: String
});

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;
