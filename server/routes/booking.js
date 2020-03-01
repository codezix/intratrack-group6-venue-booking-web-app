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

  const dateTaken = Booking.findOne({ date: date });

  if (dateTaken) {
    res.json({
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
    }).save();
  }
});

router.get("/recentBookings", checkAdmin(), (req, res, next) => {
  Booking.find()
    .sort({ _id: -1 })
    .limit(10)
    .then(bookings => {
      res.json({
        recentBookings: bookings
      });
    });
});

router.get("/allBookings", checkAdmin(), (req, res, next) => {
  Booking.find()
    .sort({ _id: 1 })
    .then(bookings => {
      res.json({
        allBookings: bookings
      });
    });
});

module.exports = router;
