// Model User
var mongoose = require('mongoose');
var User     = require('./User.js');

// Create a new schema for our User data
var schema = new mongoose.Schema({    
  uid           : String,
  user          : User,
  body          : String,
  resource      : String,
  comment_count : Number,
  expires_at    : Number,
  priority      : Number 
});


schema.statics.getThreads = function(page, skip, callback) {
  var threads = [],
  start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  Threads.find(
    {}, 
    'uid user body resource comment_count priority expires_at',
    {
      skip: start, 
      limit: 10
    }
  )
  .sort({
    priority: 'desc'
  })
  .exec(function(err, docs){
    // If everything is cool...
    if(!err) {
      threads = docs;  // We got tweets
      // threads.forEach(function(tweet){
      //   tweet.active = true; // Set them to active
      // });
    }

    // Pass them back to the specified callback
    callback(threads);
  });
};


schema.statics.getUserThreads = function(uid, page, skip, callback) {
  var threads = [],
  start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  Threads.find(
    {
      uid: uid
    }, 
    'uid user_name',
    {
      skip: start, 
      limit: 10
    }
  )
  .sort({
    priority: 'desc'
  })
  .exec(function(err, docs){
    // If everything is cool...
    if(!err) {
      threads = docs;  // We got tweets
      // threads.forEach(function(tweet){
      //   tweet.active = true; // Set them to active
      // });
    }

    // Pass them back to the specified callback
    callback(threads);
  });
};


// Return a User model based upon the defined schema
module.exports = User = mongoose.model('User', schema);