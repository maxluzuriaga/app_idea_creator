var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea");

function index(response, postData) {
  var idea = new Idea();
  idea.name = "Should have date";
  idea.save(function() {
    console.log(idea);
  });
}

function submit(response, postData) {
  helper.render("index", { msg: postData }, response, 200);
}

exports.index = index;
exports.submit = submit;