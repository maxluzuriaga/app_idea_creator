var helper = require("../lib/helper");

function index(response, postData) {
  helper.render("index", { msg: "Hello World" }, response, 200);
}

function submit(response, postData) {
  helper.render("index", { msg: postData }, response, 200);
}

exports.index = index;
exports.submit = submit;