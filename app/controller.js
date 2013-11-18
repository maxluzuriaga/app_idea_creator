var helper = require("../lib/helper"),
    db = require("../lib/db");

function index(response, postData) {
  db.perform_queries_async([
    "INSERT INTO ideas (name) VALUES ('test')",
    ['SELECT COUNT(id) as count FROM ideas', function(result) {
      var message = 'There are ' + result.rows[0].count + ' ideas in the database.';
      helper.render("index", { msg: message }, response, 200);
    }]
  ]);
}

function submit(response, postData) {
  helper.render("index", { msg: postData }, response, 200);
}

exports.index = index;
exports.submit = submit;