const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const User = require("../models/users-model");
const dotenv = require("dotenv");

dotenv.config();

passport.serializeUser((user, done) => {
  console.log("--------------Serializing----------");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("--------------Deserializing----------");
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => console.log(err));
});

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:4000/auth/callback"
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    const role = profile._json["http://localhost:4000/role"][0];
    console.log(role);
    User.findOne({ authId: profile.id }).then(currentUser => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        const userDetails = {
          email: profile.displayName,
          authId: profile.id
        };

        if (role === "admin") {
          userDetails.isAdmin = true;
        }

        new User(userDetails).save().then(newUser => {
          console.log(newUser);
          done(null, newUser);
        });
      }
    });
  }
);

passport.use(strategy);
