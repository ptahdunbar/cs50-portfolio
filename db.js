var mongoose = require('mongoose')
var mongoDB = mongoose.connection

mongoose.connect('mongodb://localhost/aarrr')

mongoDB.on('error', console.error.bind(console, 'error'))
mongoDB.on('open', function(){
  console.log('mongoDB connection ready')
})

module.exports.insert = function(collection, dataSet, callback) {
  if (collection.length) {

    var _collection = mongoDB.collection(collection, mongoDB)
    dataSet = dataSet || {}

    _collection.insertOne(dataSet, function(err, doc) {
      if ( err ) throw err
      callback(doc)
    })
  }
}

module.exports.find = function(collection, dataSet, callback) {
  if (collection.length) {

    var _collection = mongoDB.collection(collection, mongoDB)
    dataSet = dataSet || {}

    mongoDB.collection(collection).find(dataSet).toArray(callback)
  }
}
