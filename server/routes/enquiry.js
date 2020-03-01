const express = require("express");
const router = express.Router();
const checkAdmin = require("../lib/middleware/checkAdmin");
const Enquiry = require("../models/enquiry-model");

router.post("/postEnquiry", (req, res, next) => {
  const { email, subject, enquiry } = req.body;
  new Enquiry({
    email: req.user.email || email,
    subject: subject,
    enquiry: enquiry,
    enquiryDate: new Date()
  })
    .save()
    .then(() => {
      res
        .status(200)
        .json({ bookingResponse: "We will reply you through email! Thanks!" });
    })
    .catch(err =>
      res.status(400).json({ error: "Bad request to /postEnquiry" })
    );
});

router.get("/recentEnquiries", checkAdmin(), (req, res, next) => {
  Enquiry.find()
    .sort({ _id: -1 })
    .limit(10)
    .then(enquiries => {
      res.status(200).json({
        recentEnquiries: enquiries
      });
    });
});

router.get("/allEnquiries", checkAdmin(), (req, res, next) => {
  Enquiry.find()
    .sort({ _id: 1 })
    .limit(10)
    .then(enquiries => {
      res.status(200).json({
        allEnquiries: enquiries
      });
    });
});

module.exports = router;
