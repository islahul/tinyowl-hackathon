// Model User
var mongoose = require('mongoose');
var Booking = require('./Booking.js');

// Create a new schema for our User data
var schema = new mongoose.Schema({      
  type          : String,
  name          : String,
  description   : String,
  picture       : String,
  capacity      : Number 
});


schema.statics.getResources = function(type, callback) {
  var resources = [];

  // Query the db, using skip and limit to achieve page chunks
  Resource.find(
    {
      type: type
    }, 
    'type name description picture capacity'
  )
  .sort({
    capacity: 'asc'
  })
  .exec(function(err, docs){
    // If everything is cool...
    if(!err) {
      resources = docs;  // We got tweets    
    }

    // Pass them back to the specified callback
    callback(resources);
  });
};


schema.methods.getBookings = function(resourceId, currentTime, page, skip, callback) {
  // Query the db, using skip and limit to achieve page chunks
  Bookings.getResourceBookings(this.id, currentTime, page, skip, function(bookings) {
    callback(bookings);
  });
};


// Return a User model based upon the defined schema
module.exports = Resource = mongoose.model('Resource', schema);