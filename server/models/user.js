var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleID: { 
    type: String, 
    index: true 
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  displayName: {
    type: String
  },
  email: {
    type: String
  },
  categories: {
    type: Array,
    default: []
  },
  activeCategory: {
    type: String
  }
});


var User = mongoose.model('User', UserSchema);
module.exports = User;