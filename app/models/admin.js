var db = require ("../../lib/db.js"),
    crypto = require('crypto');

var Admin = function(data) {
  this.id = -1;
  this.username = null;
  this.password = null;
  this.hashedPassword = null;

  if(data) {
    if(data.id != undefined) {
      this.id = data.id;
    }
    if(data.username != undefined) {
      this.username = data.username;
    }
    if(data.password != undefined) {
      this.hashedPassword = data.password; // Database password = this.hashedPassword
    }
  }

  this.save = function(callback) {
    this.hashedPassword = this.hashedPassword || Admin.hashPassword(this.password);

    if (!this.isSaved()) {
      db.perform_query('INSERT INTO admins(username, passsword) VALUES($1, $2) RETURNING id', [this.username, this.hashedPassword], function(data) {
        this.id = data.rows[0].id;

        callback();
      }.bind(this));
    } else {
      db.perform_query('UPDATE admins SET username = $1, password = $2 WHERE id = $3', [this.username, this.hashedPassword, this.id], function(data) {
        callback();
      }.bind(this));
    };
  };

  this.destroy = function(callback) {
    db.perform_query('DELETE FROM admins WHERE id = $1', [this.id], function(data) {
      this.id = -1;
      this.username = null;
      this.password = null;
      this.hashedPassword = null;
      
      callback();
    }.bind(this));
  };

  this.isSaved = function() {
    return this.id != -1;
  };
};

Admin.hashPassword = function(password) {
  var shasum = crypto.createHash('sha1');
  shasum.update(password);
  return shasum.digest('hex');
}

Admin.find = function(username, handler) {
  db.perform_query('SELECT * FROM admins WHERE username = $1', [username], function(data) {
    var admin;

    if(data.rows.length == 0) {
      admin = null;
    } else {
      admin = new Admin(data.rows[0]);
    }
    handler(admin);
  });
};

Admin.authenticate = function(username, password, handler) {
  Admin.find(username, function(admin) {
    if(admin && (admin.password == Admin.hashPassword(password))) {
      handler(true);
    } else {
      handler(false);
    }
  });
};

module.exports = Admin;