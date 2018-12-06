const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId  // Associate the user's info with the profile by it's ID 
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40


  },
  company: {
    type: String

  },
  website: {
    type: String
  },
  location: {
    type:String

  },
  status: {
    type: String,
    required: true
  },
  skills:{
    type: [String] //An array of strings
    required: true  
  },
  bio: {
    type: String

  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true

    },
    company:{

    }
  ]
  }    

});