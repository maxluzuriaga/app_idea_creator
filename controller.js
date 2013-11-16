var helper = require("./helper");

function index(response) {
  helper.render("index", null, response, 200);
}

function submit(response, request) {
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write("Submit");
  response.end();
}

exports.index = index;
exports.submit = submit;