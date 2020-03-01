const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema(
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
    },

    reservationDate: {
      type: Date
    }
  },

  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
