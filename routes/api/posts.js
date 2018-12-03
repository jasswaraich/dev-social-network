const express = require('express');
const router = express.Router();

// @route  GET api/posts/test
// @desc   Tests posts route
// @acess  Public 

// We can use any method get/post/put
// This will output json , will automatically serve status of 200('everything is ok') 
// This will refer to 'localhost:port/api/posts/test as we have already referenced it in server.js'
router.get('/test',(req, res) => res.json({msg: "Posts Works"})); 

module.exports = router; // for server.js to pick it up