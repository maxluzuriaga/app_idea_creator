var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea");

function index(response, postData) {
  Idea.getAll(function(ideas) {
    helper.render("index.html", { ideas: ideas }, response, 200);
  });
}

function submit(response, postData) {
  var idea = new Idea( { name: postData.idea } );

  idea.save(function() {
    helper.render("submit.js", { idea: idea }, response, 200);
  });
}

exports.index = index;
exports.submit = submit;