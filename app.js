const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./server/config/passport-setup");
const routes = require("./server/routes");
const authRouter = require("./server/routes/auth");
const userInViews = require("./server/lib/middleware/userInViews");
// const indexRouter = require("./server/routes/index");
// const usersRouter = require("./server/routes/users");
dotenv.config();

//Initiate our app
const app = express();
const port = process.env.PORT || 4000;

//set view engine
app.set("view engine", "ejs");

//express-session config
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

//Configure Mongoose
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB database connection established!");
});

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(userInViews());
app.use("/auth", authRouter);
routes(app);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
