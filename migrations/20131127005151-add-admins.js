var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('admins', {
    id: { type: 'serial', primaryKey: true },
    username: 'string',
    password: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('admins', callback);
};
