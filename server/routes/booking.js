const express = require("express");
const router = express.Router();
const secured = require("../lib/middleware/secured");
const checkAdmin = require("../lib/middleware/checkAdmin");
const Booking = require("../models/booking-model");
const status = require("../lib/middleware/status");
const Time = require("../functions/index");

router.post("/postBooking", status(), (req, res, next) => {
	const {
		firstName,
		lastName,
		eventCentre,
		phone,
		reservationDate,
		startTime,
		endTime
	} = req.body;

	const startMin = Time.getTime(startTime);
	const endMin = Time.getTime(endTime);
	let dateTaken = false;

	// console.log(startTime);
	// console.log(startMin);
	// console.log(endTime);
	// console.log(endMin);

	Booking.find({
		$and: [{ reservationDate: reservationDate }, { eventCentre: eventCentre }]
	})
		.then(bookings => {
			if (!bookings.length) {
				dateTaken = false;
			} else {
				bookings.forEach(booking => {
					let existingStartMin = booking.startMin;
					let existingEndMin = booking.endMin;
					if (
						startMin === existingStartMin ||
						(startMin > existingStartMin && startMin < existingEndMin) ||
						(endMin > existingStartMin && endMin < existingEndMin) ||
						endMin === existingEndMin
					) {
						dateTaken = true;
					}
				});
			}
		})
		.then(() => {
			// console.log(dateTaken);

			if (dateTaken) {
				res.send({
					bookingResponse: `Oops! That slot is taken! Select a different date/time`
				});
			} else {
				new Booking({
					email: req.user.email,
					firstName,
					lastName,
					phone,
					eventCentre: eventCentre,
					reservationDate,
					startTime,
					endTime,
					startMin,
					endMin,
					createdAt: new Date()
				})
					.save()
					.then(() => {
						res.status(200).send({
							bookingResponse: `Booking made! We'll get in touch with you soon`
						});
					});
			}
		});
});

router.get("/recentBookings", checkAdmin(), (req, res, next) => {
	Booking.find()
		.sort({ _id: -1 })
		.limit(4)
		.then(bookings => {
			res.send({
				recentBookings: bookings
			});
		});
});

router.get("/allBookings", checkAdmin(), (req, res, next) => {
	Booking.find()
		.sort({ _id: 1 })
		.then(bookings => {
			res.send({
				allBookings: bookings
			});
		});
});

module.exports = router;
