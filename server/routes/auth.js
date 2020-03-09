// routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");
const util = require("util");
const url = require("url");
const querystring = require("querystring");

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get(
	"/login",
	passport.authenticate("auth0", {
		scope: "openid email profile"
	}),
	function(req, res) {
		res.redirect("/");
	}
);

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get("/callback", function(req, res, next) {
	passport.authenticate("auth0", function(err, user, info) {
		if (err) {
			console.log(err);
			return next(err);
		}
		if (!user) {
			return res.redirect("/login");
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			const returnTo = req.session.returnTo;
			delete req.session.returnTo;

			//check if Admin and redirect to admin page
			if (req.user.isAdmin) {
				res.redirect("/admin");
			} else {
				//else redirect to index page
				res.redirect(returnTo || "/");
			}
		});
	})(req, res, next);
});

// Perform session logout and redirect to homepage
router.get("/logout", (req, res) => {
	let returnTo = req.protocol + "://" + req.hostname;
	const port = req.connection.localPort;
	if (port !== undefined && port !== 80 && port !== 443) {
		returnTo =
			process.env.NODE_ENV === "production"
				? `${returnTo}/`
				: `${returnTo}:${port}`;
	}
	req.logout();
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				console.log(err);
			}
			console.log("Destroyed user session");

			const logoutURL = new url.URL(
				util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN)
			);
			const searchString = querystring.stringify({
				client_id: process.env.AUTH0_CLIENT_ID,
				returnTo: returnTo
			});
			logoutURL.search = searchString;

			res.redirect(logoutURL);
		});
	}
});

module.exports = router;
