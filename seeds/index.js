const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/campy")
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log(err);
  });

const randomEle = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      title: `${randomEle(descriptors)} ${randomEle(places)}`,
      location: `${cities[random].city}, ${cities[random].state}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
