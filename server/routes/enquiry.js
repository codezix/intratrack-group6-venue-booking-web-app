const express = require("express");
const router = express.Router();
const checkAdmin = require("../lib/middleware/checkAdmin");
const Enquiry = require("../models/enquiry-model");

router.post("/postEnquiry", (req, res, next) => {
	console.log(req.body);
	const { firstName, lastName, email, subject, enquiry } = req.body;
	new Enquiry({
		firstName,
		lastName,
		email: email || req.user.email,
		subject,
		enquiry,
		enquiryDate: new Date()
	})
		.save()
		.then(() => {
			res
				.status(200)
				.json({ enquiryResponse: "We will reply you through email! Thanks!" });
		})
		.catch(err => console.log(err));
});

router.get("/recentEnquiries", checkAdmin(), (req, res, next) => {
	Enquiry.find()
		.sort({ _id: -1 })
		.limit(3)
		.then(enquiries => {
			res.status(200).send({
				recentEnquiries: enquiries
			});
		});
});

router.get("/allEnquiries", checkAdmin(), (req, res, next) => {
	Enquiry.find()
		.sort({ _id: 1 })
		.then(enquiries => {
			res.status(200).send({
				allEnquiries: enquiries
			});
		});
});

module.exports = router;
