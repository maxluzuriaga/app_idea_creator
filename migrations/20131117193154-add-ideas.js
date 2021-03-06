var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('ideas', {
    id: { type: 'serial', primaryKey: true },
    name: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('ideas', callback);
};
