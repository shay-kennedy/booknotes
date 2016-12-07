var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  url: {
    type: String,
    required: true
  },
  note: {
    type: String
  }
});


var Category = mongoose.model('Category', UserSchema);
module.exports = Category;