var Order = require('./models/order');

module.exports = function(query){
  return searchOrder(query);
}
function searchOrder(query){
  var search = {};
  var tag;
  var limit;
  if (query.findByOrderDateTimeGTE){
    search.orderDateTime = search.orderDateTime || {};
    search.orderDateTime.$gte = parseInt(query.findByOrderDateTimeGTE);
  }
  if (query.findByOrderDateTimeLTE){
    search.orderDateTime = search.orderDateTime || {};
    search.orderDateTime.$lte = parseInt(query.findByOrderDateTimeLTE);
  }
//user
  if (query.findByOrderUserId){
    search.orderUserId = query.findByOrderUserId;
  }
  if (query.findByOrderItemId){
    search.orderItemId = query.findByOrderItemId;
  }

  if (query.findByOrderQuantityGTE){
    search.orderQuantity = search.orderQuantity || {};
    search.orderQuantity.$gte = parseInt(query.findByOrderQuantityGTE);
  }
  if (query.findByOrderQuantityLTE){
    search.orderQuantity = search.orderQuantity || {};
    search.orderQuantity.$lte = parseInt(query.findByOrderQuantityLTE);
  }

  if (query.findByOrderState){
    search.orderState = query.findByOrderState;
  }

  if (query.findByOrderTagsIncludeAll){
    search.orderTags = search.orderTags || {};
    tags = query.findByOrderTagsIncludeAll.split(',');
    search.orderTags.$all =  tags;
  }
  tags = null;
  if (query.findByOrderTagsIncludeAny){
    search.orderTags = search.orderTags || {};
    tags = query.findByOrderTagsIncludeAny.split(',');
    search.orderTags.$in = tags;
  }
  tags = null;

// user
  if (query.findByUserCompany){
    search['user.userCompany'] = query.findByUserCompany;
  }
  if (query.findByUserDiscountRateGTE){
    search['user.userDiscountRate'] = search['user.userDiscountRate'] || {};
    search['user.userDiscountRate'].$gte = parseInt(query.findByUserDiscountRateGTE);
  }
  if (query.findByUserDiscountRateLTE){
    search['user.userDiscountRate'] = search['user.userDiscountRate'] || {};
    search['user.userDiscountRate'].$lte = parseInt(query.findByUserDiscountRateLTE);
  }

// item
  if (query.findByItemSupplier){
    search['item.itemSupplier'] = query.findByItemSupplier;
  }

  if (query.findByItemStockQuantityGTE){
    search['item.itemStockQuantity'] = search['item.itemStockQuantity'] || {};
    search['item.itemStockQuantity'].$gte = parseInt(query.findByItemStockQuantityGTE);
  }
  if (query.findByItemStockQuantityLTE){
    search['item.itemStockQuantity'] = search['item.itemStockQuantity'] || {};
    search['item.itemStockQuantity'].$lte = parseInt(query.findByItemStockQuantityLTE);
  }

  if (query.findByItemBasePriceGTE){
    search['item.itemBasePrice'] = search['item.itemBasePrice'] || {};
    search['item.itemBasePrice'].$gte = parseInt(query.findByItemBasePriceGTE);
  }
  if (query.findByItemBasePriceLTE){
    search['item.itemBasePrice'] = search['item.itemBasePrice'] || {};
    search['item.itemBasePrice'].$lte = parseInt(query.findByItemBasePriceLTE);
  }

  if (query.findByItemTagsIncludeAll){
    search['item.itemTags'] = search['item.itemTags'] || {};
    tags = query.findByItemTagsIncludeAll.split(',');
    search['item.itemTags'] = { $all: tags }
  }
  tags = null;
  if (query.findByItemTagsIncludeAny){
    search['item.itemTags'] = search['item.itemTags'] || {};
    tags = query.findByItemTagsIncludeAny.split(',');
    search['item.itemTags'] = { $in: tags }
  }
  tags = null;




  if (query.hasOwnProperty('limit')){
    limit = parseInt(query.limit);
  }else {
    limit = 100;
  }
  //console.log(search);
  return Order.find(search).sort({'orderDateTime': -1}).limit(limit);
};
