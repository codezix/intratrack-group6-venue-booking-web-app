const checkAdmin = require("../lib/middleware/checkAdmin");
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/venue", (req, res) => {
    res.render("venue");
  });

  app.get("/aboutUs", (req, res) => {
    res.render("aboutUs");
  });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  app.get("/admin", checkAdmin(), (req, res) => {
    res.render("adminPage");
  });
};
