const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client")));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
