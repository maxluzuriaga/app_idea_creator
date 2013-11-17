var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('ideas', 'date', {
    type: 'date'
  }, callback)
};

exports.down = function(db, callback) {

};
