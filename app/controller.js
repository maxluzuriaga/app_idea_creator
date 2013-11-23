var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea");

function index(response, postData) {
  Idea.getAll(function(ideas) {
    helper.render("index.html", { ideas: ideas }, response, 200);
  });
}

function submit(response, postData) {
  // TODO: only create idea with non-empty name
  var idea = new Idea( { name: postData.idea } );

  idea.save(function() {
    helper.render("submit.js", { idea: idea }, response, 200);
  });
}

exports.index = index;
exports.submit = submit;