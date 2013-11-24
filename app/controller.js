var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea");

function index(response) {
  Idea.count(function(c) {
    helper.render("index.html", { count: c }, response, 200);
  });
}

function submit(response, postData) {
  // TODO: only create idea with non-empty name
  var idea = new Idea( { name: postData.idea } );

  idea.save(function() {
    Idea.count(function(c) {
      helper.render("submit.js", { idea: idea, count: c }, response, 200);
    });
  });
}

function count(response) {
  Idea.count(function(c) {
    helper.render("count.js", { count: c }, response, 200);
  });
}

exports.index = index;
exports.submit = submit;
exports.count = count;