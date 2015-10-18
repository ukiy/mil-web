var http = require('http');
var server = http.createServer();
var url = require('url');
var search = require('./search');

var conf = require('./conf/conf').production;

var mongoose = require('mongoose');

var Order = require('./models/order');

mongoose.connect(conf.mongo.uri,  conf.mongo.opt);

http.globalAgent.maxSockets = 25;

server.on('request', doRequest);
server.listen(process.env.PORT || 3000);

function doRequest(req, res) {
  if (req.url.toString().indexOf('getOrder') > -1) {
    return getOrder(req, res);
  }
  if (req.url.toString().indexOf('searchOrder') > -1) {
    return searchOrder(req, res);
  }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World\n');
  res.end();
}

function getOrder(req, res){
  Order.find({orderId: req.params.orderId},  function(err,  order){
    res.setHeader('Content-Type',  'application/json');
    if (err){ return res.end(JSON.stringify({result: true,data: error})); }
    if (!order) {
      return res.end(JSON.stringify({result: false, data: order}));
    }
    var result = {
      result: true,
      data: order
    };
    return res.end(JSON.stringify(result));
  })
};

function searchOrder(res, res){
  res.setHeader('Content-Type', 'application/json');
  search(req.query).exec(function(err, data){
    if (err) { return res.end(JSON.stringify(err)); }
    //console.timeEnd("db");
    return res.end(JSON.stringify({
      result: true,
      data:data
    }));

  });
}
