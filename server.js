const express = require("express"); // we require express
const app = express(); // varaiable to express

app.get("/", (req, res) => res.send("Hey What's up.I am putt Jatt da")); // for now a temporary route to the homepage with a request and a route

const port = process.env.PORT || 5000; // for deployment to heroku or locally we want to run it on port 5000

app.listen(port, () => console.log(`Server running on port ${port}`)); // arrow function(=>) also called a callback fn, also this command makes server listen on the port(variable)
