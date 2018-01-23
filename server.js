var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser')
var storeService = require("./app/storage/mongoStorage.js");
var debug = require('debug')('app');

let config = require('./config/properties.json'); //we load the db location from the JSON files
let port = 3000;

// config
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Initialize connection once
MongoClient.connect(config.DBHost, function(err, database) {
  if (err) {
    debug('Error');
  }

  db = database;

  // Start the application after the database connection is ready
  app.listen(port);
  debug('Listening on port: ' + port);
});

// Routes

app.post('/:database/:collection/_bulk', function(req, res) {
  debug(req.method + ' ' + req.url);
  var collection = req.params.collection;
  var database = req.params.database;

  storeService.storeBulk(db.db(database), collection, req.body.bulk);

  res.end('ok');
});

app.put('/:database/:collection/', function(req, res) {
  debug(req.method + ' ' + req.url);
  var collection = req.params.collection;
  var database = req.params.database;

  storeService.storeDocument(db.db(database), collection, req.body);

  res.end('ok');
});

app.get('/:database/:collection', function(req, res) {
  debug(req.method + ' ' + req.url);
  var collection = req.params.collection;
  var database = req.params.database;

  var response = function (docs) {
    res.send(docs);
  };

  storeService.getAll(db.db(database), collection, response);

});

app.get('/:database/:collection/:id', function(req, res) {
  debug(req.method + ' ' + req.url);
  var collection = req.params.collection;
  var id = req.params.id;
  var database = req.params.database;

  var response = function (docs) {
    res.send(docs);
  };

  storeService.getById(db.db(database), collection, id, response);

});

app.post('/:database/:collection/_search', function(req, res) {
  debug(req.method + ' ' + req.url);
  var collection = req.params.collection;
  var database = req.params.database;

  var response = function (docs) {
    res.send(docs);
  };

  storeService.search(db.db(database), response , collection, req.body.query);

});