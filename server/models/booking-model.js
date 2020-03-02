const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
	eventCentre: String,

	startTime: { type: String, trim: true },

	endTime: { type: String, trim: true },

	reservationDate: {
		type: String
	},

	firstName: {
		type: String,
		trim: true,
		required: true
	},

	lastName: {
		type: String,
		trim: true,
		required: true
	},

	email: {
		type: String,
		trim: true,
		required: true
	},

	phone: {
		type: Number,
		trim: true
	},
	createdAt: {
		type: Date
	}
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
