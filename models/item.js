var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  itemId: {
    type: String,
    unique: true
  },
  itemSupplier: {
    type: String
  },
  itemStockQuantity: {
    type: Number
  },
  itemBasePrice: {
    type: Number
  },
  itemTags: {
    type: [String]
  }
});

module.exports = mongoose.model('Item', ItemSchema);
