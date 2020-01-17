const express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Pages
const mainPage = require("./main.js");

// Use static
app.use(express.static(path.join(__dirname, "/static/")));

// Use Pages
app.use("/", mainPage);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));


