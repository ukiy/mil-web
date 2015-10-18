var conf;

if (process.env.NODE_ENV == 'production'){
  conf = require('./conf').production;
} else {
  conf = require('./conf').development;
}

var csv = require('csv');
var fs = require('fs');
var user = './sample_data/user.tsv';
var item = './sample_data/item.tsv';
var order = './sample_data/order.tsv';
var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');
var Order = require('../models/order');
mongoose.connect(conf.mongo.uri);

var streamUser = fs.createReadStream("./sample_data/user.tsv");
var streamItem = fs.createReadStream("./sample_data/item.tsv");
var streamOrder = fs.createReadStream("./sample_data/order.tsv");

streamUser.on('data', function(data){
  var str = data.toString();
  var user = str.split('\n');
  user.forEach(function(u){
    var cols = u.split('\t');
    var newUser = new User({
      userId: cols[0],
      userCompany: cols[1],
      userDiscountRate: parseInt(cols[2])
    }).save(function(e,u){
      //console.log(u);
    });
  });
});

streamItem.on('data', function(data){
  var str = data.toString();
  var items = str.split('\n');
  items.forEach(function(i){
    var cols = i.split('\t');
    if (cols.length < 5){
      return;
    }
    var tags;
    if (cols[4].indexOf(',') > -1){
      tags = [cols[4]];
    }else {
      tags = cols[4].split(',');
    }
    var newItem = new Item({
      itemId: cols[0],
      itemSupplier: cols[1],
      itemStockQuantity: parseInt(cols[2]),
      itemBasePrice: parseInt(cols[3]),
      itemTags: tags
    });
    newItem.save(function (err, i) {
      //console.log(i);
    });
  });
});

streamOrder.on('data', function(data){
  var str = data.toString();
  var ordersStr = str.split('\n');
  ordersStr.forEach(function(orderStr){
    var cols = orderStr.split('\t');
    if (cols.length < 7 ){
      return;
    }
    var tags;
    if (cols[6].indexOf(',') > -1){
      tags = [cols[6]];
    }else {
      tags = cols[6].split(',');
    }
    var newOrder = new Order({
      orderId: cols[0],
      orderDateTime: parseInt(cols[1]) * 1000,
      orderUserId: cols[2],
      orderItemId: cols[3],
      orderQuantity: parseInt(cols[4]),
      orderState: cols[5],
      orderTags: tags
    });
    newOrder.save(function(err, o){
    //console.log(o);
    });
  });
});
