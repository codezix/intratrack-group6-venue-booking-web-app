const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const User = require("../models/users-model");
const dotenv = require("dotenv");

dotenv.config();

passport.serializeUser((user, done) => {
	console.log("-------------Serializing-----------");
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log("------------Deserializing----------");

	User.findById(id).then(user => {
		done(null, user);
	});
});

const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL: process.env.AUTH0_CALLBACK_URL
	},
	(accessToken, refreshToken, extraParams, profile, done) => {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user

		//set default role to user
		let role = "user";
		console.log(profile._json);
		//if role from auth0 is admin set role as admin
		if (profile._json[`${process.env.namespaceid}/role`]) {
			role = profile._json[`${process.env.namespaceid}/role`][0];
		}

		//Find User or create New User in MongoDB
		User.findOne({ authId: profile.id }).then(currentUser => {
			if (currentUser) {
				console.log(currentUser.email);
				done(null, currentUser);
			} else {
				const userDetails = {
					email: profile.displayName,
					authId: profile.id
					// username: profile.name
				};

				if (role === "admin") {
					userDetails.isAdmin = true;
				}

				new User(userDetails).save().then(newUser => {
					console.log(newUser.email);
					done(null, newUser);
				});
			}
		});
	}
);

passport.use(strategy);
