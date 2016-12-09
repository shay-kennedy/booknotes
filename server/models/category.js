var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: []
  }
});


var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;