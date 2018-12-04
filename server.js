const express = require("express"); // we require express
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Specifying the api routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express(); // variable for express

// Body parser middleware, Body Parser for the req.body.email and others
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

const db = require("./config/keys").mongoURI; // fetching the mongo keys for connection

// Connect to MongoDB, If error then catching the error
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) =>
  res.send("Hey Ya! The Server Is Running Like A Charm.")
); // for now a temporary route to the homepage with a request and a route

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000; // for deployment to heroku or locally we want to run it on port 5000

app.listen(port, () => console.log(`Server running on port ${port}`)); // arrow function(=>) also called a callback fn, also this command makes server listen on the port(variable)
