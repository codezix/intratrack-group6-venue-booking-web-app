const mongoose = require("mongoose");
const { Schema } = mongoose;

const EnquiriesSchema = new Schema(
  {
    email: {
      type: String,
      trim: true
    },
    phone: {
      type: Number,
      trim: true
    },
    subject: String,
    enquiry: String
  },
  {
    timestamps: true
  }
);

const Enquiry = mongoose.model("Enquiry", EnquiriesSchema);
module.exports = Enquiry;
