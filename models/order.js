var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderId: {
    type:String,
    unique: true,
    index: true
  },
  orderDateTime: {
    type: Number,
    index: true
  },
  orderUserId: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    userId: {
      type: String,
      unique: true
    },
    userCompany: {
      type: String
    },
    userDiscountRate: {
      type: Number
    }
  },
  orderItemId: {
    type: String,
    unique: true,
    index: true
  },
  item: {
    itemId: {
      type: String,
      unique: true
    },
    itemSupplier: {
      type: String,
      index: true
    },
    itemStockQuantity: {
      type: Number,
      index: true
    },
    itemBasePrice: {
      type: Number,
      index: true
    },
    itemTags: {
      type: [String]
    }
  },
  orderQuantity: {
    type: Number,
    index: true
  },
  orderState: {
    type: String,
    index: true
  },
  orderTags: {
    type: [String],
    index: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
