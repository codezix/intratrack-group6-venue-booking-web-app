const express = require("express");
const router = express.Router();
const secured = require("../lib/middleware/secured");
const checkAdmin = require("../lib/middleware/checkAdmin");
const Booking = require("../models/booking-model");

router.post("/postBooking", secured(), (req, res, next) => {
	const {
		firstName,
		lastName,
		eventCentre,
		phone,
		reservationDate,
		startTime,
		endTime
	} = req.body;

	console.log(req.body);
	console.log(req.body.reservationDate);

	const newStartHr = getHour(startTime);
	const newStartMin = getMin(startTime);
	const newEndHr = getHour(endTime);
	const newEndMin = getMin(endTime);

	let dateTaken = false;

	Booking.find({
		$and: [{ reservationDate: reservationDate }, { eventCentre: eventCentre }]
	}).then(bookings => {
		if (bookings === []) {
			new Booking({
				email: req.user.email,
				firstName,
				lastName,
				phone,
				eventCentre: eventCentre,
				reservationDate,
				startTime,
				endTime,
				createdAt: new Date()
			})
				.save()
				.then(() => {
					res.status(200).send({
						bookingResponse: `Booking made! We'll get in touch with you soon`
					});
				});
		} else {
			bookings.forEach(booking => {
				let existingStartHr = getHour(booking.startTime);
				let existingStartMin = getMin(booking.startTime);

				if (
					newStartHr === existingStartHr &&
					newStartMin === existingStartMin
				) {
					dateTaken = true;
				}

				if (newEndHr > existingStartHr && newStartHr <= existingStartHr) {
					dateTaken = true;
				}
			});
		}
	});

	if (dateTaken) {
		res.send({
			bookingResponse: `Oops! That slot is taken! Select a different date`
		});
	} else {
		new Booking({
			email: req.user.email,
			firstName,
			lastName,
			phone,
			eventCentre,
			reservationDate,
			startTime,
			endTime,
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

router.get("/recentBookings", checkAdmin(), (req, res, next) => {
	Booking.find()
		.sort({ _id: -1 })
		.limit(3)
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
