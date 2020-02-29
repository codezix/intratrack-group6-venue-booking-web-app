const express = require("express");
const router = express.Router();
const secured = require("../lib/middleware/secured");
const checkAdmin = require("../lib/middleware/checkAdmin");
const Enquiry = require("../models/enquiry-model");

router.post("/postEnquiry", secured(), (req, res, next) => {
  const { phone } = req.body;
  new Enquiry({
    email: req.user.email,
    phone,
    enquiryDate: new Date()
  }).save();
});

router.get("/recentEnquiries", checkAdmin(), (req, res, next) => {
  Enquiry.find()
    .sort({ _id: -1 })
    .limit(10)
    .then(enquiries => {
      res.json({
        recentEnquiries: enquiries
      });
    });
});

router.get("/allEnquiries", checkAdmin(), (req, res, next) => {
  Enquiry.find()
    .sort({ _id: 1 })
    .limit(10)
    .then(enquiries => {
      res.json({
        allEnquiries: enquiries
      });
    });
});

module.exports = router;
