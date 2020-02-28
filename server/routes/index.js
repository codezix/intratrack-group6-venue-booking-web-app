module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });

  app.get("/venue", (req, res) => {
    res.render("venue", { user: req.user });
  });

  app.get("/aboutUs", (req, res) => {
    res.render("aboutUs", { user: req.user });
  });

  app.get("/contact", (req, res) => {
    res.render("contact", { user: req.user });
  });

  app.get("/admin", (req, res) => {
    res.render("adminPage", { user: req.user });
  });
};
