const MongoClient = require('mongodb').MongoClient
const MongoClientInMemory = require('mongo-mock').MongoClient;
const config = require('../../config/properties.json')
const mode = process.env.NODE_ENV;

const uri = config.DBHost
let _db

const connectDB = async (callback) => {
    try {

        if (mode == 'memory'){
            MongoClientInMemory.connect(uri, (err, db) => {
                _db = db
                return callback(err)
            })
        } else {
            MongoClient.connect(uri, (err, db) => {
                _db = db
                return callback(err)
            })
        }

    } catch (e) {
        throw e
    }
}

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }