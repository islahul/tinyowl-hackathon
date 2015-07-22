// Model User
var mongoose = require('mongoose');

// Create a new schema for our User data
var schema = new mongoose.Schema({
    uid        : String, 
    name       : String,
    avatar     : String,
    posts      : String,
    last_active: Number
});


schema.statics.getUser = function(uid, callback) {
    var user = null;

    User.find({
        uid: uid
    }, 'uid name avatar last_active')
    .exec(function(err, docs) {
        if(!err) {
            user = docs;
        }

        callback(user);
    })
};


// Return a User model based upon the defined schema
module.exports = User = mongoose.model('User', schema);