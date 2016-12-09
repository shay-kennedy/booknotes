var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  activeCategory: {
    type: String
  }
});


var User = mongoose.model('User', UserSchema);
module.exports = User;