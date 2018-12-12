const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model

const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// @route  GET api/profile/test
// @desc   Tests profile route
// @acess  Public

// We can use any method get/post/put
// This will output json , will automatically serve status of 200('everything is ok')
// This will refer to 'localhost:port/api/profile/test as we have already referenced it in server.js'
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route  GET api/profile/
// @desc   Get current user profile
// @acess  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router; // for server.js to pick it up
