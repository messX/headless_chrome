var express = require('express');
var logger = require('tracer').console()
var app = express();
var headlessServer = require('./lib/headless.js')
console.log("Running node server .....")
app.get('/', function(req, res){
   logger.trace("request received for url", req.query.url);
   var prom = new Promise(function(resolve, reject){
      resolve(headlessServer.getData(req.query.url))
   })
   prom.then(function(response){
        logger.trace("got data returning response")
        res.send(response.content)
   })
});
app.listen(3000);