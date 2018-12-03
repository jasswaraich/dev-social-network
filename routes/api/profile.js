const express = require('express');
const router = express.Router();

// @route  GET api/profile/test
// @desc   Tests profile route
// @acess  Public 

// We can use any method get/post/put
// This will output json , will automatically serve status of 200('everything is ok') 
// This will refer to 'localhost:port/api/profile/test as we have already referenced it in server.js'
router.get('/test',(req, res) => res.json({msg: "Profile Works"})); 

module.exports = router; // for server.js to pick it up