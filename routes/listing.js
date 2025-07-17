const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //Index route
  .get(wrapAsync(listingController.index))
  //Create route
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image][url]"),
    wrapAsync(listingController.createListing)
  );

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //Show route
  .get(wrapAsync(listingController.showListing))
  //Update route
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image][url]"),
    wrapAsync(listingController.updateListing)
  )
  //Delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
