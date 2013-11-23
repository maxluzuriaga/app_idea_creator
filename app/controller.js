var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea"),
    qs = require("querystring");

function index(response, postData) {
  Idea.getAll(function(ideas) {
    helper.render("index.html", { ideas: ideas }, response, 200);
  });
}

function submit(response, postData) {
  var n = qs.parse(postData).idea;
  var idea = new Idea( { name: n } );

  idea.save(function() {
    helper.render("submit.js", { idea: idea }, response, 200);
  });
}

exports.index = index;
exports.submit = submit;