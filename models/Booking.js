// Model User
var mongoose = require('mongoose');
var Resource = require('./Resource.js');

// Create a new schema for our User data
var schema = new mongoose.Schema({    
  resource_id   : String,
  resource      : Resource,
  start_time    : Number,
  end_time      : Number,
  thread_id     : String  
});


schema.statics.getResourceBookings = function(resourceId, currentTime, page, skip, callback) {
  var bookings = [],
  start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  Bookings.find(
    {
      resource_id: resourceId,
      end_time: {
        $gt: currentTime 
      }
    }, 
    'resource_id resource start_time end_time thread_id',
    {
      skip: start, 
      limit: 10
    }
  )
  .sort({
    start_time: 'asc'
  })
  .exec(function(err, docs){
    // If everything is cool...
    if(!err) {
      bookings = docs;  // We got tweets    
    }

    // Pass them back to the specified callback
    callback(bookings);
  });
};


// Return a User model based upon the defined schema
module.exports = Booking = mongoose.model('Booking', schema);