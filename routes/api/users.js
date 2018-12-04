const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); // Gravatar for the avatar's
const bcrypt = require("bcryptjs"); // for password hashing/encryption

// Load User Model
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Tests Users route
// @acess  Public

// We can use any method get/post/put
// This will output json , will automatically serve status of 200('everything is ok')
// This will refer to 'localhost:port/api/users/test as we have already referenced it in server.js'
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route  GET api/users/register
// @desc   Register a user
// @acess  Public
// It's a mongoose method,, finding if the e-mail already exists with which the user is regstering
// We can use promises or callbacks with mongoose and here we are using promises
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size of the avatar
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      // Encrypting the password with the salt and returning the response to the user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   Login User/ Returning a JWT Token
// @acess  Public
router.post("/login", (req, res) => {
  const email = req.body.email; //we are using body parser
  const password = req.body.password;

  //Find the user by e-mail
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Sucess" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router; // for server.js to pick it up