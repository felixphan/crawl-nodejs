var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

function persist(value) {
  MongoClient.connect(
    url,
    (err, db) => {
      if (err) throw err;
      var dbo = db.db('vipon');
      dbo.collection('data').findOne(value, function(err, res) {
        if (res) {
          dbo.collection('data').updateOne(res, value, function(err, res) {
            console.log('1 document updated');
            db.close();
          });
        } else {
          dbo.collection('data').insertOne(value, function(err, res) {
            console.log('1 document inserted');
            db.close();
          });
        }
      });
    }
  );
}

module.exports = persist;
