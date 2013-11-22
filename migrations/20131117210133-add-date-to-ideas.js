var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('ideas', 'date', {
    type: 'timestamptz'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('ideas', 'date', callback);
};
