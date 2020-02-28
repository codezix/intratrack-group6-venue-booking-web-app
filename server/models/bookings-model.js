const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingsSchema = new Schema(
  {
    eventCenter: String,
    email: {
      type: String,
      trim: true,
      required: true
    },
    phone: {
      type: Number,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", BookingsSchema);
module.exports = Booking;
