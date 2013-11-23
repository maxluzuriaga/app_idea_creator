var db = require ("../../lib/db.js");

var Idea = function(data) {
  this.id = -1;
  this.name = null;
  this.date = null;

  if(data) {
    if(data.id != undefined) {
      this.id = data.id;
    }
    if(data.name != undefined) {
      this.name = data.name;
    }
    if(data.date != undefined) {
      this.date = data.date;
    }
  }

  this.save = function(callback) {
    if (this.id == -1) {
      db.perform_query('INSERT INTO ideas(name, date) VALUES($1, $2) RETURNING id, date', [this.name, new Date()], function(data) {
        this.id = data.rows[0].id;
        this.date = data.rows[0].date;

        callback();
      }.bind(this));
    } else {
      db.perform_query('UPDATE ideas SET name = $1, date = $2 WHERE id = $3 RETURNING date', [this.name, new Date(Date.now()), this.id], function(data) {
        this.date = data.rows[0].date;

        callback();
      }.bind(this));
    };
  };

  this.destroy = function(callback) {
    db.perform_query('DELETE FROM ideas WHERE id = $1', [this.id], function(data) {
      this.id = -1;
      this.name = null;
      this.date = null;
      callback();
    }.bind(this));
  };
};

Idea.getAll = function(handler) {
  db.perform_query('SELECT * FROM ideas ORDER BY id', function(data) {
    var ideas = [];

    for (var n=0; n<data.rows.length; n++) {
      ideas.push(new Idea(data.rows[n]));
    };

    handler(ideas);
  });
};

Idea.find = function(id, handler) {
  db.perform_query('SELECT * FROM ideas WHERE id = $1', [id], function(data) {
    var idea;

    if(data.rows.length == 0) {
      idea = null;
    } else {
      idea = new Idea(data.rows[0]);
    }
    handler(idea);
  });
};

Idea.count = function(handler) {
  db.perform_query('SELECT COUNT(id) AS count FROM ideas',  function(data) {
    var count = data.rows[0].count;
    handler(count);
  });
};

module.exports = Idea;