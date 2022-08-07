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
const newImages = [];

const getIamges = async () => {
  let res = await fetch(
    "https://api.unsplash.com/collections/483251/photos?per_page=50&client_id=ZOQd-CgurkgbffJ0qnXBmLJBqOyMnABNd-MfwzKcf48"
  );
  let images = await res.json();
  return images;
};

getIamges().then((data) => {
  for (let image of data) {
    newImages.push(image.urls.small);
  }
});

const seedDB = async () => {
  console.log("Seed starting");

  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 1;

    const camp = new Campground({
      title: `${randomEle(descriptors)} ${randomEle(places)}`,
      location: `${cities[random].city}, ${cities[random].state}`,
      image: randomEle(newImages),
      price,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta libero modi impedit recusandae repudiandae pariatur laudantium vero esse distinctio accusantium.",
    });
    await camp.save();
  }
  console.log("Seed complete");
};

setTimeout(() => {
  seedDB().then(() => {
    mongoose.connection.close();
  });
}, 5000);
