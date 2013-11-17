var helper = require("../lib/helper"),
    pg = require('pg');

function index(response, postData) {
  pg.connect(process.env.DATABASE_URL, function(error, client, done) {
    if(error) {
      console.log(error);
    } else {
      client.query("INSERT INTO ideas (name) VALUES ('test')", function(err, result) {
        if(err) {
          console.log(err);
        } else {
          client.query('SELECT COUNT(id) as count FROM ideas', function(err, result) {
            if(err) {
              console.log(err);
            } else {
              done();
              var message = 'There are ' + result.rows[0].count + ' ideas in the database.';
              helper.render("index", { msg: message }, response, 200);
            }
          });
        }
      });
    }
  });
}

function submit(response, postData) {
  helper.render("index", { msg: postData }, response, 200);
}

exports.index = index;
exports.submit = submit;