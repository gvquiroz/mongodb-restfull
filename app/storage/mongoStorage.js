var ObjectID = require('mongodb').ObjectID;

function getAll(db, collection, res) {
  var collection = db.collection(collection);

  collection.find().toArray(function (err, docs) {
    if (err) throw err;
    res(docs);
  })

}

function getById(db, collection, id, res) {
  var collection = db.collection(collection);

  collection.findOne({ _id: new ObjectID(id) }, function (err, docs) {
    if (err) throw err;
    res(docs);
  })

}

function storeDocument(db, collection, document) {
  var collection = db.collection(collection);
  collection.insertOne(document);
}

function storeBulk(db, collection, documents) {
  var collection = db.collection(collection);
  collection.insertMany(documents);
}

function search(db, res, collection, query) {
  var collection = db.collection(collection);
  
  collection.find(query).toArray(function (err, docs) {
    if (err) throw err;
    res(docs);
  })

}

module.exports = { getAll, getById, storeDocument, storeBulk, search };
