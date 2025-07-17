const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const port = 8080;

main()
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  //first clean DB
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6876433696b975208efcca69",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
