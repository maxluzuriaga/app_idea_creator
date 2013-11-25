var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea");

function index(response) {
  Idea.count(function(c) {
    helper.render("index.html", { count: c }, response, 200);
  });
}

function submit(response, postData) {
  var r = function(e, c) {
    helper.render("submit.js", { error: e, count: c }, response, 200);
  };

  if (/\S/.test(postData.idea)) {
    var idea = new Idea( { name: postData.idea } );

    idea.save(function() {
      Idea.count(function(c) {
        r(false, c);
      });
    });
  } else {
    Idea.count(function(c) {
      r(true, c);
    });
  }
}

function count(response) {
  Idea.count(function(c) {
    helper.render("count.js", { count: c }, response, 200);
  });
}

exports.index = index;
exports.submit = submit;
exports.count = count;