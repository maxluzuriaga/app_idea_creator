var helper = require("../lib/helper"),
    db = require("../lib/db"),
    Idea = require("./models/idea");

function index(response, postData) {
  helper.render("index.html", { msg: "Index"}, response, 200);
}

function submit(response, postData) {
  console.log(postData);
  console.log(typeof postData);
  helper.render("submit.js", { msg: postData }, response, 200);
}

exports.index = index;
exports.submit = submit;