const express = require("express");
const app = express();
const path = require("path");
const Campground = require("./models/campground");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/campy")
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
