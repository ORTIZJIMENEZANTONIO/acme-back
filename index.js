// Modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const deliveryRoutes = require("./src/delivery-routes/delivery-routes");

// Variables
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

// app.use();
// Routes
app.get("/", (req, res) =>
  res.json({
    message: "Welcome to acme back",
  })
);

app.get("/routes", deliveryRoutes.getRoutesMaxScore);

app.listen(port, () => console.log(`Running in port: ${port}`));

// To tests
module.exports = { app };
